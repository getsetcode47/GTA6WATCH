import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    // Hashed filenames everywhere so Amplify can cache them immutably.
    rollupOptions: {
      output: {
        // Split the heavy, rarely-changing vendor libs into their own
        // long-lived chunks. App code can change without busting these.
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
    // Trim the production bundle.
    minify: 'esbuild',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 900,
  },
  esbuild: {
    // Strip console/debugger from the production build only.
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
})
