import { defineStore } from "pinia";
import { ref } from "vue";

export const useUIStore = defineStore("ui", () => {
  const showNotification = ref(false);
  const notification = ref({
    type: "success", // success, error, warning, info
    message: "",
  });

  const setNotification = (type, message) => {
    notification.value = { type, message };
    showNotification.value = true;
    setTimeout(() => {
      showNotification.value = false;
    }, 3000);
  };

  const closeNotification = () => {
    showNotification.value = false;
  };

  return {
    showNotification,
    notification,
    setNotification,
    closeNotification,
  };
});
