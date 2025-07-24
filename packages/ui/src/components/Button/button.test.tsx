import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import type { ButtonProps } from "./Button-temp";
import { Button } from "./Button-temp";

const defaultProps: ButtonProps = {
  text: "MockText"
};

const renderComponent = (props: ButtonProps = defaultProps) =>
  render(<Button {...props} />);

describe("Button component", () => {
  it("should render Button without errors", () => {
    renderComponent();
    expect(screen.getByText(defaultProps.text)).toBeInTheDocument();
  });

  it("should render Button without a11y violations", async () => {
    const { container } = renderComponent();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
