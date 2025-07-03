import { create } from "zustand";
import { HttpError } from "../utils/HttpError";
import {
  maxLatencyRandomValue,
  useControlsPanelStore
} from "./useControlsPanelStore";
import { nanoid } from "nanoid";
import { subscribeWithSelector } from "zustand/middleware";
import { useToastersStore } from "./useToastersStore";

export const TODOS_STORE_KEY = "todos-storage";

const getStateFromStore = (): { todos: Todo[]; filter: TodoFilterType } => {
  const raw = localStorage.getItem(TODOS_STORE_KEY);

  if (!raw) return { todos: [], filter: "all" };

  try {
    return JSON.parse(raw);
  } catch {
    return { todos: [], filter: "all" };
  }
};

export type TodoFilterType = "all" | "active" | "completed";

export type Todo = {
  id: string;
  label: string;
  done: boolean;
};

type StateProps = {
  todos: Todo[];
  isLoading: boolean;
  error: Error | null;
  filter: TodoFilterType;
  getTodos: () => void;
  addTodo: (label: string) => void;
  deleteTodo: (id: string) => void;
  editTodoLabel: (id: string, label: string) => void;
  toggleTodoDone: (id: string) => void;
  setFilter: (filter: TodoFilterType) => void;
};

const simulateApiControls = async () => {
  const { mockLatency, mockError } = useControlsPanelStore.getState();

  // mock api delay
  if (mockLatency) {
    const delay =
      mockLatency === "random"
        ? Math.random() * maxLatencyRandomValue
        : Number(mockLatency);

    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  // mock api error
  if (mockError) {
    throw new HttpError();
  }
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
  api?: () => Promise<void>;
  onSucess?: () => void;
  onError?: () => void;
  rollback?: () => void;
  onFinally?: () => void;
};

const doAction = async ({
  set,
  work,
  api,
  onSucess,
  onError,
  rollback,
  onFinally
}: doActionMethodParams) => {
  set({ error: null });
  try {
    work();
    await api?.();
    onSucess?.();
  } catch (err) {
    console.error(err);
    set({ error: err as Error });
    onError?.();
    rollback?.();
  } finally {
    onFinally?.();
  }
};

let todosSnap: Todo[] | null = null;

const enQueueErrorToast = (text: string) =>
  useToastersStore.getState().enQueueToast("error", text);

const enQueueSucessToast = (text: string) =>
  useToastersStore.getState().enQueueToast("sucess", text);

export const useTodosStore = create<StateProps>()(
  subscribeWithSelector((set, get) => ({
    todos: [],
    isLoading: false,
    error: null,
    filter: "all",

    getTodos: async () => {
      set({ isLoading: true, error: null });

      doAction({
        set,
        work: () => set((state) => ({ ...state, ...getStateFromStore() })),
        api: () => simulateApiControls(),
        onError: () =>
          enQueueErrorToast("Something went wrong fetching the todos!"),
        onFinally: () => set({ isLoading: false })
      });
    },

    addTodo: (label) => {
      const newTodoId = nanoid();
      doAction({
        set,
        work: () => {
          set((state) => ({
            todos: [...state.todos, { id: newTodoId, done: false, label }]
          }));
        },
        api: () => simulateApiControls(),
        onSucess: () => enQueueSucessToast("Todo added successfully!"),
        onError: () =>
          enQueueErrorToast("Something went wrong! Todo not added!"),
        rollback: () =>
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== newTodoId)
          }))
      });
    },

    deleteTodo: (id) => {
      const { todos } = get();

      if (!todosSnap) {
        todosSnap = todos;
      }

      doAction({
        set,
        work: () => {
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id)
          }));
        },
        api: () => simulateApiControls(),
        onSucess: () => {
          enQueueSucessToast("Todo deleted successfully!");
          todosSnap = null;
        },
        onError: () =>
          enQueueErrorToast("Something went wrong! Todo not deleted!"),
        rollback: () => {
          if (todosSnap) {
            set({
              todos: todosSnap
            });
            todosSnap = null;
          }
        }
      });
    },

    editTodoLabel: (id, label) => {
      const { todos } = get();
      const index = todos.findIndex((t) => t.id === id);
      const currentTodo = todos[index];

      const editTodo = (label: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, label: label } : todo
          )
        }));

      doAction({
        set,
        work: () => editTodo(label),
        api: () => simulateApiControls(),
        onSucess: () => enQueueSucessToast("Todo edited successfully!"),
        onError: () =>
          enQueueErrorToast("Something went wrong! Todo not edited!"),
        rollback: () => editTodo(currentTodo.label)
      });
    },

    toggleTodoDone: (id) => {
      const editTodo = () =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
          )
        }));

      doAction({
        set,
        work: () => editTodo(),
        api: () => simulateApiControls(),
        onSucess: () =>
          enQueueSucessToast("Todo status was changed successfully!"),
        onError: () =>
          enQueueErrorToast(
            "Something went wrong! Todo status wasn't changed!"
          ),
        rollback: () => editTodo()
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
