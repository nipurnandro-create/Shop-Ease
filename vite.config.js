import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5176,
    host: '127.0.0.1',
    strictPort: true,
  },
  build: {
    // Optimize images during build
    assetsInlineLimit: 4096,
    
  },
  // Image optimization settings
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
})