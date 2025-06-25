import styles from "./FilterTodos.module.css";
import { Box } from "../Box/Box";
import { useCallback, useState, type ChangeEvent } from "react";

type FilterTypes = "all" | "active" | "completed";

export const FilterTodos = () => {
  const [filter, setFilter] = useState<FilterTypes>("all");

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setFilter(e.target.value as FilterTypes),
    []
  );

  return (
    <Box className={styles.card}>
      <div
        className={styles.inputsBox}
        role="radiogroup"
        aria-label="Filter todos"
      >
        <div role="radio" aria-checked={filter === "all"}>
          <input
            type="radio"
            id="filter-all"
            name="filter"
            value="all"
            checked={filter === "all"}
            onChange={handleChange}
          />
          <label htmlFor="filter-all">All</label>
        </div>

        <div role="radio" aria-checked={filter === "active"}>
          <input
            type="radio"
            id="filter-active"
            name="filter"
            value="active"
            checked={filter === "active"}
            onChange={handleChange}
          />
          <label htmlFor="filter-active">Active</label>
        </div>

        <div role="radio" aria-checked={filter === "completed"}>
          <input
            type="radio"
            id="filter-completed"
            name="filter"
            value="completed"
            checked={filter === "completed"}
            onChange={handleChange}
          />
          <label htmlFor="filter-completed">Completed</label>
        </div>
      </div>
    </Box>
  );
};
