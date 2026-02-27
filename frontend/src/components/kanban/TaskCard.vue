<template>
  <div>
    <div
      class="bg-[#22272b] rounded-lg p-3 shadow-sm hover:bg-[#2c333a] cursor-pointer border border-[#3f474f] transition-colors group"
      @click="open = true"
    >
      <!-- Priority -->
      <div class="flex items-center gap-2 mb-2">
        <div
          class="w-2 h-2 rounded-full"
          :class="priorityConfig.bg"
        />
        <span class="text-xs text-[#9fadbc]">{{ task.priority }}</span>
      </div>

      <!-- Title -->
      <h4 class="text-sm text-white font-medium mb-3">
        {{ task.title }}
      </h4>

      <!-- Description -->
      <p
        v-if="task.description"
        class="text-xs text-[#9fadbc] mb-3 line-clamp-2"
      >
        {{ task.description }}
      </p>

      <!-- Footer -->
      <div class="flex items-center justify-between mt-2">
        <div class="flex items-center gap-1">
          <div
            class="w-6 h-6 rounded-full bg-[#34424c] flex items-center justify-center text-xs text-white"
          >
            {{ String(task.assignee || "?")[0] }}
          </div>
        </div>

        <div
          v-if="task.dueDate"
          class="flex items-center gap-1 text-xs text-[#9fadbc]"
        >
          <span>📅</span>
          <span>{{ shortDate }}</span>
        </div>
      </div>
    </div>

    <TaskModal
      v-if="open"
      :task="task"
      @close="open = false"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import TaskModal from "./TaskModal.vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const open = ref(false);

const priorityConfig = computed(() => {
  const map = {
    High: { bg: "bg-red-500" },
    Medium: { bg: "bg-yellow-500" },
    Low: { bg: "bg-green-500" },
  };
  return map[props.task.priority] || { bg: "bg-gray-400" };
});

const shortDate = computed(() => {
  if (!props.task.dueDate) return "";
  const d = new Date(props.task.dueDate);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
});
</script>
