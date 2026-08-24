import { createContext, useContext, useEffect, useState } from "react";

import { loginAdmin, getCurrentAdmin } from "../services/admin-auth.service.js";

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdmin() {
      const token = localStorage.getItem("homehubAdminToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const result = await getCurrentAdmin();

        setAdmin(result.user);
      } catch (error) {
        console.error("Admin session expired:", error);

        localStorage.removeItem("homehubAdminToken");

        setAdmin(null);
      } finally {
        setLoading(false);
      }
    }

    loadAdmin();
  }, []);

  async function signIn(email, password) {
    const result = await loginAdmin(email, password);

    localStorage.setItem("homehubAdminToken", result.token);

    setAdmin(result.user);

    return result;
  }

  function signOut() {
    localStorage.removeItem("homehubAdminToken");

    setAdmin(null);
  }

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        signIn,
        signOut,
        isAuthenticated: !!admin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
