<template>
  <div class="trello-scrollbar h-full overflow-x-auto">
    <div class="flex h-full gap-4">
      <div class="flex h-full w-80 flex-shrink-0 flex-col">
        <div
          class="mb-3 flex items-center justify-between rounded-xl bg-[#4b2d7f] px-3 py-2 shadow"
        >
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-semibold text-white">
              Hướng dẫn cho người mới dùng Trello
            </h3>
          </div>
          <button
            class="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
            type="button"
          >
            ⋮
          </button>
        </div>

        <div class="trello-scrollbar flex-1 overflow-y-auto">
          <div class="space-y-3 pr-1">
            <div
              class="cursor-pointer rounded-xl bg-[#4b2d7f] p-2 shadow transition-colors hover:bg-[#553390]"
            >
              <div
                class="mb-2 flex h-32 items-center justify-center rounded-lg bg-black/30 text-xs text-white/80"
              >
                Video hướng dẫn
              </div>
              <p class="text-xs text-white/80">New to Trello? Start here</p>
            </div>

            <button
              class="mt-1 flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              type="button"
            >
              <span class="text-lg leading-none">+</span>
              <span>Thêm thẻ</span>
            </button>
          </div>
        </div>
      </div>

      <div
        v-for="(column, idx) in computedColumns"
        :key="column.id"
        class="flex h-full w-80 flex-shrink-0 flex-col"
      >
        <div
          class="mb-3 flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2 shadow-sm"
          :style="listHeaderStyle(column)"
        >
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-semibold text-white">
              {{ column.label }}
            </h3>
            <span
              class="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white"
            >
              {{ tasksByColumn(column).length }}
            </span>
          </div>

          <ListActionsMenu
            :column-id="String(column.id)"
            :can-move-left="idx > 0"
            :can-move-right="idx < computedColumns.length - 1"
            :selected-color="String(column.color || '')"
            @add-card="onAddCard"
            @move="onMoveList"
            @archive="onArchiveList"
            @set-color="onSetListColor"
            @clear-color="onClearListColor"
            @toggle-watch="onToggleWatch"
            @copy-list="onCopyList"
          />
        </div>

        <div
          class="trello-scrollbar flex-1 overflow-y-auto rounded-xl transition-colors"
          :class="dragOverColumnId === String(column.id) ? 'bg-white/5' : ''"
          @dragover.prevent="onDragOver(column)"
          @dragenter.prevent="onDragEnter(column)"
          @dragleave="onDragLeave(column, $event)"
          @drop="onDrop(column, $event)"
        >
          <div class="space-y-2 pr-1">
            <div
              v-if="dragOverColumnId === String(column.id)"
              class="rounded-xl border border-dashed border-[#579dff] bg-[#1d2125]/70 px-3 py-3 text-sm text-[#9fadbc]"
            >
              Thả thẻ vào đây
            </div>

            <TaskCard
              v-for="task in tasksByColumn(column)"
              :key="task.id"
              :task="{ ...task, listId: column.id }"
              @open-card="handleOpenCard"
              @edit-labels="handleEditLabels"
              @change-members="handleChangeMembers"
              @change-cover="handleChangeCover"
              @edit-date="handleEditDate"
              @move-task="handleMoveTask"
              @copy-task="handleCopyTask"
              @copy-link="handleCopyLink"
              @mirror-task="handleMirrorTask"
              @archive-task="handleArchiveTask"
              @drag-start="handleTaskDragStart"
              @drag-end="handleTaskDragEnd"
              @toggle-completed="handleToggleCompleted"
              @update-task="handleUpdateTask"
            />

            <button
              class="mt-1 flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              type="button"
              @click="openAddTask(column)"
            >
              <span class="text-lg leading-none">+</span>
              <span>Thêm thẻ</span>
            </button>
          </div>
        </div>
      </div>

      <div class="h-full w-80 flex-shrink-0">
        <div
          class="mb-3 flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2 shadow-sm"
        >
          <button
            v-if="!showAddList"
            class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            type="button"
            @click="openAddList"
          >
            <span class="text-lg leading-none">+</span>
            <span>Thêm danh sách khác</span>
          </button>

          <div v-else class="w-full space-y-2">
            <input
              v-model.trim="newListTitle"
              class="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-white/50 focus:border-white/20"
              placeholder="Nhập tên danh sách..."
              @keyup.enter="createList"
            />

            <div class="flex items-center gap-2">
              <select
                v-model="newListStatus"
                class="flex-1 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-white/20"
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
                class="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15"
                type="button"
                @click="createList"
              >
                Thêm
              </button>

              <button
                class="rounded-lg px-3 py-2 text-white/70 hover:bg-white/10 hover:text-white"
                type="button"
                title="Hủy"
                @click="closeAddList"
              >
                ✕
              </button>
            </div>

            <p class="px-1 text-xs text-white/50">
              * Danh sách mới sẽ được lưu vào project (project.columns).
            </p>
          </div>
        </div>
      </div>
    </div>

    <AddTaskModal
      v-if="showAddTask && selectedColumn"
      :status="selectedColumn.status"
      :display-status="selectedColumn.label"
      :members="project.members"
      @close="showAddTask = false"
      @add="addTask"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import TaskCard from "@/components/kanban/cards/TaskCard.vue";
import ListActionsMenu from "@/components/kanban/menus/ListActionsMenu.vue";
import AddTaskModal from "@/components/modals/AddTaskModal.vue";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  filters: {
    type: Object,
    default: () => ({
      members: [],
      labels: [],
      cardStatus: [],
      dueDate: [],
      activity: [],
      searchQuery: "",
    }),
  },
});

const emit = defineEmits(["update-project"]);

const defaultColumns = [
  { id: "today", status: "Todo", label: "Hôm nay" },
  { id: "this-week", status: "In Progress", label: "Tuần này" },
  { id: "later", status: "Done", label: "Sau này" },
];

const statusOptions = [
  { value: "Todo", label: "Todo" },
  { value: "In Progress", label: "In Progress" },
  { value: "Done", label: "Done" },
];

const computedColumns = computed(() => {
  const cols = props.project?.columns;
  if (Array.isArray(cols) && cols.length > 0) return cols;
  return defaultColumns;
});

const draggingTaskPayload = ref(null);
const dragOverColumnId = ref(null);

function handleTaskDragStart(payload) {
  draggingTaskPayload.value = payload;
}

function handleTaskDragEnd() {
  draggingTaskPayload.value = null;
  dragOverColumnId.value = null;
}

function onDragOver(column) {
  dragOverColumnId.value = String(column.id);
}

function onDragEnter(column) {
  dragOverColumnId.value = String(column.id);
}

function onDragLeave(column, event) {
  const currentTarget = event.currentTarget;
  const related = event.relatedTarget;

  if (currentTarget && related && currentTarget.contains(related)) return;

  if (dragOverColumnId.value === String(column.id)) {
    dragOverColumnId.value = null;
  }
}

function onDrop(column, event) {
  event.preventDefault();

  let payload = draggingTaskPayload.value;

  if (!payload) {
    try {
      const raw = event.dataTransfer?.getData("application/json");
      if (raw) payload = JSON.parse(raw);
    } catch {
      payload = null;
    }
  }

  dragOverColumnId.value = null;
  draggingTaskPayload.value = null;

  if (!payload?.taskId) return;

  const targetStatus = column.status;
  const targetListId = column.id;

  const tasks = Array.isArray(props.project.tasks) ? [...props.project.tasks] : [];
  const taskIndex = tasks.findIndex((t) => String(t.id) === String(payload.taskId));
  if (taskIndex === -1) return;

  const currentTask = tasks[taskIndex];

  if (
    String(currentTask.status) === String(targetStatus) &&
    String(payload.sourceListId ?? "") === String(targetListId)
  ) {
    return;
  }

  const updatedTask = {
    ...currentTask,
    status: targetStatus,
    listId: targetListId,
  };

  tasks.splice(taskIndex, 1, updatedTask);

  emit("update-project", {
    ...props.project,
    tasks,
  });
}

function handleToggleCompleted(updatedTask) {
  const tasks = Array.isArray(props.project?.tasks) ? [...props.project.tasks] : [];
  const taskIndex = tasks.findIndex(
    (task) => String(task.id) === String(updatedTask.id)
  );

  if (taskIndex === -1) return;

  tasks.splice(taskIndex, 1, {
    ...tasks[taskIndex],
    completed: Boolean(updatedTask.completed),
  });

  emit("update-project", {
    ...props.project,
    tasks,
  });
}

function handleUpdateTask(updatedTask) {
  const tasks = Array.isArray(props.project?.tasks) ? [...props.project.tasks] : [];
  const taskIndex = tasks.findIndex(
    (task) => String(task.id) === String(updatedTask.id)
  );

  if (taskIndex === -1) return;

  tasks.splice(taskIndex, 1, {
    ...tasks[taskIndex],
    ...updatedTask,
  });

  emit("update-project", {
    ...props.project,
    tasks,
  });
}

const showAddTask = ref(false);
const selectedColumn = ref(null);

const taskMatchesFilters = (task) => {
  const {
    members = [],
    labels = [],
    cardStatus = [],
    dueDate = [],
    activity = [],
    searchQuery = "",
  } = props.filters || {};

  if (
    searchQuery &&
    !String(task.title || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  ) {
    return false;
  }

  if (members.length > 0 && Array.isArray(task.assignees)) {
    const hasMatchingMember = task.assignees.some((id) => members.includes(id));
    if (!hasMatchingMember) return false;
  }

  if (labels.length > 0 && Array.isArray(task.labels)) {
    const hasMatchingLabel = task.labels.some((id) => labels.includes(id));
    if (!hasMatchingLabel) return false;
  }

  if (cardStatus.length > 0) {
    const taskStatus = task.completed ? "completed" : "pending";
    if (!cardStatus.includes(taskStatus)) return false;
  }

  if (dueDate.length > 0) {
    if (!task.dueDate) {
      if (dueDate.includes("no-due")) return true;
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);

    let hasDueDateMatch = false;

    if (dueDate.includes("overdue") && taskDate < today) {
      hasDueDateMatch = true;
    }
    if (dueDate.includes("today") && taskDate.getTime() === today.getTime()) {
      hasDueDateMatch = true;
    }
    if (dueDate.includes("upcoming") && taskDate > today) {
      hasDueDateMatch = true;
    }

    if (!hasDueDateMatch && !dueDate.includes("no-due")) return false;
  }

  void activity;
  return true;
};

const tasksByColumn = (column) => {
  const allTasks = (props.project.tasks || []).filter(
    (t) => t.status === column.status
  );

  const hasActiveFilters =
    props.filters?.members?.length > 0 ||
    props.filters?.labels?.length > 0 ||
    props.filters?.cardStatus?.length > 0 ||
    props.filters?.dueDate?.length > 0 ||
    props.filters?.activity?.length > 0 ||
    (props.filters?.searchQuery &&
      props.filters.searchQuery.trim().length > 0);

  if (!hasActiveFilters) return allTasks;
  return allTasks.filter(taskMatchesFilters);
};

const addTask = (task) => {
  const taskWithList = {
    ...task,
    listId: selectedColumn.value?.id ?? null,
    completed: Boolean(task?.completed),
  };

  const updated = {
    ...props.project,
    tasks: [...(props.project.tasks || []), taskWithList],
  };
  emit("update-project", updated);
  showAddTask.value = false;
};

const openAddTask = (column) => {
  selectedColumn.value = column;
  showAddTask.value = true;
};

const showAddList = ref(false);
const newListTitle = ref("");
const newListStatus = ref("Todo");

const openAddList = () => {
  showAddList.value = true;
  newListTitle.value = "";
  newListStatus.value = "Todo";
};

const closeAddList = () => {
  showAddList.value = false;
};

const slugifyId = (s) =>
  String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .slice(0, 40);

const createList = () => {
  const title = newListTitle.value.trim();
  if (!title) return;

  const baseId = slugifyId(title) || "list";
  const current = Array.isArray(props.project.columns)
    ? props.project.columns
    : computedColumns.value;

  let id = baseId;
  let i = 2;
  while (current.some((c) => c.id === id)) {
    id = `${baseId}-${i++}`;
  }

  const newCol = {
    id,
    label: title,
    status: newListStatus.value,
  };

  const updated = {
    ...props.project,
    columns: [
      ...(Array.isArray(props.project.columns)
        ? props.project.columns
        : computedColumns.value),
      newCol,
    ],
  };

  emit("update-project", updated);
  showAddList.value = false;
};

function columnsForUpdate() {
  const cols =
    Array.isArray(props.project?.columns) && props.project.columns.length
      ? props.project.columns
      : computedColumns.value;
  return Array.isArray(cols) ? cols : [];
}

function updateColumns(nextCols) {
  const updated = {
    ...props.project,
    columns: nextCols,
  };
  emit("update-project", updated);
}

function onAddCard(columnId) {
  const col = computedColumns.value.find(
    (c) => String(c.id) === String(columnId)
  );
  if (!col) return;
  openAddTask(col);
}

function onMoveList({ columnId, dir }) {
  const cols = [...columnsForUpdate()];
  const from = cols.findIndex((c) => String(c.id) === String(columnId));
  if (from < 0) return;

  const to = dir === "left" ? from - 1 : from + 1;
  if (to < 0 || to >= cols.length) return;

  const [picked] = cols.splice(from, 1);
  cols.splice(to, 0, picked);
  updateColumns(cols);
}

function onArchiveList(columnId) {
  const cols = columnsForUpdate().filter(
    (c) => String(c.id) !== String(columnId)
  );
  updateColumns(cols);
}

function onSetListColor({ columnId, color }) {
  const cols = columnsForUpdate().map((c) =>
    String(c.id) === String(columnId) ? { ...c, color } : c
  );
  updateColumns(cols);
}

function onClearListColor(columnId) {
  const cols = columnsForUpdate().map((c) =>
    String(c.id) === String(columnId) ? { ...c, color: "" } : c
  );
  updateColumns(cols);
}

function onToggleWatch(columnId) {
  const cols = columnsForUpdate().map((c) =>
    String(c.id) === String(columnId)
      ? { ...c, watching: !Boolean(c.watching) }
      : c
  );
  updateColumns(cols);
}

function onCopyList() {}

function hexToRgba(hex, alpha) {
  const h = String(hex || "").replace("#", "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return "";
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function listHeaderStyle(column) {
  const c = String(column?.color || "").trim();
  if (!c) return undefined;
  return {
    backgroundColor: hexToRgba(c, 0.35),
  };
}

function handleOpenCard(task) {
  console.log("open-card", task);
}

function handleEditLabels(task) {
  console.log("edit-labels", task);
}

function handleChangeMembers(task) {
  console.log("change-members", task);
}

function handleChangeCover(task) {
  console.log("change-cover", task);
}

function handleEditDate(task) {
  console.log("edit-date", task);
}

function handleMoveTask(task) {
  console.log("move-task", task);
}

function handleCopyTask(task) {
  console.log("copy-task", task);
}

function handleCopyLink(payload) {
  console.log("copy-link", payload);
}

function handleMirrorTask(task) {
  console.log("mirror-task", task);
}

function handleArchiveTask(task) {
  console.log("archive-task", task);
}
</script>

<style scoped>
.trello-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #596773 transparent;
}

.trello-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.trello-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.trello-scrollbar::-webkit-scrollbar-thumb {
  background: #596773;
  border-radius: 999px;
}

.trello-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #6b7785;
}

.trello-scrollbar::-webkit-scrollbar-corner {
  background: transparent;
}
</style>