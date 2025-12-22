import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

// ✅ MOCK USERS (NO SUPABASE)
const mockUsers = [
  {
    id: "1",
    email: "customer@styledecor.com",
    password: "customer123",
    role: "customer",
    name: "Customer User",
  },
  {
    id: "2",
    email: "decorator1@styledecor.com",
    password: "decorator123",
    role: "decorator",
    name: "Decorator User",
  },
  {
    id: "3",
    email: "admin@styledecor.com",
    password: "admin123",
    role: "admin",
    name: "Admin User",
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Restore auth safely
  useEffect(() => {
    try {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      const role = localStorage.getItem("userRole");

      if (isAuthenticated === "true" && role) {
        const foundUser = mockUsers.find(
          (u) => u.role === role
        );
        if (foundUser) {
          setUser(foundUser);
        }
      }
    } catch (err) {
      console.error("Auth restore failed:", err);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Sign in
  const signIn = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(
          (u) => u.email === email && u.password === password
        );

        if (!foundUser) {
          reject(new Error("Invalid email or password"));
          return;
        }

        setUser(foundUser);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", foundUser.role);

        resolve({ user: foundUser });
      }, 400);
    });
  };

  // ✅ Sign out
  const signOut = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ SAFE HOOK (PREVENTS NULL CONTEXT CRASH)
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
