import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  // grab every .tsx inside your components folder
  entryPoints: ["src/components/**/*.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  external: ["react"],
  ...options
}));
