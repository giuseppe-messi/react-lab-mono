import { RadioGroup } from "@react-lab-mono/ui";
import { useShallow } from "zustand/shallow";
import { useCallback, type ChangeEvent } from "react";
import {
  todoFilters,
  useTodosStore,
  type TodoFilterType
} from "../../stores/useTodosStore";

export const FilterTodos = () => {
  const [filter, setFilter] = useTodosStore(
    useShallow((state) => [state.filter, state.setFilter])
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFilter(e.target.value as TodoFilterType);
    },
    [setFilter]
  );

  return (
    <RadioGroup items={todoFilters} onChange={handleChange} selected={filter} />
  );
};
