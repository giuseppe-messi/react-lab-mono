import {
  selectFilteredTodos,
  TODOS_STORE_KEY,
  useTodosStore
} from "./useTodosStore";

const enQueueToast = jest.fn();
let controlsState = { mockLatency: false, mockError: false };

jest.mock("@react-lab-mono/ui", () => ({
  generateUUID: () => "fixed-id",
  useToastersStore: {
    getState: () => ({ enQueueToast })
  }
}));

jest.mock("./useControlsPanelStore", () => ({
  useControlsPanelStore: {
    getState: () => controlsState
  }
}));

// small helper to flush microtasks used by doAction(...)
const flush = async () => {
  await Promise.resolve();
};

const resetStore = () => {
  useTodosStore.setState({
    todos: [],
    totalCount: 0,
    isLoading: false,
    error: null,
    filter: "all"
  });
  enQueueToast.mockClear();
  controlsState = { mockLatency: false, mockError: false };
  localStorage.clear();
};

beforeEach(() => {
  resetStore();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("useTodosStore store", () => {
  test("getTodos method, hydrates from localStorage and updates totalCount", async () => {
    localStorage.setItem(
      TODOS_STORE_KEY,
      JSON.stringify({
        todos: [{ id: "n1", label: "A", done: false }],
        filter: "completed"
      })
    );

    useTodosStore.getState().getTodos();
    await flush();

    const store = useTodosStore.getState();
    expect(store.isLoading).toBe(false);
    expect(store.error).toBeNull();
    expect(store.todos).toEqual([{ id: "n1", label: "A", done: false }]);
    expect(store.filter).toBe("completed");
    expect(store.totalCount).toBe(1);
  });

  test("getTodos method, sets error when simulateApiControls fails", async () => {
    // seed storage
    localStorage.setItem(
      TODOS_STORE_KEY,
      JSON.stringify({ todos: [], filter: "all" })
    );

    // silence console errors
    jest.spyOn(console, "error").mockImplementation(() => {});

    controlsState.mockError = true;

    useTodosStore.getState().getTodos();
    await flush();

    const store = useTodosStore.getState();
    expect(store.isLoading).toBe(false);
    expect(store.error).toBeInstanceOf(Error);
    expect(enQueueToast).toHaveBeenCalledWith(
      "error",
      "Something went wrong fetching the todos!"
    );
  });

  test("addTodo method, it adds a todo (success) and enqueues success toast", async () => {
    useTodosStore.getState().addTodo("mock todo label");
    await flush();

    const store = useTodosStore.getState();
    expect(store.todos).toEqual([
      { id: "fixed-id", label: "mock todo label", done: false }
    ]);
    expect(store.totalCount).toBe(1);
    expect(enQueueToast).toHaveBeenCalledWith(
      "sucess",
      "Todo added successfully!"
    );
  });

  test("addTodo method rolls back on error and enqueues error toast", async () => {
    // silence console errors
    jest.spyOn(console, "error").mockImplementation(() => {});

    controlsState.mockError = true;

    useTodosStore.getState().addTodo("mock todo label");
    await flush();

    const store = useTodosStore.getState();
    expect(store.todos).toEqual([]); // rolled back
    expect(store.error).toBeInstanceOf(Error);
    expect(enQueueToast).toHaveBeenCalledWith(
      "error",
      "Something went wrong! Todo not added!"
    );
  });

  test("deleteTodo method, removes the todo and updates totalCount (success)", async () => {
    useTodosStore.setState({
      todos: [
        { id: "n1", label: "A", done: false },
        { id: "n2", label: "B", done: true }
      ]
    });

    useTodosStore.getState().deleteTodo("n1");
    await flush();

    const store = useTodosStore.getState();
    expect(store.todos).toEqual([{ id: "n2", label: "B", done: true }]);
    expect(store.totalCount).toBe(1);
    expect(store.error).toBeNull();
    expect(enQueueToast).toHaveBeenCalledWith(
      "sucess",
      "Todo deleted successfully!"
    );
  });

  test("deleteTodo method, rolls back on error and shows error toast", async () => {
    useTodosStore.setState({
      todos: [
        { id: "n1", label: "A", done: false },
        { id: "n2", label: "B", done: true }
      ]
    });

    // silence console errors
    jest.spyOn(console, "error").mockImplementation(() => {});

    controlsState.mockError = true;

    useTodosStore.getState().deleteTodo("n1");
    await flush();

    const store = useTodosStore.getState();

    // rollback
    expect(store.todos).toEqual([
      { id: "n1", label: "A", done: false },
      { id: "n2", label: "B", done: true }
    ]);
    expect(store.error).toBeInstanceOf(Error);
    expect(enQueueToast).toHaveBeenCalledWith(
      "error",
      "Something went wrong! Todo not deleted!"
    );
  });

  test("editTodolabel method, updates the label (success)", async () => {
    useTodosStore.setState({
      todos: [{ id: "n1", label: "Old", done: false }]
    });

    useTodosStore.getState().editTodoLabel("n1", "New");
    await flush();

    const store = useTodosStore.getState();
    expect(store.todos).toEqual([{ id: "n1", label: "New", done: false }]);
    expect(store.totalCount).toBe(1);
    expect(store.error).toBeNull();
    expect(enQueueToast).toHaveBeenCalledWith(
      "sucess",
      "Todo edited successfully!"
    );
  });

  test("editTodolabel method, rolls back on error and shows error toast", async () => {
    useTodosStore.setState({
      todos: [{ id: "n1", label: "Old", done: false }]
    });

    // silence console errors
    jest.spyOn(console, "error").mockImplementation(() => {});

    controlsState.mockError = true;

    useTodosStore.getState().editTodoLabel("n1", "New");
    await flush();

    const store = useTodosStore.getState();
    expect(store.todos).toEqual([{ id: "n1", label: "Old", done: false }]); // rolledback
    expect(store.error).toBeInstanceOf(Error);
    expect(enQueueToast).toHaveBeenCalledWith(
      "error",
      "Something went wrong! Todo not edited!"
    );
  });

  test("toggleTodoDone method, toggles (success) and toast fires", async () => {
    // seed a todo
    useTodosStore.setState({
      todos: [{ id: "n1", label: "A", done: false }]
    });

    useTodosStore.getState().toggleTodoDone("n1");
    await flush();

    const store = useTodosStore.getState();
    expect(store.todos[0].done).toBe(true);
    expect(enQueueToast).toHaveBeenCalledWith(
      "sucess",
      "Todo status was changed successfully!"
    );
  });

  test("toggleTodoDone method, rolls back on error", async () => {
    // seed a todo
    useTodosStore.setState({
      todos: [{ id: "n1", label: "A", done: false }]
    });

    // silence console errors
    jest.spyOn(console, "error").mockImplementation(() => {});

    controlsState.mockError = true;

    useTodosStore.getState().toggleTodoDone("n1");
    await flush();

    const store = useTodosStore.getState();
    expect(store.todos[0].done).toBe(false);
    expect(enQueueToast).toHaveBeenCalledWith(
      "error",
      "Something went wrong! Todo status wasn't changed!"
    );
  });

  test("selectFilteredTodos selector, it returns expected slices", () => {
    useTodosStore.setState({
      todos: [
        { id: "1", label: "a", done: false },
        { id: "2", label: "b", done: true }
      ],
      filter: "all"
    });
    const base = useTodosStore.getState();
    expect(selectFilteredTodos(base).length).toBe(2);

    useTodosStore.setState({ filter: "active" });
    expect(selectFilteredTodos(useTodosStore.getState())).toEqual([
      { id: "1", label: "a", done: false }
    ]);

    useTodosStore.setState({ filter: "completed" });
    expect(selectFilteredTodos(useTodosStore.getState())).toEqual([
      { id: "2", label: "b", done: true }
    ]);
  });

  it("no storage -> defaults {todos: [], filter: 'all'}", async () => {
    useTodosStore.getState().getTodos();
    await flush();

    const store = useTodosStore.getState();
    expect(store.todos).toEqual([]);
    expect(store.filter).toBe("all");
  });

  it("valid JSON -> parsed state", async () => {
    localStorage.setItem(
      TODOS_STORE_KEY,
      JSON.stringify({
        todos: [{ id: "n1", label: "A", done: false }],
        filter: "completed"
      })
    );

    useTodosStore.getState().getTodos();
    await flush();

    const store = useTodosStore.getState();
    expect(store.todos).toEqual([{ id: "n1", label: "A", done: false }]);
    expect(store.filter).toBe("completed");
  });

  it("invalid JSON -> defaults {todos: [], filter: 'all'}", async () => {
    localStorage.setItem(TODOS_STORE_KEY, "{not-json}");

    useTodosStore.getState().getTodos();
    await flush();

    const store = useTodosStore.getState();
    expect(store.todos).toEqual([]);
    expect(store.filter).toBe("all");
  });

  it("getTodos keeps isLoading true until latency completes", async () => {
    localStorage.setItem(
      TODOS_STORE_KEY,
      JSON.stringify({
        todos: [{ id: "n1", label: "A", done: false }],
        filter: "all"
      })
    );
    controlsState.mockLatency = true;

    useTodosStore.getState().getTodos();

    // immediately after call
    expect(useTodosStore.getState().isLoading).toBe(true);

    // before 3s elapsed
    jest.advanceTimersByTime(2999);
    expect(useTodosStore.getState().isLoading).toBe(true);

    // after 3s
    jest.advanceTimersByTime(1);
    await flush();

    expect(useTodosStore.getState().isLoading).toBe(false);
    expect(useTodosStore.getState().todos).toEqual([
      { id: "n1", label: "A", done: false }
    ]);
    expect(useTodosStore.getState().error).toBeNull();
  });
});
