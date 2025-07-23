import { LoadingSpinner } from "@react-lab-mono/ui";
import { useCallback, useState } from "react";
import { useShallow } from "zustand/shallow";
import { NoteItem } from "../NoteItem/NoteItem";
import { useNotesStore, type Note } from "../../stores/useNotesStore";
import styles from "./NotesList.module.css";

type NotesListProps = {
  notes: Note[];
};

export const NotesList = ({ notes }: NotesListProps) => {
  const [editingId, setEditingId] = useState("");
  const [deleteNote, editNoteText, isLoading] = useNotesStore(
    useShallow((state) => [
      state.deleteNote,
      state.editNoteText,
      state.isLoading
    ])
  );

  const handleEditingId = useCallback((id: string) => {
    setEditingId(id);
  }, []);

  const handleUpdateNote = useCallback(
    (id: string, text: string) => {
      editNoteText(id, text);
      setEditingId("");
    },
    [editNoteText]
  );

  return (
    <ul className={styles.noteList}>
      {notes.map((note) => (
        <NoteItem
          editingId={editingId}
          key={note.id}
          note={note}
          onDeleteNote={deleteNote}
          onEditingId={handleEditingId}
          onUpdateNote={handleUpdateNote}
        />
      ))}
      {isLoading ? <LoadingSpinner /> : null}
    </ul>
  );
};
