import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { ROUTE_PATHS } from "@/core/config/route-names";
import { clearAuthToken, getAuthToken } from "@/core/auth/token";

const handleRequest = (config: InternalAxiosRequestConfig) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const handleResponseError = (error: AxiosError) => {
  if (error.response?.status === 401 && typeof window !== "undefined") {
    clearAuthToken();
    window.location.href = ROUTE_PATHS.login;
  }

  return Promise.reject(error);
};

export const attachInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(handleRequest, (error) => Promise.reject(error));
  instance.interceptors.response.use((response) => response, handleResponseError);

  return instance;
};
