import { NOTES_STORE_KEY, useNotesStore } from "./stores/useNotesStore";
import { shallow } from "zustand/shallow";
import { TODOS_STORE_KEY, useTodosStore } from "./stores/useTodosStore";

export const hydrateAndSubscribe = () => {
  // Hydrate from localStorages
  const fromTodosStorage = localStorage.getItem(TODOS_STORE_KEY);
  const fromNotesStorage = localStorage.getItem(NOTES_STORE_KEY);

  if (fromTodosStorage) {
    try {
      useTodosStore.setState(JSON.parse(fromTodosStorage));
    } catch {
      console.warn("Invalid data in localStorage, resetting store");
    }
  }
  // Subscribe to changes
  useTodosStore.subscribe(
    (state) => ({ todos: state.todos, filter: state.filter }),
    (slice) => {
      localStorage.setItem(TODOS_STORE_KEY, JSON.stringify(slice));
    },
    { equalityFn: shallow }
  );

  if (fromNotesStorage) {
    try {
      useNotesStore.setState(JSON.parse(fromNotesStorage));
    } catch {
      console.warn("Invalid data in localStorage, resetting store");
    }
  }
  // Subscribe to changes
  useNotesStore.subscribe(
    (state) => ({ notes: state.notes, filter: state.filter }),
    (slice) => {
      localStorage.setItem(NOTES_STORE_KEY, JSON.stringify(slice));
    },
    { equalityFn: shallow }
  );
};
