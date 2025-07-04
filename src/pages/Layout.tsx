import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Layout = () => {
  return (
    <div className="root-layout">
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
