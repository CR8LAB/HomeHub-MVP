import { Outlet } from "react-router-dom";

function PortalLayout() {
  return (
    <div>
      <aside>Sidebar</aside>

      <div>
        <header>Agency Portal Header</header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default PortalLayout;
