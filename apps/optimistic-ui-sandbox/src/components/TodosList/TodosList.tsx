import styles from "./TodosList.module.css";
import { TodoItem } from "../TodoItem/TodoItem";
import { useCallback, useState } from "react";
import { useTodosStore, type Todo } from "../../stores/todosStore";

type TodosListProps = {
  todos: Todo[];
};

export const TodosList = ({ todos }: TodosListProps) => {
  const [editingId, setEditingId] = useState("");
  const { deleteTodo, editTodoLabel } = useTodosStore();

  const handleEditingId = useCallback((id: string) => setEditingId(id), []);

  const handleUpdateTodo = useCallback(
    (id: string, label: string) => {
      editTodoLabel(id, label);
      setEditingId("");
    },
    [editTodoLabel]
  );

  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          editingId={editingId}
          onEditingId={handleEditingId}
          onDeleteTodo={deleteTodo}
          onUpdateTodo={handleUpdateTodo}
        />
      ))}
    </ul>
  );
};
