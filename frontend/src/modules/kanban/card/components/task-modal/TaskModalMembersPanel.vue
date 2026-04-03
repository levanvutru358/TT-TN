<template>
  <TaskModalPopover title="Thành viên" @close="$emit('close')">
    <div class="space-y-2">
      <button
        v-for="member in memberOptions"
        :key="member.id"
        class="w-full rounded-lg bg-white/5 hover:bg-white/10 px-3 py-2 flex items-center justify-between text-white"
        @click="$emit('toggle-member', member.name)"
      >
        <span>{{ member.name }}</span>
        <span v-if="selectedMembers.includes(member.name)">✓</span>
      </button>
    </div>
  </TaskModalPopover>
</template>

<script setup lang="ts">
// @ts-nocheck
import TaskModalPopover from "./TaskModalPopover.vue";

defineProps({
  memberOptions: {
    type: Array,
    default: () => [],
  },
  selectedMembers: {
    type: Array,
    default: () => [],
  },
});

defineEmits([
  "toggle-member",
  "close",
]);
</script>