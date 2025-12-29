import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail // Added for forgot password logic
} from "firebase/auth";
import { auth } from "../lib/firebase";
import axiosInstance from "../services/api/axiosConfig";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const syncWithBackend = async (firebaseUser) => {
    try {
      const token = await firebaseUser.getIdToken();
      localStorage.setItem("authToken", token);
      const response = await axiosInstance.get("/auth/me");
      const userData = response.data.user;
      localStorage.setItem("userRole", userData.role);
      setUser(userData);
      return userData; 
    } catch (err) {
      console.error("Backend Sync Failed:", err.message);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        await syncWithBackend(firebaseUser);
      } else {
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return await syncWithBackend(res.user);
    } catch (error) {
      let message = "Invalid email or password.";
      if (error.code === 'auth/invalid-credential') message = "The email or password you entered is incorrect.";
      if (error.code === 'auth/too-many-requests') message = "Account temporarily locked. Try again later.";
      throw new Error(message);
    }
  };

  const signUp = async (email, password, fullName, phone, address, role) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const response = await axiosInstance.post("/auth/register", {
      uid: userCredential.user.uid,
      email,
      fullName,
      phone,
      address,
      role
    });
    await syncWithBackend(userCredential.user);
    return response.data;
  };

  // Added Forgot Password Function
  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      let message = "Failed to send reset email.";
      if (error.code === 'auth/user-not-found') message = "No account found with this email.";
      throw new Error(message);
    }
  };

  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, new GoogleAuthProvider());
    return await syncWithBackend(res.user);
  };

  const signInWithFacebook = async () => {
    const res = await signInWithPopup(auth, new FacebookAuthProvider());
    return await syncWithBackend(res.user);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, loading, signIn, signUp, signOut, 
      signInWithGoogle, signInWithFacebook, forgotPassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};