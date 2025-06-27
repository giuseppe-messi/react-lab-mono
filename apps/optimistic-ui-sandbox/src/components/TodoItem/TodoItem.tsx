import styles from "./TodoItem.module.css";
import { CloseIcon } from "../CloseIcon/CloseIcon";
import { EmojiIcon } from "../EmojiIcon/EmojiIcon";
import { useEffect, useRef } from "react";
import { useTodosStore, type Todo } from "../../stores/useTodosStore";

type TodoItemProps = {
  todo: Todo;
  editingId: string;
  onEditingId: (id: string) => void;
  onUpdateTodo: (id: string, label: string) => void;
  onDeleteTodo: (id: string) => void;
};

export const TodoItem = ({
  todo,
  editingId,
  onEditingId,
  onUpdateTodo,
  onDeleteTodo
}: TodoItemProps) => {
  const toggleTodoDone = useTodosStore((state) => state.toggleTodoDone);
  const textInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editingId === todo.id && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [editingId, todo.id]);

  const handleUpdate = (id: string) => {
    if (textInputRef.current) {
      onUpdateTodo(id, textInputRef.current.value);
    }
  };

  return (
    <li key={todo.id} className={styles.todoListItem} tabIndex={0}>
      {editingId === todo.id ? (
        <input
          type="text"
          name="label"
          aria-label="Edit todo label"
          ref={textInputRef}
          className={styles.input}
          defaultValue={todo.label}
        />
      ) : (
        <span
          className={`${styles.todoListLabel} ${todo.done ? styles.done : ""}`}
        >
          {todo.label}
        </span>
      )}

      <div className={styles.iconsBox}>
        {editingId === todo.id ? (
          <EmojiIcon
            type="check"
            onClick={() => handleUpdate(todo.id)}
            role="button"
          />
        ) : (
          <EmojiIcon
            type="edit"
            onClick={() => onEditingId(todo.id)}
            className={styles.editIcon}
            role="button"
          />
        )}

        <input
          type="checkbox"
          checked={todo.done}
          name="is todo done?"
          onChange={() => toggleTodoDone(todo.id)}
          style={{ cursor: "pointer" }}
        />

        <CloseIcon
          aria-label={`delete ${todo.label}`}
          onClose={() => onDeleteTodo(todo.id)}
          role="button"
        />
      </div>
    </li>
  );
};
