/**
 * Authentication utilities for VInspect
 * Handles user session, roles, and access control
 */

class Auth {
  constructor() {
    this.currentUser = null;
    this.userRole = null;
  }

  /**
   * Initialize auth state
   */
  init() {
    // Check if we have a token
    if (api.isAuthenticated()) {
      this.loadUserFromToken();
    } else {
      this.redirectToLogin();
    }
  }

  /**
   * Load user info from JWT token
   */
  loadUserFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      // JWT tokens are in format: header.payload.signature
      // We need the payload part
      const payload = token.split(".")[1];
      // The payload is base64 encoded
      const decoded = JSON.parse(atob(payload));

      this.currentUser = decoded;
      this.userRole = decoded.role;

      // Check if token is expired
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        console.log("Token expired");
        this.logout();
        return null;
      }

      return decoded;
    } catch (error) {
      console.error("Failed to parse token:", error);
      this.logout();
      return null;
    }
  }

  /**
   * Get current authenticated user
   * @returns {Object|null} User object or null if not authenticated
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Get current user role
   * @returns {string|null} User role or null if not authenticated
   */
  getUserRole() {
    return this.userRole;
  }

  /**
   * Check if current user has specific role
   * @param {string|Array} roles Role or array of roles to check
   * @returns {boolean} True if user has role
   */
  hasRole(roles) {
    if (!this.userRole) return false;

    if (Array.isArray(roles)) {
      return roles.includes(this.userRole);
    }

    return this.userRole === roles;
  }

  /**
   * Login user
   * @param {string} email User email
   * @param {string} password User password
   * @returns {Promise} Promise with login result
   */
  async login(email, password) {
    try {
      const response = await api.login(email, password);

      if (response && response.token) {
        this.loadUserFromToken();
        this.redirectToDashboard();
        return { success: true, user: response.user };
      }

      return { success: false, error: "Login failed" };
    } catch (error) {
      return { success: false, error: error.message || "Login failed" };
    }
  }

  /**
   * Register new user
   * @param {Object} userData User registration data
   * @returns {Promise} Promise with registration result
   */
  async register(userData) {
    try {
      const response = await api.register(userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message || "Registration failed" };
    }
  }

  /**
   * Logout current user
   */
  // U auth.js datoteci
  logout() {
    api.removeToken();
    this.currentUser = null;
    this.userRole = null;

    const basePath = window.location.origin + "/V-Inspect/frontend";
    window.location.href = `${basePath}/auth/login.html`;
  }
  /**
   * Redirect to login page
   */
  redirectToLogin() {
    const basePath = window.location.origin + "/V-Inspect/frontend";
    window.location.href = `${basePath}/auth/login.html`;
  }

  /**
   * Redirect to appropriate dashboard based on user role
   */
  redirectToDashboard() {
    if (!this.userRole) {
      this.redirectToLogin();
      return;
    }

    // Koristi apsolutnu putanju s window.location.origin
    const basePath = window.location.origin + "/V-Inspect/frontend";

    switch (this.userRole) {
      case "admin":
        window.location.href = `${basePath}/pages/admin/dashboard.html`;
        break;
      case "vehicle_owner":
        window.location.href = `${basePath}/pages/vehicle-owner/dashboard.html`;
        break;
      case "inspection_staff":
        window.location.href = `${basePath}/pages/inspection-staff/dashboard.html`;
        break;
      default:
        this.redirectToLogin();
    }
  }

  /**
   * Check if user has access to current page
   * @param {string|Array} allowedRoles Roles that have access to the page
   * @returns {boolean} True if user has access
   */
  checkAccess(allowedRoles) {
    if (!this.userRole) {
      this.redirectToLogin();
      return false;
    }

    if (!this.hasRole(allowedRoles)) {
      this.redirectToDashboard();
      return false;
    }

    return true;
  }
}

// Create global Auth instance
const auth = new Auth();

// Helper function for displaying notifications
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Hide and remove after 5 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Set up logout button
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      auth.logout();
    });
  }
});
