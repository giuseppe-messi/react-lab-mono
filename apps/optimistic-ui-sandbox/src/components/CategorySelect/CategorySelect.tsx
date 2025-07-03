import styles from "./CategorySelect.module.css";
import { useCallback } from "react";
import { useShallow } from "zustand/shallow";
import {
  categoryOptions,
  useControlsPanelStore,
  type CategoryOption
} from "../../stores/useControlsPanelStore";

export const CategorySelect = () => {
  const [category, setCategory] = useControlsPanelStore(
    useShallow((state) => [state.category, state.setCategory])
  );

  const handleSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setCategory(e.target.value as CategoryOption),
    [setCategory]
  );

  return (
    <>
      <label htmlFor="category-select" className={styles.label}>
        Choose a category:
        <select
          id="category-select"
          name="category"
          value={category}
          onChange={handleSelect}
        >
          <option value="" disabled>
            Select an option
          </option>
          {categoryOptions.map((c) => (
            <option key={c.id} value={c.label} disabled={c.disabled}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};
