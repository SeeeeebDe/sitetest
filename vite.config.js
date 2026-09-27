import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer les grosses librairies en chunks distincts
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'charts': ['chart.js', 'react-chartjs-2'],
          'animation': ['framer-motion'],
          'email': ['@emailjs/browser']
        }
      }
    },
    // Augmenter la limite d'avertissement pour les chunks
    chunkSizeWarningLimit: 1000
  }
})
