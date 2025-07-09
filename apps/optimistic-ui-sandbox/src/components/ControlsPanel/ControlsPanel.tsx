import styles from "./ControlsPanel.module.css";
import { Box, Button } from "@react-lab-mono/ui";
import { CategorySelect } from "../CategorySelect/CategorySelect";
import { SimulationControls } from "../SimulationControls/SimulationControls";
import { Typography } from "@react-lab-mono/ui";
import { useControlsPanelStore } from "../../stores/useControlsPanelStore";

export const ControlsPanel = () => {
  const resetSimulations = useControlsPanelStore(
    (state) => state.resetSimulations
  );

  return (
    <aside className={styles.container} aria-label="Controls Panel">
      <Box>
        <Typography type="h2">Controls Panel</Typography>
        <Box className={styles.innerBox}>
          <CategorySelect />
          <SimulationControls />
          <Button
            text="Reset data"
            size="sm"
            type="button"
            name="reset-data"
            aria-label="Reset all data to initial state"
            onClick={resetSimulations}
          />
        </Box>
      </Box>
    </aside>
  );
};
