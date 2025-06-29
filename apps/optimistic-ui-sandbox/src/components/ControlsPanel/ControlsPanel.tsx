import styles from "./ControlsPanel.module.css";
import { Box } from "../Box/Box";
import { CategorySelect } from "../CategorySelect/CategorySelect";
import { SimulationControls } from "../SimulationControls/SimulationControls";
import { Typography } from "../Typography/Typography";

export const ControlsPanel = () => {
  return (
    <aside className={styles.ctrlPanel} aria-label="Controls Panel">
      <Box>
        <Typography type="h2">Controls Panel</Typography>
        <CategorySelect />
        <SimulationControls />
      </Box>
    </aside>
  );
};
