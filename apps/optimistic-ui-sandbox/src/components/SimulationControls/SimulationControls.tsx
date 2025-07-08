import styles from "./SimulationControls.module.css";
import { Checkbox } from "@react-lab-mono/ui";
import { EmojiIcon } from "../EmojiIcon";
import { Select } from "../Select";
import { useShallow } from "zustand/shallow";
import {
  defaultLatency,
  delayOptions,
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
        <Checkbox
          name="simulate-latency"
          labelText={
            <>
              Latency <EmojiIcon type="lightning" />
            </>
          }
          checked={!!mockLatency}
          onChange={() => setMockLatency(mockLatency ? null : defaultLatency)}
        />
        {!!mockLatency && (
          <Select
            name="latency-delay"
            options={delayOptions}
            value={mockLatency}
            getOptionValue={(option) => option.value}
            getOptionLabel={(option) => option.label}
            getOptionId={(option) => option.id}
            onChange={(e) => setMockLatency(e.target.value as LatencyDelay)}
            placeholder="Select an delay"
          />
        )}
      </div>
      <Checkbox
        name="simulate-error"
        labelText={
          <>
            Error <EmojiIcon type="alert" />
          </>
        }
        checked={mockError}
        onChange={toggleMockError}
      />
    </div>
  );
};
