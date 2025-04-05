import React from "react";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

export default function AppEntry() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}