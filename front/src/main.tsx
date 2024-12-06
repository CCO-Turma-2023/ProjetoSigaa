import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context.tsx";
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App></App>
      <ToastContainer autoClose={2000}/>
    </AuthProvider>
  </StrictMode>,
);
