import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button, LoadingSpinner, useToastersStore } from "@react-lab-mono/ui";
import { useAuth } from "../contexts/AuthContext";
import { ROUTES, type RouteKey } from "../api/routes";
import { useMutate } from "../hooks/useMutate";
import styles from "./Nav.module.css";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Profile", to: "/profile" }
];

export const Nav = () => {
  const auth = useAuth();
  const user = auth?.user;
  const isLoadingUser = auth?.isLoadingUser;
  const { enQueueToast } = useToastersStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate } = useMutate({
    url: ROUTES.LOGOUT as RouteKey,
    type: "post"
  });

  const handleLogout = async () => {
    await mutate(
      {},
      {
        onSuccess: () => {
          enQueueToast("sucess", "Successfully logged out!");
          auth?.setUser(null);
          void auth?.refresh();
          void navigate("/");
        },
        onError: () => {
          enQueueToast("error", "Error loggin out!");
        }
      }
    );
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.siteList}>
        {navItems.map((i) => (
          <NavLink className="slide" key={i.label} to={i.to}>
            {i.label}
          </NavLink>
        ))}
      </ul>
      <div className={styles.userNameBox}>
        {isLoadingUser ? (
          <LoadingSpinner size="sm" />
        ) : user ? (
          <>
            <p>Hi {user.name}!</p>
            <Button fillMode="outline" onClick={handleLogout} variant="white">
              Logout
            </Button>
          </>
        ) : (
          <NavLink state={{ from: location }} to="login">
            <Button fillMode="outline" variant="white">
              Sign In
            </Button>
          </NavLink>
        )}
      </div>
    </nav>
  );
};
