import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ErrorBoundary, Toaster, type FallbackProps } from "@react-lab-mono/ui";
import { lazy, Suspense } from "react";
import { ErrorPage } from "./pages/ErrorPage";
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
                <Route element={<Home />} index />
                <Route element={<About />} path="about" />
                <Route element={<Dashboard />} path="dashboard" />
                <Route element={<Login />} path="login" />
                <Route element={<Register />} path="register" />
                <Route element={<Profile />} path="profile" />
                <Route element={<NotFound />} path="*" />
              </Route>
            </Routes>
          </Suspense>
        </Router>
        <Toaster />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
