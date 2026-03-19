import { computed, ref } from "vue";

const AUTH_STORAGE_KEY = "trello_auth_user";

const authUser = ref(loadAuthUser());

function loadAuthUser() {
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function syncAuthUser() {
  authUser.value = loadAuthUser();
}

function saveAuthUser(user) {
  authUser.value = user;
  sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new CustomEvent("trello-auth-changed"));
}

function clearAuthUser() {
  authUser.value = null;
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("trello-auth-changed"));
}

window.addEventListener("storage", syncAuthUser);
window.addEventListener("trello-auth-changed", syncAuthUser);

export function useAuth() {
  const isAuthenticated = computed(() => Boolean(authUser.value));

  function login(payload) {
    saveAuthUser({
      id: payload.id || cryptoId(),
      name: payload.name || "Người dùng",
      email: payload.email || "",
    });
  }

  function register(payload) {
    saveAuthUser({
      id: payload.id || cryptoId(),
      name: payload.name || "Người dùng",
      email: payload.email || "",
    });
  }

  function logout() {
    clearAuthUser();
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