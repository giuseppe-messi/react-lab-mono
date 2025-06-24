import styles from "./ControlsPanel.module.css";
import { ResourceSelect } from "../ResourceSelect/ResourceSelect";

export const ControlsPanel = () => {
  return (
    <aside className={styles.ctrlPanel} aria-label="Controls Panel">
      <h4>Controls Panel</h4>

      <ResourceSelect />
    </aside>
  );
};
