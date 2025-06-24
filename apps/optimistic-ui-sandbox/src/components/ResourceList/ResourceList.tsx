import styles from "./ResourceList.module.css";
import { useResourceStore } from "../../stores/resourceStore";
import type { ResourceOption } from "../../interfaces";
import type { JSX } from "react";

const panels: Record<ResourceOption, JSX.Element> = {
  todos: <h4>todos</h4>,
  notes: <h4>notes</h4>,
  bookmarks: <h4>bookmarks</h4>,
  contacts: <h4>contacts</h4>
};

export const ResourceList = () => {
  const selected = useResourceStore((state) => state.selected);

  return <div className={styles.resourceList}>{panels[selected]}</div>;
};
