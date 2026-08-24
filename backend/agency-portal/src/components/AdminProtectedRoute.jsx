import { Navigate } from "react-router-dom";

import { useAdminAuth } from "../context/AdminAuthContext.jsx";

function AdminProtectedRoute({ children }) {
  const { admin, loading } = useAdminAuth();

  if (loading) {
    return <p>Loading admin session...</p>;
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default AdminProtectedRoute;
