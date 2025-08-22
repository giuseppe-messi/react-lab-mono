import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToastersStore } from "@react-lab-mono/ui";
import { useAuth, useAuthSetContext } from "../contexts/AuthContext";
import styles from "./Nav.module.css";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Profile", to: "/profile" }
];

export const Nav = () => {
  const user = useAuth();

  console.log("🚀 ~ user:", user);

  const setUser = useAuthSetContext()?.setUser;
  const { enQueueToast } = useToastersStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios
      .post("api/logout")
      .then(() => {
        enQueueToast("sucess", "Successfully logged out!");
        setUser?.(null);
        void navigate("/");
      })
      .catch(() => {
        enQueueToast("error", "Error loggin out!");
      });
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.siteList}>
        {navItems.map((i) => (
          <NavLink key={i.label} to={i.to}>
            {i.label}
          </NavLink>
        ))}
      </ul>
      <ul style={{ color: "white" }}>
        {user ? (
          <>
            <p>Hi {user.name}!</p>
            <button onClick={handleLogout} type="button">
              Logout
            </button>
          </>
        ) : (
          <NavLink to="login">Sign In</NavLink>
        )}
      </ul>
    </nav>
  );
};
