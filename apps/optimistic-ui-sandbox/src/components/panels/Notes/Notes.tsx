import { Box, Button, LoadingSpinner, Typography } from "@react-lab-mono/ui";
import { useCallback, useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import { FilterNotes } from "../../FilterNotes/FilterNotes";
import { NotesList } from "../../NotesList/NotesList";
import {
  selectFilteredNotes,
  useNotesStore
} from "../../../stores/useNotesStore";
import { AddNoteModal } from "../../AddNoteModal/AddNoteModal";
import styles from "./Notes.module.css";

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

  const handleHideModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <Box className={styles.container}>
      <Typography type="h2">Notes</Typography>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Box className={styles.header}>
            <Typography type="body">Add a new Note</Typography>
            <Button
              onClick={() => {
                setShowModal(true);
              }}
              size="sm"
              text="Add"
            />
          </Box>

          <AddNoteModal
            handleAddNote={handleAddNote}
            handleHideModal={handleHideModal}
            showModal={showModal}
            valueRef={valueRef}
          />

          <FilterNotes />
          <NotesList notes={filteredNotes} />

          <Typography className={styles.total} type="body">
            Total notes: {totalCount}
          </Typography>
        </>
      )}
    </Box>
  );
};
