import axios from "axios";

// Backend URLs
const LOCAL_API_URL = "http://localhost/V-Inspect/backend";
const PRODUCTION_API_URL = "https://vinspect-backend-6lgv6.ondigitalocean.app/";

// Determine which API URL to use
const isProduction =
  window.location.hostname !== "localhost" &&
  window.location.hostname !== "127.0.0.1";

const API_BASE_URL = isProduction ? PRODUCTION_API_URL : LOCAL_API_URL;

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
