import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ErrorBoundary, type FallbackProps } from "@react-lab-mono/ui";
import NotFound from "./pages/NotFound/NotFound";
import { Home } from "./pages/Home/Home";
import { ErrorPage } from "./pages/ErrorPage";

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
