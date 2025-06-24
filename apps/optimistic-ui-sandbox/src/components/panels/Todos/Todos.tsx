import { useCallback, useRef } from "react";
import { useTodosStore } from "../../../stores/todosStore";

export const Todos = () => {
  const { todos, addTodo } = useTodosStore();

  console.log(" todos:", todos);

  const valueRef = useRef<HTMLInputElement | null>(null);

  const handleAddTodo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (valueRef.current) {
        addTodo(valueRef.current.value);
      }
    },
    [addTodo]
  );

  return (
    <div>
      <h4>Todos</h4>

      <form onSubmit={handleAddTodo}>
        <label htmlFor="new-todo">New Todo:</label>
        <input
          id="new-todo"
          type="text"
          ref={valueRef}
          placeholder="Enter todo label"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.label}</li>
        ))}
      </ul>
    </div>
  );
};
