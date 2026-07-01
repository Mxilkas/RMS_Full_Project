import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 7107,
    proxy: {
      // React calls /api. Vite forwards it to the HTTPS ASP.NET Core API.
      '/api': {
        target: 'https://localhost:7107',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
