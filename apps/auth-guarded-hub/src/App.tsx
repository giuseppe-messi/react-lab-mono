import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ErrorBoundary, type FallbackProps } from "@react-lab-mono/ui";
import { ErrorPage } from "./pages/ErrorPage";
import { lazy, Suspense } from "react";
import { Layout } from "./Layout";
import { AuthProvider } from "./contexts/AuthContext";

const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const ErrorPageFallback = ({ onClearError }: FallbackProps) => (
  <ErrorPage onClearError={onClearError} />
);

function App() {
  return (
    <ErrorBoundary fallback={ErrorPageFallback}>
      <AuthProvider>
        <Router>
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
