<template>
  <div v-if="showNotification" class="fixed top-4 right-4 z-50">
    <div
      :class="[
        'px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition-all duration-300',
        notificationClass,
      ]"
    >
      {{ notification.message }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useUIStore } from "@/stores/uiStore";

const uiStore = useUIStore();

const showNotification = computed(() => uiStore.showNotification);
const notification = computed(() => uiStore.notification);

const notificationClass = computed(() => {
  switch (notification.value.type) {
    case "success":
      return "bg-green-500";
    case "error":
      return "bg-red-500";
    case "warning":
      return "bg-yellow-500";
    case "info":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
});
</script>
