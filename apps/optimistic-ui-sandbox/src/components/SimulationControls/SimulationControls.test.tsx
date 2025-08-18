import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useControlsPanelStore } from "../../stores/useControlsPanelStore";
import { SimulationControls } from "./SimulationControls";

const setMockLatencySpy = jest.spyOn(
  useControlsPanelStore.getState(),
  "setMockLatency"
);

const renderComponent = () => render(<SimulationControls />);

describe("SimulationControls component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useControlsPanelStore.setState({
      category: "mockCategory",
      mockLatency: null,
      mockError: false
    } as any);
  });

  it("renders SimulationControls without errors", () => {
    renderComponent();
  });

  it("calls setMockLatency when latency checkbox is clicked and 'Select' component is shown", async () => {
    renderComponent();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();

    const latencyCheckbox = screen.getByRole("switch", { name: /latency/i });
    await userEvent.click(latencyCheckbox);

    expect(setMockLatencySpy).toHaveBeenCalled();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("calls setMockLatency on on Select's onChange", async () => {
    renderComponent();
    const latencyCheckbox = screen.getByRole("switch", { name: /latency/i });
    await userEvent.click(latencyCheckbox);

    const select = screen.getByRole("combobox");

    await userEvent.selectOptions(select, "1sec");
    expect(setMockLatencySpy).toHaveBeenCalled();
  });
});
