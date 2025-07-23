import { Select } from "@react-lab-mono/ui";
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
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(e.target.value as CategoryOption);
    },
    [setCategory]
  );

  return (
    <Select
      getOptionDisabled={(option) => option.disabled}
      getOptionId={(option) => option.id}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.value}
      labelText="Choose a category:"
      name="category-select"
      onChange={handleSelect}
      options={categoryOptions}
      placeholder="Select an option"
      value={category}
    />
  );
};
