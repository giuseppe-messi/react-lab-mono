import styles from "./Todos.module.css";
import { AddTodoModal } from "../../AddTodoModal/AddTodoModal";
import { Box } from "../../Box/Box";
import { Button } from "../../Button/Button";
import { FilterTodos } from "../../FilterTodos/FilterTodos";
import { TodosList } from "../../TodosList/TodosList";
import { Typography } from "../../Typography/Typography";
import { useCallback, useRef, useState } from "react";
import { useTodosStore } from "../../../stores/todosStore";

export const Todos = () => {
  const { todos, addTodo } = useTodosStore();
  const [showModal, setShowModal] = useState(false);
  const valueRef = useRef<HTMLInputElement | null>(null);

  const handleAddTodo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (valueRef.current) {
        addTodo(valueRef.current.value);
        valueRef.current.value = "";
        setShowModal(false);
      }
    },
    [addTodo]
  );

  const handleHideModal = useCallback(() => setShowModal(false), []);

  return (
    <Box>
      <Typography type="h3">Todos</Typography>

      <Box className={styles.header}>
        <Typography type="body">Add a new todo</Typography>
        <Button onClick={() => setShowModal(true)} text="Add" />
      </Box>

      <AddTodoModal
        showModal={showModal}
        valueRef={valueRef}
        handleAddTodo={handleAddTodo}
        handleHideModal={handleHideModal}
      />

      <FilterTodos />
      <TodosList todos={todos} />
    </Box>
  );
};
