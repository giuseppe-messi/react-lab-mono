import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import { shallow } from "zustand/shallow";
import { STORE_KEY, useTodosStore } from "./stores/useTodosStore.ts";
import { StrictMode } from "react";
import "./theme/theme.css";

// Hydrate from localStorage
const fromStorage = localStorage.getItem(STORE_KEY);
if (fromStorage) {
  try {
    useTodosStore.setState(JSON.parse(fromStorage));
  } catch {
    console.warn("Invalid data in localStorage, resetting store");
  }
}

// Subscribe to changes
useTodosStore.subscribe(
  (state) => ({ todos: state.todos, filter: state.filter }),
  (slice) => {
    localStorage.setItem(STORE_KEY, JSON.stringify(slice));
  },
  { equalityFn: shallow }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
