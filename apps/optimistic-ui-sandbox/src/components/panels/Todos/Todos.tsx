import { AddTodoModal } from "../../AddTodoModal/AddTodoModal";
import { Card } from "../../Card/Card";
import { TodosList } from "../../TodosList/TodosList";
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
    <Card size="md">
      <h4>Todos</h4>

      <button onClick={() => setShowModal(true)}>Add</button>

      <AddTodoModal
        showModal={showModal}
        valueRef={valueRef}
        handleAddTodo={handleAddTodo}
        handleHideModal={handleHideModal}
      />

      <TodosList todos={todos} />
    </Card>
  );
};
