import { defineStore } from "pinia";
import { ref } from "vue";

type NotificationType = "success" | "error" | "warning" | "info";

export interface UINotification {
  type: NotificationType;
  message: string;
}

export const useUIStore = defineStore("ui", () => {
  const showNotification = ref(false);
  const notification = ref<UINotification>({
    type: "success", // success, error, warning, info
    message: "",
  });
  let notificationTimer: ReturnType<typeof setTimeout> | null = null;

  const setNotification = (type: NotificationType, message: string): void => {
    notification.value = { type, message };
    showNotification.value = true;

    if (notificationTimer) {
      clearTimeout(notificationTimer);
    }

    notificationTimer = setTimeout(() => {
      showNotification.value = false;
      notificationTimer = null;
    }, 3000);
  };

  const closeNotification = (): void => {
    if (notificationTimer) {
      clearTimeout(notificationTimer);
      notificationTimer = null;
    }

    showNotification.value = false;
  };

  return {
    showNotification,
    notification,
    setNotification,
    closeNotification,
  };
});
