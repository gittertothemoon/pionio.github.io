import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Base URL per GitHub Pages User site (pionio.github.io)
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})