import { useShallow } from "zustand/shallow";
import { Filter, type FilterItems } from "../Filter/Filter";
import { useTodosStore, type TodoFilterType } from "../../stores/useTodosStore";
import { useCallback, type ChangeEvent } from "react";

const todoFilterItems: FilterItems<TodoFilterType>[] = [
  {
    value: "all",
    label: "all",
    role: "radio",
    type: "radio",
    id: "filter-all",
    name: "filter"
  },
  {
    value: "active",
    label: "active",
    role: "radio",
    type: "radio",
    id: "filter-active",
    name: "filter"
  },
  {
    value: "completed",
    label: "completed",
    role: "radio",
    type: "radio",
    id: "filter-completed",
    name: "filter"
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
    <Filter
      items={todoFilterItems}
      selected={filter}
      onChange={handleChange}
      className="maxWidthStretch"
    />
  );
};
