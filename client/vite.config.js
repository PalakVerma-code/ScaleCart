import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Proxy API requests to the backend server // This allows you to make API calls to /api/products, which will be proxied to http://localhost:5000/api/products
    },
  },
})
