import NotFound from "./pages/NotFound/NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ErrorBoundary, ErrorPage } from "@react-lab-mono/ui";
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
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
