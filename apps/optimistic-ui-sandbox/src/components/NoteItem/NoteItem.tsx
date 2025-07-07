import styles from "./NoteItem.module.css";
import { CloseIcon } from "../CloseIcon/CloseIcon";
import { EmojiIcon } from "../EmojiIcon";
import { useEffect, useRef } from "react";
import { useNotesStore, type Note } from "../../stores/useNotesStore";

type NoteItemProps = {
  note: Note;
  editingId: string;
  onEditingId: (id: string) => void;
  onUpdateNote: (id: string, text: string) => void;
  onDeleteNote: (id: string) => void;
};

export const NoteItem = ({
  note,
  editingId,
  onEditingId,
  onUpdateNote,
  onDeleteNote
}: NoteItemProps) => {
  const toggleNoteDone = useNotesStore((state) => state.toggleNoteDone);
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (editingId === note.id && textRef.current) {
      textRef.current.focus();
    }
  }, [editingId, note.id]);

  const handleUpdate = (id: string) => {
    if (textRef.current) {
      onUpdateNote(id, textRef.current.value);
    }
  };

  return (
    <li key={note.id} className={styles.noteListItem} tabIndex={0}>
      {editingId === note.id ? (
        <textarea
          ref={textRef}
          name="note"
          id="new-note"
          placeholder="Enter some text"
          aria-label="Edit note label"
          required
          className={styles.textarea}
          defaultValue={note.text}
        ></textarea>
      ) : (
        <span
          className={`${styles.noteListLabel} ${note.done ? styles.done : ""}`}
        >
          {note.text}
        </span>
      )}

      <div className={styles.iconsBox}>
        {editingId === note.id ? (
          <EmojiIcon
            type="check"
            onClick={() => handleUpdate(note.id)}
            role="button"
          />
        ) : (
          <EmojiIcon
            type="edit"
            onClick={() => onEditingId(note.id)}
            className={styles.editIcon}
            role="button"
          />
        )}

        <input
          type="checkbox"
          checked={note.done}
          name="is note done?"
          onChange={() => toggleNoteDone(note.id)}
          style={{ cursor: "pointer" }}
        />

        <CloseIcon
          aria-label={`delete ${note.text}`}
          onClose={() => onDeleteNote(note.id)}
          role="button"
        />
      </div>
    </li>
  );
};
