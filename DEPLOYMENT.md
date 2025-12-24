# Deployment Guide

This document outlines the deployment process for The Abubakr Online website.

## Pre-Deployment Checklist

### 1. Build React Tools
```bash
npm run build:dino
```

This builds the Dino QR Code Generator and outputs to `tool/dino-qr-code-generator/`.

### 2. Verify File Structure
Ensure the following files exist in the root directory:
- ✅ `index.html`
- ✅ `robots.txt`
- ✅ `sitemap.xml`
- ✅ `.htaccess`
- ✅ `netlify.toml` (for Netlify)
- ✅ `vercel.json` (for Vercel)
- ✅ `package.json`

### 3. Verify All Assets
- All images in `assets/images/` exist
- All CSS files in `css/` exist
- All JS files in `js/` exist
- Built React app in `tool/dino-qr-code-generator/`

## Deployment Options

### Option 1: Netlify

1. **Connect Repository:**
   - Go to Netlify dashboard
   - Connect your Git repository
   - Netlify will auto-detect `netlify.toml`

2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.` (root)
   - Node version: `18.x` or higher

3. **Environment Variables:**
   - None required (fully static site)

4. **Deploy:**
   - Netlify will automatically deploy on push
   - Or trigger manual deploy from dashboard

### Option 2: Vercel

1. **Connect Repository:**
   - Go to Vercel dashboard
   - Import your Git repository
   - Vercel will auto-detect `vercel.json`

2. **Build Settings:**
   - Framework Preset: Other
   - Build command: `npm run build` (optional)
   - Output directory: `.` (root)

3. **Deploy:**
   - Vercel will automatically deploy on push
   - Or trigger manual deploy from dashboard

### Option 3: Apache Server

1. **Upload Files:**
   - Upload all files to your web server root directory
   - Ensure `.htaccess` is uploaded (may need to enable in FTP client)

2. **Verify Permissions:**
   - Files: `644`
   - Directories: `755`
   - `.htaccess`: `644`

3. **Test:**
   - Visit your domain
   - Check that all pages load correctly
   - Verify `.htaccess` rules are working

### Option 4: Nginx

1. **Upload Files:**
   - Upload all files to your web server directory (e.g., `/var/www/html/`)

2. **Configure Nginx:**
   ```nginx
   server {
       listen 80;
       server_name theabubakronline.com www.theabubakronline.com;
       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Cache static assets
       location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # Gzip compression
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   }
   ```

3. **Test and Reload:**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

## Post-Deployment Verification

### 1. Test All Pages
- [ ] Homepage loads correctly
- [ ] About page loads
- [ ] Services page loads
- [ ] Projects page loads
- [ ] Blog page loads
- [ ] Tools page loads
- [ ] Contact page loads
- [ ] Dino QR Code Generator tool works

### 2. Test Functionality
- [ ] Navigation works on all pages
- [ ] Mobile menu works
- [ ] Theme toggle works
- [ ] Contact modal opens and closes
- [ ] Blog posts render correctly
- [ ] All images load
- [ ] All CSS styles apply correctly

### 3. SEO Verification
- [ ] `robots.txt` is accessible at `/robots.txt`
- [ ] `sitemap.xml` is accessible at `/sitemap.xml`
- [ ] All meta tags are present
- [ ] Structured data is valid (test with Google Rich Results Test)

### 4. Performance Check
- [ ] Page load times are acceptable
- [ ] Images are optimized
- [ ] CSS/JS files are minified (if applicable)
- [ ] Caching headers are set correctly

### 5. Security Check
- [ ] HTTPS is enabled
- [ ] Security headers are present (check with securityheaders.com)
- [ ] No console errors
- [ ] All external links use `rel="noopener noreferrer"`

## Troubleshooting

### Issue: 404 Errors on Routes
**Solution:** Ensure `.htaccess` (Apache) or Nginx rewrite rules are configured correctly.

### Issue: React App Not Loading
**Solution:** 
1. Verify build completed successfully: `npm run build:dino`
2. Check that files exist in `tool/dino-qr-code-generator/`
3. Verify base path in `vite.config.js` matches deployment path

### Issue: Images Not Loading
**Solution:**
1. Check image paths (should be relative: `assets/images/...`)
2. Verify files exist in `assets/images/`
3. Check file permissions on server

### Issue: CSS/JS Not Loading
**Solution:**
1. Verify paths in HTML files are correct
2. Check that files exist in `css/` and `js/` directories
3. Check browser console for 404 errors

## Environment-Specific Notes

### Development
- Use `npm start` or local server
- React tools: `npm run dev:dino` for hot reload

### Production
- Always run `npm run build:dino` before deploying
- Test locally with production build
- Verify all paths work with production URLs

## Continuous Deployment

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd "dino qr code"
          npm install
      - name: Build
        run: npm run build
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=.
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Support

For deployment issues, check:
1. Server logs
2. Browser console for errors
3. Network tab for failed requests
4. Server configuration files

---

Last updated: January 2025

