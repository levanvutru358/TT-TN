<template>
  <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <p class="text-sm font-semibold text-slate-500">{{ title }}</p>
    <h3 class="mt-3 text-4xl font-bold tracking-tight text-slate-950">
      {{ value }}
    </h3>
    <p class="mt-3 text-sm leading-6 text-slate-600">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  subtitle: string
}>()
</script>