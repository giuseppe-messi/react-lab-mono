import styles from "./Notes.module.css";
import { AddNoteModal } from "../../AddNoteModal/AddNoteModal";
import { Box } from "../../Box/Box";
import { Button } from "../../Button/Button";
import { FilterNotes } from "../../FilterNotes/FilterNotes";
import { LoadingSpinner } from "../../LoadingSpinner/LoadingSpinner";
import { NotesList } from "../../NotesList/NotesList";
import {
  selectFilteredNotes,
  useNotesStore
} from "../../../stores/useNotesStore";
import { Typography } from "../../Typography/Typography";
import { useCallback, useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";

export const Notes = () => {
  const filteredNotes = useNotesStore(useShallow(selectFilteredNotes));
  const [getNotes, addNote, isLoading] = useNotesStore(
    useShallow((state) => [state.getNotes, state.addNote, state.isLoading])
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
    <Box>
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
            Total notes: {filteredNotes.length}
          </Typography>
        </>
      )}
    </Box>
  );
};
