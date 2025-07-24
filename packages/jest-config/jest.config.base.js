const path = require("path");

module.exports = {
  preset: "ts-jest",

  // a DOM-like environment so you can render React components
  testEnvironment: "jsdom",
  // automatically include your RTL + axe setup
  setupFilesAfterEnv: [require.resolve(path.join(__dirname, "jest.setup.ts"))],
  // stub out CSS modules
  moduleNameMapper: {
    "\\.module\\.css$": "identity-obj-proxy"
  }

  // ← always collect coverage
  // collectCoverage: true,
  // coverageDirectory: "coverage",
  // coverageReporters: ["text", "lcov"],

  // // ← enforce at least 80% everywhere (adjust to taste)
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80
  //   }
  // }
};
