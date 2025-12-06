@echo off
echo ====================================
echo DINO QR CODE GENERATOR - DEV SERVER
echo ====================================
echo.
cd /d "%~dp0"
echo Current directory: %CD%
echo.
echo Checking Node.js...
node --version
echo.
echo Checking npm...
npm --version
echo.
echo Starting development server...
echo.
echo The server will start at: http://localhost:5173
echo Press Ctrl+C to stop the server
echo.
npm run dev




