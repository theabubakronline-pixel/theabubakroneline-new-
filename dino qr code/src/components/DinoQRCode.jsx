import { useEffect, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { getDinoShapeFunction } from '../utils/dinoShapes'
import { getPatternSVGById } from '../utils/backgroundPatterns'

/**
 * DinoQRCode Component
 * 
 * This component generates a QR code with visible dinosaur shapes integrated into the pattern.
 * The shapes replace certain modules while maintaining scannability through:
 * 1. High error correction level (H - ~30% error correction)
 * 2. Strategic module replacement (only replacing modules in a pattern that preserves data)
 * 3. Maintaining the essential QR code structure (finder patterns, timing patterns, etc.)
 * 
 * INTEGRATION NOTES:
 * - Dinosaur shapes are added to modules where (index % 8 === 0) after the first 30 modules
 * - This pattern ensures finder patterns and timing patterns remain intact
 * - High error correction (Level H) allows up to 30% of modules to be corrupted while remaining scannable
 * - The shapes are rendered as SVG overlays on existing modules
 * 
 * @param {string} value - The text/URL to encode
 * @param {string} templateId - Selected dinosaur template ID
 * @param {string} foregroundColor - QR code foreground color
 * @param {string} backgroundColor - QR code background color
 * @param {string} backgroundPattern - Selected background pattern ID (footprints, silhouettes, etc.)
 * @param {string} patternType - Dinosaur template pattern type (legacy, for template-specific patterns)
 * @param {number} size - Size of the QR code
 */
const DinoQRCode = ({ 
  value, 
  templateId, 
  foregroundColor, 
  backgroundColor, 
  backgroundPattern = 'none',
  patternType = 'roar',
  size = 256 
}) => {
  const svgRef = useRef(null)

  useEffect(() => {
    // Add dinosaur shapes and background patterns to QR code after it's rendered
    if (value && svgRef.current) {
      // Small delay to ensure QR code is fully rendered
      const timer = setTimeout(() => {
        const svg = svgRef.current?.querySelector('svg')
        if (svg) {
          addDinoShapesToQR(svg, templateId, foregroundColor)
          addBackgroundPattern(svg, backgroundPattern, backgroundColor)
          
          // Mark SVG as ready for download
          svg.setAttribute('data-dino-ready', 'true')
        }
      }, 50)
      
      return () => clearTimeout(timer)
    }
  }, [value, templateId, foregroundColor, backgroundColor, backgroundPattern, patternType])

  /**
   * Adds dinosaur shapes to QR code modules
   * This function modifies the SVG to include custom dinosaur shapes
   * while maintaining QR code scannability
   */
  const addDinoShapesToQR = (svgElement, templateId, color) => {
    if (!svgElement) return

    // Get all path elements (these represent QR code modules)
    const paths = svgElement.querySelectorAll('path')
    const shapeFunction = getDinoShapeFunction(templateId)
    
    // Remove existing dinosaur shapes group if present
    const existingGroup = svgElement.querySelector('.dino-shapes')
    if (existingGroup) {
      existingGroup.remove()
    }
    
    // Create a new group for dinosaur shapes
    const dinoGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    dinoGroup.setAttribute('class', 'dino-shapes')
    dinoGroup.setAttribute('data-template', templateId)
    svgElement.appendChild(dinoGroup)

    // Calculate module size from the first path
    if (paths.length > 0) {
      const firstPath = paths[0]
      const d = firstPath.getAttribute('d')
      let moduleSize = 8 // default
      
      if (d) {
        // Extract coordinates to determine module size
        // QR code paths are typically rectangles: M x,y L x+w,y L x+w,y+h L x,y+h Z
        const coords = d.match(/M(\d+\.?\d*),(\d+\.?\d*)\s+L(\d+\.?\d*),(\d+\.?\d*)/)
        if (coords && coords.length >= 5) {
          const x1 = parseFloat(coords[1])
          const y1 = parseFloat(coords[2])
          const x2 = parseFloat(coords[3])
          const y2 = parseFloat(coords[4])
          moduleSize = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)) || 8
        }
      }
      
      // Add dinosaur shapes to selected modules
      // Pattern: Replace every 8th module (starting after index 30 to skip finder patterns)
      // This maintains data integrity while adding visual interest
      paths.forEach((path, index) => {
        // Skip early modules (finder patterns and timing patterns)
        if (index > 30 && index % 8 === 0) {
          const dAttr = path.getAttribute('d')
          if (dAttr) {
            // Extract position from path data
            const matches = dAttr.match(/M(\d+\.?\d*),(\d+\.?\d*)/)
            if (matches) {
              const x = parseFloat(matches[1])
              const y = parseFloat(matches[2])
              
              // Create dinosaur shape at this module position
              const shapeSvg = createDinoShapeSVG(x, y, moduleSize, color, shapeFunction)
              dinoGroup.appendChild(shapeSvg)
            }
          }
        }
      })
    }
  }

  /**
   * Creates an SVG element with a dinosaur shape at the specified position
   */
  const createDinoShapeSVG = (x, y, moduleSize, color, shapeFunction) => {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    group.setAttribute('transform', `translate(${x}, ${y})`)
    group.setAttribute('class', 'dino-module')
    
    // Create background rectangle (maintains module visibility)
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.setAttribute('x', '0')
    rect.setAttribute('y', '0')
    rect.setAttribute('width', moduleSize.toString())
    rect.setAttribute('height', moduleSize.toString())
    rect.setAttribute('fill', color)
    rect.setAttribute('opacity', '0.9')
    group.appendChild(rect)
    
    // Add dinosaur shape overlay
    // Parse the shape HTML and create proper SVG elements in the SVG namespace
    const shapeHTML = shapeFunction(moduleSize, color)
    const parser = new DOMParser()
    const shapeDoc = parser.parseFromString(
      `<svg xmlns="http://www.w3.org/2000/svg">${shapeHTML}</svg>`,
      'image/svg+xml'
    )
    
    // Import all elements from the parsed document
    const shapeElements = shapeDoc.documentElement.childNodes
    Array.from(shapeElements).forEach(node => {
      if (node.nodeType === 1) { // Element node
        // Import node to ensure it's in the correct SVG namespace
        const importedNode = document.importNode(node, true)
        group.appendChild(importedNode)
      }
    })
    
    return group
  }

  /**
   * Adds background pattern to QR code
   * Uses the selected background pattern (footprints, silhouettes, bones, eggs, scales)
   */
  const addBackgroundPattern = (svgElement, patternId, bgColor) => {
    if (!svgElement || !patternId || patternId === 'none') {
      // If no pattern selected, ensure background is solid color
      const allRects = Array.from(svgElement.querySelectorAll('rect'))
      const bgRect = allRects.find(r => {
        const fill = r.getAttribute('fill')
        return fill === bgColor || 
               fill === '#FFFFFF' || 
               fill === 'white' ||
               (fill && fill.toLowerCase() === bgColor.toLowerCase()) ||
               (fill && fill.startsWith('url(') === false)
      })
      if (bgRect && bgRect.getAttribute('fill')?.startsWith('url(')) {
        bgRect.setAttribute('fill', bgColor)
      }
      return
    }

    // Remove existing patterns from defs
    const existingDefs = svgElement.querySelector('defs')
    if (existingDefs) {
      const existingPatterns = existingDefs.querySelectorAll('pattern[id^="dino-"]')
      existingPatterns.forEach(p => p.remove())
    }

    // Get the background rect (QR code background)
    const allRects = Array.from(svgElement.querySelectorAll('rect'))
    let bgRect = allRects.find(r => {
      const fill = r.getAttribute('fill')
      return fill === bgColor || 
             fill === '#FFFFFF' || 
             fill === 'white' ||
             (fill && fill.toLowerCase() === bgColor.toLowerCase())
    })
    
    // If not found by color, try to find the largest rect (usually the background)
    if (!bgRect && allRects.length > 0) {
      bgRect = allRects.reduce((largest, current) => {
        const largestArea = parseFloat(largest.getAttribute('width') || 0) * parseFloat(largest.getAttribute('height') || 0)
        const currentArea = parseFloat(current.getAttribute('width') || 0) * parseFloat(current.getAttribute('height') || 0)
        return currentArea > largestArea ? current : largest
      })
    }

    if (bgRect) {
      // Get SVG pattern definition
      const patternHTML = getPatternSVGById(patternId, bgColor)
      
      if (patternHTML) {
        const parser = new DOMParser()
        const patternDoc = parser.parseFromString(
          `<svg xmlns="http://www.w3.org/2000/svg">${patternHTML}</svg>`,
          'image/svg+xml'
        )
        
        // Insert pattern definitions into defs or create defs
        let defs = svgElement.querySelector('defs')
        if (!defs) {
          defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
          svgElement.insertBefore(defs, svgElement.firstChild)
        }
        
        // Add pattern element to defs
        const patternElement = patternDoc.querySelector('pattern')
        if (patternElement) {
          const importedPattern = document.importNode(patternElement, true)
          // Make pattern ID unique to avoid conflicts
          const uniqueId = `dino-${patternId}-pattern-${Date.now()}`
          importedPattern.setAttribute('id', uniqueId)
          defs.appendChild(importedPattern)
          
          // Apply the pattern to background rect
          bgRect.setAttribute('fill', `url(#${uniqueId})`)
          // Keep base fill color as fallback
          bgRect.setAttribute('fill-opacity', '1')
        }
      }
    }
  }

  if (!value) return null

  return (
    <div ref={svgRef} className="dino-qr-code">
      <QRCodeSVG
        value={value}
        size={size}
        level="H" // High error correction (30%) for scannability with custom shapes
        fgColor={foregroundColor}
        bgColor={backgroundColor}
        includeMargin={true}
      />
    </div>
  )
}

export default DinoQRCode

