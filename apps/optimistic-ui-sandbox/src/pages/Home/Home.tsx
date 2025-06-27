import { CategoryList } from "../../components/CategoryList/CategoryList";
import { ControlsPanel } from "../../components/ControlsPanel/ControlsPanel";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";

export const Home = () => (
  <div className="app">
    <Header />
    <div className="main">
      <ControlsPanel />
      <CategoryList />
    </div>
    <Footer />
  </div>
);
