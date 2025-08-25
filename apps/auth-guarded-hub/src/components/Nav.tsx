import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, useToastersStore } from "@react-lab-mono/ui";
import { useAuth, useAuthSetContext } from "../contexts/AuthContext";
import styles from "./Nav.module.css";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Profile", to: "/profile" }
];

export const Nav = () => {
  const user = useAuth();
  const setUser = useAuthSetContext()?.setUser;
  const { enQueueToast } = useToastersStore();
  const navigate = useNavigate();
  const location = useLocation();

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
      <div className={styles.userNameBox}>
        {user ? (
          <>
            <p>Hi {user.name}!</p>
            <Button
              fillMode="outline"
              onClick={handleLogout}
              size="sm"
              variant="white"
            >
              Logout
            </Button>
          </>
        ) : (
          <NavLink state={{ from: location }} to="login">
            <Button fillMode="outline" size="sm" variant="white">
              Sign In
            </Button>
          </NavLink>
        )}
      </div>
    </nav>
  );
};
