import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuracao do Vite para uma SPA em React (JavaScript + JSX).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
