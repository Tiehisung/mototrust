import { Outlet } from "react-router-dom";
import Navbar from "./pages/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="pt-16 pb-20 px-4 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
