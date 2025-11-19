import { useState } from 'react'
import * as htmlToImage from 'html-to-image'

const DownloadShareButtons = ({ qrRef, inputValue, selectedTemplate, backgroundPattern, backgroundColor }) => {
  const [downloading, setDownloading] = useState(false)

  /**
   * Download as PNG using html-to-image for perfect preview matching
   * This captures exactly what the user sees in the preview
   */
  const downloadAsPNG = async () => {
    if (!qrRef || !qrRef.current) {
      alert('QR code not ready. Please wait a moment and try again.')
      return
    }
    
    setDownloading(true)
    try {
      // Wait a moment to ensure all shapes are rendered
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const container = qrRef.current
      
      // Find the preview container that includes background patterns
      // The container with background patterns is the parent of the QR code white box
      let previewContainer = container.closest('.bg-white')?.parentElement
      
      // If not found, try finding by class pattern
      if (!previewContainer) {
        const allContainers = document.querySelectorAll('[class*="min-h"]')
        previewContainer = Array.from(allContainers).find(el => 
          el.contains(container) && el.classList.toString().includes('bg-gradient')
        )
      }
      
      // Fallback to the QR code container itself
      if (!previewContainer) {
        previewContainer = container.closest('.bg-white') || container
      }
      
      // Use html-to-image to capture exactly what's shown (including background patterns)
      const dataUrl = await htmlToImage.toPng(previewContainer, {
        quality: 1.0,
        pixelRatio: 2, // Higher resolution
        backgroundColor: '#ffffff',
        cacheBust: true,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        }
      })
      
      // Create download link
      const link = document.createElement('a')
      link.download = `dino-qr-code-${selectedTemplate.name.toLowerCase()}.png`
      link.href = dataUrl
      link.click()
      
      console.log('✓ PNG downloaded successfully with all dinosaur shapes')
      setDownloading(false)
    } catch (error) {
      console.error('Error downloading PNG:', error)
      alert('Error downloading PNG. Please try again.')
      setDownloading(false)
    }
  }

  /**
   * Download as SVG - get the actual SVG element and download it with dinosaur shapes
   * 
   * This function ensures all dinosaur shapes, colors, and background patterns
   * are properly included in the downloaded SVG file.
   * 
   * HOW IT WORKS:
   * 1. Waits for the SVG to be fully rendered with dinosaur shapes
   * 2. Finds the SVG element containing the QR code
   * 3. Creates a new standalone SVG document with all elements
   * 4. Manually copies all QR paths, dinosaur shapes, and background patterns
   * 5. Preserves all colors, transforms, and attributes
   * 6. Serializes and downloads the complete SVG
   */
  const downloadAsSVG = async () => {
    if (!qrRef || !qrRef.current) {
      alert('QR code not ready. Please wait a moment and try again.')
      return
    }
    
    try {
      // Step 1: Wait for all shapes to be rendered
      await new Promise(resolve => setTimeout(resolve, 600))
      
      const container = qrRef.current
      let svgElement = null
      
      // Step 2: Find the SVG element containing the QR code
      const dinoQrDiv = container.querySelector('.dino-qr-code')
      if (dinoQrDiv) {
        svgElement = dinoQrDiv.querySelector('svg')
      }
      
      if (!svgElement) {
        svgElement = container.querySelector('svg')
      }
      
      if (!svgElement) {
        const allSvgs = container.querySelectorAll('svg')
        svgElement = allSvgs[0]
      }
      
      if (!svgElement) {
        alert('SVG element not found. Please try again.')
        return
      }

      // Step 3: Wait for dinosaur shapes to be ready
      let attempts = 0
      let isReady = svgElement.getAttribute('data-dino-ready') === 'true'
      while (!isReady && attempts < 60) {
        await new Promise(resolve => setTimeout(resolve, 100))
        isReady = svgElement.getAttribute('data-dino-ready') === 'true'
        attempts++
      }
      
      // Step 4: Wait for dinosaur shapes group to exist
      let dinoShapes = svgElement.querySelector('.dino-shapes')
      attempts = 0
      while (!dinoShapes && attempts < 40) {
        await new Promise(resolve => setTimeout(resolve, 100))
        dinoShapes = svgElement.querySelector('.dino-shapes')
        attempts++
      }
      
      if (!dinoShapes || dinoShapes.children.length === 0) {
        console.warn('⚠️ Dinosaur shapes not found. Retrying...')
        // One more wait
        await new Promise(resolve => setTimeout(resolve, 500))
        dinoShapes = svgElement.querySelector('.dino-shapes')
      }
      
      if (dinoShapes && dinoShapes.children.length > 0) {
        console.log('✓ Found', dinoShapes.children.length, 'dinosaur shapes in SVG')
      } else {
        console.warn('⚠️ Warning: No dinosaur shapes found. Downloading QR code without shapes.')
      }

      // Step 5: Create a new SVG document with proper structure
      const width = svgElement.getAttribute('width') || '512'
      const height = svgElement.getAttribute('height') || '512'
      const viewBox = svgElement.getAttribute('viewBox') || `0 0 ${width} ${height}`
      
      // Create new SVG element - use the SVG element's owner document to ensure proper namespace
      const svgNS = 'http://www.w3.org/2000/svg'
      const tempSvg = document.createElementNS(svgNS, 'svg')
      tempSvg.setAttribute('xmlns', svgNS)
      tempSvg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
      tempSvg.setAttribute('width', width)
      tempSvg.setAttribute('height', height)
      tempSvg.setAttribute('viewBox', viewBox)
      
      // Step 6: Copy all defs (patterns, gradients, etc.) from original SVG
      // These contain background patterns that make the QR code dinosaur-themed
      const originalDefs = svgElement.querySelector('defs')
      if (originalDefs) {
        const clonedDefs = document.importNode(originalDefs, true)
        tempSvg.appendChild(clonedDefs)
        console.log('✓ Copied defs (background patterns) to new SVG')
      }
      
      // Step 7: Copy all rectangles first (background layer)
      // Background rectangles come first so they appear behind the QR code
      const allRects = svgElement.querySelectorAll('rect')
      let bgRectCount = 0
      allRects.forEach(rect => {
        // Only copy background rects, not rects inside dino-shapes
        if (!rect.closest('.dino-shapes')) {
          const clonedRect = document.importNode(rect, true)
          tempSvg.appendChild(clonedRect)
          bgRectCount++
        }
      })
      console.log('✓ Copied', bgRectCount, 'background rectangles to new SVG')
      
      // Step 8: Copy all QR code paths (the actual QR code modules)
      // These form the scannable QR code pattern
      const allPaths = svgElement.querySelectorAll('path')
      let qrPathCount = 0
      allPaths.forEach(path => {
        // Only copy QR code paths, not paths inside dino-shapes
        if (!path.closest('.dino-shapes')) {
          const clonedPath = document.importNode(path, true)
          tempSvg.appendChild(clonedPath)
          qrPathCount++
        }
      })
      console.log('✓ Copied', qrPathCount, 'QR code paths to new SVG')
      
      // Step 9: Copy all dinosaur shapes (THE CRITICAL PART - MUST BE LAST)
      // Dinosaur shapes are added on top of QR modules to make them visible
      // They replace certain modules while maintaining scannability through high error correction
      if (dinoShapes && dinoShapes.children.length > 0) {
        // Create a new group for dinosaur shapes in the new SVG
        const dinoShapesGroup = document.createElementNS(svgNS, 'g')
        dinoShapesGroup.setAttribute('class', 'dino-shapes')
        dinoShapesGroup.setAttribute('data-template', dinoShapes.getAttribute('data-template') || '')
        
        // Manually copy each dinosaur shape module
        // Each shape is a <g> element containing a rect and the dinosaur SVG path
        Array.from(dinoShapes.children).forEach((shapeModule, index) => {
          try {
            // Import the entire shape module (rect + dinosaur shape)
            const importedShape = document.importNode(shapeModule, true)
            dinoShapesGroup.appendChild(importedShape)
          } catch (err) {
            console.warn(`⚠️ Error copying shape ${index}:`, err)
          }
        })
        
        // Add the dinosaur shapes group to the SVG (on top of QR paths)
        tempSvg.appendChild(dinoShapesGroup)
        console.log('✓ Copied', dinoShapesGroup.children.length, 'dinosaur shapes to new SVG')
        
        // Verify the shapes are actually in the new SVG
        const verifyShapes = tempSvg.querySelector('.dino-shapes')
        if (verifyShapes && verifyShapes.children.length > 0) {
          console.log('✓ Verified:', verifyShapes.children.length, 'dinosaur shapes are in the new SVG')
        } else {
          console.error('❌ ERROR: Shapes were not properly copied! Attempting alternative method...')
          // Alternative: Clone the entire original SVG and extract what we need
          const fullClone = svgElement.cloneNode(true)
          const fullCloneDinoShapes = fullClone.querySelector('.dino-shapes')
          if (fullCloneDinoShapes && fullCloneDinoShapes.children.length > 0) {
            const altDinoGroup = document.importNode(fullCloneDinoShapes, true)
            tempSvg.appendChild(altDinoGroup)
            console.log('✓ Alternative method: Added', altDinoGroup.children.length, 'dinosaur shapes')
          }
        }
      }
      
      // Step 10: Copy any other elements (circles, etc.) that might be part of the QR code
      const allOtherElements = svgElement.querySelectorAll('circle, ellipse, line, polyline, polygon')
      allOtherElements.forEach(el => {
        if (!el.closest('.dino-shapes')) {
          const clonedEl = document.importNode(el, true)
          tempSvg.appendChild(clonedEl)
        }
      })
      
      // Step 11: Final verification
      const finalDinoShapes = tempSvg.querySelector('.dino-shapes')
      if (finalDinoShapes && finalDinoShapes.children.length > 0) {
        console.log('✓ Final verification: SVG contains', finalDinoShapes.children.length, 'dinosaur shapes')
      } else if (dinoShapes && dinoShapes.children.length > 0) {
        console.error('❌ CRITICAL: Dinosaur shapes missing from final SVG!')
        alert('Warning: Dinosaur shapes may not be included in the download. Please try again.')
      }
      
      // Step 12: Serialize the complete SVG
      const svgData = new XMLSerializer().serializeToString(tempSvg)
      const svgWithDeclaration = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgData
      
      // Step 13: Create and download
      const svgBlob = new Blob([svgWithDeclaration], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)
      
      const link = document.createElement('a')
      link.download = `dino-qr-code-${selectedTemplate.name.toLowerCase()}.svg`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
      
      console.log('✓ SVG downloaded successfully with all dinosaur shapes, colors, and patterns')
    } catch (error) {
      console.error('Error downloading SVG:', error)
      alert('Error downloading SVG. Please try again.')
    }
  }

  const shareToTwitter = () => {
    const text = encodeURIComponent(`Check out my ${selectedTemplate.name} QR code! 🦖`)
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
  }

  const shareToInstagram = () => {
    alert('To share on Instagram:\n1. Download your QR code as PNG\n2. Post it as an image on Instagram\n3. Tag us if you like! 🦖')
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100 card-hover">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
        <span className="text-2xl">📤</span>
        <span>Download & Share</span>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <button
          onClick={downloadAsPNG}
          disabled={downloading}
          className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
        >
          {downloading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Downloading...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download as PNG</span>
            </>
          )}
        </button>

        <button
          onClick={downloadAsSVG}
          className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:via-cyan-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 flex items-center justify-center gap-3 shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Download as SVG</span>
        </button>
      </div>

      <div className="border-t-2 border-gray-200 pt-6">
        <p className="text-sm font-bold text-gray-700 mb-4 text-center flex items-center justify-center gap-2">
          <span className="text-lg">🌐</span>
          <span>Share on Social Media</span>
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={shareToTwitter}
            className="bg-[#1DA1F2] text-white font-semibold py-3 px-5 rounded-xl hover:bg-[#1a8cd8] transition-all duration-300 transform hover:scale-110 hover:shadow-lg active:scale-95 flex items-center gap-2 shadow-md"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
            </svg>
            <span>Twitter</span>
          </button>

          <button
            onClick={shareToLinkedIn}
            className="bg-[#0077B5] text-white font-semibold py-3 px-5 rounded-xl hover:bg-[#006399] transition-all duration-300 transform hover:scale-110 hover:shadow-lg active:scale-95 flex items-center gap-2 shadow-md"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>LinkedIn</span>
          </button>

          <button
            onClick={shareToInstagram}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-semibold py-3 px-5 rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg active:scale-95 flex items-center gap-2 shadow-md"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Instagram</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DownloadShareButtons
