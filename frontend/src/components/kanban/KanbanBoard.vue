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
          <button
            class="text-white/80 hover:text-white p-1 rounded hover:bg-white/10"
          >
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

      <!-- Task columns -->
      <div
        v-for="(column, idx) in computedColumns"
        :key="column.id"
        class="w-80 flex-shrink-0 h-full flex flex-col"
      >
        <div
          class="mb-3 rounded-xl bg-black/40 border border-white/10 px-3 py-2 flex items-center justify-between shadow-sm"
          :style="listHeaderStyle(column)"
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

        <div class="flex-1 overflow-y-auto">
          <div class="space-y-2 pr-1">
            <TaskCard
              v-for="task in tasksByColumn(column)"
              :key="task.id"
              :task="task"
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

      <!-- Add another list (Trello style) -->
      <div class="w-80 flex-shrink-0 h-full">
        <div
          class="mb-3 rounded-xl bg-black/40 border border-white/10 px-3 py-2 flex items-center justify-between shadow-sm"
        >
          <!-- Collapsed button -->
          <button
            v-if="!showAddList"
            class="w-full text-left text-white/80 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
            @click="openAddList"
          >
            <span class="text-lg leading-none">+</span>
            <span>Thêm danh sách khác</span>
          </button>

          <!-- Expanded form -->
          <div v-else class="space-y-2">
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
import TaskCard from "./TaskCard.vue";
import AddTaskModal from "../modals/AddTaskModal.vue";
import ListActionsMenu from "./ListActionsMenu.vue";

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
      searchQuery: ''
    })
  }
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

/** ============ Add task ============ */
const showAddTask = ref(false);
const selectedColumn = ref(null);

// Helper function to check if task matches filters
const taskMatchesFilters = (task) => {
  const { members, labels, cardStatus, dueDate, activity, searchQuery } = props.filters;
  
  // Filter by search query
  if (searchQuery && !task.title?.toLowerCase().includes(searchQuery.toLowerCase())) {
    return false;
  }
  
  // Filter by members
  if (members.length > 0 && task.assignees) {
    const hasMatchingMember = task.assignees.some(id => members.includes(id));
    if (!hasMatchingMember) return false;
  }
  
  // Filter by labels
  if (labels.length > 0 && task.labels) {
    const hasMatchingLabel = task.labels.some(id => labels.includes(id));
    if (!hasMatchingLabel) return false;
  }
  
  // Filter by card status
  if (cardStatus.length > 0) {
    const taskStatus = task.isCompleted ? 'completed' : 'pending';
    if (!cardStatus.includes(taskStatus)) return false;
  }
  
  // Filter by due date
  if (dueDate.length > 0 && task.dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    
    let hasDueDateMatch = false;
    
    if (dueDate.includes('overdue') && taskDate < today) {
      hasDueDateMatch = true;
    }
    if (dueDate.includes('today') && taskDate.getTime() === today.getTime()) {
      hasDueDateMatch = true;
    }
    if (dueDate.includes('upcoming') && taskDate > today) {
      hasDueDateMatch = true;
    }
    
    if (!hasDueDateMatch && !dueDate.includes('no-due')) return false;
  }
  
  // Filter by activity - if no due date and checking for no-due
  if (dueDate.includes('no-due') && !task.dueDate) {
    return true;
  }
  
  return true;
};

const tasksByColumn = (column) => {
  const allTasks = (props.project.tasks || []).filter((t) => t.status === column.status);
  
  // If no filters active, return all tasks
  const hasActiveFilters = 
    props.filters.members?.length > 0 ||
    props.filters.labels?.length > 0 ||
    props.filters.cardStatus?.length > 0 ||
    props.filters.dueDate?.length > 0 ||
    props.filters.activity?.length > 0 ||
    (props.filters.searchQuery && props.filters.searchQuery.trim().length > 0);
  
  if (!hasActiveFilters) return allTasks;
  
  return allTasks.filter(taskMatchesFilters);
};

const addTask = (task) => {
  const updated = {
    ...props.project,
    tasks: [...(props.project.tasks || []), task],
  };
  emit("update-project", updated);
  showAddTask.value = false;
};

const openAddTask = (column) => {
  selectedColumn.value = column;
  showAddTask.value = true;
};

/** ============ Add list (new column) ============ */
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

  // tạo id không trùng
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

  // LƯU VÀO project.columns
  const updated = {
    ...props.project,
    columns: [...(Array.isArray(props.project.columns) ? props.project.columns : computedColumns.value), newCol],
  };

  emit("update-project", updated);
  showAddList.value = false;
};

function columnsForUpdate() {
  const cols = Array.isArray(props.project?.columns) && props.project.columns.length
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
  const col = computedColumns.value.find((c) => String(c.id) === String(columnId));
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
  const cols = columnsForUpdate().filter((c) => String(c.id) !== String(columnId));
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

function onCopyList() {
  // UI giống Trello; model hiện tại dùng status để nhóm card nên "copy list" thực tế
  // sẽ làm card hiện lặp. Tạm thời giữ UI, không thực thi.
}

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
</script>