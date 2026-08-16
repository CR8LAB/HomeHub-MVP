import { createContext, useContext, useEffect, useState } from "react";

import { getCurrentAgencyUser } from "../services/auth.service.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadSession();
  }, []);

  async function loadSession() {
    const token = localStorage.getItem("homehubAgencyToken");

    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const result = await getCurrentAgencyUser();

      setUser(result.user);

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Agency session validation failed:", error);

      localStorage.removeItem("homehubAgencyToken");

      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("homehubAgencyToken");

    setUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        logout,
        refreshSession: loadSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
