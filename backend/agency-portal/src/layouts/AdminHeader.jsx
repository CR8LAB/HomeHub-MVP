import { useAdminAuth } from "../context/AdminAuthContext.jsx";

function AdminHeader() {
  const { admin, signOut } = useAdminAuth();

  return (
    <header className="portal-header">
      <div>
        <h2>HomeRoots Platform</h2>
        <p>Super Administrator</p>
      </div>

      <div className="header-user">
        <div>
          <strong>
            {admin?.firstName} {admin?.lastName}
          </strong>

          <p>{admin?.email}</p>
        </div>

        <button onClick={signOut}>Logout</button>
      </div>
    </header>
  );
}

export default AdminHeader;
