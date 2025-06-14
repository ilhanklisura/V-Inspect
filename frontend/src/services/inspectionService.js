import api from "./api";

export const inspectionService = {
  // Get all inspections
  async getInspections() {
    try {
      const response = await api.get("/inspections");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch inspections" };
    }
  },

  // Get inspection by ID
  async getInspection(inspectionId) {
    try {
      const response = await api.get(`/inspections/${inspectionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch inspection" };
    }
  },

  // Create new inspection
  async createInspection(inspectionData) {
    try {
      const response = await api.post("/inspections", inspectionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to create inspection" };
    }
  },

  // Update inspection
  async updateInspection(inspectionId, inspectionData) {
    try {
      const response = await api.put(
        `/inspections/${inspectionId}`,
        inspectionData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update inspection" };
    }
  },

  // Delete inspection
  async deleteInspection(inspectionId) {
    try {
      const response = await api.delete(`/inspections/${inspectionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete inspection" };
    }
  },

  // Get inspections by vehicle ID
  async getInspectionsByVehicle(vehicleId) {
    try {
      const response = await api.get(`/inspections/vehicle/${vehicleId}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to fetch vehicle inspections",
        }
      );
    }
  },

  // Get inspections by station ID
  async getInspectionsByStation(stationId) {
    try {
      const response = await api.get(`/inspections/station/${stationId}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to fetch station inspections",
        }
      );
    }
  },

  // Update inspection status
  async updateInspectionStatus(inspectionId, status, result = null) {
    try {
      const response = await api.patch(`/inspections/${inspectionId}/status`, {
        status,
        result,
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to update inspection status",
        }
      );
    }
  },

  // Get current user's inspections
  async getMyInspections() {
    try {
      const response = await api.get("/inspections/my");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to fetch my inspections" }
      );
    }
  },
};
