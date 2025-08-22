import { NavLink, useNavigate } from "react-router-dom";
import { LoadingSpinner, useToastersStore } from "@react-lab-mono/ui";
import { useState } from "react";
import axios from "axios";
import { useAuthSetContext } from "../../contexts/AuthContext";
import styles from "./Login.module.css";

const Login = () => {
  const { enQueueToast } = useToastersStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const refresh = useAuthSetContext()?.refresh;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const input = {
      email: String(fd.get("email")),
      password: String(fd.get("password"))
    };

    try {
      setIsLoading(true);
      await axios.post("/api/login", input);
      enQueueToast("sucess", "Successfully logged in!");
      refresh?.(true);
      void navigate("/");
    } catch (err) {
      let errorMessage = "Login failed!";

      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message ?? errorMessage;
      }
      enQueueToast("error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={(e) => void handleSubmit(e)}>
      <h2>Login</h2>

      <label htmlFor="email">Email</label>
      <input id="email" name="email" required type="email" />

      <label htmlFor="password">Password</label>
      <input id="password" name="password" required type="password" />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.formActions}>
          <button type="submit">Log in</button>
          <button type="reset">Clear</button>
        </div>
      )}

      <p>
        Not registered? <NavLink to="/register">Register</NavLink>
      </p>
    </form>
  );
};

export default Login;
