import { create } from "zustand";
import { nanoid } from "nanoid";
import { useControlsPanelStore } from "./useControlsPanelStore";

const STORE_KEY = "todos-storage";

type Setter = {
  (
    partial:
      | StateProps
      | Partial<StateProps>
      | ((state: StateProps) => StateProps | Partial<StateProps>),
    replace?: false
  ): void;
  (
    state: StateProps | ((state: StateProps) => StateProps),
    replace: true
  ): void;
};

const getStateFromStore = (): { todos: Todo[]; filter: FilterType } => {
  const raw = localStorage.getItem(STORE_KEY);

  if (!raw) return { todos: [], filter: "all" };

  try {
    return JSON.parse(raw);
  } catch {
    return { todos: [], filter: "all" };
  }
};

const updateLocalStore = (newState: { todos: Todo[]; filter: FilterType }) => {
  const stringified = JSON.stringify(newState);
  localStorage.setItem(STORE_KEY, stringified);
};

const syncZustandWithLocalStore = (
  setter: Setter,
  newState: {
    todos: Todo[];
    filter: FilterType;
  }
) => setter((state) => ({ ...state, ...newState }));

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

export const useTodosStore = create<StateProps>()((set) => ({
  todos: [],
  isLoading: false,
  error: null,
  filter: "all",

  getTodos: async () => {
    set({ isLoading: true });
    const { mockLatency } = useControlsPanelStore.getState();

    try {
      if (mockLatency) {
        // fake API delay
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
      set((state) => ({ ...state, ...getStateFromStore() }));
    } catch (err) {
      set({ error: err as Error });
    } finally {
      set({ isLoading: false });
    }
  },

  addTodo: (label) => {
    const newTodo: Todo = { id: nanoid(), done: false, label };
    const store = getStateFromStore();
    const newStore = { ...store, todos: [...store.todos, newTodo] };
    updateLocalStore(newStore);
    syncZustandWithLocalStore(set, newStore);
  },

  deleteTodo: (id) => {
    const store = getStateFromStore();
    const newTodos = store.todos.filter((todo) => todo.id !== id);
    const newStore = { ...store, todos: newTodos };
    updateLocalStore(newStore);
    syncZustandWithLocalStore(set, newStore);
  },

  editTodoLabel: (id, label) => {
    const store = getStateFromStore();
    const newTodos = store.todos.map((todo) =>
      todo.id === id ? { ...todo, label: label } : todo
    );
    const newStore = { ...store, todos: newTodos };
    updateLocalStore(newStore);
    syncZustandWithLocalStore(set, newStore);
  },

  toggleTodoDone: (id) => {
    const store = getStateFromStore();
    const newTodos = store.todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    const newStore = { ...store, todos: newTodos };
    updateLocalStore(newStore);
    syncZustandWithLocalStore(set, newStore);
  },
  setFilter: (filter) => {
    const store = getStateFromStore();
    const newStore = { ...store, filter };
    updateLocalStore(newStore);
    syncZustandWithLocalStore(set, newStore);
  }
}));

export const selectFilteredTodos = (state: StateProps) => {
  const { todos, filter } = state;
  if (filter === "active") return todos.filter((t) => !t.done);
  if (filter === "completed") return todos.filter((t) => t.done);
  return todos;
};
