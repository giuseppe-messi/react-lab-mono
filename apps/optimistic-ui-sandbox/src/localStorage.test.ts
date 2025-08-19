import { hydrateAndSubscribe } from "./localStorage";

jest.mock("./stores/useTodosStore", () => ({
  TODOS_STORE_KEY: "todos-storage",
  useTodosStore: {
    setState: jest.fn(),
    subscribe: jest.fn(() => () => {})
  }
}));

jest.mock("./stores/useNotesStore", () => ({
  NOTES_STORE_KEY: "notes-storage",
  useNotesStore: {
    setState: jest.fn(),
    subscribe: jest.fn(() => () => {})
  }
}));

const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

describe("hydrateAndSubscribe", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Todos store", () => {
    const testSlice = {
      todos: [{ id: "t1", text: "a", done: false }],
      filter: "all"
    };

    beforeEach(() => {
      localStorage.clear();
      localStorage.setItem("todos-storage", JSON.stringify(testSlice));
    });
    it("hydrates Todos stores and sets up subscriptions", () => {
      hydrateAndSubscribe();

      const { useTodosStore } = jest.requireMock("./stores/useTodosStore");

      expect(useTodosStore.setState).toHaveBeenCalledWith(testSlice);

      expect(useTodosStore.subscribe).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).not.toHaveBeenCalled();

      // invoke Todos listener
      const [, todosListener] = useTodosStore.subscribe.mock.calls[0];
      todosListener(testSlice);
      expect(localStorage.getItem("todos-storage")).toBe(
        JSON.stringify(testSlice)
      );
    });

    it("logs console warns when setting Todos state fails", () => {
      // make setState throw for this call
      const { useTodosStore } = jest.requireMock("./stores/useTodosStore");
      useTodosStore.setState.mockImplementationOnce(() => {
        throw new Error("boom");
      });

      hydrateAndSubscribe();
      expect(consoleWarnSpy).toHaveBeenCalled();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "Invalid data in localStorage, resetting store"
      );
    });
  });

  describe("Notes store", () => {
    const testSlice = {
      notes: [{ id: "n1", text: "b", done: true }],
      filter: "completed"
    };

    beforeEach(() => {
      localStorage.clear();
      localStorage.setItem("notes-storage", JSON.stringify(testSlice));
    });
    it("hydrates Notes stores and sets up subscriptions", () => {
      hydrateAndSubscribe();

      const { useNotesStore } = jest.requireMock("./stores/useNotesStore");

      expect(useNotesStore.setState).toHaveBeenCalledWith(testSlice);

      expect(useNotesStore.subscribe).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).not.toHaveBeenCalled();

      // invoke Notes listener
      const [, notesListener] = (useNotesStore.subscribe as jest.Mock).mock
        .calls[0];
      notesListener(testSlice);
      expect(localStorage.getItem("notes-storage")).toBe(
        JSON.stringify(testSlice)
      );
    });

    it("logs console warns when setting Notes state fails", () => {
      // make setState throw for this call
      const { useNotesStore } = jest.requireMock("./stores/useNotesStore");
      useNotesStore.setState.mockImplementationOnce(() => {
        throw new Error("boom");
      });

      hydrateAndSubscribe();
      expect(consoleWarnSpy).toHaveBeenCalled();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "Invalid data in localStorage, resetting store"
      );
    });
  });
});
