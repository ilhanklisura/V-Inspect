import React, { useState } from "react";
import { AuthProvider } from "./components/auth/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/layout/Dashboard";
import LoadingSpinner from "./components/ui/LoadingSpinner";

const App = () => {
  const { user, loading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return <Dashboard />;
  }

  if (showRegister) {
    return <Register onBackToLogin={() => setShowRegister(false)} />;
  }

  return <Login onShowRegister={() => setShowRegister(true)} />;
};

const VInspectApp = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default VInspectApp;
