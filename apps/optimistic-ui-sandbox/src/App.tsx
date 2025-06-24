import { ControlsPanel } from "./components/ControlsPanel/ControlsPanel";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { ResourceList } from "./components/ResourceList/ResourceList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <ControlsPanel />
        <ResourceList />
      </div>
      <Footer />
    </div>
  );
}

export default App;
