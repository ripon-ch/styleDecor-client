import React from "react";
import Routes from "./Routes";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/tailwind.css";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <React.Suspense fallback={<div>Loading App...</div>}>
            <Routes />
          </React.Suspense>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
