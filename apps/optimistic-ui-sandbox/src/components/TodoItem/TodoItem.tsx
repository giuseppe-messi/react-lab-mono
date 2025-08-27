import { Checkbox, EmojiIcon, InputText } from "@react-lab-mono/ui";
import { useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useTodosStore, type Todo } from "../../stores/useTodosStore";
import styles from "./TodoItem.module.css";

export const TestLocators = {
  todoItem: "todoItem",
  editIcon: "editIcon",
  checkIcon: "checkIcon",
  deleteIcon: "deleteIcon"
};

export type TodoItemProps = {
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
    <li
      className={styles.todoListItem}
      data-testid={TestLocators.todoItem}
      key={todo.id}
      tabIndex={0}
    >
      {editingId === todo.id ? (
        <InputText
          className={styles.input}
          defaultValue={todo.label}
          id={`edit todo ${todo.id}`}
          name="edit todo"
          ref={textInputRef}
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
            data-testid={TestLocators.checkIcon}
            onClick={() => {
              handleUpdate(todo.id);
            }}
            role="button"
            type="check"
          />
        ) : (
          <EmojiIcon
            data-testid={TestLocators.editIcon}
            onClick={() => {
              onEditingId(todo.id);
            }}
            role="button"
            type="edit"
          />
        )}

        <Checkbox
          checked={todo.done}
          className={styles.checkbox}
          name="is todo done?"
          onChange={() => {
            toggleTodoDone(todo.id);
          }}
        />

        <XMarkIcon
          aria-label={`delete ${todo.label}`}
          className={styles.xIcon}
          data-testid={TestLocators.deleteIcon}
          onClick={() => {
            onDeleteTodo(todo.id);
          }}
          role="button"
        />
      </div>
    </li>
  );
};
