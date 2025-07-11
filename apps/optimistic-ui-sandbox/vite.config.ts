import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "node:path";

const uiSrc = path.resolve(__dirname, "../../packages/ui/src");

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
    include: ["@react-lab-mono/ui"]
  },
  server: {
    fs: {
      // this lets Vite serve files from outside your app root
      allow: [
        // your app
        path.resolve(__dirname),
        // your ui package
        path.resolve(__dirname, "../../packages/ui"),
        // your monorepo root (so ../../node_modules is in bounds)
        path.resolve(__dirname, "../..")
      ]
    }
  },

  plugins: [react()]
});
