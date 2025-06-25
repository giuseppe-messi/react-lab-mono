import styles from "./TodosList.module.css";
import { CloseIcon } from "../CloseIcon/CloseIcon";
import { useTodosStore, type Todo } from "../../stores/todosStore";

type TodosListProps = {
  todos: Todo[];
};

export const TodosList = ({ todos }: TodosListProps) => {
  const { deleteTodo } = useTodosStore();

  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <li key={todo.id} className={styles.todoListItem} tabIndex={0}>
          <span className={styles.todoListLabel}>{todo.label}</span>

          <CloseIcon
            aria-label={`delete ${todo.label}`}
            onClose={() => deleteTodo(todo.id)}
          />
        </li>
      ))}
    </ul>
  );
};
