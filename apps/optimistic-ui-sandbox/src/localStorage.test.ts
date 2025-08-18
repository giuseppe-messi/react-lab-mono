// apps/optimistic-ui-sandbox/src/localStorage.test.ts
import { hydrateAndSubscribe } from "./localStorage";

jest.mock("./stores/useTodosStore", () => ({
  __esModule: true,
  TODOS_STORE_KEY: "todos-storage",
  useTodosStore: {
    setState: jest.fn(),
    subscribe: jest.fn(() => () => {}) // returns unsubscribe
  }
}));

jest.mock("./stores/useNotesStore", () => ({
  __esModule: true,
  NOTES_STORE_KEY: "notes-storage",
  useNotesStore: {
    setState: jest.fn(),
    subscribe: jest.fn(() => () => {})
  }
}));

describe("hydrateAndSubscribe (minimal)", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      "todos-storage",
      JSON.stringify({
        todos: [{ id: "t1", text: "a", done: false }],
        filter: "all"
      })
    );
    localStorage.setItem(
      "notes-storage",
      JSON.stringify({
        notes: [{ id: "n1", text: "b", done: true }],
        filter: "completed"
      })
    );

    // reset mock call history
    const { useTodosStore } = jest.requireMock("./stores/useTodosStore");
    const { useNotesStore } = jest.requireMock("./stores/useNotesStore");
    (useTodosStore.setState as jest.Mock).mockClear();
    (useTodosStore.subscribe as jest.Mock).mockClear();
    (useNotesStore.setState as jest.Mock).mockClear();
    (useNotesStore.subscribe as jest.Mock).mockClear();
  });

  it("hydrates both stores and sets up subscriptions", () => {
    hydrateAndSubscribe();

    const { useTodosStore } = jest.requireMock("./stores/useTodosStore");
    const { useNotesStore } = jest.requireMock("./stores/useNotesStore");

    expect(useTodosStore.setState).toHaveBeenCalledWith({
      todos: [{ id: "t1", text: "a", done: false }],
      filter: "all"
    });
    expect(useNotesStore.setState).toHaveBeenCalledWith({
      notes: [{ id: "n1", text: "b", done: true }],
      filter: "completed"
    });

    expect(useTodosStore.subscribe).toHaveBeenCalledTimes(1);
    expect(useNotesStore.subscribe).toHaveBeenCalledTimes(1);
  });
});
