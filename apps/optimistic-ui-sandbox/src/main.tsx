import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./theme/theme.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
