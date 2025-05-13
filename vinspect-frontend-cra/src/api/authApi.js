// src/api/authApi.js
import axiosInstance from "./axios";

const authApi = {
  login: (email, password) => {
    return axiosInstance.post("/auth/login", { email, password });
  },

  // Dodajemo funkciju za registraciju
  register: (userData) => {
    return axiosInstance.post("/auth/register", userData);
  },
};

export default authApi;
