import axiosInstance from "./axios";

const vehicleApi = {
  getAllVehicles: () => {
    return axiosInstance.get("/vehicles");
  },

  getMyVehicles: () => {
    return axiosInstance.get("/vehicles/my");
  },

  getVehicleById: (id) => {
    return axiosInstance.get(`/vehicles/${id}`);
  },

  addVehicle: (vehicleData) => {
    return axiosInstance.post("/vehicles", vehicleData);
  },

  updateVehicle: (id, vehicleData) => {
    return axiosInstance.put(`/vehicles/${id}`, vehicleData);
  },

  deleteVehicle: (id) => {
    return axiosInstance.delete(`/vehicles/${id}`);
  },
};

export default vehicleApi;
