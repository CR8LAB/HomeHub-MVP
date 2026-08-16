import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";

function PortalLayout() {
  return (
    <div className="portal-layout">
      <Sidebar />

      <div className="portal-main">
        <Header />

        <main className="portal-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default PortalLayout;
