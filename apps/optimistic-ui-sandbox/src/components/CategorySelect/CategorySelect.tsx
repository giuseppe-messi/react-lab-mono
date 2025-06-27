import { Box } from "../Box/Box";
import { useCallback } from "react";
import { useShallow } from "zustand/shallow";
import {
  CATEGORY_OPTIONS,
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
    <Box>
      <label htmlFor="category-select">Choose a category:</label>
      <select
        id="category-select"
        name="category"
        value={category}
        onChange={handleSelect}
      >
        <option value="" disabled>
          Select an option
        </option>

        {CATEGORY_OPTIONS.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </Box>
  );
};
