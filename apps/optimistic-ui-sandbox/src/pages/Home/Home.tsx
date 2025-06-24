import { ControlsPanel } from "../../components/ControlsPanel/ControlsPanel";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { ResourceList } from "../../components/ResourceList/ResourceList";

export const Home = () => (
  <div className="app">
    <Header />
    <div className="main">
      <ControlsPanel />
      <ResourceList />
    </div>
    <Footer />
  </div>
);
