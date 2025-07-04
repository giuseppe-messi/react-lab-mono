import { RadioGroup } from "../RadioGroup/RadioGroup";
import { useShallow } from "zustand/shallow";
import { useTodosStore, type TodoFilterType } from "../../stores/useTodosStore";
import { useCallback, type ChangeEvent } from "react";

const todoFilterItems = [
  {
    value: "all",
    id: "filter-all"
  },
  {
    value: "active",
    id: "filter-active"
  },
  {
    value: "completed",
    id: "filter-completed"
  }
];

export const FilterTodos = () => {
  const [filter, setFilter] = useTodosStore(
    useShallow((state) => [state.filter, state.setFilter])
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setFilter(e.target.value as TodoFilterType),
    [setFilter]
  );

  return (
    <RadioGroup
      items={todoFilterItems}
      selected={filter}
      getItemId={(item) => item.id}
      getItemValue={(item) => item.value}
      onChange={handleChange}
    />
  );
};
