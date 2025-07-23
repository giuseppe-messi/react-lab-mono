import type { JSX } from "react";
import { hydrateAndSubscribe } from "../../localStorage";
import { Notes } from "../panels/Notes/Notes";
import { Todos } from "../panels/Todos/Todos";
import {
  useControlsPanelStore,
  type CategoryOption
} from "../../stores/useControlsPanelStore";
import styles from "./CategoryList.module.css";

// local storage sync up with stores
hydrateAndSubscribe();

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
