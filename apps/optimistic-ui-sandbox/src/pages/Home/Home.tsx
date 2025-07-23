import { Toaster } from "@react-lab-mono/ui";
import { CategoryList } from "../../components/CategoryList/CategoryList";
import { ControlsPanel } from "../../components/ControlsPanel/ControlsPanel";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import styles from "./Home.module.css";

export const Home = () => (
  <div className={styles.app}>
    <Header />
    <div className={styles.layout}>
      <ControlsPanel />
      <CategoryList />
    </div>
    <Footer />
    <Toaster />
  </div>
);
