import { Select } from "../Select/Select";
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
    <Select
      name="category-select"
      labelText="Choose a category:"
      options={categoryOptions}
      value={category}
      onChange={handleSelect}
      getOptionValue={(option) => option.value}
      getOptionLabel={(option) => option.label}
      getOptionId={(option) => option.id}
      getOptionDisabled={(option) => option.disabled}
      placeholder="Select an option"
    />
  );
};
