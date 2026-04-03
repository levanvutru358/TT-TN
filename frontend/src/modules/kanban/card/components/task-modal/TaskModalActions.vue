<template>
  <div class="flex flex-wrap gap-2 mb-4">
    <button
      v-for="item in items"
      :key="item.key"
      type="button"
      :class="[
        'inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 font-medium transition',
        activePopover === item.key
          ? 'border-blue-400/50 bg-blue-500/20 text-white'
          : 'border-white/15 bg-transparent hover:bg-white/5 text-white/85 hover:text-white',
      ]"
      @click="$emit('toggle', item.key)"
    >
      <span class="w-4 h-4 flex items-center justify-center" v-html="item.icon"></span>
      <span>{{ item.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
defineProps({
  activePopover: {
    type: String,
    default: null,
  },
});

defineEmits(["toggle"]);

const items = [
  {
    key: "add",
    label: "Thêm",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`,
  },
  {
    key: "labels",
    label: "Nhãn",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10.5 13.5 17a2.12 2.12 0 0 1-3 0L4 10.5V4h6.5L20 13.5Z"/><circle cx="7.5" cy="7.5" r="1"/></svg>`,
  },
  {
    key: "date",
    label: "Ngày",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
  },
  {
    key: "checklist",
    label: "Việc cần làm",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6h11"/><path d="M9 12h11"/><path d="M9 18h11"/><path d="m3 6 1 1 2-2"/><path d="m3 12 1 1 2-2"/><path d="m3 18 1 1 2-2"/></svg>`,
  },
  {
    key: "members",
    label: "Thành viên",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  },
];
</script>