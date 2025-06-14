import api from "./api";

export const authService = {
  // Login user
  async login(credentials) {
    try {
      const response = await api.post("/auth/login", credentials);
      const { data } = response.data;
      const { token, ...user } = data;

      // Store token and user data
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { token, user };
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  },

  // Register new user
  async register(userData) {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Registration failed" };
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  // Get current user from localStorage
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem("authToken");
    return !!token;
  },

  // Get stored token
  getToken() {
    return localStorage.getItem("authToken");
  },
};
