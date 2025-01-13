import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Replace 3000 with your desired port number
  },
  build: {
    outDir: 'dist', // The default is 'dist', but you can customize it if needed
    sourcemap: true, // Optional: Helps debugging in production
  },
});