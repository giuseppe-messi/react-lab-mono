import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import { NOTES_STORE_KEY, useNotesStore } from "./stores/useNotesStore.ts";
import { shallow } from "zustand/shallow";
import { StrictMode } from "react";
import { TODOS_STORE_KEY, useTodosStore } from "./stores/useTodosStore.ts";
import "./theme/theme.css";

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
if (fromNotesStorage) {
  try {
    useNotesStore.setState(JSON.parse(fromNotesStorage));
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

// Subscribe to changes
useNotesStore.subscribe(
  (state) => ({ notes: state.notes, filter: state.filter }),
  (slice) => {
    localStorage.setItem(NOTES_STORE_KEY, JSON.stringify(slice));
  },
  { equalityFn: shallow }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
