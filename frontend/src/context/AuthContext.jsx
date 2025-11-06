import { createContext, useState, useEffect } from "react";
import { api } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true); // 👈 new state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    } else {
      setLoadingAuth(false);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const data = await api("auth/me", "GET", null, token);
      setUser(data.user);
    } catch {
      localStorage.removeItem("token");
    } finally {
      setLoadingAuth(false); // 👈 stops loading
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
