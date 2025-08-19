import { shallow } from "zustand/shallow";
import { NOTES_STORE_KEY, useNotesStore } from "./stores/useNotesStore";
import { TODOS_STORE_KEY, useTodosStore } from "./stores/useTodosStore";

// Hydrate from localStorages
export const hydrateAndSubscribe = () => {
  /* Todos store */
  const fromTodosStorage = localStorage.getItem(TODOS_STORE_KEY);

  if (fromTodosStorage) {
    try {
      useTodosStore.setState(JSON.parse(fromTodosStorage));
    } catch {
      console.warn("Invalid data in localStorage, resetting store");
    }
  }

  // Todos store subscribe to changes
  useTodosStore.subscribe(
    (state) => ({ todos: state.todos, filter: state.filter }),
    (slice) => {
      localStorage.setItem(TODOS_STORE_KEY, JSON.stringify(slice));
    },
    { equalityFn: shallow }
  );

  /* Notes store */
  const fromNotesStorage = localStorage.getItem(NOTES_STORE_KEY);

  if (fromNotesStorage) {
    try {
      useNotesStore.setState(JSON.parse(fromNotesStorage));
    } catch {
      console.warn("Invalid data in localStorage, resetting store");
    }
  }

  // Notes store subscribe to changes
  useNotesStore.subscribe(
    (state) => ({ notes: state.notes, filter: state.filter }),
    (slice) => {
      localStorage.setItem(NOTES_STORE_KEY, JSON.stringify(slice));
    },
    { equalityFn: shallow }
  );
};
