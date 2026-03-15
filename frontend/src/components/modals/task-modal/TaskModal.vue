<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[200]">
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-[1px]"
        @click="emit('close')"
      />

      <div class="absolute inset-0 flex items-center justify-center p-4 md:p-6">
        <div
          class="relative h-[92vh] w-full max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-[#1f232b] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
          @click.stop
        >
          <TaskModalHeader
            :title="localTask.title"
            :status="localTask.status"
            :status-options="statusOptions"
            @update:title="localTask.title = $event"
            @update:status="localTask.status = $event"
            @toggle-cover="togglePopover('cover')"
            @toggle-more="togglePopover('more')"
            @close="emit('close')"
          />

          <div class="grid h-[calc(92vh-70px)] grid-cols-1 lg:grid-cols-[1.3fr_0.95fr]">
            <div class="custom-scrollbar min-h-0 overflow-y-auto border-r border-white/10 px-5 py-6 md:px-8">
              <TaskModalActions
                :active-popover="activePopover"
                @toggle="togglePopover"
              />

              <div class="relative mb-8 min-h-[0]">
                <div v-if="activePopover" class="w-full max-w-[360px]">
                  <TaskModalLabelsPanel
                    v-if="activePopover === 'labels'"
                    :model-value="selectedLabels"
                    :label-options="labelOptions"
                    @update:modelValue="selectedLabels = $event"
                    @update:labelOptions="labelOptions = $event"
                    @close="activePopover = null"
                  />

                  <TaskModalPopover
                    v-else-if="activePopover === 'date'"
                    title="Chỉnh sửa ngày"
                    @close="activePopover = null"
                  >
                    <div class="space-y-3">
                      <input
                        v-model="dateInput"
                        type="date"
                        class="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none"
                      />
                      <div class="flex gap-2">
                        <button
                          class="flex-1 rounded-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
                          @click="applyDate"
                        >
                          Lưu
                        </button>
                        <button
                          class="flex-1 rounded-lg bg-white/10 px-3 py-2 text-white hover:bg-white/15"
                          @click="clearDate"
                        >
                          Xóa ngày
                        </button>
                      </div>
                    </div>
                  </TaskModalPopover>

                  <TaskModalPopover
                    v-else-if="activePopover === 'checklist'"
                    title="Việc cần làm"
                    @close="activePopover = null"
                  >
                    <div class="space-y-3">
                      <input
                        v-model.trim="newChecklistTitle"
                        class="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none"
                        placeholder="Tên checklist"
                        @keyup.enter="addChecklist"
                      />
                      <button
                        class="w-full rounded-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
                        @click="addChecklist"
                      >
                        Thêm checklist
                      </button>
                    </div>
                  </TaskModalPopover>

                  <TaskModalPopover
                    v-else-if="activePopover === 'members'"
                    title="Thành viên"
                    @close="activePopover = null"
                  >
                    <div class="space-y-2">
                      <button
                        v-for="member in memberOptions"
                        :key="member.id"
                        class="flex w-full items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-white hover:bg-white/10"
                        @click="toggleMember(member.name)"
                      >
                        <span>{{ member.name }}</span>
                        <span v-if="selectedMembers.includes(member.name)">✓</span>
                      </button>
                    </div>
                  </TaskModalPopover>

                  <TaskModalPopover
                    v-else-if="activePopover === 'add'"
                    title="Thêm vào thẻ"
                    @close="activePopover = null"
                  >
                    <div class="space-y-2">
                      <button class="menu-lite-btn" @click="activePopover = 'labels'">Nhãn</button>
                      <button class="menu-lite-btn" @click="activePopover = 'date'">Ngày</button>
                      <button class="menu-lite-btn" @click="activePopover = 'checklist'">Việc cần làm</button>
                      <button class="menu-lite-btn" @click="activePopover = 'members'">Thành viên</button>
                    </div>
                  </TaskModalPopover>

                  <TaskModalPopover
                    v-else-if="activePopover === 'cover'"
                    title="Thay đổi bìa"
                    @close="activePopover = null"
                  >
                    <div class="grid grid-cols-3 gap-2">
                      <button
                        v-for="color in coverOptions"
                        :key="color"
                        class="h-16 rounded-lg border border-white/10"
                        :style="{ background: color }"
                        @click="selectCover(color)"
                      />
                    </div>
                  </TaskModalPopover>

                  <TaskModalPopover
                    v-else-if="activePopover === 'more'"
                    title="Hành động"
                    @close="activePopover = null"
                  >
                    <div class="space-y-2">
                      <button class="menu-lite-btn" @click="goToPopover('labels')">Chỉnh sửa nhãn</button>
                      <button class="menu-lite-btn" @click="goToPopover('members')">Thành viên</button>
                      <button class="menu-lite-btn" @click="goToPopover('date')">Ngày</button>
                      <button class="menu-lite-btn" @click="goToPopover('checklist')">Việc cần làm</button>
                      <button class="menu-lite-btn" @click="goToPopover('cover')">Thay đổi bìa</button>
                      <button class="menu-lite-btn" @click="duplicateCard">Sao chép thẻ</button>
                      <button class="menu-lite-btn" @click="archiveCard">Lưu trữ</button>
                    </div>
                  </TaskModalPopover>
                </div>
              </div>

              <TaskModalBadges
                :labels="selectedLabels"
                :members="selectedMembers"
                :due-date="localTask.dueDate"
                :label-options="labelOptions"
              />

              <TaskModalDescription v-model="localTask.description" />

              <TaskModalChecklist
                :checklists="checklists"
                @remove-checklist="removeChecklist"
                @add-item="addChecklistItem"
              />
            </div>

            <TaskModalActivity
              :activities="activities"
              :task="localTask"
              :comment-input="commentInput"
              :show-details="showDetails"
              @update:commentInput="commentInput = $event"
              @add-comment="addComment"
              @toggle-details="showDetails = !showDetails"
            />
          </div>

          <div class="absolute bottom-5 right-5">
            <button
              class="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white shadow-lg hover:bg-blue-600"
              @click="saveTask"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from "vue";
import TaskModalHeader from "./TaskModalHeader.vue";
import TaskModalActions from "./TaskModalActions.vue";
import TaskModalPopover from "./TaskModalPopover.vue";
import TaskModalBadges from "./TaskModalBadges.vue";
import TaskModalDescription from "./TaskModalDescription.vue";
import TaskModalChecklist from "./TaskModalChecklist.vue";
import TaskModalActivity from "./TaskModalActivity.vue";
import TaskModalLabelsPanel from "./TaskModalLabelsPanel.vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  initialPopover: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["close", "update-task", "archive-task", "duplicate-task"]);

const statusOptions = ["Todo", "In Progress", "Done"];

const labelOptions = ref([
  { id: 1, name: "", color: "#15803d" },
  { id: 2, name: "", color: "#a16207" },
  { id: 3, name: "", color: "#c2410c" },
  { id: 4, name: "", color: "#b91c1c" },
  { id: 5, name: "", color: "#7e22ce" },
  { id: 6, name: "", color: "#1d4ed8" },
]);

const memberOptions = [
  { id: 1, name: "Thang Van" },
  { id: 2, name: "Admin" },
  { id: 3, name: "TechCare" },
];

const coverOptions = [
  "linear-gradient(135deg, #0f172a, #334155)",
  "linear-gradient(135deg, #4f46e5, #7c3aed)",
  "linear-gradient(135deg, #0f766e, #14b8a6)",
  "linear-gradient(135deg, #be123c, #f43f5e)",
  "linear-gradient(135deg, #854d0e, #f59e0b)",
  "linear-gradient(135deg, #1f2937, #6b7280)",
];

const activePopover = ref(null);
const showDetails = ref(true);
const commentInput = ref("");
const selectedLabels = ref([]);
const selectedMembers = ref([]);
const dateInput = ref("");
const newChecklistTitle = ref("");
const checklists = ref([]);
const activities = ref([]);

const localTask = ref({
  id: "",
  title: "",
  description: "",
  priority: "Medium",
  status: "Todo",
  dueDate: "",
  createdAt: "",
  labels: [],
  members: [],
  cover: "",
});

watch(
  () => props.task,
  (val) => {
    localTask.value = {
      id: val?.id ?? "",
      title: val?.title ?? "",
      description: val?.description ?? "",
      priority: val?.priority ?? "Medium",
      status: val?.status ?? "Todo",
      dueDate: val?.dueDate ?? "",
      createdAt: val?.createdAt ?? new Date().toISOString(),
      labels: Array.isArray(val?.labels) ? [...val.labels] : [],
      members: Array.isArray(val?.members) ? [...val.members] : [],
      cover: val?.cover ?? "",
    };

    selectedLabels.value = Array.isArray(val?.labels) ? [...val.labels] : [];
    selectedMembers.value = Array.isArray(val?.members) ? [...val.members] : [];
    dateInput.value = val?.dueDate ? toDateInput(val.dueDate) : "";

    checklists.value = Array.isArray(val?.checklists)
      ? val.checklists.map((x) => ({
          ...x,
          newItem: "",
          items: Array.isArray(x.items) ? [...x.items] : [],
        }))
      : [];

    activities.value =
      Array.isArray(val?.activities) && val.activities.length
        ? [...val.activities]
        : [
            {
              id: cryptoId(),
              author: "Thang Van",
              text: `đã thêm thẻ này vào danh sách ${val?.status || "Hôm nay"}`,
              time: formatActivityTime(new Date()),
            },
          ];
  },
  { immediate: true, deep: true }
);

watch(
  () => props.initialPopover,
  (val) => {
    activePopover.value = val || null;
  },
  { immediate: true }
);

function togglePopover(name) {
  activePopover.value = activePopover.value === name ? null : name;
}

function goToPopover(name) {
  activePopover.value = name;
}

function toggleMember(name) {
  if (selectedMembers.value.includes(name)) {
    selectedMembers.value = selectedMembers.value.filter((x) => x !== name);
  } else {
    selectedMembers.value.push(name);
  }
}

function applyDate() {
  localTask.value.dueDate = dateInput.value || "";
  activePopover.value = null;
}

function clearDate() {
  dateInput.value = "";
  localTask.value.dueDate = "";
  activePopover.value = null;
}

function addChecklist() {
  if (!newChecklistTitle.value) return;
  checklists.value.push({
    id: cryptoId(),
    title: newChecklistTitle.value,
    newItem: "",
    items: [],
  });
  newChecklistTitle.value = "";
  activePopover.value = null;
}

function removeChecklist(id) {
  checklists.value = checklists.value.filter((x) => x.id !== id);
}

function addChecklistItem(listId) {
  const list = checklists.value.find((x) => x.id === listId);
  if (!list || !list.newItem) return;

  list.items.push({
    id: cryptoId(),
    text: list.newItem,
    done: false,
  });

  list.newItem = "";
}

function addComment() {
  if (!commentInput.value) return;

  activities.value.unshift({
    id: cryptoId(),
    author: "Bạn",
    text: `đã bình luận: ${commentInput.value}`,
    time: formatActivityTime(new Date()),
  });

  commentInput.value = "";
}

function duplicateCard() {
  emit("duplicate-task", { ...localTask.value });
  activePopover.value = null;
}

function archiveCard() {
  emit("archive-task", { ...localTask.value });
  activePopover.value = null;
}

function selectCover(color) {
  localTask.value.cover = color;
  activePopover.value = null;
}

function saveTask() {
  const payload = {
    ...localTask.value,
    labels: [...selectedLabels.value],
    members: [...selectedMembers.value],
    checklists: checklists.value.map((x) => ({
      id: x.id,
      title: x.title,
      items: x.items,
    })),
    activities: [...activities.value],
  };

  emit("update-task", payload);
  emit("close");
}

function cryptoId() {
  return Math.random().toString(36).slice(2, 10);
}

function toDateInput(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatActivityTime(date) {
  return date.toLocaleString("vi-VN");
}

function onKeydown(e) {
  if (e.key === "Escape") emit("close");
}

window.addEventListener("keydown", onKeydown);
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.25) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 7px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.35);
}

.menu-lite-btn {
  width: 100%;
  text-align: left;
  border-radius: 10px;
  padding: 10px 12px;
  color: white;
  background: rgba(255, 255, 255, 0.04);
}

.menu-lite-btn:hover {
  background: rgba(255, 255, 255, 0.08);
}
</style>