<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <p class="text-sm font-medium text-slate-500">{{ label }}</p>
    <p class="mt-2 text-2xl font-bold text-slate-950">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
});
</script>