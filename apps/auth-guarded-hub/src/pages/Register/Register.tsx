import { NavLink } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    console.log("🚀 ~ data:", data);

    // onSubmit?.(data);
    // Example:
    // await fetch("/api/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
      <h2>Register</h2>

      <label htmlFor="reg-name">Name</label>
      <input id="reg-name" name="name" required type="text" />

      <label htmlFor="reg-email">Email</label>
      <input id="reg-email" name="email" required type="email" />

      <label htmlFor="reg-password">Password</label>
      <input
        id="reg-password"
        minLength={8}
        name="password"
        required
        type="password"
      />

      <div className={styles.formActions}>
        <button type="submit">Create account</button>
        <button type="reset">Clear</button>
      </div>
      <p>
        Already registered? <NavLink to="/login">Login</NavLink>
      </p>
    </form>
  );
};

export default Register;
