<template>
  <TaskModalPopover title="Chỉnh sửa ngày" @close="$emit('close')">
    <div class="space-y-3">
      <input
        :value="modelValue"
        type="date"
        class="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white outline-none"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <div class="flex gap-2">
        <button
          class="flex-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-3 py-2"
          @click="$emit('save')"
        >
          Lưu
        </button>

        <button
          class="flex-1 rounded-lg bg-white/10 hover:bg-white/15 text-white px-3 py-2"
          @click="$emit('clear')"
        >
          Xóa ngày
        </button>
      </div>
    </div>
  </TaskModalPopover>
</template>

<script setup lang="ts">
// @ts-nocheck
import TaskModalPopover from "./TaskModalPopover.vue";

defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

defineEmits([
  "update:modelValue",
  "save",
  "clear",
  "close",
]);
</script>