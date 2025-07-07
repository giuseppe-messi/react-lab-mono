import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  // grab every .tsx inside your components folder
  entryPoints: ["src/index.ts", "src/components/**/*.tsx", "src/hooks/**/*.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false, // disable code-splitting so no chunk-*.mjs files
  external: ["react"],
  ...options
}));
