import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
      '/asset-files': 'http://localhost:8000',
      '/session-files': 'http://localhost:8000',
      '/step-files': 'http://localhost:8000',
    },
  },
})
