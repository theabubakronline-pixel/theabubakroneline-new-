# 🦖 Dinosaur Shapes Integration Guide

## Overview

This document explains how dinosaur shapes are integrated into the QR code pattern while maintaining full scannability.

## Architecture

### Key Files

1. **`src/utils/dinoShapes.js`** - Contains all dinosaur shape definitions
2. **`src/components/DinoQRCode.jsx`** - Main component that integrates shapes into QR codes
3. **`src/components/PreviewSection.jsx`** - Displays the QR code with integrated shapes

## How It Works

### 1. QR Code Generation

The QR code is generated using `qrcode.react` with:
- **Error Correction Level H**: Provides ~30% error correction capacity
- **Standard QR Structure**: Includes finder patterns, timing patterns, and data modules

### 2. Shape Integration Process

After the QR code SVG is rendered, the `DinoQRCode` component:

1. **Extracts Module Positions**: Reads all `<path>` elements from the SVG (each represents a QR module)
2. **Calculates Module Size**: Determines the size of each module from the path coordinates
3. **Selects Modules for Replacement**: Uses a pattern to select which modules to replace:
   - Skips the first 30 modules (finder patterns and timing patterns)
   - Replaces every 8th module (`index % 8 === 0`)
   - This ensures data integrity while adding visual interest

4. **Creates Dinosaur Shapes**: For each selected module:
   - Creates a new SVG group at the module's position
   - Adds a background rectangle (maintains module visibility)
   - Overlays the dinosaur shape using the template's shape function

### 3. Scannability Guarantees

The implementation ensures scannability through:

- **High Error Correction**: Level H allows up to 30% module corruption
- **Strategic Replacement**: Only ~12.5% of modules are replaced (every 8th module)
- **Pattern Preservation**: Finder patterns, timing patterns, and alignment patterns remain untouched
- **Data Integrity**: The replacement pattern is carefully chosen to preserve essential data

## Adding New Dinosaur Shapes

### Step 1: Create Shape Function

In `src/utils/dinoShapes.js`, add a new function:

```javascript
export const createYourDinoShape = (size, color) => {
  const scale = size / 10
  return `
    <g transform="scale(${scale})">
      <!-- Your SVG path here -->
      <path d="M2,8 L3,7..." fill="${color}" opacity="0.9"/>
    </g>
  `
}
```

### Step 2: Add to Shape Map

Update the `getDinoShapeFunction` function:

```javascript
const shapeMap = {
  // ... existing shapes
  'yourdino': createYourDinoShape,
}
```

### Step 3: Add Template

In `src/App.jsx`, add to `DINOSAUR_TEMPLATES`:

```javascript
{ id: 'yourdino', name: 'Your Dino', emoji: '🦖', color: 'from-color-500 to-color-600' }
```

## Shape Design Guidelines

When creating new dinosaur shapes:

1. **Size**: Shapes should fit within a 10x10 coordinate system (scaled by `size/10`)
2. **Visibility**: Use opacity 0.8-0.9 for good visibility
3. **Simplicity**: Keep shapes simple - they'll be small in the QR code
4. **Color**: Use the provided `color` parameter for consistency
5. **SVG Format**: Return valid SVG `<g>` element with transform

## Customization Options

### Changing Replacement Pattern

In `src/components/DinoQRCode.jsx`, modify the `addDinoShapesToQR` function:

```javascript
// Current: every 8th module
if (index > 30 && index % 8 === 0) {
  // Replace module
}

// More frequent: every 6th module
if (index > 30 && index % 6 === 0) {
  // Replace module (more shapes, less scannability margin)
}

// Less frequent: every 10th module
if (index > 30 && index % 10 === 0) {
  // Replace module (fewer shapes, more scannability margin)
}
```

### Changing Error Correction Level

In `src/components/DinoQRCode.jsx`:

```javascript
<QRCodeSVG
  level="H" // Options: L (7%), M (15%), Q (25%), H (30%)
  // ...
/>
```

**Warning**: Lower error correction levels may reduce scannability with custom shapes.

## Testing Scannability

To ensure your QR codes remain scannable:

1. **Test with Multiple Scanners**: Use different QR code scanner apps
2. **Test Different Sizes**: Try downloading and scanning at various sizes
3. **Test Different Colors**: Ensure shapes are visible but don't break scanning
4. **Test Edge Cases**: Very short URLs, very long URLs, special characters

## Performance Considerations

- Shape integration happens after initial render (useEffect)
- Shapes are added to a separate SVG group for easy removal/updates
- The process is optimized to only process selected modules
- SVG manipulation is efficient for the number of modules replaced

## Troubleshooting

### Shapes Not Appearing

- Check browser console for errors
- Verify shape function returns valid SVG
- Ensure template ID matches shape map key
- Check that modules are being selected (index > 30 && index % 8 === 0)

### QR Code Not Scannable

- Reduce replacement frequency (increase modulo number)
- Increase error correction level
- Simplify dinosaur shapes
- Check that finder patterns aren't being modified

### Download Issues

- Ensure SVG includes the dinosaur shapes group
- Check that cloned SVG preserves all elements
- Verify canvas rendering includes all SVG elements

## Future Enhancements

Potential improvements:

1. **Animated Shapes**: Add CSS animations to shapes
2. **Shape Density Slider**: Let users control replacement frequency
3. **Multiple Shape Types**: Mix different shapes in one QR code
4. **Gradient Shapes**: Apply gradients to individual shapes
5. **Shape Patterns**: Different placement patterns (spiral, grid, random)

---

For questions or contributions, see the main README.md file.

