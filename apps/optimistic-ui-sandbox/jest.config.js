import base from "@repo/jest-config";

export default {
  ...base,
  displayName: "optimistic ui sandbox",

  // point ts-jest at tsconfig.app.json (contains JSX, DOM, esModuleInterop, path-aliases, etc.)
  // instead of the default tsconfig.json, so  tests compile with the correct compiler options
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.test.json" }]
  }
};
