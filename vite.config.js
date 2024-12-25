import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true,
  },
});
