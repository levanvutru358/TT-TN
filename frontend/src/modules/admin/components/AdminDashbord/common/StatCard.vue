<template>
  <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm font-medium text-slate-500">{{ title }}</p>
        <h3 class="mt-3 text-3xl font-bold tracking-tight text-slate-950">
          {{ value }}
        </h3>
        <p class="mt-3 text-sm leading-6 text-slate-600">{{ subtitle }}</p>
      </div>

      <div
        class="flex h-12 w-12 items-center justify-center rounded-2xl text-white"
        :class="iconBg"
      >
        <component :is="icon" class="h-6 w-6" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
  icon: {
    type: Object,
    required: true,
  },
  iconBg: {
    type: String,
    default: "bg-slate-900",
  },
});
</script>