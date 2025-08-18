import {
  useNotesStore,
  NOTES_STORE_KEY,
  selectFilteredNotes
} from "./useNotesStore";

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
  useNotesStore.setState({
    notes: [],
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

describe("useNotesStore store", () => {
  test("getNotes method, hydrates from localStorage and updates totalCount", async () => {
    localStorage.setItem(
      NOTES_STORE_KEY,
      JSON.stringify({
        notes: [{ id: "n1", text: "A", done: false }],
        filter: "completed"
      })
    );

    useNotesStore.getState().getNotes();
    await flush();

    const store = useNotesStore.getState();
    expect(store.isLoading).toBe(false);
    expect(store.error).toBeNull();
    expect(store.notes).toEqual([{ id: "n1", text: "A", done: false }]);
    expect(store.filter).toBe("completed");
    expect(store.totalCount).toBe(1);
  });

  test("getNotes method, sets error when simulateApiControls fails", async () => {
    // seed storage
    localStorage.setItem(
      NOTES_STORE_KEY,
      JSON.stringify({ notes: [], filter: "all" })
    );

    // silence console errors
    jest.spyOn(console, "error").mockImplementation(() => {});

    controlsState.mockError = true;

    useNotesStore.getState().getNotes();
    await flush();

    const store = useNotesStore.getState();
    expect(store.isLoading).toBe(false);
    expect(store.error).toBeInstanceOf(Error);
    expect(enQueueToast).toHaveBeenCalledWith(
      "error",
      "Something went wrong fetching the notes!"
    );
  });

  test("addNote method, it adds a note (success) and enqueues success toast", async () => {
    useNotesStore.getState().addNote("mock note text");
    await flush();

    const store = useNotesStore.getState();
    expect(store.notes).toEqual([
      { id: "fixed-id", text: "mock note text", done: false }
    ]);
    expect(store.totalCount).toBe(1);
    expect(enQueueToast).toHaveBeenCalledWith(
      "sucess",
      "Note added successfully!"
    );
  });

  test("addNote method rolls back on error and enqueues error toast", async () => {
    // silence console errors
    jest.spyOn(console, "error").mockImplementation(() => {});

    controlsState.mockError = true;

    useNotesStore.getState().addNote("mock note text");
    await flush();

    const store = useNotesStore.getState();
    expect(store.notes).toEqual([]); // rolled back
    expect(store.error).toBeInstanceOf(Error);
    expect(enQueueToast).toHaveBeenCalledWith(
      "error",
      "Something went wrong! Note not added!"
    );
  });

  test("deleteNote method, removes the note and updates totalCount (success)", async () => {
    useNotesStore.setState({
      notes: [
        { id: "n1", text: "A", done: false },
        { id: "n2", text: "B", done: true }
      ]
    });

    useNotesStore.getState().deleteNote("n1");
    await flush();

    const store = useNotesStore.getState();
    expect(store.notes).toEqual([{ id: "n2", text: "B", done: true }]);
    expect(store.totalCount).toBe(1);
    expect(store.error).toBeNull();
    expect(enQueueToast).toHaveBeenCalledWith(
      "sucess",
      "Note deleted successfully!"
    );
  });

  test("deleteNote method, rolls back on error and shows error toast", async () => {
    useNotesStore.setState({
      notes: [
        { id: "n1", text: "A", done: false },
        { id: "n2", text: "B", done: true }
      ]
    });

    // silence console errors
    jest.spyOn(console, "error").mockImplementation(() => {});

    controlsState.mockError = true;

    useNotesStore.getState().deleteNote("n1");
    await flush();

    const store = useNotesStore.getState();

    // rollback
    expect(store.notes).toEqual([
      { id: "n1", text: "A", done: false },
      { id: "n2", text: "B", done: true }
    ]);
    expect(store.error).toBeInstanceOf(Error);
    expect(enQueueToast).toHaveBeenCalledWith(
      "error",
      "Something went wrong! Note not deleted!"
    );
  });

  test("editNoteText method, updates the text (success)", async () => {
    useNotesStore.setState({
      notes: [{ id: "n1", text: "Old", done: false }]
    });

    useNotesStore.getState().editNoteText("n1", "New");
    await flush();

    const store = useNotesStore.getState();
    expect(store.notes).toEqual([{ id: "n1", text: "New", done: false }]);
    expect(store.totalCount).toBe(1);
    expect(store.error).toBeNull();
    expect(enQueueToast).toHaveBeenCalledWith(
      "sucess",
      "Note edited successfully!"
    );
  });

  test("editNoteText method, rolls back on error and shows error toast", async () => {
    useNotesStore.setState({
      notes: [{ id: "n1", text: "Old", done: false }]
    });

    // silence console errors
    jest.spyOn(console, "error").mockImplementation(() => {});

    controlsState.mockError = true;

    useNotesStore.getState().editNoteText("n1", "New");
    await flush();

    const store = useNotesStore.getState();
    expect(store.notes).toEqual([{ id: "n1", text: "Old", done: false }]); // rolledback
    expect(store.error).toBeInstanceOf(Error);
    expect(enQueueToast).toHaveBeenCalledWith(
      "error",
      "Something went wrong! Note not edited!"
    );
  });

  test("toggleNoteDone method, toggles (success) and toast fires", async () => {
    // seed a note
    useNotesStore.setState({
      notes: [{ id: "n1", text: "A", done: false }]
    });

    useNotesStore.getState().toggleNoteDone("n1");
    await flush();

    const store = useNotesStore.getState();
    expect(store.notes[0].done).toBe(true);
    expect(enQueueToast).toHaveBeenCalledWith(
      "sucess",
      "Note status was changed successfully!"
    );
  });

  test("toggleNoteDone method, rolls back on error", async () => {
    // seed a note
    useNotesStore.setState({
      notes: [{ id: "n1", text: "A", done: false }]
    });

    // silence console errors
    jest.spyOn(console, "error").mockImplementation(() => {});

    controlsState.mockError = true;

    useNotesStore.getState().toggleNoteDone("n1");
    await flush();

    const store = useNotesStore.getState();
    expect(store.notes[0].done).toBe(false);
    expect(enQueueToast).toHaveBeenCalledWith(
      "error",
      "Something went wrong! Note status wasn't changed!"
    );
  });

  test("selectFilteredNotes selector, it returns expected slices", () => {
    useNotesStore.setState({
      notes: [
        { id: "1", text: "a", done: false },
        { id: "2", text: "b", done: true }
      ],
      filter: "all"
    });
    const base = useNotesStore.getState();
    expect(selectFilteredNotes(base).length).toBe(2);

    useNotesStore.setState({ filter: "active" });
    expect(selectFilteredNotes(useNotesStore.getState())).toEqual([
      { id: "1", text: "a", done: false }
    ]);

    useNotesStore.setState({ filter: "completed" });
    expect(selectFilteredNotes(useNotesStore.getState())).toEqual([
      { id: "2", text: "b", done: true }
    ]);
  });

  it("no storage -> defaults {notes: [], filter: 'all'}", async () => {
    useNotesStore.getState().getNotes();
    await flush();

    const store = useNotesStore.getState();
    expect(store.notes).toEqual([]);
    expect(store.filter).toBe("all");
  });

  it("valid JSON -> parsed state", async () => {
    localStorage.setItem(
      NOTES_STORE_KEY,
      JSON.stringify({
        notes: [{ id: "n1", text: "A", done: false }],
        filter: "completed"
      })
    );

    useNotesStore.getState().getNotes();
    await flush();

    const store = useNotesStore.getState();
    expect(store.notes).toEqual([{ id: "n1", text: "A", done: false }]);
    expect(store.filter).toBe("completed");
  });

  it("invalid JSON -> defaults {notes: [], filter: 'all'}", async () => {
    localStorage.setItem(NOTES_STORE_KEY, "{not-json}");

    useNotesStore.getState().getNotes();
    await flush();

    const store = useNotesStore.getState();
    expect(store.notes).toEqual([]);
    expect(store.filter).toBe("all");
  });

  it("getNotes keeps isLoading true until latency completes", async () => {
    localStorage.setItem(
      NOTES_STORE_KEY,
      JSON.stringify({
        notes: [{ id: "n1", text: "A", done: false }],
        filter: "all"
      })
    );
    controlsState.mockLatency = true;

    useNotesStore.getState().getNotes();

    // immediately after call
    expect(useNotesStore.getState().isLoading).toBe(true);

    // before 3s elapsed
    jest.advanceTimersByTime(2999);
    expect(useNotesStore.getState().isLoading).toBe(true);

    // after 3s
    jest.advanceTimersByTime(1);
    await flush();

    expect(useNotesStore.getState().isLoading).toBe(false);
    expect(useNotesStore.getState().notes).toEqual([
      { id: "n1", text: "A", done: false }
    ]);
    expect(useNotesStore.getState().error).toBeNull();
  });
});
