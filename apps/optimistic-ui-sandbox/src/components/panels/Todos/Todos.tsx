import { Box, Button, LoadingSpinner, Typography } from "@react-lab-mono/ui";
import { useCallback, useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import { FilterTodos } from "../../FilterTodos/FilterTodos";
import {
  selectFilteredTodos,
  useTodosStore
} from "../../../stores/useTodosStore";
import { TodosList } from "../../TodosList/TodosList";
import { AddTodoModal } from "../../AddTodoModal/AddTodoModal";
import styles from "./Todos.module.css";

export const Todos = () => {
  const filteredTodos = useTodosStore(useShallow(selectFilteredTodos));
  const [totalCount, getTodos, addTodo, isLoading] = useTodosStore(
    useShallow((state) => [
      state.totalCount,
      state.getTodos,
      state.addTodo,
      state.isLoading
    ])
  );

  const [showModal, setShowModal] = useState(false);
  const valueRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

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

  const handleHideModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <Box className={styles.container}>
      <Typography type="h2">Todos</Typography>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Box className={styles.header}>
            <Typography type="body">Add a new todo</Typography>
            <Button
              onClick={() => {
                setShowModal(true);
              }}
              size="sm"
            >
              Add
            </Button>
          </Box>

          <AddTodoModal
            handleAddTodo={handleAddTodo}
            handleHideModal={handleHideModal}
            showModal={showModal}
            valueRef={valueRef}
          />

          <FilterTodos />
          <TodosList todos={filteredTodos} />

          <Typography className={styles.total} type="body">
            Total todos: {totalCount}
          </Typography>
        </>
      )}
    </Box>
  );
};
