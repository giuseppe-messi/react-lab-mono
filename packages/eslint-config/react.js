const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use a library
 * that utilizes React.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/react"
  ].map(require.resolve),
  parserOptions: {
    project
  },
  plugins: ["only-warn"],
  globals: {
    JSX: true
  },
  settings: {
    "import/resolver": {
      typescript: {
        project
      }
    }
  },
  ignorePatterns: ["node_modules/", "dist/", ".eslintrc.js", "**/*.css"],
  // add rules configurations here
  rules: {
    "import/no-default-export": "off",

    // removes rule related to naming file cases
    "unicorn/filename-case": "off",

    // removes rule for having a return function type (ts will infer anyway, most times at least)
    "@typescript-eslint/explicit-function-return-type": "off",

    // Allow both function declarations and arrow functions for components
    "react/function-component-definition": "off",

    // not restriction between type and interface
    "@typescript-eslint/consistent-type-definitions": "off",

    "@typescript-eslint/no-unsafe-argument": "off",

    "@typescript-eslint/no-unsafe-member-access": "off"
  }
};
