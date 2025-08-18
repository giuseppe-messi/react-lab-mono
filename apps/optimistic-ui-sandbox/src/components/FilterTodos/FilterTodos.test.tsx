import { act, render } from "@testing-library/react";
import { useTodosStore } from "../../stores/useTodosStore";
import { FilterTodos } from "./FilterTodos";

jest.mock("@react-lab-mono/ui", () => ({
  RadioGroup: jest.fn(() => null),
  generateUUID: jest.fn()
}));

const renderComponent = () => render(<FilterTodos />);

describe("FilterTodos component", () => {
  it("renders FilterTodos without errors", () => {
    renderComponent();
  });

  it("should set the 'filter' state on onChange", () => {
    const { RadioGroup } = jest.requireMock("@react-lab-mono/ui");
    renderComponent();

    // Grab the props the component received
    const props = RadioGroup.mock.calls[0][0];

    act(() => {
      const e = {
        target: { value: "mockFilter" }
      };
      props.onChange(e);
    });

    expect(useTodosStore.getState().filter).toBe("mockFilter");
  });
});
