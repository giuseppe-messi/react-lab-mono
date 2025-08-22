import { NavLink, useNavigate } from "react-router-dom";
import { LoadingSpinner, useToastersStore } from "@react-lab-mono/ui";
import type { AxiosError } from "axios";
import axios from "axios";
import { useState } from "react";
import { useAuthSetContext } from "../../contexts/AuthContext";
import styles from "./Register.module.css";

const Register = () => {
  const { enQueueToast } = useToastersStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthSetContext()?.setUser;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const input = {
      name: String(fd.get("name")),
      lastname: String(fd.get("lastname")),
      email: String(fd.get("email")),
      password: String(fd.get("password"))
    };

    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/users", input);
      enQueueToast("sucess", "Successfully registered!");
      void navigate("/");
      setUser?.(data);
    } catch (err) {
      let errorMessage = "Registration failed!";

      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message ?? errorMessage;
      }

      enQueueToast("error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={styles.registerForm}
      onSubmit={(e) => void handleSubmit(e)}
    >
      <h2>Register</h2>

      <label htmlFor="name">Name</label>
      <input id="name" name="name" required type="text" />

      <label htmlFor="lastname">Last Name</label>
      <input id="lastname" name="lastname" required type="text" />

      <label htmlFor="email">Email</label>
      <input id="email" name="email" required type="email" />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        minLength={8}
        name="password"
        required
        type="password"
      />

      <div className={styles.formActions}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <button type="submit">Create account</button>
            <button type="reset">Clear</button>
          </>
        )}
      </div>
      <p>
        Already registered? <NavLink to="/login">Login</NavLink>
      </p>
    </form>
  );
};

export default Register;
