import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="portal-sidebar">
      <div className="sidebar-brand">
        <h2>HomeRoots</h2>
        <p>Agency Portal</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/portal" end>
          Dashboard
        </NavLink>

        <NavLink to="/portal/codes">Activation Codes</NavLink>

        <NavLink to="/portal/households">Households</NavLink>

        <NavLink to="/portal/services">Services</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
