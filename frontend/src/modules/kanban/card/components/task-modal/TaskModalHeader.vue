<template>
  <div class="h-[70px] border-b border-white/10 flex items-center justify-between px-5 md:px-8">
    <div class="flex items-center gap-3 min-w-0 flex-1">
      <select
        :value="status"
        class="bg-white/10 hover:bg-white/15 text-white text-sm rounded-md px-2 py-1 outline-none border border-white/10"
        @change="$emit('update:status', $event.target.value)"
      >
        <option
          v-for="item in statusOptions"
          :key="item"
          :value="item"
          class="text-black"
        >
          {{ item }}
        </option>
      </select>
      
    </div>

    <div class="flex items-center gap-2">
      <button
        class="w-9 h-9 rounded-lg hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center"
        type="button"
        title="Bìa"
        @click="$emit('toggle-cover')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="8.5" cy="10" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </button>

      <button
        class="w-9 h-9 rounded-lg hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center"
        type="button"
        title="Khác"
        @click="$emit('toggle-more')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="12" r="1.8" />
          <circle cx="12" cy="12" r="1.8" />
          <circle cx="19" cy="12" r="1.8" />
        </svg>
      </button>

      <button
        class="w-9 h-9 rounded-lg hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center"
        type="button"
        title="Đóng"
        @click="$emit('close')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
defineProps({
  title: { type: String, default: "" },
  status: { type: String, default: "Todo" },
  statusOptions: { type: Array, default: () => [] },
});

defineEmits([
  "update:title",
  "update:status",
  "toggle-cover",
  "toggle-more",
  "close",
]);
</script>