import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { localJournalStudioPlugin } from './vite.journal-studio';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), localJournalStudioPlugin()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'icons': ['lucide-react'],
          'animations': ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
