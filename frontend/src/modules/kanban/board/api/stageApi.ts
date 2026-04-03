import type { AxiosResponse } from "axios";
import axiosInstance from "@/core/http/axios";

export type StageId = number | string;

export interface StageRecord extends Record<string, unknown> {
  id?: StageId;
  name?: string;
  description?: string;
  status?: string;
  priority?: string;
  createdAt?: string;
}

export interface ApiEnvelope<T> {
  data: T;
}

export type ApiPayload<T> = ApiEnvelope<T> | T;

export const stageAPI = {
  // Get all stages
  getAllStages: (): Promise<AxiosResponse<ApiPayload<StageRecord[]>>> =>
    axiosInstance.get("/stages"),

  // Get stage by ID
  getStageById: (id: StageId): Promise<AxiosResponse<ApiPayload<StageRecord>>> =>
    axiosInstance.get(`/stages/${id}`),

  // Create new stage
  createStage: (
    stageData: Partial<StageRecord>
  ): Promise<AxiosResponse<ApiPayload<StageRecord>>> =>
    axiosInstance.post("/stages", stageData),

  // Update stage
  updateStage: (
    id: StageId,
    stageData: Partial<StageRecord>
  ): Promise<AxiosResponse<ApiPayload<StageRecord>>> =>
    axiosInstance.put(`/stages/${id}`, stageData),

  // Delete stage
  deleteStage: (id: StageId): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`/stages/${id}`),

  // Get stages with pagination
  getStagesPaginated: (
    page: number,
    limit: number
  ): Promise<AxiosResponse<ApiPayload<StageRecord[]>>> =>
    axiosInstance.get(`/stages?page=${page}&limit=${limit}`),
};
