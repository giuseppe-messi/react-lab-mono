import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import { TextEncoder } from "util";

// add the axe matcher
expect.extend(toHaveNoViolations);

// polyfill TextEncoder, should be bundled with jsdom, but it's not with current version
global.TextEncoder = TextEncoder;
