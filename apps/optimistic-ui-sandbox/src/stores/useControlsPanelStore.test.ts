import { useControlsPanelStore } from "./useControlsPanelStore";

const resetStore = () => {
  useControlsPanelStore.setState({
    category: "todos",
    mockLatency: null,
    mockError: false
  });
};

beforeEach(() => {
  resetStore();
});

describe("useControlsPanelStore store", () => {
  test("setCategory method", () => {
    useControlsPanelStore.getState().setCategory("notes");

    const store = useControlsPanelStore.getState();
    expect(store.category).toBe("notes");
    expect(store.mockLatency).toBeNull();
    expect(store.mockError).toBe(false);
  });

  test("setMockLatency method", () => {
    useControlsPanelStore.getState().setMockLatency("random");

    const store = useControlsPanelStore.getState();
    expect(store.mockLatency).toBe("random");
    expect(store.mockError).toBe(false);
  });

  test("toggleMockError method", () => {
    useControlsPanelStore.getState().toggleMockError();

    const store = useControlsPanelStore.getState();
    expect(store.mockError).toBe(true);
  });

  test("resetSimulations method", () => {
    const store = useControlsPanelStore.getState();

    store.setCategory("bookmarks");
    store.setMockLatency("1000");

    useControlsPanelStore.getState().resetSimulations();

    expect(store.category).toBe("todos");
    expect(store.mockLatency).toBeNull();
    expect(store.mockError).toBe(false);
  });
});
