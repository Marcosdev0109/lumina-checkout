import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuracao do Vite para uma SPA em React (JavaScript + JSX).
// O bloco "test" configura o Vitest, que usa a mesma API do Jest.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    css: { modules: { classNameStrategy: 'non-scoped' } }
  }
})
