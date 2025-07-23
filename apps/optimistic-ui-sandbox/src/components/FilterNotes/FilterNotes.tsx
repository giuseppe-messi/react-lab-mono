import { RadioGroup } from "@react-lab-mono/ui";
import { useShallow } from "zustand/shallow";
import { useCallback, type ChangeEvent } from "react";
import {
  noteFilters,
  useNotesStore,
  type NoteFilterType
} from "../../stores/useNotesStore";

export const FilterNotes = () => {
  const [filter, setFilter] = useNotesStore(
    useShallow((state) => [state.filter, state.setFilter])
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFilter(e.target.value as NoteFilterType);
    },
    [setFilter]
  );

  return (
    <RadioGroup items={noteFilters} onChange={handleChange} selected={filter} />
  );
};
