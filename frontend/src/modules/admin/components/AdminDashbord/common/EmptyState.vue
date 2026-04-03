<template>
  <div class="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
    <h3 class="text-lg font-semibold text-slate-950">{{ title }}</h3>
    <p class="mt-2 text-sm text-slate-600">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "No data found",
  },
  description: {
    type: String,
    default: "There is currently no data to display.",
  },
});
</script>