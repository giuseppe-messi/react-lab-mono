import styles from "./LatencyControl.module.css";
import { EmojiIcon } from "../EmojiIcon/EmojiIcon";
import { type LatencyDelay } from "../../stores/useControlsPanelStore";

type LatencyControlProps = {
  mockLatency: LatencyDelay | null;
  onChange: (value: LatencyDelay | null) => void;
};

export const LatencyControl = ({
  mockLatency,
  onChange
}: LatencyControlProps) => {
  //   console.log(" mockLatency:", Boolean(mockLatency));
  //   console.log(" mockLatency:", !!mockLatency);
  //   console.log(" mockLatency:", !mockLatency);
  //   console.log(" mockLatency:", mockLatency);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as LatencyDelay);
  };

  const handleCheckbox = () => onChange(mockLatency ? null : "2000");

  return (
    <div className={styles.container}>
      <label htmlFor="simulate-latency">
        <input
          type="checkbox"
          id="simulate-latency"
          name="simulateLatency"
          role="switch"
          checked={!!mockLatency}
          onChange={handleCheckbox}
        />
        Latency <EmojiIcon type="lightning" />
      </label>
      {!!mockLatency && (
        <select
          name="latency-delay"
          id="latency-delay"
          value={mockLatency}
          onChange={handleSelect}
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
  );
};
