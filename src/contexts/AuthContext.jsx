// MongoDB Backend + JWT Authentication (FINAL FIX)

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { authAPI } from "../services/api/authAPI";

// ================= CONTEXT =================
export const AuthContext = createContext(null);

// ================= HOOK =================
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

// ================= PROVIDER =================
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ================= CHECK AUTH ON LOAD =================
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }

      const userData = await authAPI.getProfile();
      setUser(userData);
    } catch (err) {
      console.error("Auth check failed:", err);
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ================= LOGIN =================
  const login = async (email, password) => {
    try {
      setError(null);

      // 🔴 IMPORTANT: backend route = /login
      const { user } = await authAPI.login(email, password);

      setUser(user);
      return { success: true, user };
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Login failed";
      setError(message);
      throw new Error(message);
    }
  };

  // ================= REGISTER =================
  const register = async (userData) => {
    try {
      setError(null);

      // 🔴 IMPORTANT: backend route = /register
      const { user } = await authAPI.register(userData);

      setUser(user);
      return { success: true, user };
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Registration failed";
      setError(message);
      throw new Error(message);
    }
  };

  // ================= LOGOUT =================
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
    }
  };

  // ================= UPDATE PROFILE =================
  const updateProfile = async (updates) => {
    try {
      setError(null);
      const updatedUser = await authAPI.updateProfile(updates);
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Update failed";
      setError(message);
      throw new Error(message);
    }
  };

  // ================= CONTEXT VALUE =================
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    checkAuth,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isDecorator: user?.role === "decorator",
    isCustomer: user?.role === "customer",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
