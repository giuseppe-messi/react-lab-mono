import { create } from "zustand";
import { HttpError } from "../utils/HttpError";
import { nanoid } from "nanoid";
import { subscribeWithSelector } from "zustand/middleware";
import { useControlsPanelStore } from "./useControlsPanelStore";

export const STORE_KEY = "todos-storage";

const getStateFromStore = (): { todos: Todo[]; filter: FilterType } => {
  const raw = localStorage.getItem(STORE_KEY);

  if (!raw) return { todos: [], filter: "all" };

  try {
    return JSON.parse(raw);
  } catch {
    return { todos: [], filter: "all" };
  }
};

export type FilterType = "all" | "active" | "completed";

export type Todo = {
  id: string;
  label: string;
  done: boolean;
};

type StateProps = {
  todos: Todo[];
  isLoading: boolean;
  error: Error | null;
  filter: FilterType;
  getTodos: () => void;
  addTodo: (label: string) => void;
  deleteTodo: (id: string) => void;
  editTodoLabel: (id: string, label: string) => void;
  toggleTodoDone: (id: string) => void;
  setFilter: (filter: FilterType) => void;
};

const simulateApiControls = async (work: () => void) => {
  const { mockLatency, mockError } = useControlsPanelStore.getState();

  // mock api delay
  if (mockLatency) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  // mock api error
  if (mockError) {
    throw new HttpError();
  }

  work();
};

const doAction = async (
  set: (
    partial:
      | StateProps
      | Partial<StateProps>
      | ((state: StateProps) => StateProps | Partial<StateProps>),
    replace?: false
  ) => void,
  work: () => void
) => {
  set({ isLoading: true });

  try {
    await simulateApiControls(work);
  } catch (err) {
    console.error(err);
    set({ error: err as Error });
  } finally {
    set({ isLoading: false });
  }
};

export const useTodosStore = create<StateProps>()(
  subscribeWithSelector((set) => ({
    todos: [],
    isLoading: false,
    error: null,
    filter: "all",

    getTodos: () => {
      doAction(set, () => {
        set((state) => ({ ...state, ...getStateFromStore() }));
      });
    },

    addTodo: (label) => {
      doAction(set, () => {
        set((state) => ({
          todos: [...state.todos, { id: nanoid(), done: false, label }]
        }));
      });
    },

    deleteTodo: (id) => {
      doAction(set, () => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id)
        }));
      });
    },

    editTodoLabel: (id, label) => {
      doAction(set, () => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, label: label } : todo
          )
        }));
      });
    },

    toggleTodoDone: (id) => {
      doAction(set, () => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
          )
        }));
      });
    },
    setFilter: (filter) => {
      set({
        filter
      });
    }
  }))
);

export const selectFilteredTodos = (state: StateProps) => {
  const { todos, filter } = state;
  if (filter === "active") return todos.filter((t) => !t.done);
  if (filter === "completed") return todos.filter((t) => t.done);
  return todos;
};
