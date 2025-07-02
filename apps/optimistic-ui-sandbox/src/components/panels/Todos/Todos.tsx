import styles from "./Todos.module.css";
import { AddTodoModal } from "../../AddTodoModal/AddTodoModal";
import { Box } from "../../Box/Box";
import { Button } from "../../Button/Button";
import { FilterTodos } from "../../FilterTodos/FilterTodos";
import { LoadingSpinner } from "../../LoadingSpinner/LoadingSpinner";
import {
  selectFilteredTodos,
  useTodosStore
} from "../../../stores/useTodosStore";
import { TodosList } from "../../TodosList/TodosList";
import { Typography } from "../../Typography/Typography";
import { useCallback, useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";

export const Todos = () => {
  const filteredTodos = useTodosStore(useShallow(selectFilteredTodos));
  const [getTodos, addTodo, isLoading] = useTodosStore(
    useShallow((state) => [state.getTodos, state.addTodo, state.isLoading])
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

  const handleHideModal = useCallback(() => setShowModal(false), []);

  return (
    <Box>
      <Typography type="h2">Todos</Typography>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Box className={styles.header}>
            <Typography type="body">Add a new todo</Typography>
            <Button size="sm" onClick={() => setShowModal(true)} text="Add" />
          </Box>

          <AddTodoModal
            showModal={showModal}
            valueRef={valueRef}
            handleAddTodo={handleAddTodo}
            handleHideModal={handleHideModal}
          />

          <FilterTodos />
          <TodosList todos={filteredTodos} />
          <Typography type="body" className={styles.total}>
            Total todos: {filteredTodos.length}
          </Typography>
        </>
      )}
    </Box>
  );
};

// return (
//   <Box>
//     <Typography type="h2">Todos</Typography>

//     {error && (
//       <Typography type="h3" className={styles.errorText}>
//         Something went wrong! Try again!
//       </Typography>
//     )}
//     {isLoading && <LoadingSpinner />}

//     {!isLoading && !error && (
//       <>
//         <Box className={styles.header}>
//           <Typography type="body">Add a new todo</Typography>
//           <Button size="sm" onClick={() => setShowModal(true)} text="Add" />
//         </Box>

//         <AddTodoModal
//           showModal={showModal}
//           valueRef={valueRef}
//           handleAddTodo={handleAddTodo}
//           handleHideModal={handleHideModal}
//         />

//         <FilterTodos />
//         <TodosList todos={filteredTodos} />
//         <Typography type="body" className={styles.total}>
//           Total todos: {filteredTodos.length}
//         </Typography>
//       </>
//     )}
//   </Box>
// );
