import { Outlet } from "react-router-dom";
import { Toaster } from "@react-lab-mono/ui";
import { Nav } from "./components/Nav/Nav";
import styles from "./Layout.module.css";
import { Footer } from "./components/Footer/Footer";

export const Layout = () => (
  <>
    <Nav />
    <main>
      <Outlet />
    </main>
    <Footer />
    <Toaster className={styles.toasterWrap} />
  </>
);
