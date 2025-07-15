import { axe } from "jest-axe";
import { render, screen } from "@testing-library/react";
import type { BoxProps } from "./Box";
import { Box, TestLocators } from "./Box";
import styles from "./box.module.css";

const mockText = "Mock text";

const defaultProps: BoxProps = {
  size: "md",
  className: "",
  children: <p>{mockText}</p>
};

const ChildParagraph = () => <p>{mockText}</p>;

const renderBox = (props?: BoxProps) =>
  render(
    <Box {...props}>
      <ChildParagraph />
    </Box>
  );

describe("Button component", () => {
  it("should render Button without errors", () => {
    renderBox();
    expect(screen.getByText(mockText)).toBeInTheDocument();
  });

  it("should render Button without a11y violations", async () => {
    const { container } = renderBox();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should apply corrent padding style depending on size prop", () => {
    const { rerender } = renderBox();
    expect(screen.getByTestId(TestLocators.box)).toHaveClass(
      styles.box,
      styles.md
    );

    rerender(<Box {...defaultProps} size="xs" />);
    expect(screen.getByTestId(TestLocators.box)).toHaveClass(
      styles.box,
      styles.xs
    );
  });
});
