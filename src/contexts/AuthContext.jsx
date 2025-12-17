// Location: client/src/contexts/AuthContext.jsx
// MongoDB Backend + JWT Authentication (FIXED)

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { authAPI } from "../services/api/authAPI";

// ================= CONTEXT =================
export const AuthContext = createContext(null);

// ================= HOOK (FIX) =================
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

  // Check auth on app load
  useEffect(() => {
    checkAuth();
  }, []);

  // ================= CHECK AUTH =================
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
      const { user } = await authAPI.signIn(email, password);
      setUser(user);
      return { success: true, user };
    } catch (err) {
      const message = err.message || "Login failed";
      setError(message);
      throw new Error(message);
    }
  };

  // ================= REGISTER =================
  const register = async (userData) => {
    try {
      setError(null);
      const { user } = await authAPI.signUp(
        userData.email,
        userData.password,
        userData.fullName,
        userData.phone,
        userData.address,
        userData.role
      );
      setUser(user);
      return { success: true, user };
    } catch (err) {
      const message = err.message || "Registration failed";
      setError(message);
      throw new Error(message);
    }
  };

  // ================= LOGOUT =================
  const logout = async () => {
    try {
      await authAPI.signOut();
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
      const message = err.message || "Update failed";
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
    isAuthenticated: Boolean(user),
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
