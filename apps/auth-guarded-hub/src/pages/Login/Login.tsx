import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button, LoadingSpinner, useToastersStore } from "@react-lab-mono/ui";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES, type RouteKey } from "../../api/routes";
import { useMutate } from "../../hooks/useMutate";
import styles from "./Login.module.css";

const Login = () => {
  const { enQueueToast } = useToastersStore();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const refresh = auth?.refresh;

  const { mutate, isLoading } = useMutate({
    url: ROUTES.LOGIN as RouteKey,
    method: "post"
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const formData = {
      email: String(fd.get("email")),
      password: String(fd.get("password"))
    };

    let previousPath = location.state?.from?.pathname;
    if (!previousPath || ["login", "/register"].includes(previousPath)) {
      previousPath = "/";
    }

    await mutate(formData, {
      onSuccess: () => {
        enQueueToast("sucess", "Successfully logged in!");
        void refresh?.();
        void navigate(previousPath);
      },
      onError: (err) => {
        let errorMessage = "Login failed!";
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.message ?? errorMessage;
        }
        enQueueToast("error", errorMessage);
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
        <LoadingSpinner size="md" />
      ) : (
        <div className={styles.formActions}>
          <Button size="sm" type="submit">
            Log in
          </Button>
          <Button fillMode="outline" size="sm" type="reset">
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
