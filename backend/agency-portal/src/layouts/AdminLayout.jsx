import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar.jsx";
import AdminHeader from "./AdminHeader.jsx";

function AdminLayout() {
  return (
    <div className="portal-layout">
      <AdminSidebar />

      <div className="portal-main">
        <AdminHeader />

        <main className="portal-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
