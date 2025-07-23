import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ErrorBoundary, ErrorPage } from "@react-lab-mono/ui";
import NotFound from "./pages/NotFound/NotFound";
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <ErrorBoundary
      fallbackRender={({ onClearError }) => (
        <ErrorPage onClearError={onClearError} />
      )}
    >
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
