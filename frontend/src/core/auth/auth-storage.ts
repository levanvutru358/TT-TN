import { STORAGE_KEYS } from "@/core/constants/storage-keys";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export const AUTH_CHANGE_EVENT = "trello-auth-changed";

const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.sessionStorage;
};

export const readAuthUser = () => {
  const storage = getStorage();

  if (!storage) {
    return null;
  }

  try {
    const raw = storage.getItem(STORAGE_KEYS.authUser);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
};

export const writeAuthUser = (user: AuthUser) => {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  storage.setItem(STORAGE_KEYS.authUser, JSON.stringify(user));
  window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT));
};

export const clearAuthUser = () => {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  storage.removeItem(STORAGE_KEYS.authUser);
  window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT));
};
