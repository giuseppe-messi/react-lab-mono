import { CategoryList } from "../../components/CategoryList/CategoryList";
import { ControlsPanel } from "../../components/ControlsPanel/ControlsPanel";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Toaster } from "../../components/Toaster/Toaster";

export const Home = () => (
  <div className="app">
    <Header />
    <div className="main">
      <ControlsPanel />
      <CategoryList />
    </div>
    <Footer />
    <Toaster />
  </div>
);
