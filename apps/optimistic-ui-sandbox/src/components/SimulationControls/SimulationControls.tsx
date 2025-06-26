import styles from "./SimulationControls.module.css";
import { Box } from "../Box/Box";
import { Button } from "../Button/Button";
import { EmojiIcon } from "../EmojiIcon/EmojiIcon";

export const SimulationControls = () => {
  return (
    <Box>
      <div className={styles.switchesBox}>
        <label htmlFor="simulate-latency">
          <input
            type="checkbox"
            id="simulate-latency"
            name="simulateLatency"
            role="switch"
          />
          Latency <EmojiIcon type="lightning" />
        </label>
        <label htmlFor="simulate-error">
          <input
            type="checkbox"
            id="simulate-error"
            name="simulateError"
            role="switch"
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
      />
    </Box>
  );
};
