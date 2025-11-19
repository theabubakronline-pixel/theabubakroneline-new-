# 🛠️ Add Dino QR Generator to Your Tools Page - Simple Steps

## 🎯 Quick Steps (5 Minutes)

### Step 1: Decide Your URL Path

What will your URL be?
- `yoursite.com/tools/qr-generator/` ✅
- `yoursite.com/tools/dino-qr/` ✅
- `yoursite.com/qr-generator/` ✅

**Write down your path:** _________________________

---

### Step 2: Update Configuration

**Open `vite.config.js`** and update the base path:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/tools/qr-generator/', // ⬅️ Change this to YOUR path (with trailing slash!)
})
```

**Important:** 
- Must start with `/`
- Must end with `/`
- Must match your actual URL path

---

### Step 3: Rebuild

```bash
npm run build
```

This creates a fresh `dist` folder with correct paths.

---

### Step 4: Upload to Your Server

**Where to upload:**

If your URL is: `yoursite.com/tools/qr-generator/`
Upload to: `public_html/tools/qr-generator/` (or your server's equivalent)

**What to upload:**
- Upload **ALL contents** of the `dist` folder
- Make sure `index.html` is in the subdirectory root
- Include the `assets` folder

**File structure:**
```
your-server/
└── public_html/
    └── tools/
        └── qr-generator/          ← Your subdirectory
            ├── index.html          ← Must be here
            └── assets/
                ├── index-xxxxx.js
                └── index-xxxxx.css
```

---

### Step 5: Test

Visit your URL: `https://yoursite.com/tools/qr-generator/`

**Check:**
- ✅ Page loads
- ✅ QR code generates
- ✅ Downloads work (PNG & SVG)
- ✅ No console errors

---

### Step 6: Add Link to Your Tools Page

Add this to your tools page HTML:

```html
<a href="/tools/qr-generator/" class="tool-link">
  🦖 Dino QR Code Generator
  <span>Create custom dinosaur-themed QR codes</span>
</a>
```

---

## 📤 Upload Methods

### Via FTP (FileZilla, WinSCP, etc.)

1. Connect to your server
2. Navigate to: `public_html/tools/`
3. Create folder: `qr-generator`
4. Upload all files from `dist` folder
5. Done!

### Via cPanel File Manager

1. Login to cPanel
2. Open **File Manager**
3. Go to `public_html/tools/`
4. Click **New Folder** → Name it `qr-generator`
5. Open the folder
6. Click **Upload** → Select all files from `dist` folder
7. Done!

### Via SSH

```bash
cd /path/to/public_html/tools/
mkdir qr-generator
cd qr-generator
# Then upload files via SCP or SFTP
```

---

## 🔧 If You Get Errors

### Blank Page?

1. Check `index.html` is in the right place
2. Check browser console (F12) for errors
3. Verify base path in `vite.config.js` matches your URL

### Assets Not Loading?

1. Make sure `assets` folder is uploaded
2. Check file permissions (644 for files, 755 for folders)
3. Verify paths in browser console

### 404 Errors?

1. If using Apache, add `.htaccess` file (see below)
2. Check that base path is correct
3. Verify all files uploaded correctly

---

## 📝 Apache .htaccess (If Needed)

If you're on Apache and getting 404s, create `.htaccess` in your subdirectory:

**Copy the `.htaccess` file** from this project to your subdirectory, then update the path:

```apache
RewriteBase /tools/qr-generator/  ← Change to YOUR path
RewriteRule . /tools/qr-generator/index.html [L]  ← Change to YOUR path
```

---

## ✅ Checklist

Before going live:

- [ ] Updated `vite.config.js` with correct base path
- [ ] Rebuilt project (`npm run build`)
- [ ] Uploaded all files from `dist` folder
- [ ] `index.html` is in subdirectory root
- [ ] `assets` folder is uploaded
- [ ] Tested the URL in browser
- [ ] Tested QR code generation
- [ ] Tested downloads
- [ ] Added link to tools page
- [ ] Tested on mobile

---

## 🎉 You're Done!

Your Dino QR Code Generator is now live on your tools page!

**Need help?** Check `INTEGRATION_GUIDE.md` for more details.


