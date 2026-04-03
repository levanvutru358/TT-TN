import { computed, ref } from "vue";
import {
  AUTH_CHANGE_EVENT,
  clearAuthUser,
  readAuthUser,
  type AuthUser,
  writeAuthUser,
} from "@/core/auth/auth-storage";

interface AuthPayload {
  id?: string;
  name?: string;
  email?: string;
}

const authUser = ref<AuthUser | null>(readAuthUser());

const syncAuthUser = () => {
  authUser.value = readAuthUser();
};

let listenersBound = false;

const bindAuthListeners = () => {
  if (listenersBound || typeof window === "undefined") {
    return;
  }

  window.addEventListener("storage", syncAuthUser);
  window.addEventListener(AUTH_CHANGE_EVENT, syncAuthUser);
  listenersBound = true;
};

bindAuthListeners();

const buildAuthUser = (payload: AuthPayload): AuthUser => {
  return {
    id: payload.id || cryptoId(),
    name: payload.name || "Nguoi dung",
    email: payload.email || "",
  };
};

export function useAuth() {
  const isAuthenticated = computed(() => Boolean(authUser.value));

  function login(payload: AuthPayload) {
    writeAuthUser(buildAuthUser(payload));
    syncAuthUser();
  }

  function register(payload: AuthPayload) {
    writeAuthUser(buildAuthUser(payload));
    syncAuthUser();
  }

  function logout() {
    clearAuthUser();
    syncAuthUser();
  }

  return {
    authUser,
    isAuthenticated,
    login,
    register,
    logout,
  };
}

function cryptoId() {
  return Math.random().toString(36).slice(2, 10);
}
