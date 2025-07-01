import { create } from "zustand";
import { HttpError } from "../utils/HttpError";
import { nanoid } from "nanoid";
import { subscribeWithSelector } from "zustand/middleware";
import { useControlsPanelStore } from "./useControlsPanelStore";
import { useToastersStore } from "./useToastersStore";

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

type doActionMethodParams = {
  set: (
    partial:
      | StateProps
      | Partial<StateProps>
      | ((state: StateProps) => StateProps | Partial<StateProps>),
    replace?: false
  ) => void;
  work: () => void;
  onSucess?: () => void;
  onError?: () => void;
};

const doAction = async ({
  set,
  work,
  onSucess,
  onError
}: doActionMethodParams) => {
  set({ isLoading: true });

  try {
    await simulateApiControls(work);
    onSucess?.();
  } catch (err) {
    console.error(err);
    set({ error: err as Error });
    onError?.();
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
      doAction({
        set,
        work: () => {
          set((state) => ({ ...state, ...getStateFromStore() }));
        }
      });
    },

    addTodo: (label) => {
      doAction({
        set,
        work: () => {
          set((state) => ({
            todos: [...state.todos, { id: nanoid(), done: false, label }]
          }));
        },
        onSucess: () =>
          useToastersStore
            .getState()
            .enQueueToast("sucess", "Todo added successfully!"),
        onError: () => {
          useToastersStore
            .getState()
            .enQueueToast("error", "Something went wrong! Todo not added!");
        }
      });
    },

    deleteTodo: (id) => {
      doAction({
        set,
        work: () => {
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id)
          }));
        },
        onSucess: () =>
          useToastersStore
            .getState()
            .enQueueToast("sucess", "Todo deleted successfully!"),
        onError: () =>
          useToastersStore
            .getState()
            .enQueueToast("error", "Something went wrong! Todo not deleted!")
      });
    },

    editTodoLabel: (id, label) => {
      doAction({
        set,
        work: () => {
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, label: label } : todo
            )
          }));
        },
        onSucess: () =>
          useToastersStore
            .getState()
            .enQueueToast("sucess", "Todo edited successfully!"),
        onError: () =>
          useToastersStore
            .getState()
            .enQueueToast("error", "Something went wrong! Todo not edited!")
      });
    },

    toggleTodoDone: (id) => {
      doAction({
        set,
        work: () => {
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, done: !todo.done } : todo
            )
          }));
        },
        onSucess: () =>
          useToastersStore
            .getState()
            .enQueueToast("sucess", "Todo status was changed successfully!"),
        onError: () =>
          useToastersStore
            .getState()
            .enQueueToast(
              "error",
              "Something went wrong! Todo status wasn't changed!"
            )
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
