import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Profile", to: "/profile" }
];

export const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.siteList}>
        {navItems.map((i) => (
          <NavLink key={i.label} to={i.to}>
            {i.label}
          </NavLink>
        ))}
      </ul>
      <ul>
        <NavLink to="login">Login</NavLink>
        {/* <NavLink to="register">Register</NavLink> */}
      </ul>
    </nav>
  );
};
