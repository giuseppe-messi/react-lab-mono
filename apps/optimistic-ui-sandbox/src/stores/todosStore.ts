import { create } from "zustand";
import { nanoid } from "nanoid";
import { persist } from "zustand/middleware";

export type FilterType = "all" | "active" | "completed";

export type Todo = {
  id: string;
  label: string;
  done: boolean;
};

type StateProps = {
  todos: Todo[];
  filter: FilterType;
  addTodo: (label: string) => void;
  deleteTodo: (id: string) => void;
  editTodoLabel: (id: string, label: string) => void;
  toggleTodoDone: (id: string) => void;
  setFilter: (filter: FilterType) => void;
};

export const useTodosStore = create<StateProps>()(
  persist(
    (set) => ({
      todos: [],
      filter: "all",

      addTodo: (label) =>
        set((state) => ({
          todos: [...state.todos, { id: nanoid(), done: false, label: label }]
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id)
        })),

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
        })),

      setFilter: (filter) => set(() => ({ filter: filter }))
    }),
    {
      name: "todos-storage"
    }
  )
);

export const selectFilteredTodos = (state: StateProps) => {
  const { todos, filter } = state;
  if (filter === "active") return todos.filter((t) => !t.done);
  if (filter === "completed") return todos.filter((t) => t.done);
  return todos;
};
