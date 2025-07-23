import { Checkbox, EmojiIcon, Select } from "@react-lab-mono/ui";
import { useShallow } from "zustand/shallow";
import {
  defaultLatency,
  delayOptions,
  useControlsPanelStore,
  type LatencyDelay
} from "../../stores/useControlsPanelStore";
import styles from "./SimulationControls.module.css";

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
          checked={Boolean(mockLatency)}
          labelText={
            <>
              Latency <EmojiIcon type="lightning" />
            </>
          }
          name="simulate-latency"
          onChange={() => {
            setMockLatency(mockLatency ? null : defaultLatency);
          }}
        />
        {mockLatency !== null && (
          <Select
            getOptionId={(option) => option.id}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            name="latency-delay"
            onChange={(e) => {
              setMockLatency(e.target.value as LatencyDelay);
            }}
            options={delayOptions}
            placeholder="Select an delay"
            value={mockLatency}
          />
        )}
      </div>
      <Checkbox
        checked={mockError}
        labelText={
          <>
            Error <EmojiIcon type="alert" />
          </>
        }
        name="simulate-error"
        onChange={toggleMockError}
      />
    </div>
  );
};
