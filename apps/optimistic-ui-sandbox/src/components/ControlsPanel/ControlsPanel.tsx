import { Box, Button, Typography } from "@react-lab-mono/ui";
import { CategorySelect } from "../CategorySelect/CategorySelect";
import { SimulationControls } from "../SimulationControls/SimulationControls";
import { useControlsPanelStore } from "../../stores/useControlsPanelStore";
import styles from "./ControlsPanel.module.css";

export const ControlsPanel = () => {
  const resetSimulations = useControlsPanelStore(
    (state) => state.resetSimulations
  );

  return (
    <aside aria-label="Controls Panel" className={styles.container}>
      <Box>
        <Typography type="h2">Controls Panel</Typography>
        <Box className={styles.innerBox}>
          <CategorySelect />
          <SimulationControls />
          <Button
            aria-label="Reset all data to initial state"
            name="reset-data"
            onClick={resetSimulations}
          >
            Reset data
          </Button>
        </Box>
      </Box>
    </aside>
  );
};
