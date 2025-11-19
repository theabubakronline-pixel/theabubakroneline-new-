/**
 * Dinosaur-themed Background Patterns
 * 
 * These patterns are designed to be integrated into the QR code SVG itself,
 * similar to how the background color works. They make the QR code more dinosaur-themed
 * while maintaining scannability.
 */

/**
 * Get pattern color based on background color (light or dark)
 * Returns RGB color string for SVG patterns
 */
const getPatternColor = (bgColor) => {
  const hex = bgColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  
  // Light background = darker pattern, Dark background = lighter pattern
  // Use subtle but visible opacity for SVG patterns
  if (brightness > 128) {
    // Light background - use darker pattern
    return `rgb(${Math.max(0, r - 50)}, ${Math.max(0, g - 50)}, ${Math.max(0, b - 50)})`
  } else {
    // Dark background - use lighter pattern
    return `rgb(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 50)})`
  }
}

/**
 * Get pattern opacity based on background color
 */
const getPatternOpacity = (bgColor) => {
  const hex = bgColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  
  // Use more visible opacity for SVG patterns (0.15-0.25)
  return brightness > 128 ? 0.2 : 0.25
}

/**
 * Create SVG pattern for dinosaur footprints
 * Returns SVG pattern definition string for use in QR code SVG
 */
export const createFootprintPatternSVG = (bgColor) => {
  const patternColor = getPatternColor(bgColor)
  const opacity = getPatternOpacity(bgColor)
  
  return `
    <pattern id="dino-footprints-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="${bgColor}"/>
      <!-- Dinosaur footprint -->
      <path d="M10,20 Q18,12 26,20 Q18,28 10,20" fill="${patternColor}" opacity="${opacity}"/>
      <circle cx="14" cy="20" r="1.5" fill="${patternColor}" opacity="${opacity}"/>
      <circle cx="22" cy="20" r="1.5" fill="${patternColor}" opacity="${opacity}"/>
      <!-- Second footprint offset -->
      <path d="M30,28 Q38,20 46,28 Q38,36 30,28" fill="${patternColor}" opacity="${opacity * 0.8}"/>
      <circle cx="34" cy="28" r="1.2" fill="${patternColor}" opacity="${opacity * 0.8}"/>
      <circle cx="42" cy="28" r="1.2" fill="${patternColor}" opacity="${opacity * 0.8}"/>
    </pattern>
  `
}

/**
 * Dinosaur footprint pattern (legacy CSS version - kept for compatibility)
 */
export const createFootprintPattern = (bgColor) => {
  const patternColor = getPatternColor(bgColor)
  return {
    type: 'footprints',
    style: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15,30 Q25,20 35,30 Q25,40 15,30' fill='${encodeURIComponent(patternColor)}'/%3E%3Ccircle cx='20' cy='30' r='2' fill='${encodeURIComponent(patternColor)}'/%3E%3Ccircle cx='30' cy='30' r='2' fill='${encodeURIComponent(patternColor)}'/%3E%3C/svg%3E")`,
      backgroundSize: '60px 60px',
      backgroundRepeat: 'repeat',
      opacity: 0.6
    }
  }
}

/**
 * Create SVG pattern for dinosaur silhouettes
 */
export const createSilhouettePatternSVG = (bgColor) => {
  const patternColor = getPatternColor(bgColor)
  const opacity = getPatternOpacity(bgColor)
  
  return `
    <pattern id="dino-silhouettes-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
      <rect width="50" height="50" fill="${bgColor}"/>
      <!-- Dinosaur silhouette -->
      <path d="M10,35 L18,28 L25,25 L32,28 L40,35 L36,40 L28,43 L22,43 L14,40 Z" fill="${patternColor}" opacity="${opacity}"/>
      <circle cx="25" cy="28" r="2" fill="${patternColor}" opacity="${opacity}"/>
      <!-- Second silhouette offset -->
      <path d="M30,15 L38,8 L45,5 L52,8 L60,15 L56,20 L48,23 L42,23 L34,20 Z" fill="${patternColor}" opacity="${opacity * 0.7}"/>
    </pattern>
  `
}

/**
 * Dinosaur silhouette pattern (legacy CSS version)
 */
export const createSilhouettePattern = (bgColor) => {
  const patternColor = getPatternColor(bgColor)
  return {
    type: 'silhouettes',
    style: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20,60 L30,50 L40,45 L50,50 L60,60 L55,65 L45,70 L35,70 L25,65 Z' fill='${encodeURIComponent(patternColor)}'/%3E%3Ccircle cx='40' cy='50' r='3' fill='${encodeURIComponent(patternColor)}'/%3E%3C/svg%3E")`,
      backgroundSize: '80px 80px',
      backgroundRepeat: 'repeat',
      opacity: 0.5
    }
  }
}

/**
 * Create SVG pattern for dinosaur bones
 */
export const createBonesPatternSVG = (bgColor) => {
  const patternColor = getPatternColor(bgColor)
  const opacity = getPatternOpacity(bgColor)
  
  return `
    <pattern id="dino-bones-pattern" x="0" y="0" width="35" height="35" patternUnits="userSpaceOnUse">
      <rect width="35" height="35" fill="${bgColor}"/>
      <!-- Dinosaur bone -->
      <ellipse cx="17.5" cy="17.5" rx="10" ry="3" fill="${patternColor}" opacity="${opacity}"/>
      <circle cx="10" cy="17.5" r="2" fill="${patternColor}" opacity="${opacity}"/>
      <circle cx="25" cy="17.5" r="2" fill="${patternColor}" opacity="${opacity}"/>
      <!-- Second bone rotated -->
      <ellipse cx="17.5" cy="17.5" rx="3" ry="10" fill="${patternColor}" opacity="${opacity * 0.8}"/>
    </pattern>
  `
}

/**
 * Dinosaur bones pattern (legacy CSS version)
 */
export const createBonesPattern = (bgColor) => {
  const patternColor = getPatternColor(bgColor)
  return {
    type: 'bones',
    style: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='25' cy='25' rx='15' ry='5' fill='${encodeURIComponent(patternColor)}'/%3E%3Ccircle cx='15' cy='25' r='3' fill='${encodeURIComponent(patternColor)}'/%3E%3Ccircle cx='35' cy='25' r='3' fill='${encodeURIComponent(patternColor)}'/%3E%3C/svg%3E")`,
      backgroundSize: '50px 50px',
      backgroundRepeat: 'repeat',
      opacity: 0.4
    }
  }
}

/**
 * Create SVG pattern for dinosaur eggs
 */
export const createEggsPatternSVG = (bgColor) => {
  const patternColor = getPatternColor(bgColor)
  const opacity = getPatternOpacity(bgColor)
  
  return `
    <pattern id="dino-eggs-pattern" x="0" y="0" width="30" height="40" patternUnits="userSpaceOnUse">
      <rect width="30" height="40" fill="${bgColor}"/>
      <!-- Dinosaur egg -->
      <ellipse cx="15" cy="20" rx="6" ry="9" fill="${patternColor}" opacity="${opacity}"/>
      <!-- Second egg offset -->
      <ellipse cx="20" cy="8" rx="5" ry="7" fill="${patternColor}" opacity="${opacity * 0.8}"/>
      <!-- Third egg offset -->
      <ellipse cx="5" cy="32" rx="4.5" ry="6.5" fill="${patternColor}" opacity="${opacity * 0.7}"/>
    </pattern>
  `
}

/**
 * Dinosaur eggs pattern (legacy CSS version)
 */
export const createEggsPattern = (bgColor) => {
  const patternColor = getPatternColor(bgColor)
  return {
    type: 'eggs',
    style: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='50' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='20' cy='25' rx='8' ry='12' fill='${encodeURIComponent(patternColor)}'/%3E%3C/svg%3E")`,
      backgroundSize: '40px 50px',
      backgroundRepeat: 'repeat',
      opacity: 0.5
    }
  }
}

/**
 * Create SVG pattern for dinosaur scales
 */
export const createScalesPatternSVG = (bgColor) => {
  const patternColor = getPatternColor(bgColor)
  const opacity = getPatternOpacity(bgColor)
  
  return `
    <pattern id="dino-scales-pattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
      <rect width="25" height="25" fill="${bgColor}"/>
      <!-- Dinosaur scale -->
      <path d="M12.5,3 Q17,8 12.5,13 Q8,8 12.5,3" fill="${patternColor}" opacity="${opacity}"/>
      <!-- Second row offset -->
      <path d="M6.25,15.5 Q10.75,20.5 6.25,25.5 Q1.75,20.5 6.25,15.5" fill="${patternColor}" opacity="${opacity * 0.9}"/>
      <path d="M18.75,15.5 Q23.25,20.5 18.75,25.5 Q14.25,20.5 18.75,15.5" fill="${patternColor}" opacity="${opacity * 0.9}"/>
    </pattern>
  `
}

/**
 * Dinosaur scales pattern (legacy CSS version)
 */
export const createScalesPattern = (bgColor) => {
  const patternColor = getPatternColor(bgColor)
  return {
    type: 'scales',
    style: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15,5 Q20,10 15,15 Q10,10 15,5' fill='${encodeURIComponent(patternColor)}'/%3E%3C/svg%3E")`,
      backgroundSize: '30px 30px',
      backgroundRepeat: 'repeat',
      opacity: 0.6
    }
  }
}

/**
 * Get all available patterns
 */
export const BACKGROUND_PATTERNS = [
  { id: 'none', name: 'None', emoji: '🚫' },
  { id: 'footprints', name: 'Footprints', emoji: '👣' },
  { id: 'silhouettes', name: 'Silhouettes', emoji: '🦖' },
  { id: 'bones', name: 'Bones', emoji: '🦴' },
  { id: 'eggs', name: 'Eggs', emoji: '🥚' },
  { id: 'scales', name: 'Scales', emoji: '🐉' },
]

/**
 * Get pattern by ID (legacy CSS version)
 */
export const getPatternById = (patternId, bgColor) => {
  switch (patternId) {
    case 'footprints':
      return createFootprintPattern(bgColor)
    case 'silhouettes':
      return createSilhouettePattern(bgColor)
    case 'bones':
      return createBonesPattern(bgColor)
    case 'eggs':
      return createEggsPattern(bgColor)
    case 'scales':
      return createScalesPattern(bgColor)
    default:
      return null
  }
}

/**
 * Get SVG pattern by ID for QR code integration
 * Returns SVG pattern definition string
 */
export const getPatternSVGById = (patternId, bgColor) => {
  switch (patternId) {
    case 'footprints':
      return createFootprintPatternSVG(bgColor)
    case 'silhouettes':
      return createSilhouettePatternSVG(bgColor)
    case 'bones':
      return createBonesPatternSVG(bgColor)
    case 'eggs':
      return createEggsPatternSVG(bgColor)
    case 'scales':
      return createScalesPatternSVG(bgColor)
    case 'none':
      return null
    default:
      return null
  }
}

