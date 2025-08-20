import { NavLink } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    console.log("🚀 ~ data:", data);

    // onSubmit?.(data);
    // Example:
    // await fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label htmlFor="login-email">Email</label>
      <input id="login-email" name="email" required type="email" />

      <label htmlFor="login-password">Password</label>
      <input id="login-password" name="password" required type="password" />

      <div className={styles.formActions}>
        <button type="submit">Log in</button>
        <button type="reset">Clear</button>
      </div>
      <p>
        Not registered? <NavLink to="/register">Register</NavLink>
      </p>
    </form>
  );
};

export default Login;
