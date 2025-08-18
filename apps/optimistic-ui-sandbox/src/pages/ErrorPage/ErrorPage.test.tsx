import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorPage } from "./ErrorPage";

const mockOnClearError = jest.fn();

const renderComponent = () =>
  render(<ErrorPage onClearError={mockOnClearError} />);

describe("ErrorPage page", () => {
  it("renders ErrorPage without errors", () => {
    renderComponent();
  });

  it("calls onClearError when the 'go back button' is clicked ", async () => {
    renderComponent();

    const goBackButton = screen.getByRole("button");
    await userEvent.click(goBackButton);

    expect(mockOnClearError).toHaveBeenCalled();
  });
});
