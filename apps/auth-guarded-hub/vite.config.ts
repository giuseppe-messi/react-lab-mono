import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

const uiRoot = path.resolve(__dirname, "../../packages/ui");
const uiSrc = path.resolve(uiRoot, "src");

export default defineConfig({
  /* Set up development to alias imports to the UI package’s source directory, 
so every component import reflects changes instantly during development. */

  resolve: {
    alias: [
      // everything under @react-lab-mono/ui/ gets mapped into src/
      {
        find: /^@react-lab-mono\/ui(.*)$/,
        replacement: uiSrc + "$1"
      },
      // the bare package also to src/index
      {
        find: /^@react-lab-mono\/ui$/,
        replacement: uiSrc
      }
    ]
  },

  optimizeDeps: {
    exclude: ["@react-lab-mono/ui"]
  },

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
    },
    fs: {
      // this lets Vite serve files from outside your app root
      allow: [
        // your app
        path.resolve(__dirname),
        // your ui package
        uiRoot,
        // your monorepo root (so ../../node_modules is in bounds)
        path.resolve(__dirname, "../..")
      ]
    }
  }
});
