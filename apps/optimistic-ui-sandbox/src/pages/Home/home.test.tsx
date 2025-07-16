import { render } from "@testing-library/react";
import { Home } from "./Home";
describe("Home page", () => {
  it("renders Home page without errors", () => {
    render(<Home />);
  });
});
