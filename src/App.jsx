import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { useAuth } from "./hooks/useAuth.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

function AppContent() {
  const { loading } = useAuth(); // ✅ SAFE NOW

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-foreground">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return <Routes />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
