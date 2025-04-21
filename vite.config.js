// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'docs',      // ← aquí cambiamos de dist/ a docs/
    emptyOutDir: true,   // limpia docs/ antes de cada build
  },
})