# 🦖 Dino QR Code Generator

A beautiful, interactive React web application for creating stunning dinosaur-themed QR codes with fully visible dinosaur shapes integrated directly into the QR pattern. Built with React, Vite, Tailwind CSS, and enhanced with smooth animations.

## ✨ Features

### 🎯 Core Features
- **User Input**: Enter any URL or text with real-time validation
- **Dinosaur-Shaped QR Codes**: **Fully visible dinosaur shapes integrated directly into the QR code pattern** - not just overlays! The shapes replace certain modules while maintaining full scannability
- **10 Unique Dinosaur Templates**: Choose from T-Rex, Stegosaurus, Triceratops, Brontosaurus, Raptor, Pterodactyl, Spinosaurus, Ankylosaurus, Velociraptor, and Diplodocus - each with unique shapes and background patterns
- **Color Customization**: Customize both foreground and background colors with presets or custom color pickers
- **Real-time Preview**: See your QR code update instantly as you type and customize
- **Fully Scannable**: Uses high error correction (Level H - 30%) to ensure QR codes remain scannable even with custom dinosaur shapes
- **Perfect Download Matching**: Downloads (PNG/SVG) match the live preview exactly using `html-to-image` library
- **Copy to Clipboard**: Quickly copy your URL/text to clipboard with visual feedback
- **Social Sharing**: Share on Twitter, LinkedIn, or get instructions for Instagram
- **Real-time Scannability Feedback**: Visual indicators showing QR code is fully scannable

### 🎨 Design & UX
- **Modern Aesthetic**: Clean, minimalistic design with gradient backgrounds and glassmorphism effects
- **Smooth Animations**: 
  - Hover effects on dinosaur templates with lift and scale animations
  - Color picker buttons with scale animations
  - Floating background dinosaur emojis
  - Smooth fade-in animations for cards
  - QR code container hover effects
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **SEO Optimized**: Includes proper meta tags for search engines

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download this repository**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## 📦 Deployment - Make Your Site Live!

### 🚀 Quick Deploy (Easiest - No Code Required!)

#### Option 1: Vercel (Recommended - 2 Minutes)

**Web Interface (Easiest):**
1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click "Add New Project"
3. **Option A:** Drag & drop your `dist` folder (after running `npm run build`)
   **Option B:** Connect your GitHub repository
4. Click "Deploy"
5. Done! Your site is live! 🎉

**CLI Method:**
```bash
npm i -g vercel
vercel
```

#### Option 2: Netlify (Also Easy - 1 Minute)

**Web Interface:**
1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. Drag & drop your `dist` folder directly onto Netlify dashboard
3. Done! Your site is live! 🎉

**CLI Method:**
```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

#### Option 3: GitHub Pages (Free with GitHub)

1. Push your code to GitHub
2. Go to repository → Settings → Pages
3. Source: Deploy from branch → `main` → `/ (root)`
4. Build first:
   ```bash
   npm run build
   ```
5. Copy `dist` folder contents to root
6. Your site: `https://yourusername.github.io/repository-name`

#### Option 4: Any Web Host (Manual)

1. Build your project:
   ```bash
   npm run build
   ```
2. Upload the `dist` folder contents to your web host
3. Ensure `index.html` is in the root directory
4. Done!

### 📋 Pre-Deployment Steps

1. **Test the build:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Verify everything works:**
   - Generate a QR code
   - Test downloads (PNG & SVG)
   - Test all dinosaur templates
   - Test on mobile

3. **Deploy using one of the options above**

### 🔗 After Deployment

- ✅ Your site is live!
- ✅ Share the URL with friends
- ✅ Add custom domain (optional)
- ✅ Monitor analytics (Vercel/Netlify provide this)

**For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **qrcode.react** - QR code generation library
- **html-to-image** - Perfect preview-to-download matching
- **PostCSS** - CSS processing

## 📁 Project Structure

```
dino-qr-code-generator/
├── src/
│   ├── components/
│   │   ├── InputField.jsx          # Input field with validation
│   │   ├── DinoTemplateSelector.jsx # Dinosaur template selector with animations
│   │   ├── ColorCustomizer.jsx      # Color customization controls
│   │   ├── PreviewSection.jsx      # Real-time QR code preview
│   │   ├── DownloadShareButtons.jsx # Download and share functionality
│   │   └── DinoQRCode.jsx          # QR code with integrated dinosaur shapes
│   ├── utils/
│   │   └── dinoShapes.js           # Dinosaur shape SVG generators
│   ├── App.jsx                      # Main application component
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Global styles with Tailwind and animations
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS configuration
└── postcss.config.js                # PostCSS configuration
```

## 🎨 Customization

### Adding New Dinosaur Templates

To add a new dinosaur template with custom shapes:

1. **Add the template to `src/App.jsx`**:
```javascript
{ id: 'newdino', name: 'New Dino', emoji: '🦕', color: 'from-color-500 to-color-600', pattern: 'patternname' }
```

2. **Create a shape function in `src/utils/dinoShapes.js`**:
```javascript
export const createNewDinoShape = (size, color) => {
  const center = size / 2
  const scale = size / 8
  return `
    <g transform="translate(${center}, ${center}) scale(${scale})">
      <path d="M-2,2 L-1,1 L0,0..." fill="${color}" opacity="1"/>
      <!-- Add your custom SVG path here -->
    </g>
  `
}
```

3. **Add it to the shape map**:
```javascript
const shapeMap = {
  // ... existing shapes
  'newdino': createNewDinoShape,
}
```

4. **Add background pattern** (optional):
```javascript
// In createDinoBackgroundPattern function
'patternname': `
  <pattern x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
    <rect width="20" height="20" fill="${backgroundColor}"/>
    <!-- Your pattern elements -->
  </pattern>
`
```

### Changing Default Colors

Modify the initial state in `src/App.jsx`:

```javascript
const [foregroundColor, setForegroundColor] = useState('#YOUR_COLOR')
const [backgroundColor, setBackgroundColor] = useState('#YOUR_COLOR')
```

### Customizing Animations

Edit `src/index.css` to modify animation timings, effects, or add new animations:

```css
.dino-template-card:hover {
  transform: translateY(-6px) scale(1.05);
  /* Customize your hover effect */
}
```

### Customizing Tailwind Theme

Edit `tailwind.config.js` to extend the theme with custom colors, fonts, or animations.

## 🦖 How Dinosaur Shapes Are Integrated

The dinosaur shapes are **visually integrated into the QR code pattern itself**, not just overlaid. Here's how it works:

1. **QR Code Generation**: A standard QR code is generated with high error correction (Level H - 30% error correction)
2. **Strategic Module Replacement**: Dinosaur shapes replace modules in a pattern (every 8th module after the first 30)
3. **Shape Integration**: 
   - Shapes are centered and scaled to fit within modules
   - Background rectangles maintain module visibility
   - Shapes use full opacity for maximum visibility
4. **Scannability Maintained**: 
   - Finder patterns and timing patterns remain untouched
   - Only data modules are modified
   - High error correction allows up to 30% module corruption while remaining scannable
   - The replacement pattern is carefully chosen to preserve data integrity

**Code Locations**: 
- Shape integration: `src/components/DinoQRCode.jsx` - `addDinoShapesToQR()` function
- Shape definitions: `src/utils/dinoShapes.js` - Individual shape functions
- Background patterns: `src/utils/dinoShapes.js` - `createDinoBackgroundPattern()` function

## 📥 Download Functionality

The download feature uses `html-to-image` library to capture exactly what the user sees in the preview:

- **PNG Download**: Captures the entire QR code container with all shapes, colors, and styles
- **SVG Download**: Exports the SVG with all dinosaur shapes and patterns included
- **Perfect Matching**: Downloads match the live preview pixel-perfectly
- **High Resolution**: PNG downloads use 2x pixel ratio for crisp images

## 🎬 Animations

The application includes smooth, non-intrusive animations:

- **Hover Effects**: Cards lift and scale on hover
- **Color Pickers**: Scale animation on hover
- **Dinosaur Templates**: Lift, scale, and shadow effects
- **Background Elements**: Floating dinosaur emojis
- **Fade-in**: Smooth entrance animations for cards
- **QR Container**: Subtle scale on hover

All animations are optimized for performance and don't interfere with QR code scannability.

## 🚀 Future Enhancements

Here are some ideas for future improvements:

1. **More Dinosaur Templates**: Add more dinosaur species with unique shape designs
2. **Animated Dinosaur Shapes**: Add subtle animations to the shapes themselves
3. **Shape Density Control**: Let users control how many modules are replaced
4. **Logo Upload**: Allow users to add their own logo in the center
5. **QR Code Size Options**: Add size presets (small, medium, large, custom)
6. **Batch Generation**: Generate multiple QR codes at once
7. **QR Code History**: Save recently generated QR codes locally
8. **Analytics**: Track QR code scans (requires backend)
9. **Custom Dinosaur Art**: Replace simple shapes with more detailed SVG illustrations
10. **Export Formats**: Add PDF export option
11. **Shape Patterns**: Different patterns for shape placement (grid, spiral, random)
12. **Gradient Shapes**: Apply gradients to the dinosaur shapes themselves
13. **QR Code Testing**: Built-in scanner to test QR codes before downloading

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- QR Code generation by [qrcode.react](https://www.npmjs.com/package/qrcode.react)
- Image capture by [html-to-image](https://www.npmjs.com/package/html-to-image)
- Icons and emojis from Unicode

---

Made with ❤️ and 🦖 | Happy QR Code Generating!
