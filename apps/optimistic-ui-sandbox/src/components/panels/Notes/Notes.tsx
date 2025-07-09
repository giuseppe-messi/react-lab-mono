import styles from "./Notes.module.css";
import { AddNoteModal } from "../../AddNoteModal/AddNoteModal";
import { Box } from "@react-lab-mono/ui";
import { Button } from "@react-lab-mono/ui";
import { FilterNotes } from "../../FilterNotes/FilterNotes";
import { LoadingSpinner, Typography } from "@react-lab-mono/ui";
import { NotesList } from "../../NotesList/NotesList";
import {
  selectFilteredNotes,
  useNotesStore
} from "../../../stores/useNotesStore";
import { useCallback, useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";

export const Notes = () => {
  const filteredNotes = useNotesStore(useShallow(selectFilteredNotes));
  const [totalCount, getNotes, addNote, isLoading] = useNotesStore(
    useShallow((state) => [
      state.totalCount,
      state.getNotes,
      state.addNote,
      state.isLoading
    ])
  );

  const [showModal, setShowModal] = useState(false);
  const valueRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  const handleAddNote = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (valueRef.current) {
        addNote(valueRef.current.value);
        valueRef.current.value = "";
        setShowModal(false);
      }
    },
    [addNote]
  );

  const handleHideModal = useCallback(() => setShowModal(false), []);

  return (
    <Box className={styles.container}>
      <Typography type="h2">Notes</Typography>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Box className={styles.header}>
            <Typography type="body">Add a new Note</Typography>
            <Button size="sm" onClick={() => setShowModal(true)} text="Add" />
          </Box>

          <AddNoteModal
            showModal={showModal}
            valueRef={valueRef}
            handleAddNote={handleAddNote}
            handleHideModal={handleHideModal}
          />

          <FilterNotes />
          <NotesList notes={filteredNotes} />

          <Typography type="body" className={styles.total}>
            Total notes: {totalCount}
          </Typography>
        </>
      )}
    </Box>
  );
};
