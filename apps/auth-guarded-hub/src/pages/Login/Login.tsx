import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button, LoadingSpinner, useToastersStore } from "@react-lab-mono/ui";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES, type RouteKey } from "../../api/routes";
import { usePost } from "../../hooks/usePost";
import styles from "./Login.module.css";

const Login = () => {
  const { enQueueToast } = useToastersStore();
  const navigate = useNavigate();
  const location = useLocation();
  const refresh = useAuth()?.refresh;
  const { mutate, isLoading } = usePost({
    url: ROUTES.LOGIN as RouteKey
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const formData = {
      email: String(fd.get("email")),
      password: String(fd.get("password"))
    };

    await mutate(formData, {
      onSuccess: () => {
        enQueueToast("sucess", "Successfully logged in!");
        void refresh?.();
        void navigate(location.state.from ?? "/");
      },
      onError: () => {
        enQueueToast("error", "Login failed!");
      }
    });
  };

  return (
    <form className={styles.loginForm} onSubmit={(e) => void handleSubmit(e)}>
      <h2>Login</h2>

      <label htmlFor="email">Email</label>
      <input id="email" name="email" required type="email" />

      <label htmlFor="password">Password</label>
      <input id="password" name="password" required type="password" />

      {isLoading ? (
        // TODO: clean up styling and theme - centralize a button and a input

        <LoadingSpinner size="md" />
      ) : (
        <div className={styles.formActions}>
          <Button fillMode="outline" size="sm" type="submit">
            Log in
          </Button>
          <Button fillMode="outline" size="sm" type="reset" variant="white">
            Clear
          </Button>
        </div>
      )}

      <p>
        Not registered? <NavLink to="/register">Register</NavLink>
      </p>
    </form>
  );
};

export default Login;
