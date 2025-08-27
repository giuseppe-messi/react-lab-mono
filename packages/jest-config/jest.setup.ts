import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import { TextEncoder } from "util";

// add the axe matcher
expect.extend(toHaveNoViolations);

// polyfill TextEncoder, should be bundled with jsdom, but it's not with current version
if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder;
}
