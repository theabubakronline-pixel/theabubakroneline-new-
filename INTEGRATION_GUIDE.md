# 🔧 Integration Guide - Add to Your Tools Page

This guide will help you add the Dino QR Code Generator to your existing website's tools page.

## 📁 Option 1: Deploy as a Subdirectory (Recommended)

### Step 1: Update Base Path (If Needed)

If your tools page URL will be like:
- `yoursite.com/tools/qr-generator/`
- `yoursite.com/tools/dino-qr/`

**Update `vite.config.js`:**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/tools/qr-generator/', // Change this to your subdirectory path
})
```

**Important:** The path must:
- Start with `/`
- End with `/`
- Match your actual subdirectory path

### Step 2: Rebuild

```bash
npm run build
```

### Step 3: Upload to Your Server

1. **Go to your `dist` folder** (after building)
2. **Upload all contents** to your web server:
   - If your tools page is at `yoursite.com/tools/qr-generator/`
   - Upload to: `public_html/tools/qr-generator/` (or your server's equivalent)
   - Make sure `index.html` is in that folder

3. **File structure should look like:**
   ```
   your-server/
   └── tools/
       └── qr-generator/
           ├── index.html
           └── assets/
               ├── index-xxxxx.js
               └── index-xxxxx.css
   ```

### Step 4: Test

Visit: `https://yoursite.com/tools/qr-generator/`

---

## 📁 Option 2: Deploy to Root Tools Directory

If your tools are at `yoursite.com/tools/` and you want this at `yoursite.com/tools/qr-generator/`:

1. **Keep `vite.config.js` as is** (base: `/`)
2. **Build:**
   ```bash
   npm run build
   ```
3. **Upload `dist` folder contents to:**
   - `public_html/tools/qr-generator/`
   - Or wherever your tools are located

---

## 🔗 Option 3: Link from Your Tools Page

If you want to keep it separate but link to it:

1. **Deploy to a subdomain or separate path**
2. **Add a link on your tools page:**
   ```html
   <a href="/tools/qr-generator/">Dino QR Code Generator</a>
   ```

---

## 📋 Upload Methods

### Via FTP (FileZilla, etc.)

1. Connect to your server
2. Navigate to your tools directory
3. Create folder: `qr-generator` (or your preferred name)
4. Upload all files from `dist` folder
5. Ensure `index.html` is in the root of that folder

### Via cPanel File Manager

1. Log into cPanel
2. Open File Manager
3. Navigate to `public_html/tools/` (or your tools location)
4. Create new folder: `qr-generator`
5. Upload all files from `dist` folder
6. Extract if needed

### Via SSH/SCP

```bash
# Copy dist folder contents to server
scp -r dist/* user@yourserver.com:/path/to/tools/qr-generator/
```

---

## ✅ Verification Checklist

After uploading, verify:

- [ ] `index.html` is in the correct directory
- [ ] All `assets` folder files are uploaded
- [ ] Visit the URL and check browser console for errors
- [ ] Test QR code generation
- [ ] Test PNG download
- [ ] Test SVG download
- [ ] Test on mobile device

---

## 🐛 Common Issues

### Issue: Blank Page / 404 Error

**Solution:**
- Check that `index.html` is in the correct location
- Verify all asset files are uploaded
- Check browser console for 404 errors on assets
- Ensure base path in `vite.config.js` matches your URL path

### Issue: Assets Not Loading

**Solution:**
- Make sure `assets` folder is uploaded
- Check file permissions (should be 644 for files, 755 for folders)
- Verify paths in browser console

### Issue: Routes Not Working

**Solution:**
- If using Apache, add `.htaccess` file (see below)
- If using Nginx, configure rewrite rules

---

## 📝 Apache .htaccess (If Needed)

If you're using Apache and getting 404 errors, create `.htaccess` in your subdirectory:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /tools/qr-generator/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /tools/qr-generator/index.html [L]
</IfModule>
```

---

## 🎯 Quick Integration Steps

1. **Decide your URL path:**
   - Example: `yoursite.com/tools/qr-generator/`

2. **Update `vite.config.js` base path:**
   ```javascript
   base: '/tools/qr-generator/'
   ```

3. **Build:**
   ```bash
   npm run build
   ```

4. **Upload `dist` folder contents to your server**

5. **Test the URL**

6. **Add link on your tools page:**
   ```html
   <a href="/tools/qr-generator/">🦖 Dino QR Code Generator</a>
   ```

---

## 💡 Pro Tips

- **Test locally first:** Use `npm run preview` to test before uploading
- **Keep backups:** Keep a copy of your `dist` folder
- **Version control:** Consider using Git to track changes
- **CDN:** Consider using a CDN for faster asset loading

---

## 🆘 Need Help?

If you encounter issues:
1. Check browser console for errors
2. Verify file paths match your server structure
3. Test with a simple HTML file first
4. Check server error logs

---

**Your Dino QR Code Generator is ready to be added to your tools page! 🦖🚀**


