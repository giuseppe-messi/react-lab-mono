import { create } from "zustand";
import { nanoid } from "nanoid";

export type Todo = {
  id: string;
  label: string;
  done: boolean;
};

type StateProps = {
  todos: Todo[];
  addTodo: (label: string) => void;
  deleteTodo: (id: string) => void;
  editTodoLabel: (id: string, label: string) => void;
  toggleTodoDone: (id: string) => void;
};

export const useTodosStore = create<StateProps>()((set) => ({
  todos: [],

  addTodo: (label) =>
    set((state) => ({
      todos: [...state.todos, { id: nanoid(), done: false, label: label }]
    })),

  deleteTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),

  editTodoLabel: (id, label) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, label: label } : todo
      )
    })),

  toggleTodoDone: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    }))
}));
