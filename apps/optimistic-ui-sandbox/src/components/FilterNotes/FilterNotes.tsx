import { useShallow } from "zustand/shallow";
import { Filter, type FilterItems } from "../Filter/Filter";
import { useNotesStore, type NoteFilterType } from "../../stores/useNotesStore";
import { useCallback, type ChangeEvent } from "react";

const noteFilterItems: FilterItems<NoteFilterType>[] = [
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
    <Filter items={noteFilterItems} selected={filter} onChange={handleChange} />
  );
};
