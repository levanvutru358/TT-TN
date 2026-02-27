<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
  >
    <div class="bg-[#282e33] rounded-xl w-[600px] max-h-[80vh] overflow-hidden">
      <!-- Header -->
      <div class="flex items-start justify-between p-4 border-b border-[#3f474f]">
        <div class="flex items-center gap-3">
          <div
            class="w-1 h-8 rounded-full"
            :class="priorityColor"
          />
          <div>
            <h2 class="text-white font-medium">{{ task.title }}</h2>
            <p class="text-xs text-[#9fadbc] mt-0.5">
              in list <span class="underline">{{ task.status }}</span>
            </p>
          </div>
        </div>
        <button
          class="text-[#9fadbc] hover:text-white text-xl"
          @click="$emit('close')"
        >
          ×
        </button>
      </div>

      <!-- Content -->
      <div class="p-4 overflow-y-auto max-h-[60vh]">
        <div class="mb-6">
          <h3 class="text-white text-sm font-medium mb-2">Description</h3>
          <p class="text-[#9fadbc] text-sm">
            {{ task.description || "No description provided." }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <h4 class="text-xs text-[#9fadbc] mb-2">Priority</h4>
            <div class="flex items-center gap-2">
              <div
                class="w-2 h-2 rounded-full"
                :class="priorityColor"
              />
              <span class="text-sm text-white">{{ task.priority }}</span>
            </div>
          </div>

          <div>
            <h4 class="text-xs text-[#9fadbc] mb-2">Assignee</h4>
            <div class="flex items-center gap-2">
              <div
                class="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white"
              >
                {{ String(task.assignee || "?")[0] }}
              </div>
              <span class="text-sm text-white">{{ task.assignee }}</span>
            </div>
          </div>

          <div v-if="task.dueDate">
            <h4 class="text-xs text-[#9fadbc] mb-2">Due date</h4>
            <div class="flex items-center gap-2">
              <span class="text-sm text-white">{{ fullDate }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-[#3f474f] flex justify-end">
        <button
          class="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          @click="$emit('close')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

defineEmits(["close"]);

const priorityColor = computed(() => {
  if (props.task.priority === "High") return "bg-red-500";
  if (props.task.priority === "Medium") return "bg-yellow-500";
  return "bg-green-500";
});

const fullDate = computed(() => {
  if (!props.task.dueDate) return "";
  const d = new Date(props.task.dueDate);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>
