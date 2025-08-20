import { Outlet } from "react-router-dom";
import { Nav } from "./components/Nav";

export const Layout = () => (
  <>
    <Nav />
    <main className="main">
      <Outlet />
    </main>
  </>
);
