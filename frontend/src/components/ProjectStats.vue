<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
    <!-- Total tasks -->
    <div class="bg-[#1d2125] rounded-xl border border-[#3f474f] p-3">
      <p class="text-xs text-[#9fadbc] font-medium">Tổng nhiệm vụ</p>
      <h4 class="text-2xl font-bold text-white mt-1">{{ stats.total }}</h4>
      <p class="text-xs text-[#9fadbc] mt-1">Task trong dự án</p>
    </div>

    <!-- Completed -->
    <div class="bg-[#1d2125] rounded-xl border border-[#3f474f] p-3">
      <p class="text-xs text-[#9fadbc] font-medium">Hoàn thành</p>
      <h4 class="text-2xl font-bold text-green-400 mt-1">{{ stats.completed }}</h4>
      <p class="text-xs text-[#9fadbc] mt-1">{{ stats.completedPercent }}%</p>
    </div>

    <!-- In Progress -->
    <div class="bg-[#1d2125] rounded-xl border border-[#3f474f] p-3">
      <p class="text-xs text-[#9fadbc] font-medium">Đang làm</p>
      <h4 class="text-2xl font-bold text-blue-400 mt-1">
        {{ stats.inProgress }}
      </h4>
      <p class="text-xs text-[#9fadbc] mt-1">{{ stats.inProgressPercent }}%</p>
    </div>

    <!-- Overdue -->
    <div class="bg-[#1d2125] rounded-xl border border-[#3f474f] p-3">
      <p class="text-xs text-[#9fadbc] font-medium">Trễ hạn</p>
      <h4 class="text-2xl font-bold"
        :class="stats.overdue > 0 ? 'text-red-400' : 'text-green-400'"
      >
        {{ stats.overdue }}
      </h4>
      <p class="text-xs text-[#9fadbc] mt-1">
        {{ stats.overdue > 0 ? "Cần chú ý!" : "Đúng hạn" }}
      </p>
    </div>
  </div>

  <!-- Progress bar -->
  <div class="mt-4 bg-[#1d2125] rounded-xl border border-[#3f474f] p-4">
    <h4 class="text-sm font-semibold text-white mb-3">Tiến độ dự án</h4>
    <div class="space-y-3">
      <!-- Overall progress -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-[#9fadbc]">Tổng thể</span>
          <span class="text-sm font-medium text-white">{{ stats.completedPercent }}%</span>
        </div>
        <div class="w-full h-2 bg-[#282e33] rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300"
            :style="{ width: `${stats.completedPercent}%` }"
          />
        </div>
      </div>

      <!-- Status breakdown -->
      <div class="grid grid-cols-3 gap-2 pt-2">
        <div class="text-center">
          <div class="text-xs text-[#9fadbc] mb-1">Chưa làm</div>
          <div class="text-lg font-bold text-gray-400">{{ stats.todo }}</div>
        </div>
        <div class="text-center">
          <div class="text-xs text-[#9fadbc] mb-1">Đang làm</div>
          <div class="text-lg font-bold text-blue-400">{{ stats.inProgress }}</div>
        </div>
        <div class="text-center">
          <div class="text-xs text-[#9fadbc] mb-1">Hoàn thành</div>
          <div class="text-lg font-bold text-green-400">{{ stats.completed }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
});

const stats = computed(() => {
  const now = new Date();
  const tasks = props.tasks || [];

  // Count by status
  const completed = tasks.filter((t) => t.status === "Done").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const todo = tasks.filter((t) => t.status === "Todo").length;
  const total = tasks.length || 1;

  // Overdue count
  const overdue = tasks.filter((t) => {
    if (!t.dueDate || t.status === "Done") return false;
    return new Date(t.dueDate) < now;
  }).length;

  const completedPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const inProgressPercent = total > 0 ? Math.round((inProgress / total) * 100) : 0;

  return {
    total,
    completed,
    inProgress,
    todo,
    overdue,
    completedPercent,
    inProgressPercent,
  };
});
</script>
