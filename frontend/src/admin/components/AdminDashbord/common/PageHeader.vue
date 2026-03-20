<template>
  <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <p v-if="breadcrumb" class="text-sm font-medium text-slate-500">
        {{ breadcrumb }}
      </p>
      <h1 class="mt-1 text-3xl font-bold tracking-tight text-slate-950">
        {{ title }}
      </h1>
      <p v-if="description" class="mt-2 text-sm leading-6 text-slate-600">
        {{ description }}
      </p>
    </div>

    <div v-if="$slots.actions" class="flex items-center gap-3">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  breadcrumb: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
});
</script>