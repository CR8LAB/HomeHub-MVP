import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="portal-sidebar">
      <div className="sidebar-brand">
        <h2>HomeRoots</h2>
        <p>Platform Admin</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/admin">Dashboard</NavLink>

        <NavLink to="/admin/agencies">Agencies</NavLink>

        <NavLink to="/admin/codes">Activation Codes</NavLink>

        <NavLink to="/admin/print-queue">Print Queue</NavLink>

        <NavLink to="/admin/payments">Payments</NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
