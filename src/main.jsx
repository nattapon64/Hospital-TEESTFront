import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextsProvider } from "./contexts/AuthContexts.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <AuthContextsProvider>
      <ToastContainer/>
      <App />
    </AuthContextsProvider>
  // {/* </React.StrictMode> */}
);
