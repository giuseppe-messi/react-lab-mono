import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button, LoadingSpinner, useToastersStore } from "@react-lab-mono/ui";
import { useState } from "react";
import axios from "axios";
import { useSetAuthContext } from "../../contexts/AuthContext";
import styles from "./Login.module.css";
import { ROUTES, type RouteKey } from "../../api/routes";
import { usePost } from "../../hooks/usePost";

const Login = () => {
  const { enQueueToast } = useToastersStore();
  const navigate = useNavigate();
  const location = useLocation();
  const refresh = useSetAuthContext()?.refresh;
  const { mutate, isLoading, error } = usePost({
    url: ROUTES.LOGIN as RouteKey
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const formData = {
      email: String(fd.get("email")),
      password: String(fd.get("password"))
    };

    await mutate(formData);
    enQueueToast("sucess", "Successfully logged in!");
    refresh?.();
    void navigate(location.state.from ?? "/");

    // try {
    //   await mutate(formData);
    //   enQueueToast("sucess", "Successfully logged in!");
    //   refresh?.();
    //   void navigate(location.state.from ?? "/");
    // } catch (err) {
    //   let errorMessage = "Login failed!";

    //   if (axios.isAxiosError(err)) {
    //     errorMessage = err.response?.data?.message ?? errorMessage;
    //   }
    //   enQueueToast("error", errorMessage);
    // }
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const fd = new FormData(e.currentTarget);

  //   const input = {
  //     email: String(fd.get("email")),
  //     password: String(fd.get("password"))
  //   };

  //   try {
  //     // setIsLoading(true);
  //     await axios.post("/api/login", input);
  //     enQueueToast("sucess", "Successfully logged in!");
  //     refresh?.();
  //     void navigate(location.state.from ?? "/");
  //   } catch (err) {
  //     let errorMessage = "Login failed!";

  //     if (axios.isAxiosError(err)) {
  //       errorMessage = err.response?.data?.message ?? errorMessage;
  //     }
  //     enQueueToast("error", errorMessage);
  //   } finally {
  //     // setIsLoading(false);
  //   }
  // };

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
