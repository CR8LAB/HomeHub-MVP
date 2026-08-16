import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Header() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="portal-header">
      <div>
        <h2>{user?.agencyName || "Agency Portal"}</h2>

        <p>{user?.agencyCity}</p>
      </div>

      <div className="header-user">
        <div>
          <strong>
            {user?.firstName} {user?.lastName}
          </strong>

          <p>{user?.agencyRole}</p>
        </div>

        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
