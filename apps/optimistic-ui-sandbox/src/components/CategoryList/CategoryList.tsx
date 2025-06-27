import styles from "./CategoryList.module.css";
import { Todos } from "../panels/Todos/Todos";
import type { JSX } from "react";
import {
  useControlsPanelStore,
  type CategoryOption
} from "../../stores/useControlsPanelStore";

const panels: Record<CategoryOption, JSX.Element> = {
  todos: <Todos />,
  notes: <h4>notes</h4>,
  bookmarks: <h4>bookmarks</h4>,
  contacts: <h4>contacts</h4>
};

export const CategoryList = () => {
  const category = useControlsPanelStore((state) => state.category);

  return <main className={styles.resourceList}>{panels[category]}</main>;
};
