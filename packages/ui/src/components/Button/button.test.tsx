import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import type { ButtonProps } from "./Button";
import { Button } from "./Button";

const mockText = "Mock Text";

const renderComponent = (props?: ButtonProps) =>
  render(<Button {...props}>{mockText}</Button>);

describe("Button component", () => {
  it("should render Button without errors", () => {
    renderComponent();
    expect(screen.getByText(mockText)).toBeInTheDocument();
  });

  it("should render Button without a11y violations", async () => {
    const { container } = renderComponent();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
