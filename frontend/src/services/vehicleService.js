import api from "./api";

export const vehicleService = {
  // Get all vehicles
  async getVehicles() {
    try {
      const response = await api.get("/vehicles");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch vehicles" };
    }
  },

  // Get vehicle by ID
  async getVehicle(vehicleId) {
    try {
      const response = await api.get(`/vehicles/${vehicleId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch vehicle" };
    }
  },

  // Create new vehicle
  async createVehicle(vehicleData) {
    try {
      const response = await api.post("/vehicles", vehicleData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to create vehicle" };
    }
  },

  // Update vehicle
  async updateVehicle(vehicleId, vehicleData) {
    try {
      const response = await api.put(`/vehicles/${vehicleId}`, vehicleData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update vehicle" };
    }
  },

  // Delete vehicle
  async deleteVehicle(vehicleId) {
    try {
      const response = await api.delete(`/vehicles/${vehicleId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete vehicle" };
    }
  },

  // Get vehicles by owner
  async getVehiclesByOwner(ownerId) {
    try {
      const response = await api.get(`/vehicles/owner/${ownerId}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to fetch owner vehicles" }
      );
    }
  },

  // Get current user's vehicles
  async getMyVehicles() {
    try {
      const response = await api.get("/vehicles/my");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch my vehicles" };
    }
  },
};
