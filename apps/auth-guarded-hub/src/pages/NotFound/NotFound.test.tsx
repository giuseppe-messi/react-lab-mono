import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NotFound from "./NotFound";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate
}));

const renderComponent = () => render(<NotFound />);

describe("NotFound page", () => {
  it("renders NotFound page without errors", () => {
    renderComponent();
  });

  it("calls navigate when the 'go back button' is clicked", async () => {
    renderComponent();

    const goBackButton = screen.getByRole("button");
    await userEvent.click(goBackButton);
    expect(mockUseNavigate).toHaveBeenCalled();
  });
});
