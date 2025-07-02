import styles from "./CategoryList.module.css";
import { Notes } from "../panels/Notes/Notes";
import { Todos } from "../panels/Todos/Todos";
import type { JSX } from "react";
import {
  useControlsPanelStore,
  type CategoryOption
} from "../../stores/useControlsPanelStore";

const panels: Record<CategoryOption, JSX.Element> = {
  todos: <Todos />,
  notes: <Notes />,
  bookmarks: <h4>bookmarks</h4>,
  contacts: <h4>contacts</h4>
};

export const CategoryList = () => {
  const category = useControlsPanelStore((state) => state.category);

  return <main className={styles.resourceList}>{panels[category]}</main>;
};
