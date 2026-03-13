<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
  >
    <div class="bg-[#282e33] rounded-xl w-96 p-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-white font-medium">Add card</h3>
        <button
          class="text-[#9fadbc] hover:text-white text-xl"
          @click="$emit('close')"
        >
          ×
        </button>
      </div>

      <div class="space-y-3">
        <div>
          <label class="block text-xs text-[#9fadbc] mb-1">
            Title <span class="text-red-500">*</span>
          </label>
          <input
            v-model="title"
            type="text"
            placeholder="Enter a title for this card..."
            class="w-full bg-[#1e2429] border border-[#3f474f] rounded text-sm text-white p-2 focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <button
          class="px-3 py-1.5 text-sm text-[#9fadbc] hover:text-white rounded hover:bg-[#333c43]"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          class="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!title.trim()"
          @click="handleSubmit"
        >
          Add card
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
  displayStatus: String,
  members: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["close", "add"]);

const title = ref("");
const description = ref("");
const priority = ref("Medium");
const assignee = ref("Unassigned");
const dueDate = ref("");

watchEffect(() => {
  if (props.members && props.members.length > 0) {
    assignee.value = props.members[0].name;
  }
});

const handleSubmit = () => {
  if (!title.value.trim()) return;
  emit("add", {
    id: Date.now(),
    title: title.value.trim(),
    description: description.value.trim(),
    priority: priority.value,
    assignee: assignee.value,
    dueDate: dueDate.value,
    status: props.status,
  });
};
</script>
