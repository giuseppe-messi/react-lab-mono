import styles from "./SimulationControls.module.css";
import { EmojiIcon } from "../EmojiIcon/EmojiIcon";
import { useShallow } from "zustand/shallow";
import {
  defaultLatency,
  useControlsPanelStore,
  type LatencyDelay
} from "../../stores/useControlsPanelStore";

export const SimulationControls = () => {
  const [mockLatency, mockError, setMockLatency, toggleMockError] =
    useControlsPanelStore(
      useShallow((state) => [
        state.mockLatency,
        state.mockError,
        state.setMockLatency,
        state.toggleMockError
      ])
    );

  return (
    <div className={styles.container}>
      <div className={styles.latencyBox}>
        <label htmlFor="simulate-latency" className={styles.label}>
          <input
            type="checkbox"
            id="simulate-latency"
            name="simulateLatency"
            role="switch"
            checked={!!mockLatency}
            onChange={() => setMockLatency(mockLatency ? null : defaultLatency)}
          />
          Latency <EmojiIcon type="lightning" />
        </label>
        {!!mockLatency && (
          <select
            name="latency-delay"
            id="latency-delay"
            value={mockLatency}
            onChange={(e) => setMockLatency(e.target.value as LatencyDelay)}
          >
            <option value="" disabled>
              Select an delay
            </option>
            <option value="500">500ms</option>
            <option value="1000">1sec</option>
            <option value="2000">2sec</option>
            <option value="3000">3sec</option>
            <option value="random">random</option>
          </select>
        )}
      </div>
      <label htmlFor="simulate-error" className={styles.label}>
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
  );
};
