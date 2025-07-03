import NotFound from "./pages/NotFound/NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { Home } from "./pages/Home/Home";
import { hydrateAndSubscribe } from "./localStorage";
import "./App.css";

// local storage sync up with stores
hydrateAndSubscribe();

function App() {
  return (
    <ErrorBoundary>
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
