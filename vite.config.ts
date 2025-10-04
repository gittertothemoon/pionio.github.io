import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pionio-portfolio/', // Sostituisci con il nome del tuo repository GitHub
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})