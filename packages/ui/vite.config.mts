import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(), // forces CSS to be injected into JS
    dts({
      entryRoot: "src",
      insertTypesEntry: true, // creates a single index.d.ts
      rollupTypes: true // flattens types from all subfolders
    })
  ],
  build: {
    cssCodeSplit: true, // important: allow per-file CSS
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ReactLabUI",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});
