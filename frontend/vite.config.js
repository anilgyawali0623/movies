import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3006', // Backend server
        changeOrigin: true, // Avoid CORS issues
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove `/api` prefix when forwarding
      },
    },
  },
  plugins: [react()],
});
