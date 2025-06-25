import { create } from "zustand";
import { nanoid } from "nanoid";

export type Todo = {
  id: string;
  label: string;
};

type StateProps = {
  todos: Todo[];
  addTodo: (label: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (selectedTodo: Todo) => void;
};

export const useTodosStore = create<StateProps>()((set) => ({
  todos: [],
  addTodo: (label) =>
    set((state) => ({
      todos: [...state.todos, { id: nanoid(), label: label }]
    })),
  deleteTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
  editTodo: (selectedTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === selectedTodo.id
          ? { ...todo, label: selectedTodo.label }
          : todo
      )
    }))
}));
