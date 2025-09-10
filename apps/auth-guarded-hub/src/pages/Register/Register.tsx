import { NavLink, useNavigate } from "react-router-dom";
import { LoadingSpinner, useToastersStore } from "@react-lab-mono/ui";
import axios from "axios";
import { useAuth, type User } from "../../contexts/AuthContext";
import { useMutate } from "../../hooks/useMutate";
import { ROUTES, type RouteKey } from "../../api/routes";
import { PLAN_TIER, type Plan } from "../../interfaces/plan";
import styles from "./Register.module.css";

const Register = () => {
  const { enQueueToast } = useToastersStore();
  const navigate = useNavigate();
  const auth = useAuth();
  const refresh = auth?.refresh;
  const setUser = auth?.setUser;
  const { mutate, isLoading } = useMutate<User>({
    url: ROUTES.USERS as RouteKey,
    type: "post"
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const formData = {
      name: String(fd.get("name")),
      lastname: String(fd.get("lastname")),
      email: String(fd.get("email")),
      password: String(fd.get("password")),
      plan: String(fd.get("plan")) as Plan
    };

    await mutate(formData, {
      onSuccess: (data) => {
        enQueueToast("sucess", "Successfully registered!");
        void navigate("/");
        setUser?.(data);
        void refresh?.();
      },
      onError: (err) => {
        let errorMessage = "Registration failed!";
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.message ?? errorMessage;
        }
        enQueueToast("error", errorMessage);
      }
    });
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

      <label htmlFor="plan">Plan</label>

      <select defaultValue={PLAN_TIER.FREE} id="plan" name="plan">
        <option value={PLAN_TIER.FREE}>FREE</option>
        <option value={PLAN_TIER.BASIC}>BASIC</option>
        <option value={PLAN_TIER.PRO}>PRO</option>
      </select>

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
