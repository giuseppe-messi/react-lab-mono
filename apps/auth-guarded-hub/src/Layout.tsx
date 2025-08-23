import { Outlet } from "react-router-dom";
import { Toaster } from "@react-lab-mono/ui";
import { Nav } from "./components/Nav";
import styles from "./Layout.module.css";

export const Layout = () => (
  <>
    <Nav />
    <main className={styles.main}>
      <Outlet />
    </main>
    <Toaster />
  </>
);
