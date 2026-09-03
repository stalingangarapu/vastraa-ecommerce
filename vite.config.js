import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listens on all local IP addresses (0.0.0.0) for phone testing
    port: 3000,
    open: true
  }
});
