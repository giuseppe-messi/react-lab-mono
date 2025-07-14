import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

// add the axe matcher
expect.extend(toHaveNoViolations);
