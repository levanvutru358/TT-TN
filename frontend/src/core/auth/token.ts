import { STORAGE_KEYS } from "@/core/constants/storage-keys";

const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
};

export const getAuthToken = () => {
  return getStorage()?.getItem(STORAGE_KEYS.authToken) || null;
};

export const setAuthToken = (token: string) => {
  getStorage()?.setItem(STORAGE_KEYS.authToken, token);
};

export const clearAuthToken = () => {
  getStorage()?.removeItem(STORAGE_KEYS.authToken);
};
