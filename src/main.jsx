import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const container = document.getElementById("root");

if (!container) {
  document.body.innerHTML = "<h1>#root not found</h1>";
} else {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
