import styles from "./SimulationControls.module.css";
import { Box } from "../Box/Box";
import { Button } from "../Button/Button";
import { EmojiIcon } from "../EmojiIcon/EmojiIcon";
import { useControlsPanelStore } from "../../stores/useControlsPanelStore";
import { useShallow } from "zustand/shallow";

export const SimulationControls = () => {
  const [
    mockLatency,
    mockError,
    toggleMockLatency,
    toggleMockError,
    resetSimulations
  ] = useControlsPanelStore(
    useShallow((state) => [
      state.mockLatency,
      state.mockError,
      state.toggleMockLatency,
      state.toggleMockError,
      state.resetSimulations
    ])
  );

  return (
    <Box>
      <div className={styles.switchesBox}>
        <label htmlFor="simulate-latency">
          <input
            type="checkbox"
            id="simulate-latency"
            name="simulateLatency"
            role="switch"
            checked={mockLatency}
            onChange={toggleMockLatency}
          />
          Latency <EmojiIcon type="lightning" />
        </label>
        <label htmlFor="simulate-error">
          <input
            type="checkbox"
            id="simulate-error"
            name="simulateError"
            role="switch"
            checked={mockError}
            onChange={toggleMockError}
          />
          Error <EmojiIcon type="alert" />
        </label>
      </div>
      <Button
        text="Reset data"
        size="sm"
        type="button"
        name="reset-data"
        aria-label="Reset all data to initial state"
        onClick={resetSimulations}
      />
    </Box>
  );
};
