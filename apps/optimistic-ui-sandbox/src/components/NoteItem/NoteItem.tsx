import { CloseIcon, EmojiIcon } from "@react-lab-mono/ui";
import { useEffect, useRef } from "react";
import { useNotesStore, type Note } from "../../stores/useNotesStore";
import styles from "./NoteItem.module.css";

export const TestLocators = {
  noteItem: "noteItem",
  editIcon: "editIcon",
  checkIcon: "checkIcon",
  deleteIcon: "deleteIcon"
};

export type NoteItemProps = {
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
    <li
      className={styles.noteListItem}
      data-testid={TestLocators.noteItem}
      key={note.id}
      tabIndex={0}
    >
      {editingId === note.id ? (
        <textarea
          aria-label="Edit note label"
          className={styles.textarea}
          defaultValue={note.text}
          id="new-note"
          name="note"
          placeholder="Enter some text"
          ref={textRef}
          required
        />
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
            data-testid={TestLocators.checkIcon}
            onClick={() => {
              handleUpdate(note.id);
            }}
            role="button"
            type="check"
          />
        ) : (
          <EmojiIcon
            className={styles.editIcon}
            data-testid={TestLocators.editIcon}
            onClick={() => {
              onEditingId(note.id);
            }}
            role="button"
            type="edit"
          />
        )}

        <input
          checked={note.done}
          name="is note done?"
          onChange={() => {
            toggleNoteDone(note.id);
          }}
          style={{ cursor: "pointer" }}
          type="checkbox"
        />

        <CloseIcon
          aria-label={`delete ${note.text}`}
          data-testid={TestLocators.deleteIcon}
          onClose={() => {
            onDeleteNote(note.id);
          }}
          role="button"
        />
      </div>
    </li>
  );
};
