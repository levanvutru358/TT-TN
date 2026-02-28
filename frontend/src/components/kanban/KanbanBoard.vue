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
        v-for="column in computedColumns"
        :key="column.id"
        class="w-80 flex-shrink-0 h-full flex flex-col"
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
import AddTaskModal from "./AddTaskModal.vue";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update-project"]);

/**
 * Columns mặc định (giữ như bạn)
 * - Lưu ý: status là "Todo", "In Progress", "Done"
 */
const defaultColumns = [
  { id: "today", status: "Todo", label: "Hôm nay" },
  { id: "this-week", status: "In Progress", label: "Tuần này" },
  { id: "later", status: "Done", label: "Sau này" },
];

/**
 * Status options để tạo list mới (bạn có thể đổi)
 * - Nếu bạn muốn tạo list có status riêng, bạn có thể cho phép nhập free-text.
 */
const statusOptions = [
  { value: "Todo", label: "Todo" },
  { value: "In Progress", label: "In Progress" },
  { value: "Done", label: "Done" },
];

/**
 * computedColumns:
 * - Ưu tiên lấy từ project.columns nếu có
 * - Nếu chưa có thì fallback defaultColumns
 */
const computedColumns = computed(() => {
  const cols = props.project?.columns;
  if (Array.isArray(cols) && cols.length > 0) return cols;
  return defaultColumns;
});

/** ============ Add task ============ */
const showAddTask = ref(false);
const selectedColumn = ref(null);

const tasksByColumn = (column) =>
  (props.project.tasks || []).filter((t) => t.status === column.status);

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
</script>