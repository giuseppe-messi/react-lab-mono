import { RadioGroup } from "../RadioGroup/RadioGroup";
import { useShallow } from "zustand/shallow";
import { useNotesStore, type NoteFilterType } from "../../stores/useNotesStore";
import { useCallback, type ChangeEvent } from "react";

const noteFilterItems = [
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
    <RadioGroup
      items={noteFilterItems}
      selected={filter}
      getItemId={(item) => item.id}
      getItemValue={(item) => item.value}
      onChange={handleChange}
    />
  );
};
