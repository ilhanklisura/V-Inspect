import api from "./api";

export const stationService = {
  // Get all stations
  async getStations() {
    try {
      const response = await api.get("/stations");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch stations" };
    }
  },

  // Get station by ID
  async getStation(stationId) {
    try {
      const response = await api.get(`/stations/${stationId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch station" };
    }
  },

  // Create new station
  async createStation(stationData) {
    try {
      const response = await api.post("/stations", stationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to create station" };
    }
  },

  // Update station
  async updateStation(stationId, stationData) {
    try {
      const response = await api.put(`/stations/${stationId}`, stationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update station" };
    }
  },

  // Delete station
  async deleteStation(stationId) {
    try {
      const response = await api.delete(`/stations/${stationId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete station" };
    }
  },
};
