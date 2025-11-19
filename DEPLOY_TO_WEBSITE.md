# 🚀 Deploy to theabubakronline.com/tool/dino-qr-code-generator

This guide will help you deploy the Dino QR Code Generator to your website and set up a workflow for future updates.

## 📋 Quick Deployment Steps

### Step 1: Copy Built Files to Your Website Repository

1. **Navigate to your website repository** (the separate folder/repo for theabubakronline.com)

2. **Create the folder structure:**
   ```
   your-website-repo/
   └── tool/
       └── dino-qr-code-generator/
   ```

3. **Copy ALL contents from this project's `dist` folder** to `tool/dino-qr-code-generator/` in your website repo

   **What to copy:**
   - `index.html`
   - `assets/` folder (with all JS and CSS files)

   **File structure should look like:**
   ```
   your-website-repo/
   └── tool/
       └── dino-qr-code-generator/
           ├── index.html
           └── assets/
               ├── index-XXXXX.js
               └── index-XXXXX.css
   ```

### Step 2: Commit and Push to Your Website Repository

```bash
cd path/to/your-website-repo
git add tool/dino-qr-code-generator/
git commit -m "Add Dino QR Code Generator tool"
git push
```

### Step 3: Test the Deployment

Visit: `https://theabubakronline.com/tool/dino-qr-code-generator`

**Verify:**
- ✅ Page loads correctly
- ✅ QR code generates
- ✅ Downloads work (PNG & SVG)
- ✅ All dinosaur templates work
- ✅ No console errors (check browser DevTools)

---

## 🔄 Update Workflow (For Future Changes)

When you make changes to this QR Code Generator project and want to update your website:

### Step 1: Make Changes in This Project
- Edit files in this repository as needed
- Test locally with `npm run dev`

### Step 2: Rebuild the Project
```bash
# In this project directory
npm run build
```

This creates a fresh `dist` folder with updated files.

### Step 3: Copy Updated Files to Your Website
1. **Delete the old files** from your website repo:
   ```bash
   cd path/to/your-website-repo
   rm -rf tool/dino-qr-code-generator/*
   # Or manually delete the contents
   ```

2. **Copy new files** from this project's `dist` folder to `tool/dino-qr-code-generator/` in your website repo

3. **Commit and push:**
   ```bash
   git add tool/dino-qr-code-generator/
   git commit -m "Update Dino QR Code Generator"
   git push
   ```

### Step 4: Verify Update
- Visit the URL again
- Test all features
- Check browser console for errors

---

## 🔗 Add Link to Your Tools Page

Add this HTML to your tools page (`tool/index.html` or wherever your tools page is):

```html
<a href="/tool/dino-qr-code-generator/" class="tool-link">
  <div class="tool-card">
    <span class="tool-icon">🦖</span>
    <h3>Dino QR Code Generator</h3>
    <p>Create custom dinosaur-themed QR codes with unique shapes</p>
  </div>
</a>
```

### Optional: Add Some Styling

If you want to style the link, add this CSS (adjust to match your site's design):

```css
.tool-link {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}

.tool-link:hover {
  transform: translateY(-2px);
}

.tool-card {
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.tool-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tool-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
}

.tool-card h3 {
  margin: 0.5rem 0;
  font-size: 1.25rem;
}

.tool-card p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}
```

---

## 📁 Directory Structure Reference

### This Project (QR Code Generator)
```
dino-qr-code/
├── dist/                    ← Copy contents from here
│   ├── index.html
│   └── assets/
├── src/
├── package.json
└── vite.config.js          ← Configured for /tool/dino-qr-code-generator/
```

### Your Website Repository
```
your-website-repo/
├── index.html
├── tool/
│   ├── index.html          ← Your tools page (add link here)
│   └── dino-qr-code-generator/  ← Paste dist contents here
│       ├── index.html
│       └── assets/
└── other-files...
```

---

## ✅ Pre-Deployment Checklist

Before deploying:

- [x] `vite.config.js` has base path: `/tool/dino-qr-code-generator/`
- [ ] Project built successfully (`npm run build`)
- [ ] `dist` folder contains `index.html` and `assets/` folder
- [ ] Ready to copy files to website repository

After deploying:

- [ ] Files copied to correct location in website repo
- [ ] Tested URL: `theabubakronline.com/tool/dino-qr-code-generator`
- [ ] QR code generation works
- [ ] Downloads work (PNG & SVG)
- [ ] All dinosaur templates work
- [ ] No console errors
- [ ] Link added to tools page
- [ ] Tested on mobile device

---

## 🆘 Troubleshooting

### Blank Page?
- Check that `index.html` is in `tool/dino-qr-code-generator/` (not in `tool/`)
- Verify base path in `vite.config.js` matches your URL structure
- Check browser console (F12) for errors

### Assets Not Loading (404 errors)?
- Ensure `assets/` folder was copied
- Check that file paths in browser console match your directory structure
- Verify base path is correct

### QR Code Not Generating?
- Check browser console for JavaScript errors
- Ensure all files from `dist` folder were copied
- Try clearing browser cache

### Wrong URL Path?
- Update `vite.config.js` base path
- Rebuild: `npm run build`
- Copy new files to website

---

## 📝 Notes

- **Base Path**: The app is configured for `/tool/dino-qr-code-generator/` (note: "tool" singular, not "tools")
- **Independent Updates**: You can update this project independently and redeploy to your website
- **No Dependencies**: The built files are self-contained and don't need Node.js on your server
- **Static Files**: All files are static HTML/CSS/JS, compatible with any web hosting

---

## 🎉 You're Done!

Your Dino QR Code Generator is now live at:
**https://theabubakronline.com/tool/dino-qr-code-generator**

Happy QR code generating! 🦖

