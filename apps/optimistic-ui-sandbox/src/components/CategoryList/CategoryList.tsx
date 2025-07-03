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
  bookmarks: <></>,
  contacts: <></>
};

export const CategoryList = () => {
  const category = useControlsPanelStore((state) => state.category);

  return <main className={styles.main}>{panels[category]}</main>;
};
