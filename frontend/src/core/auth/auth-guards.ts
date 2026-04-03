import { readAuthUser } from "@/core/auth/auth-storage";

export const isAuthenticated = () => {
  return Boolean(readAuthUser());
};

export const canAccessRoute = () => {
  return true;
};
