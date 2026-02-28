<template>
  <div class="h-full overflow-x-auto">
    <div class="flex gap-4 h-full">
      <!-- Tutorial column -->
      <div class="w-80 flex-shrink-0 h-full flex flex-col">
        <div
          class="mb-3 rounded-xl bg-[#4b2d7f] px-3 py-2 flex items-center justify-between shadow"
        >
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-semibold text-white">
              Hướng dẫn cho người mới dùng Trello
            </h3>
          </div>
          <button class="text-white/80 hover:text-white p-1 rounded hover:bg-white/10">
            ⋮
          </button>
        </div>

        <div class="flex-1 overflow-y-auto">
          <div class="space-y-3 pr-1">
            <div
              class="bg-[#4b2d7f] rounded-xl p-2 shadow cursor-pointer hover:bg-[#553390] transition-colors"
            >
              <div
                class="rounded-lg bg-black/30 mb-2 h-32 flex items-center justify-center text-xs text-white/80"
              >
                Video hướng dẫn
              </div>
              <p class="text-xs text-white/80">New to Trello? Start here</p>
            </div>

            <button
              class="w-full mt-1 text-left text-white/80 hover:text-white text-sm p-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <span class="text-lg leading-none">+</span>
              <span>Thêm thẻ</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Draggable task columns -->
      <div
        v-for="column in computedColumns"
        :key="column.id"
        class="w-80 flex-shrink-0 h-full flex flex-col"
        @dragover.prevent
        @drop="handleDrop($event, column.id)"
      >
        <div
          class="mb-3 rounded-xl bg-black/40 border border-white/10 px-3 py-2 flex items-center justify-between shadow-sm"
        >
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-semibold text-white">
              {{ column.label }}
            </h3>
            <span
              class="text-xs bg-white/10 text-white px-2 py-0.5 rounded-full"
            >
              {{ tasksByColumn(column).length }}
            </span>
          </div>
          <button
            class="text-white/60 hover:text-white p-1 rounded hover:bg-white/10"
          >
            ⋮
          </button>
        </div>

        <div class="flex-1 overflow-y-auto">
          <div class="space-y-2 pr-1">
            <TaskCard
              v-for="task in tasksByColumn(column)"
              :key="task.id"
              :task="task"
              draggable="true"
              @dragstart="handleDragStart($event, task)"
              @click="selectTask(task)"
            />

            <button
              class="w-full mt-1 text-left text-white/70 hover:text-white text-sm p-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
              @click="openAddTask(column)"
            >
              <span class="text-lg leading-none">+</span>
              <span>Thêm thẻ</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Add another list -->
      <div class="w-80 flex-shrink-0 h-full">
        <div
          class="mb-3 rounded-xl bg-black/40 border border-white/10 px-3 py-2 flex items-center justify-between shadow-sm"
        >
          <button
            v-if="!showAddList"
            class="w-full text-left text-white/80 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
            @click="openAddList"
          >
            <span class="text-lg leading-none">+</span>
            <span>Thêm danh sách khác</span>
          </button>

          <div v-else class="space-y-2 w-full">
            <input
              v-model.trim="newListTitle"
              class="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/20"
              placeholder="Nhập tên danh sách..."
              @keyup.enter="createList"
            />

            <div class="flex items-center gap-2">
              <select
                v-model="newListStatus"
                class="flex-1 rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-white/20"
              >
                <option
                  v-for="opt in statusOptions"
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.label }}
                </option>
              </select>

              <button
                class="px-3 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/15 border border-white/10"
                @click="createList"
              >
                Thêm
              </button>

              <button
                class="px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
                @click="closeAddList"
                title="Hủy"
              >
                ✕
              </button>
            </div>

            <p class="text-xs text-white/50 px-1">
              * Danh sách mới sẽ được lưu vào project (project.columns).
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit task modal -->
    <EditTaskModal
      v-if="selectedTask"
      :task="selectedTask"
      :members="project?.members || []"
      @close="selectedTask = null"
      @save="updateTask"
      @delete="deleteTask"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import TaskCard from "./TaskCard.vue";
import AddTaskModal from "./AddTaskModal.vue";
import EditTaskModal from "./EditTaskModal.vue";

const props = defineProps({
  project: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update-project"]);

const showAddList = ref(false);
const newListTitle = ref("");
const newListStatus = ref("Todo");

const statusOptions = [
  { label: "Chưa làm", value: "Todo" },
  { label: "Đang làm", value: "In Progress" },
  { label: "Hoàn thành", value: "Done" },
];

const draggedTask = ref(null);
const selectedTask = ref(null);

const computedColumns = computed(() => {
  if (!props.project?.columns) {
    return [
      { id: "todo", label: "Chưa làm", status: "Todo" },
      { id: "in-progress", label: "Đang làm", status: "In Progress" },
      { id: "done", label: "Hoàn thành", status: "Done" },
    ];
  }
  return props.project.columns;
});

const tasksByColumn = (column) => {
  if (!props.project?.tasks) return [];
  return props.project.tasks.filter((t) => t.status === column.status);
};

const openAddList = () => {
  showAddList.value = true;
};

const closeAddList = () => {
  showAddList.value = false;
  newListTitle.value = "";
  newListStatus.value = "Todo";
};

const createList = () => {
  if (!newListTitle.value.trim()) return;

  const newColumn = {
    id: `col-${Date.now()}`,
    label: newListTitle.value.trim(),
    status: newListStatus.value,
  };

  const updated = {
    ...props.project,
    columns: [...(props.project?.columns || []), newColumn],
  };

  emit("update-project", updated);
  closeAddList();
};

const openAddTask = (column) => {
  // Implement in AddTaskModal
};

const handleDragStart = (event, task) => {
  draggedTask.value = task;
  event.dataTransfer.effectAllowed = "move";
};

const handleDrop = (event, columnId) => {
  event.preventDefault();
  if (!draggedTask.value) return;

  const column = computedColumns.value.find((c) => c.id === columnId);
  if (!column) return;

  // Update task status
  const updated = {
    ...props.project,
    tasks: props.project.tasks.map((t) =>
      t.id === draggedTask.value.id ? { ...t, status: column.status } : t
    ),
  };

  emit("update-project", updated);
  draggedTask.value = null;
};

const selectTask = (task) => {
  selectedTask.value = task;
};

const updateTask = (updatedTask) => {
  const updated = {
    ...props.project,
    tasks: props.project.tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    ),
  };

  emit("update-project", updated);
  selectedTask.value = null;
};

const deleteTask = (taskId) => {
  const updated = {
    ...props.project,
    tasks: props.project.tasks.filter((t) => t.id !== taskId),
  };

  emit("update-project", updated);
  selectedTask.value = null;
};
</script>
