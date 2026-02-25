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
        v-for="column in columns"
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
              @click="openAdd(column)"
            >
              <span class="text-lg leading-none">+</span>
              <span>Thêm thẻ</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <AddTaskModal
      v-if="showAdd && selectedColumn"
      :status="selectedColumn.status"
      :display-status="selectedColumn.label"
      :members="project.members"
      @close="showAdd = false"
      @add="addTask"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import TaskCard from "./TaskCard.vue";
import AddTaskModal from "./AddTaskModal.vue";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update-project"]);

const columns = [
  { id: "today", status: "Todo", label: "Hôm nay" },
  { id: "this-week", status: "In Progress", label: "Tuần này" },
  { id: "later", status: "Done", label: "Sau này" },
];

const showAdd = ref(false);
const selectedColumn = ref(null);

const tasksByColumn = (column) =>
  (props.project.tasks || []).filter((t) => t.status === column.status);

const addTask = (task) => {
  const updated = {
    ...props.project,
    tasks: [...(props.project.tasks || []), task],
  };
  emit("update-project", updated);
  showAdd.value = false;
};

const openAdd = (column) => {
  selectedColumn.value = column;
  showAdd.value = true;
};
</script>
