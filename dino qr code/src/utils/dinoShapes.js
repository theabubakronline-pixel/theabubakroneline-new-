/**
 * Dinosaur Shape Modules for QR Code Integration
 * 
 * These functions create custom SVG shapes that replace standard QR code modules
 * while maintaining scannability. The shapes are designed to fit within the module grid
 * and preserve the essential QR code data structure.
 * 
 * IMPORTANT: We use high error correction (Level H) to ensure scannability
 * even when modules are replaced with custom shapes.
 */

/**
 * T-Rex shape - Creates a small T-Rex silhouette for QR modules
 * @param {number} size - Size of the module
 * @param {string} color - Color of the shape
 * @returns {string} SVG path string
 */
export const createTRexShape = (size, color) => {
  const center = size / 2
  const scale = size / 8
  // T-Rex - large head, tiny arms, powerful jaws - iconic predator design
  return `
    <g transform="translate(${center}, ${center}) scale(${scale})">
      <!-- Large powerful head -->
      <path d="M-1.5,1.5 L-0.5,0.5 L0.5,-0.5 L1.5,0 L2.5,0.5 L2,1.5 L1,2 L0,2 L-1,2 Z" 
            fill="${color}" opacity="1"/>
      <!-- Large eye -->
      <circle cx="0.8" cy="0.3" r="0.5" fill="${color}"/>
      <!-- Powerful jaws with visible teeth -->
      <path d="M-1,2 L-0.5,2.5 L0,2.3 L0.5,2.5 L1,2" stroke="${color}" stroke-width="0.4" fill="none" stroke-linecap="round"/>
      <path d="M-0.8,2.2 L-0.6,2.6" stroke="${color}" stroke-width="0.3" fill="none" stroke-linecap="round"/>
      <path d="M0.8,2.2 L0.6,2.6" stroke="${color}" stroke-width="0.3" fill="none" stroke-linecap="round"/>
      <!-- Tiny iconic arms -->
      <path d="M-1.5,1.2 L-2.2,0.8 L-2.5,0.3" stroke="${color}" stroke-width="0.5" fill="none" stroke-linecap="round"/>
      <circle cx="-2.5" cy="0.3" r="0.3" fill="${color}"/>
    </g>
  `
}

/**
 * Stegosaurus shape - Creates plates and body shape
 * @param {number} size - Size of the module
 * @param {string} color - Color of the shape
 * @returns {string} SVG path string
 */
export const createStegosaurusShape = (size, color) => {
  const center = size / 2
  const scale = size / 8
  // Stegosaurus - distinctive diamond-shaped back plates and spiked tail - unique herbivore design
  return `
    <g transform="translate(${center}, ${center}) scale(${scale})">
      <!-- Low, rounded body -->
      <ellipse cx="0" cy="0.8" rx="1.8" ry="1.2" fill="${color}" opacity="1"/>
      <!-- Distinctive diamond-shaped back plates in a row -->
      <path d="M-1.2,-0.5 L-0.8,-1.8 L-0.4,-0.5 Z" fill="${color}"/>
      <path d="M-0.4,-0.5 L0,-2.2 L0.4,-0.5 Z" fill="${color}"/>
      <path d="M0.4,-0.5 L0.8,-1.8 L1.2,-0.5 Z" fill="${color}"/>
      <!-- Spiked tail (thagomizer) -->
      <path d="M1.8,0.8 L2.8,1.2 L3.5,1" stroke="${color}" stroke-width="0.7" fill="none" stroke-linecap="round"/>
      <path d="M3.5,1 L3.8,0.5 L4,1.2" stroke="${color}" stroke-width="0.6" fill="none" stroke-linecap="round"/>
      <!-- Small head -->
      <circle cx="-1.5" cy="0.5" r="0.5" fill="${color}"/>
    </g>
  `
}

/**
 * Triceratops shape - Creates three-horned dinosaur shape
 * @param {number} size - Size of the module
 * @param {string} color - Color of the shape
 * @returns {string} SVG path string
 */
export const createTriceratopsShape = (size, color) => {
  const center = size / 2
  const scale = size / 8
  // Triceratops - three horns and large frill - unique ceratopsian design
  return `
    <g transform="translate(${center}, ${center}) scale(${scale})">
      <!-- Body -->
      <ellipse cx="0" cy="0.8" rx="1.5" ry="1" fill="${color}" opacity="1"/>
      <!-- Large distinctive frill -->
      <path d="M-1.2,0.2 Q0,-1.2 1.2,0.2" stroke="${color}" stroke-width="0.8" fill="${color}" opacity="0.9"/>
      <!-- Three prominent horns -->
      <path d="M-0.8,0 L-0.8,-1.5 L-0.5,-2.2" stroke="${color}" stroke-width="0.8" fill="none" stroke-linecap="round"/>
      <path d="M0,0 L0,-1.8 L0,-2.5" stroke="${color}" stroke-width="0.9" fill="none" stroke-linecap="round"/>
      <path d="M0.8,0 L0.8,-1.5 L0.5,-2.2" stroke="${color}" stroke-width="0.8" fill="none" stroke-linecap="round"/>
      <!-- Beak -->
      <path d="M-1.2,1 L-1.8,1.2" stroke="${color}" stroke-width="0.6" fill="none" stroke-linecap="round"/>
    </g>
  `
}

/**
 * Brontosaurus shape - Creates long-necked dinosaur
 * @param {number} size - Size of the module
 * @param {string} color - Color of the shape
 * @returns {string} SVG path string
 */
export const createBrontosaurusShape = (size, color) => {
  const center = size / 2
  const scale = size / 8
  // Brontosaurus with very long neck and small head - unique sauropod design
  return `
    <g transform="translate(${center}, ${center}) scale(${scale})">
      <!-- Large body -->
      <ellipse cx="0" cy="1" rx="2" ry="1.5" fill="${color}" opacity="1"/>
      <!-- Very long curved neck -->
      <path d="M-0.5,0 Q-1,-1.5 -1.5,-2.5 Q-2,-3.5 -2.5,-4.5" stroke="${color}" stroke-width="1" fill="none" stroke-linecap="round"/>
      <!-- Small head at end of neck -->
      <circle cx="-2.5" cy="-4.5" r="0.8" fill="${color}"/>
      <!-- Long tail -->
      <path d="M2,1.5 Q3,2.5 4,3.5" stroke="${color}" stroke-width="0.8" fill="none" stroke-linecap="round"/>
    </g>
  `
}

/**
 * Raptor shape - Creates small, agile dinosaur shape
 * @param {number} size - Size of the module
 * @param {string} color - Color of the shape
 * @returns {string} SVG path string
 */
export const createRaptorShape = (size, color) => {
  const center = size / 2
  const scale = size / 8
  // Raptor with distinctive large claw and lean body - unique design
  return `
    <g transform="translate(${center}, ${center}) scale(${scale})">
      <!-- Body - leaner, more agile -->
      <ellipse cx="0" cy="0" rx="1.2" ry="1.8" fill="${color}" opacity="1"/>
      <!-- Large distinctive claw on foot -->
      <path d="M-1.5,2.2 L-2.2,1.5 L-3,0.8 L-3.5,0.3" stroke="${color}" stroke-width="1" fill="none" stroke-linecap="round"/>
      <path d="M-3.5,0.3 L-3.8,0 L-4,0.2" stroke="${color}" stroke-width="0.8" fill="none" stroke-linecap="round"/>
      <!-- Second claw -->
      <path d="M1.5,2.2 L2.2,1.5 L3,0.8" stroke="${color}" stroke-width="0.8" fill="none" stroke-linecap="round"/>
      <!-- Eye - larger -->
      <circle cx="0.3" cy="-0.5" r="0.6" fill="${color}"/>
      <!-- Small head crest -->
      <path d="M0.3,-1.2 L0.5,-1.8" stroke="${color}" stroke-width="0.5" fill="none" stroke-linecap="round"/>
    </g>
  `
}

/**
 * Pterodactyl shape - Creates flying dinosaur shape
 * @param {number} size - Size of the module
 * @param {string} color - Color of the shape
 * @returns {string} SVG path string
 */
export const createPterodactylShape = (size, color) => {
  const center = size / 2
  const scale = size / 8
  // Pterodactyl - flying reptile with large wings and long head crest - unique flying design
  return `
    <g transform="translate(${center}, ${center}) scale(${scale})">
      <!-- Small body -->
      <ellipse cx="0" cy="0" rx="0.6" ry="0.9" fill="${color}" opacity="1"/>
      <!-- Large distinctive wings spread wide -->
      <path d="M-0.6,0 Q-2,-1.5 -3.5,-2.5 Q-4,-3 -4.5,-3.5" stroke="${color}" stroke-width="0.9" fill="none" stroke-linecap="round"/>
      <path d="M-0.6,0 Q-2,1.5 -3.5,2.5 Q-4,3 -4.5,3.5" stroke="${color}" stroke-width="0.9" fill="none" stroke-linecap="round"/>
      <path d="M0.6,0 Q2,-1.5 3.5,-2.5 Q4,-3 4.5,-3.5" stroke="${color}" stroke-width="0.9" fill="none" stroke-linecap="round"/>
      <path d="M0.6,0 Q2,1.5 3.5,2.5 Q4,3 4.5,3.5" stroke="${color}" stroke-width="0.9" fill="none" stroke-linecap="round"/>
      <!-- Long head with crest -->
      <path d="M0,-0.9 L0,-2 L-0.5,-2.8" stroke="${color}" stroke-width="0.7" fill="none" stroke-linecap="round"/>
      <path d="M-0.5,-2.8 L-0.8,-3.5" stroke="${color}" stroke-width="0.5" fill="none" stroke-linecap="round"/>
    </g>
  `
}

/**
 * Spinosaurus shape - Creates sail-backed dinosaur
 * @param {number} size - Size of the module
 * @param {string} color - Color of the shape
 * @returns {string} SVG path string
 */
export const createSpinosaurusShape = (size, color) => {
  const center = size / 2
  const scale = size / 8
  // Spinosaurus with large distinctive sail/spine - unique feature
  return `
    <g transform="translate(${center}, ${center}) scale(${scale})">
      <!-- Body -->
      <ellipse cx="0" cy="0.5" rx="1.8" ry="1.3" fill="${color}" opacity="1"/>
      <!-- Large distinctive sail/spine on back -->
      <path d="M-0.8,0 L-0.8,-2.5 L0,-3.2 L0.8,-2.5 L0.8,0" stroke="${color}" stroke-width="1" fill="${color}" opacity="0.9"/>
      <!-- Sail spines/vertebrae -->
      <path d="M-0.6,-1.5 L-0.6,-2.8" stroke="${color}" stroke-width="0.5" fill="none"/>
      <path d="M0,-1.8 L0,-3.2" stroke="${color}" stroke-width="0.6" fill="none"/>
      <path d="M0.6,-1.5 L0.6,-2.8" stroke="${color}" stroke-width="0.5" fill="none"/>
      <!-- Crocodile-like snout -->
      <path d="M1.8,0.5 L2.5,0.3 L3,0 L3.2,-0.2" stroke="${color}" stroke-width="0.7" fill="none" stroke-linecap="round"/>
    </g>
  `
}

/**
 * Ankylosaurus shape - Creates armored dinosaur
 * @param {number} size - Size of the module
 * @param {string} color - Color of the shape
 * @returns {string} SVG path string
 */
export const createAnkylosaurusShape = (size, color) => {
  const center = size / 2
  const scale = size / 8
  // Ankylosaurus - heavily armored with distinctive tail club - unique tank-like design
  return `
    <g transform="translate(${center}, ${center}) scale(${scale})">
      <!-- Low, wide armored body -->
      <ellipse cx="0" cy="0.8" rx="2" ry="1.2" fill="${color}" opacity="1"/>
      <!-- Armor plates/spikes on back -->
      <rect x="-1.2" y="-0.5" width="0.5" height="1.2" fill="${color}" rx="0.2"/>
      <rect x="-0.3" y="-0.8" width="0.6" height="1.5" fill="${color}" rx="0.2"/>
      <rect x="0.7" y="-0.5" width="0.5" height="1.2" fill="${color}" rx="0.2"/>
      <!-- Distinctive tail club - large and heavy -->
      <path d="M2,0.8 L3,0.8 L3.5,0.5" stroke="${color}" stroke-width="0.9" fill="none" stroke-linecap="round"/>
      <circle cx="3.5" cy="0.5" r="0.8" fill="${color}"/>
      <!-- Small head -->
      <circle cx="-1.8" cy="0.5" r="0.6" fill="${color}"/>
    </g>
  `
}

/**
 * Velociraptor shape - Creates fast, agile dinosaur
 * @param {number} size - Size of the module
 * @param {string} color - Color of the shape
 * @returns {string} SVG path string
 */
export const createVelociraptorShape = (size, color) => {
  const center = size / 2
  const scale = size / 8
  // Velociraptor - fast runner with distinctive posture and tail - different from Raptor
  return `
    <g transform="translate(${center}, ${center}) scale(${scale})">
      <!-- Body - horizontal, running pose -->
      <ellipse cx="0" cy="0.5" rx="1.5" ry="1" fill="${color}" opacity="1"/>
      <!-- Long stiff tail for balance -->
      <path d="M-1.5,0.5 L-2.5,0.5 L-3.5,0.3 L-4.5,0" stroke="${color}" stroke-width="0.9" fill="none" stroke-linecap="round"/>
      <!-- Head with snout -->
      <path d="M1.5,0.5 L2.5,0.3 L3,0 L3.2,-0.3" stroke="${color}" stroke-width="0.8" fill="none" stroke-linecap="round"/>
      <circle cx="2.2" cy="0.1" r="0.5" fill="${color}"/>
      <!-- Eye -->
      <circle cx="2.3" cy="0" r="0.3" fill="${color}"/>
      <!-- Raised foot - running pose -->
      <path d="M1,1.5 L1.5,2 L2,1.8" stroke="${color}" stroke-width="0.7" fill="none" stroke-linecap="round"/>
    </g>
  `
}

/**
 * Diplodocus shape - Creates long-tailed dinosaur
 * @param {number} size - Size of the module
 * @param {string} color - Color of the shape
 * @returns {string} SVG path string
 */
export const createDiplodocusShape = (size, color) => {
  const center = size / 2
  const scale = size / 8
  // Diplodocus - very long neck and very long tail, different from Brontosaurus
  return `
    <g transform="translate(${center}, ${center}) scale(${scale})">
      <!-- Medium body -->
      <ellipse cx="0" cy="0.5" rx="1.5" ry="1.2" fill="${color}" opacity="1"/>
      <!-- Very long, straight neck -->
      <path d="M-0.8,0 Q-1.2,-1 -1.5,-2 Q-1.8,-3 -2,-4" stroke="${color}" stroke-width="0.9" fill="none" stroke-linecap="round"/>
      <!-- Small head -->
      <circle cx="-2" cy="-4" r="0.6" fill="${color}"/>
      <!-- Very long, thin tail - distinctive feature -->
      <path d="M1.5,0.5 L2.5,1 L3.5,1.5 L4.5,2 L5.5,2.5" stroke="${color}" stroke-width="0.7" fill="none" stroke-linecap="round"/>
      <!-- Tail tip -->
      <path d="M5.5,2.5 L6,3" stroke="${color}" stroke-width="0.6" fill="none" stroke-linecap="round"/>
    </g>
  `
}

/**
 * Get the appropriate dinosaur shape function based on template ID
 * @param {string} templateId - ID of the dinosaur template
 * @returns {Function} Shape creation function
 */
export const getDinoShapeFunction = (templateId) => {
  const shapeMap = {
    'trex': createTRexShape,
    'stegosaurus': createStegosaurusShape,
    'triceratops': createTriceratopsShape,
    'brontosaurus': createBrontosaurusShape,
    'raptor': createRaptorShape,
    'pterodactyl': createPterodactylShape,
    'spinosaurus': createSpinosaurusShape,
    'ankylosaurus': createAnkylosaurusShape,
    'velociraptor': createVelociraptorShape,
    'diplodocus': createDiplodocusShape,
  }
  return shapeMap[templateId] || createTRexShape
}

/**
 * Helper function to get a darker/lighter contrasting color for patterns
 */
const getPatternColor = (backgroundColor) => {
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  
  // If background is light, use darker pattern; if dark, use lighter pattern
  if (brightness > 128) {
    // Light background - use darker pattern (reduce by 30%)
    return `rgb(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)})`
  } else {
    // Dark background - use lighter pattern (increase by 30%)
    return `rgb(${Math.min(255, r + 30)}, ${Math.min(255, g + 30)}, ${Math.min(255, b + 30)})`
  }
}

/**
 * Create background pattern for QR code based on dinosaur type
 * @param {string} patternType - Type of pattern (roar, plates, horns, etc.)
 * @param {string} backgroundColor - Background color
 * @returns {string} SVG pattern definition
 */
export const createDinoBackgroundPattern = (patternType, backgroundColor) => {
  const patternColor = getPatternColor(backgroundColor)
  
  const patterns = {
    'roar': `
      <pattern x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <rect width="24" height="24" fill="${backgroundColor}"/>
        <circle cx="12" cy="12" r="1.5" fill="${patternColor}" opacity="0.25"/>
        <circle cx="6" cy="6" r="1" fill="${patternColor}" opacity="0.2"/>
        <circle cx="18" cy="18" r="1" fill="${patternColor}" opacity="0.2"/>
        <circle cx="6" cy="18" r="0.8" fill="${patternColor}" opacity="0.15"/>
        <circle cx="18" cy="6" r="0.8" fill="${patternColor}" opacity="0.15"/>
      </pattern>
    `,
    'plates': `
      <pattern x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
        <rect width="18" height="18" fill="${backgroundColor}"/>
        <rect x="0" y="0" width="2.5" height="18" fill="${patternColor}" opacity="0.2"/>
        <rect x="7.5" y="0" width="2.5" height="18" fill="${patternColor}" opacity="0.2"/>
        <rect x="15" y="0" width="2.5" height="18" fill="${patternColor}" opacity="0.2"/>
        <rect x="3.75" y="0" width="1" height="18" fill="${patternColor}" opacity="0.15"/>
        <rect x="11.25" y="0" width="1" height="18" fill="${patternColor}" opacity="0.15"/>
      </pattern>
    `,
    'horns': `
      <pattern x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <rect width="16" height="16" fill="${backgroundColor}"/>
        <path d="M8,0 L10,5 L8,10 L6,5 Z" fill="${patternColor}" opacity="0.25"/>
        <path d="M0,8 L5,10 L10,8 L5,6 Z" fill="${patternColor}" opacity="0.2"/>
        <path d="M8,2 L9,4 L8,6 L7,4 Z" fill="${patternColor}" opacity="0.15"/>
        <path d="M2,8 L4,9 L6,8 L4,7 Z" fill="${patternColor}" opacity="0.15"/>
      </pattern>
    `,
    'neck': `
      <pattern x="0" y="0" width="14" height="28" patternUnits="userSpaceOnUse">
        <rect width="14" height="28" fill="${backgroundColor}"/>
        <ellipse cx="7" cy="7" rx="3" ry="1.5" fill="${patternColor}" opacity="0.2"/>
        <ellipse cx="7" cy="21" rx="3" ry="1.5" fill="${patternColor}" opacity="0.2"/>
        <ellipse cx="7" cy="14" rx="2" ry="1" fill="${patternColor}" opacity="0.15"/>
      </pattern>
    `,
    'claws': `
      <pattern x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="${backgroundColor}"/>
        <path d="M0,0 L3,3 L0,6" stroke="${patternColor}" stroke-width="1" opacity="0.3" fill="none"/>
        <path d="M12,0 L9,3 L12,6" stroke="${patternColor}" stroke-width="1" opacity="0.3" fill="none"/>
        <path d="M0,6 L2,8 L0,10" stroke="${patternColor}" stroke-width="0.8" opacity="0.25" fill="none"/>
        <path d="M12,6 L10,8 L12,10" stroke="${patternColor}" stroke-width="0.8" opacity="0.25" fill="none"/>
        <circle cx="2" cy="3" r="0.5" fill="${patternColor}" opacity="0.2"/>
        <circle cx="10" cy="3" r="0.5" fill="${patternColor}" opacity="0.2"/>
      </pattern>
    `,
    'wings': `
      <pattern x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="${backgroundColor}"/>
        <path d="M0,10 Q10,0 20,10" stroke="${patternColor}" stroke-width="1" opacity="0.25" fill="none"/>
        <path d="M0,10 Q10,20 20,10" stroke="${patternColor}" stroke-width="1" opacity="0.25" fill="none"/>
        <path d="M5,10 Q10,5 15,10" stroke="${patternColor}" stroke-width="0.8" opacity="0.2" fill="none"/>
        <path d="M5,10 Q10,15 15,10" stroke="${patternColor}" stroke-width="0.8" opacity="0.2" fill="none"/>
      </pattern>
    `,
    'sail': `
      <pattern x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <rect width="16" height="16" fill="${backgroundColor}"/>
        <line x1="8" y1="0" x2="8" y2="16" stroke="${patternColor}" stroke-width="1" opacity="0.25"/>
        <line x1="0" y1="8" x2="16" y2="8" stroke="${patternColor}" stroke-width="1" opacity="0.25"/>
        <line x1="4" y1="0" x2="4" y2="16" stroke="${patternColor}" stroke-width="0.6" opacity="0.15"/>
        <line x1="12" y1="0" x2="12" y2="16" stroke="${patternColor}" stroke-width="0.6" opacity="0.15"/>
        <line x1="0" y1="4" x2="16" y2="4" stroke="${patternColor}" stroke-width="0.6" opacity="0.15"/>
        <line x1="0" y1="12" x2="16" y2="12" stroke="${patternColor}" stroke-width="0.6" opacity="0.15"/>
      </pattern>
    `,
    'armor': `
      <pattern x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
        <rect width="14" height="14" fill="${backgroundColor}"/>
        <circle cx="7" cy="7" r="2" fill="${patternColor}" opacity="0.25"/>
        <circle cx="3" cy="3" r="1" fill="${patternColor}" opacity="0.2"/>
        <circle cx="11" cy="11" r="1" fill="${patternColor}" opacity="0.2"/>
        <circle cx="3" cy="11" r="0.8" fill="${patternColor}" opacity="0.18"/>
        <circle cx="11" cy="3" r="0.8" fill="${patternColor}" opacity="0.18"/>
      </pattern>
    `,
    'speed': `
      <pattern x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="${backgroundColor}"/>
        <line x1="0" y1="0" x2="12" y2="12" stroke="${patternColor}" stroke-width="0.8" opacity="0.25"/>
        <line x1="0" y1="6" x2="12" y2="18" stroke="${patternColor}" stroke-width="0.8" opacity="0.25"/>
        <line x1="0" y1="3" x2="9" y2="12" stroke="${patternColor}" stroke-width="0.5" opacity="0.2"/>
        <line x1="0" y1="9" x2="9" y2="18" stroke="${patternColor}" stroke-width="0.5" opacity="0.2"/>
      </pattern>
    `,
    'tail': `
      <pattern x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
        <rect width="18" height="18" fill="${backgroundColor}"/>
        <path d="M0,9 Q9,0 18,9" stroke="${patternColor}" stroke-width="1" opacity="0.25" fill="none"/>
        <path d="M0,9 Q9,18 18,9" stroke="${patternColor}" stroke-width="1" opacity="0.25" fill="none"/>
        <path d="M2,9 Q9,2 16,9" stroke="${patternColor}" stroke-width="0.8" opacity="0.2" fill="none"/>
        <path d="M2,9 Q9,16 16,9" stroke="${patternColor}" stroke-width="0.8" opacity="0.2" fill="none"/>
      </pattern>
    `,
  }
  return patterns[patternType] || patterns['roar']
}

