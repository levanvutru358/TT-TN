import axiosInstance from "./axios";

export const stageAPI = {
  // Get all stages
  getAllStages: () => axiosInstance.get("/stages"),

  // Get stage by ID
  getStageById: (id) => axiosInstance.get(`/stages/${id}`),

  // Create new stage
  createStage: (stageData) => axiosInstance.post("/stages", stageData),

  // Update stage
  updateStage: (id, stageData) => axiosInstance.put(`/stages/${id}`, stageData),

  // Delete stage
  deleteStage: (id) => axiosInstance.delete(`/stages/${id}`),

  // Get stages with pagination
  getStagesPaginated: (page, limit) =>
    axiosInstance.get(`/stages?page=${page}&limit=${limit}`),
};
