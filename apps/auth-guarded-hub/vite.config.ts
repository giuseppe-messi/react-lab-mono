import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Main API
      "/api": {
        target: "http://localhost:8888/.netlify/functions",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, "")
      }
      // If you add another API later, give it another path:
      // '/api-admin': {
      //   target: 'http://localhost:8890/.netlify/functions',
      //   changeOrigin: true,
      //   rewrite: (p) => p.replace(/^\/api-admin/, ''),
      // },
    }
  }
});
