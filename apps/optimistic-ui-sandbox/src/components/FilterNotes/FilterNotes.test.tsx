import { act, render } from "@testing-library/react";
import { useNotesStore } from "../../stores/useNotesStore";
import { FilterNotes } from "./FilterNotes";

jest.mock("@react-lab-mono/ui", () => ({
  RadioGroup: jest.fn(() => null),
  generateUUID: jest.fn()
}));

const renderComponent = () => render(<FilterNotes />);

describe("FilterNotes component", () => {
  it("renders FilterNotes without errors", () => {
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

    expect(useNotesStore.getState().filter).toBe("mockFilter");
  });
});
