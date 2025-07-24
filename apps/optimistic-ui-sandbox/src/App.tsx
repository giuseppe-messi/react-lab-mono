import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ErrorBoundary,
  ErrorPage,
  type FallbackProps
} from "@react-lab-mono/ui";
import NotFound from "./pages/NotFound/NotFound";
import { Home } from "./pages/Home/Home";

const ErrorPageFallback = ({ onClearError }: FallbackProps) => (
  <ErrorPage onClearError={onClearError} />
);

function App() {
  return (
    <ErrorBoundary fallback={ErrorPageFallback}>
      <Router>
        <Routes>
          <Route element={<Home />} index />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
