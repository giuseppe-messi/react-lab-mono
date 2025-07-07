import { RadioGroup } from "../RadioGroup";
import { useShallow } from "zustand/shallow";
import {
  noteFilters,
  useNotesStore,
  type NoteFilterType
} from "../../stores/useNotesStore";
import { useCallback, type ChangeEvent } from "react";

export const FilterNotes = () => {
  const [filter, setFilter] = useNotesStore(
    useShallow((state) => [state.filter, state.setFilter])
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setFilter(e.target.value as NoteFilterType),
    [setFilter]
  );

  return (
    <RadioGroup items={noteFilters} selected={filter} onChange={handleChange} />
  );
};
