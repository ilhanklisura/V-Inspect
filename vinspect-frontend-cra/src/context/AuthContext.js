import React, { createContext, useState, useEffect, useContext } from "react";
import authApi from "../api/authApi";
import tokenUtils from "../utils/tokenUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApi.login(email, password);
      const data = response.data;

      // Spremanje tokena i podataka o korisniku
      tokenUtils.setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    tokenUtils.removeToken();
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAdmin = () => user?.role === "admin";
  const isVehicleOwner = () => user?.role === "vehicle_owner";
  const isInspectionStaff = () => user?.role === "inspection_staff";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        isAdmin,
        isVehicleOwner,
        isInspectionStaff,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
