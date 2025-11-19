import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/tool/dino-qr-code-generator/', // Base path for deployment to theabubakronline.com/tool/dino-qr-code-generator
})


