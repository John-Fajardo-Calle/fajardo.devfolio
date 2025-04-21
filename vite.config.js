// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/fajardo.devfolio/',  // para que los assets se sirvan desde /fajardo.devfolio/
  plugins: [react()],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})