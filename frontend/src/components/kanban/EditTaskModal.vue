<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
  >
    <div class="bg-[#282e33] rounded-xl w-[600px] max-h-[85vh] overflow-hidden flex flex-col border border-[#3f474f]">
      <!-- Header -->
      <div class="flex items-start justify-between p-4 border-b border-[#3f474f] flex-shrink-0">
        <div class="flex items-center gap-3 flex-1">
          <div
            class="w-1 h-8 rounded-full"
            :class="priorityColor"
          />
          <div class="min-w-0">
            <input
              v-model="form.title"
              class="text-white font-medium bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 w-full"
            />
            <p class="text-xs text-[#9fadbc] mt-0.5">
              in list <span class="underline">{{ task.status }}</span>
            </p>
          </div>
        </div>
        <button
          class="text-[#9fadbc] hover:text-white text-xl"
          @click="$emit('close')"
        >
          ×
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-4">
        <!-- Description -->
        <div class="mb-6">
          <h3 class="text-white text-sm font-medium mb-2">Mô tả</h3>
          <textarea
            v-model="form.description"
            rows="3"
            placeholder="Thêm mô tả..."
            class="w-full bg-[#1e2429] border border-[#3f474f] rounded text-sm text-white p-2 focus:outline-none focus:border-blue-600 resize-none"
          />
        </div>

        <!-- Details grid -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <!-- Priority -->
          <div>
            <h4 class="text-xs text-[#9fadbc] mb-2 font-medium">Ưu tiên</h4>
            <select
              v-model="form.priority"
              class="w-full bg-[#1e2429] border border-[#3f474f] rounded text-sm text-white p-2 focus:outline-none focus:border-blue-600"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <!-- Assignee -->
          <div>
            <h4 class="text-xs text-[#9fadbc] mb-2 font-medium">Gán cho</h4>
            <select
              v-model="form.assignee"
              class="w-full bg-[#1e2429] border border-[#3f474f] rounded text-sm text-white p-2 focus:outline-none focus:border-blue-600"
            >
              <option value="">Không gán</option>
              <option
                v-for="member in availableMembers"
                :key="member.id"
                :value="member.name"
              >
                {{ member.name }}
              </option>
            </select>
          </div>

          <!-- Due date -->
          <div>
            <h4 class="text-xs text-[#9fadbc] mb-2 font-medium">Hạn chót</h4>
            <input
              v-model="form.dueDate"
              type="date"
              class="w-full bg-[#1e2429] border border-[#3f474f] rounded text-sm text-white p-2 focus:outline-none focus:border-blue-600"
            />
          </div>

          <!-- Status -->
          <div>
            <h4 class="text-xs text-[#9fadbc] mb-2 font-medium">Trạng thái</h4>
            <select
              v-model="form.status"
              class="w-full bg-[#1e2429] border border-[#3f474f] rounded text-sm text-white p-2 focus:outline-none focus:border-blue-600"
            >
              <option value="Todo">Chưa làm</option>
              <option value="In Progress">Đang làm</option>
              <option value="Done">Hoàn thành</option>
            </select>
          </div>
        </div>

        <!-- Subtasks -->
        <SubtaskList
          :subtasks="form.subtasks || []"
          @add-subtask="addSubtask"
          @remove-subtask="removeSubtask"
          @toggle-subtask="toggleSubtask"
        />

        <!-- Comments section -->
        <CommentsSection
          :comments="form.comments || []"
          @add-comment="addComment"
          @delete-comment="deleteComment"
        />
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-[#3f474f] flex justify-between gap-2 flex-shrink-0">
        <button
          class="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          @click="handleDelete"
        >
          🗑️ Xóa
        </button>
        <div class="flex gap-2">
          <button
            class="px-4 py-2 text-sm text-[#9fadbc] hover:text-white rounded hover:bg-[#333c43]"
            @click="$emit('close')"
          >
            Hủy
          </button>
          <button
            class="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            @click="handleSave"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import SubtaskList from "./SubtaskList.vue";
import CommentsSection from "./CommentsSection.vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  members: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["close", "save", "delete"]);

const form = ref({
  title: "",
  description: "",
  priority: "Medium",
  assignee: "",
  dueDate: "",
  status: "Todo",
  subtasks: [],
  comments: [],
});

watchEffect(() => {
  if (props.task) {
    form.value = {
      title: props.task.title || "",
      description: props.task.description || "",
      priority: props.task.priority || "Medium",
      assignee: props.task.assignee || "",
      dueDate: props.task.dueDate || "",
      status: props.task.status || "Todo",
      subtasks: props.task.subtasks || [],
      comments: props.task.comments || [],
    };
  }
});

const priorityColor = computed(() => {
  if (form.value.priority === "High") return "bg-red-500";
  if (form.value.priority === "Medium") return "bg-yellow-500";
  return "bg-green-500";
});

const availableMembers = computed(() => props.members || []);

const addSubtask = (subtask) => {
  if (!form.value.subtasks) form.value.subtasks = [];
  form.value.subtasks.push(subtask);
};

const removeSubtask = (subtaskId) => {
  form.value.subtasks = form.value.subtasks.filter((s) => s.id !== subtaskId);
};

const toggleSubtask = (subtaskId) => {
  const s = form.value.subtasks.find((s) => s.id === subtaskId);
  if (s) s.completed = !s.completed;
};

const addComment = (comment) => {
  if (!form.value.comments) form.value.comments = [];
  form.value.comments.push(comment);
};

const deleteComment = (commentId) => {
  form.value.comments = form.value.comments.filter((c) => c.id !== commentId);
};

const handleSave = () => {
  emit("save", {
    ...props.task,
    ...form.value,
  });
};

const handleDelete = () => {
  const confirmed = confirm("Bạn chắc chắn muốn xóa task này?");
  if (confirmed) {
    emit("delete", props.task.id);
  }
};
</script>
