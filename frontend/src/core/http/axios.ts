import axios from "axios";
import env from "@/core/config/env";
import { attachInterceptors } from "@/core/http/interceptors";

const axiosInstance = axios.create({
  baseURL: env.apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

attachInterceptors(axiosInstance);

export default axiosInstance;
