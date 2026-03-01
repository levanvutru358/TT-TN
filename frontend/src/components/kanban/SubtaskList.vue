<template>
  <div class="border-t border-[#3f474f] pt-4 mt-6">
    <h4 class="text-sm font-medium text-white mb-3 flex items-center gap-2">
      ✓ Subtask
      <span class="text-xs bg-[#3f474f] text-[#9fadbc] px-2 py-0.5 rounded-full">
        {{ completedCount }}/{{ subtasks.length }}
      </span>
    </h4>

    <!-- Subtasks list -->
    <div class="space-y-2 mb-3 max-h-40 overflow-y-auto">
      <div
        v-for="subtask in subtasks"
        :key="subtask.id"
        class="flex items-center gap-2 p-2 rounded hover:bg-[#333c43] group transition-colors"
      >
        <input
          type="checkbox"
          :checked="subtask.completed"
          @change="$emit('toggle-subtask', subtask.id)"
          class="w-4 h-4 cursor-pointer"
        />
        <span
          class="text-xs text-white flex-1"
          :class="{ 'line-through text-[#9fadbc]': subtask.completed }"
        >
          {{ subtask.title }}
        </span>
        <button
          class="opacity-0 group-hover:opacity-100 p-1 text-[#9fadbc] hover:text-red-400 hover:bg-[#3f474f] rounded transition-all text-sm"
          @click="$emit('remove-subtask', subtask.id)"
        >
          ✕
        </button>
      </div>

      <div v-if="subtasks.length === 0" class="text-xs text-[#9fadbc] py-2">
        Không có subtask nào
      </div>
    </div>

    <!-- Add subtask -->
    <div class="flex gap-1">
      <input
        v-model="newSubtaskTitle"
        type="text"
        placeholder="Thêm subtask..."
        class="flex-1 bg-[#1e2429] border border-[#3f474f] rounded text-xs text-white p-1.5 focus:outline-none focus:border-blue-600"
        @keyup.enter="handleAddSubtask"
      />
      <button
        class="px-2 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
        :disabled="!newSubtaskTitle.trim()"
        @click="handleAddSubtask"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  subtasks: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["add-subtask", "remove-subtask", "toggle-subtask"]);

const newSubtaskTitle = ref("");

const completedCount = computed(
  () => props.subtasks.filter((s) => s.completed).length
);

const handleAddSubtask = () => {
  if (!newSubtaskTitle.value.trim()) return;

  emit("add-subtask", {
    id: Date.now(),
    title: newSubtaskTitle.value.trim(),
    completed: false,
  });

  newSubtaskTitle.value = "";
};
</script>
