import { act, render } from "@testing-library/react";
import { useControlsPanelStore } from "../../stores/useControlsPanelStore";
import { CategorySelect } from "./CategorySelect";

jest.mock("@react-lab-mono/ui", () => ({
  Select: jest.fn(() => null),
  generateUUID: jest.fn()
}));

const renderComponent = () => render(<CategorySelect />);

describe("CategorySelect component", () => {
  it("renders CategorySelect without errors", () => {
    renderComponent();
  });

  it("sets category on onChange", () => {
    const { Select } = jest.requireMock("@react-lab-mono/ui");
    renderComponent();

    // get props from the mocked Select
    const props = Select.mock.calls[0][0];

    act(() => {
      props.onChange({
        target: { value: "mockFilter" }
      });
    });

    expect(useControlsPanelStore.getState().category).toBe("mockFilter");
  });
});
