<template>
  <div class="bg-black/25 px-5 py-6 overflow-y-auto custom-scrollbar">
    <div class="flex items-center justify-between gap-3 mb-4">
      <div class="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white/85" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <h3 class="text-[18px] font-semibold text-white">Nhận xét và hoạt động</h3>
      </div>

      <button
        class="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium"
        @click="$emit('toggle-details')"
      >
        {{ showDetails ? "Ẩn chi tiết" : "Hiện chi tiết" }}
      </button>
    </div>

    <div class="mb-6">
      <input
        :value="commentInput"
        class="w-full rounded-xl bg-white/10 border border-white/5 px-4 py-3 text-white placeholder:text-white/45 outline-none"
        placeholder="Viết bình luận..."
        @input="$emit('update:commentInput', $event.target.value)"
        @keyup.enter="$emit('add-comment')"
      />
    </div>

    <div class="space-y-4">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="flex gap-3"
      >
        <div class="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white font-semibold shrink-0">
          {{ getInitials(activity.author) }}
        </div>

        <div class="min-w-0">
          <p class="text-white leading-6">
            <span class="font-semibold">{{ activity.author }}</span>
            <span class="text-white/90"> {{ activity.text }}</span>
          </p>
          <p class="text-blue-300 text-sm mt-1">{{ activity.time }}</p>
        </div>
      </div>
    </div>

    <div
      v-if="showDetails"
      class="mt-8 rounded-xl bg-white/[0.04] border border-white/10 p-4 space-y-3"
    >
      <div class="text-white/80 text-sm">ID: {{ task.id || "—" }}</div>
      <div class="text-white/80 text-sm">Độ ưu tiên: {{ task.priority || "—" }}</div>
      <div class="text-white/80 text-sm">Trạng thái: {{ task.status || "—" }}</div>
      <div class="text-white/80 text-sm">Ngày tạo: {{ createdAtText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed } from "vue";

const props = defineProps({
  activities: { type: Array, default: () => [] },
  task: { type: Object, required: true },
  commentInput: { type: String, default: "" },
  showDetails: { type: Boolean, default: true },
});

defineEmits([
  "update:commentInput",
  "add-comment",
  "toggle-details",
]);

const createdAtText = computed(() => {
  if (!props.task.createdAt) return "—";
  return new Date(props.task.createdAt).toLocaleString("vi-VN");
});

function getInitials(name) {
  return String(name || "?")
    .split(" ")
    .map((x) => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.25) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 7px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.35);
}
</style>