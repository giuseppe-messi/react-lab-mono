import base from "@repo/jest-config";

export default {
  ...base,
  displayName: "optimistic ui sandbox",

  // point ts-jest at tsconfig.test.json instead of default tsconfig.json,
  // so  tests compile with the correct compiler options
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.test.json" }]
  }
};
