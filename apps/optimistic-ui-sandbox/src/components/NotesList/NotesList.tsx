import styles from "./NotesList.module.css";
import { LoadingSpinner } from "../LoadingSpinner";
import { NoteItem } from "../NoteItem/NoteItem";
import { useCallback, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useNotesStore, type Note } from "../../stores/useNotesStore";

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

  const handleEditingId = useCallback((id: string) => setEditingId(id), []);

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
          key={note.id}
          note={note}
          editingId={editingId}
          onEditingId={handleEditingId}
          onDeleteNote={deleteNote}
          onUpdateNote={handleUpdateNote}
        />
      ))}
      {isLoading && <LoadingSpinner />}
    </ul>
  );
};
