import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextsProvider } from "./contexts/AuthContexts.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextsProvider>
      <App />
    </AuthContextsProvider>
  </React.StrictMode>
);
