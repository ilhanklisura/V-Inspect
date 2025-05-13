import axiosInstance from "./axios";

const inspectionApi = {
  getAllInspections: () => {
    return axiosInstance.get("/inspections");
  },
  getMyInspections: () => {
    return axiosInstance.get("/inspections/my");
  },
  getInspectionById: (id) => {
    return axiosInstance.get(`/inspections/${id}`);
  },
  scheduleInspection: (data) => {
    return axiosInstance.post("/inspections", data);
  },
  updateInspection: (id, data) => {
    return axiosInstance.put(`/inspections/${id}`, data);
  },
  deleteInspection: (id) => {
    return axiosInstance.delete(`/inspections/${id}`);
  },
};

export default inspectionApi;
