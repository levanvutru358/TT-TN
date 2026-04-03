<template>
  <div class="space-y-4 mb-8">
    <div v-if="resolvedLabels.length" class="flex gap-2 flex-wrap">
      <span
        v-for="label in resolvedLabels"
        :key="label.id"
        class="px-3 py-1 rounded-md text-white text-xs font-medium"
        :style="{ backgroundColor: label.color }"
      >
        {{ label.name }}
      </span>
    </div>

    <div v-if="members.length" class="flex gap-2 flex-wrap">
      <div
        v-for="member in members"
        :key="member"
        class="px-3 py-1 rounded-md bg-white/10 text-white text-xs"
      >
        {{ member }}
      </div>
    </div>

    <div
      v-if="dueDate"
      class="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-sm text-white"
    >
      <span>{{ formattedDate }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed } from "vue";

const props = defineProps({
  labels: {
    type: Array,
    default: () => [],
  },
  members: {
    type: Array,
    default: () => [],
  },
  dueDate: {
    type: String,
    default: "",
  },
  labelOptions: {
    type: Array,
    default: () => [],
  },
});

const formattedDate = computed(() => {
  if (!props.dueDate) return "";
  return new Date(props.dueDate).toLocaleDateString("vi-VN");
});

const resolvedLabels = computed(() => {
  return props.labelOptions.filter((x) => props.labels.includes(x.id));
});
</script>