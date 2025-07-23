import { LoadingSpinner } from "@react-lab-mono/ui";
import { useCallback, useState } from "react";
import { useShallow } from "zustand/shallow";
import { TodoItem } from "../TodoItem/TodoItem";
import { useTodosStore, type Todo } from "../../stores/useTodosStore";
import styles from "./TodosList.module.css";

type TodosListProps = {
  todos: Todo[];
};

export const TodosList = ({ todos }: TodosListProps) => {
  const [editingId, setEditingId] = useState("");
  const [deleteTodo, editTodoLabel, isLoading] = useTodosStore(
    useShallow((state) => [
      state.deleteTodo,
      state.editTodoLabel,
      state.isLoading
    ])
  );

  const handleEditingId = useCallback((id: string) => {
    setEditingId(id);
  }, []);

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
          editingId={editingId}
          key={todo.id}
          onDeleteTodo={deleteTodo}
          onEditingId={handleEditingId}
          onUpdateTodo={handleUpdateTodo}
          todo={todo}
        />
      ))}
      {isLoading ? <LoadingSpinner /> : null}
    </ul>
  );
};
