# Google Maps API Setup Guide

## Framework
This project uses **Vite** with React. Environment variables are accessed via `import.meta.env.VITE_*`

## Quick Setup

### Step 1: Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable these APIs:
   - **Maps JavaScript API**
   - **Geocoding API**
   - **Places API**
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy your API key

### Step 2: Add API Key to Project
1. Create a `.env` file in the `dino qr code` folder (same level as `package.json`)
2. Add your API key:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```
3. **Important**: Replace `your_actual_api_key_here` with your actual API key

### Step 3: Restart Dev Server
After creating/updating `.env` file:
```bash
# Stop the current dev server (Ctrl+C)
# Then restart it
npm run dev
```

## Environment Variable Format

In Vite, environment variables must start with `VITE_` to be accessible in the browser:

- ✅ Correct: `VITE_GOOGLE_MAPS_API_KEY=abc123`
- ❌ Wrong: `GOOGLE_MAPS_API_KEY=abc123` (won't work in Vite)

## Security Note

**Never commit your `.env` file to Git!**

The `.env` file should already be in `.gitignore`. Your API key should remain private.

## API Key Restrictions (Optional but Recommended)

In Google Cloud Console, you can restrict your API key:
1. Go to "Credentials" → Select your API key
2. Under "API restrictions", select "Restrict key"
3. Choose: Maps JavaScript API, Geocoding API, Places API
4. Under "Website restrictions", add your domain (e.g., `theabubakronline.com/*`)

## Testing

Once configured, the location picker will:
- Show an interactive Google Map
- Allow clicking to select locations
- Provide search functionality
- Auto-generate QR codes from selected locations

## Troubleshooting

**Error: "Google Maps API key is required"**
- Make sure `.env` file exists in `dino qr code` folder
- Make sure variable name is exactly: `VITE_GOOGLE_MAPS_API_KEY`
- Restart dev server after creating/updating `.env`

**Error: "Failed to load Google Maps"**
- Check your API key is correct
- Verify APIs are enabled in Google Cloud Console
- Check browser console for detailed error messages

**Map not showing**
- Check browser console for errors
- Verify API key has correct permissions
- Make sure all three APIs are enabled

