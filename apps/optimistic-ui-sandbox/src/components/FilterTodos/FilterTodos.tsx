import { RadioGroup } from "../RadioGroup";
import { useShallow } from "zustand/shallow";
import {
  todoFilters,
  useTodosStore,
  type TodoFilterType
} from "../../stores/useTodosStore";
import { useCallback, type ChangeEvent } from "react";

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
    <RadioGroup items={todoFilters} selected={filter} onChange={handleChange} />
  );
};
