/**
 * API client for VInspect
 * Handles all communication with backend REST API
 */

class ApiClient {
  constructor() {
    // API Base URL - temeljen na trenutnoj putanji
    const origin = window.location.origin;
    this.baseUrl = `${origin}/V-Inspect/backend`;

    // Check if we have a token in local storage
    this.token = localStorage.getItem("token");

    console.log("API client initialized with baseUrl:", this.baseUrl);
  }

  /**
   * Set authorization token
   * @param {string} token JWT token
   */
  setToken(token) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  /**
   * Remove token from storage
   */
  removeToken() {
    this.token = null;
    localStorage.removeItem("token");
  }

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return this.token !== null;
  }

  /**
   * Get authorization headers
   * @returns {Object} Headers object
   */
  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  /**
   * Make API request
   * @param {string} endpoint API endpoint path
   * @param {string} method HTTP method
   * @param {Object} data Request body data
   * @returns {Promise} Promise with API response
   */
  async request(endpoint, method = "GET", data = null) {
    const url = `${this.baseUrl}${endpoint}`;

    const options = {
      method,
      headers: this.getHeaders(),
    };

    if (data && (method === "POST" || method === "PUT")) {
      options.body = JSON.stringify(data);
    }

    try {
      console.log(`Making ${method} request to ${url}`);
      const response = await fetch(url, options);

      console.log(`Response status:`, response.status);

      // Handle 401 Unauthorized - redirect to login
      if (response.status === 401) {
        console.error("Unauthorized access, redirecting to login");
        this.removeToken();
        window.location.href = "/V-Inspect/frontend/auth/login.html";
        return null;
      }

      // Handle other error statuses
      if (!response.ok) {
        // Try to get error details
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message || `HTTP error! Status: ${response.status}`;
        } catch (e) {
          errorMessage = `HTTP error! Status: ${response.status}`;
        }

        console.error("API request failed:", errorMessage);
        throw new Error(errorMessage);
      }

      // Parse response
      const result = await response.json();
      console.log("API response:", result);
      return result;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  /**
   * User login
   * @param {string} email User email
   * @param {string} password User password
   * @returns {Promise} Promise with login response
   */
  async login(email, password) {
    const response = await this.request("/auth/login", "POST", {
      email,
      password,
    });
    if (response && response.token) {
      this.setToken(response.token);
    }
    return response;
  }

  /**
   * User registration
   * @param {Object} userData User data for registration
   * @returns {Promise} Promise with registration response
   */
  async register(userData) {
    return await this.request("/auth/register", "POST", userData);
  }

  /**
   * Get all users (admin only)
   * @returns {Promise} Promise with users data
   */
  async getUsers() {
    try {
      console.log("Getting users...");
      return await this.request("/users");
    } catch (error) {
      console.error("Error getting users:", error);
      // Return empty array instead of throwing
      return [];
    }
  }

  /**
   * Get user by ID
   * @param {number} id User ID
   * @returns {Promise} Promise with user data
   */
  async getUserById(id) {
    try {
      return await this.request(`/users/${id}`);
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  }

  /**
   * Create new user (admin only)
   * @param {Object} userData User data
   * @returns {Promise} Promise with created user
   */
  async createUser(userData) {
    return await this.request("/users", "POST", userData);
  }

  /**
   * Update user (admin only)
   * @param {number} id User ID
   * @param {Object} userData User data to update
   * @returns {Promise} Promise with updated user
   */
  async updateUser(id, userData) {
    return await this.request(`/users/${id}`, "PUT", userData);
  }

  /**
   * Delete user (admin only)
   * @param {number} id User ID
   * @returns {Promise} Promise with deletion response
   */
  async deleteUser(id) {
    return await this.request(`/users/${id}`, "DELETE");
  }

  /**
   * Get all vehicles (admin only)
   * @returns {Promise} Promise with vehicles data
   */
  async getVehicles() {
    try {
      console.log("Getting vehicles...");
      return await this.request("/vehicles");
    } catch (error) {
      console.error("Error getting vehicles:", error);
      // Return empty array instead of throwing
      return [];
    }
  }

  /**
   * Get vehicles of current owner
   * @returns {Promise} Promise with owner's vehicles
   */
  async getMyVehicles() {
    try {
      return await this.request("/vehicles/owner");
    } catch (error) {
      console.error("Error getting my vehicles:", error);
      return [];
    }
  }

  /**
   * Get vehicle by ID
   * @param {number} id Vehicle ID
   * @returns {Promise} Promise with vehicle data
   */
  async getVehicleById(id) {
    try {
      return await this.request(`/vehicles/${id}`);
    } catch (error) {
      console.error("Error getting vehicle:", error);
      return null;
    }
  }

  /**
   * Create new vehicle
   * @param {Object} vehicleData Vehicle data
   * @returns {Promise} Promise with created vehicle
   */
  async createVehicle(vehicleData) {
    return await this.request("/vehicles", "POST", vehicleData);
  }

  /**
   * Update vehicle
   * @param {number} id Vehicle ID
   * @param {Object} vehicleData Vehicle data to update
   * @returns {Promise} Promise with updated vehicle
   */
  async updateVehicle(id, vehicleData) {
    return await this.request(`/vehicles/${id}`, "PUT", vehicleData);
  }

  /**
   * Delete vehicle
   * @param {number} id Vehicle ID
   * @returns {Promise} Promise with deletion response
   */
  async deleteVehicle(id) {
    return await this.request(`/vehicles/${id}`, "DELETE");
  }

  /**
   * Get all stations
   * @returns {Promise} Promise with stations data
   */
  async getStations() {
    try {
      console.log("Getting stations...");
      return await this.request("/stations");
    } catch (error) {
      console.error("Error getting stations:", error);
      return [];
    }
  }

  /**
   * Get station by ID
   * @param {number} id Station ID
   * @returns {Promise} Promise with station data
   */
  async getStationById(id) {
    try {
      return await this.request(`/stations/${id}`);
    } catch (error) {
      console.error("Error getting station:", error);
      return null;
    }
  }

  /**
   * Create new station (admin only)
   * @param {Object} stationData Station data
   * @returns {Promise} Promise with created station
   */
  async createStation(stationData) {
    return await this.request("/stations", "POST", stationData);
  }

  /**
   * Update station (admin only)
   * @param {number} id Station ID
   * @param {Object} stationData Station data to update
   * @returns {Promise} Promise with updated station
   */
  async updateStation(id, stationData) {
    return await this.request(`/stations/${id}`, "PUT", stationData);
  }

  /**
   * Delete station (admin only)
   * @param {number} id Station ID
   * @returns {Promise} Promise with deletion response
   */
  async deleteStation(id) {
    return await this.request(`/stations/${id}`, "DELETE");
  }

  /**
   * Get all inspections (admin, staff only)
   * @returns {Promise} Promise with inspections data
   */
  async getInspections() {
    try {
      console.log("Getting inspections...");
      return await this.request("/inspections");
    } catch (error) {
      console.error("Error getting inspections:", error);
      return [];
    }
  }

  /**
   * Get inspections of logged-in vehicle owner
   * @returns {Promise} Promise with owner's inspections
   */
  async getMyInspections() {
    try {
      return await this.request("/inspections/my");
    } catch (error) {
      console.error("Error getting my inspections:", error);
      return [];
    }
  }

  /**
   * Get inspection by ID
   * @param {number} id Inspection ID
   * @returns {Promise} Promise with inspection data
   */
  async getInspectionById(id) {
    try {
      return await this.request(`/inspections/${id}`);
    } catch (error) {
      console.error("Error getting inspection:", error);
      return null;
    }
  }

  /**
   * Schedule inspection (vehicle owner only)
   * @param {Object} inspectionData Inspection data
   * @returns {Promise} Promise with scheduled inspection
   */
  async scheduleInspection(inspectionData) {
    return await this.request("/inspections", "POST", inspectionData);
  }

  /**
   * Update inspection (staff or admin only)
   * @param {number} id Inspection ID
   * @param {Object} inspectionData Inspection data to update
   * @returns {Promise} Promise with updated inspection
   */
  async updateInspection(id, inspectionData) {
    return await this.request(`/inspections/${id}`, "PUT", inspectionData);
  }

  /**
   * Delete inspection (admin only)
   * @param {number} id Inspection ID
   * @returns {Promise} Promise with deletion response
   */
  async deleteInspection(id) {
    return await this.request(`/inspections/${id}`, "DELETE");
  }
}

// Create global API instance
const api = new ApiClient();
