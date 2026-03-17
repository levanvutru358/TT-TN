<template>
  <div
    ref="rootRef"
    class="relative"
    :data-task-id="task.id"
    :data-task-list-id="task.listId || ''"
  >
    <div
      class="group cursor-grab rounded-xl border border-[#3f474f] bg-[#22272b] p-3 shadow-sm transition-colors hover:bg-[#2c333a] active:cursor-grabbing"
      :class="[
        isDragging ? 'opacity-60 ring-1 ring-[#579dff]' : '',
        isCompleted ? 'border-[#2f6b45] bg-[#1f2a24] hover:bg-[#25332b]' : '',
      ]"
      draggable="true"
      @click="openCardFromBody"
      @dragstart="onCardDragStart"
      @dragend="onCardDragEnd"
    >
      <div class="mb-3 flex items-start justify-between gap-2">
        <div class="min-w-0 flex-1">
          <div class="mb-2 flex items-center gap-2">
            <div class="h-2 w-2 rounded-full" :class="priorityConfig.bg" />
            <span class="text-xs text-[#9fadbc]">{{ task.priority }}</span>
          </div>

          <div class="flex items-start gap-2">
            <button
              type="button"
              class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition"
              :class="
                isCompleted
                  ? 'border-green-500 bg-green-500 text-white'
                  : 'border-[#738496] bg-transparent text-transparent hover:border-green-500'
              "
              :aria-label="isCompleted ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'"
              :title="isCompleted ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'"
              @click.stop="toggleCompleted"
            >
              <svg
                v-if="isCompleted"
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.414 0l-3.2-3.2a1 1 0 111.414-1.42l2.493 2.494 6.493-6.494a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <h4
              class="break-words text-sm font-medium leading-5"
              :class="isCompleted ? 'text-white/70' : 'text-white'"
            >
              {{ task.title }}
            </h4>
          </div>
        </div>

        <button
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
          type="button"
          aria-label="Thao tác thẻ"
          title="Thao tác thẻ"
          @click.stop="toggleMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="5" r="1.6" />
            <circle cx="12" cy="12" r="1.6" />
            <circle cx="12" cy="19" r="1.6" />
          </svg>
        </button>
      </div>

      <p
        v-if="task.description"
        class="mb-3 line-clamp-2 text-xs"
        :class="isCompleted ? 'text-[#9fadbc]/70' : 'text-[#9fadbc]'"
      >
        {{ task.description }}
      </p>

      <div class="mt-2 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div
            class="flex h-6 w-6 items-center justify-center rounded-full bg-[#34424c] text-xs font-medium text-white"
          >
            {{ assigneeInitial }}
          </div>
        </div>

        <div
          v-if="task.dueDate"
          class="flex items-center gap-1 text-xs"
          :class="isCompleted ? 'text-[#9fadbc]/70' : 'text-[#9fadbc]'"
        >
          <span>📅</span>
          <span>{{ shortDate }}</span>
        </div>
      </div>
    </div>

    <transition name="fade">
      <TaskActionsMenu
        v-if="menuOpen"
        class="absolute right-0 top-10 z-50"
        @open-card="handleOpenCard"
        @edit-labels="handleEditLabels"
        @change-members="handleChangeMembers"
        @change-cover="handleChangeCover"
        @edit-date="handleEditDate"
        @move-task="handleMove"
        @copy-task="handleCopyCard"
        @copy-link="handleCopyLink"
        @mirror-task="handleMirror"
        @archive-task="handleArchive"
      />
    </transition>

    <TaskModal
      v-if="open"
      :task="task"
      :initial-popover="initialPopover"
      @close="handleCloseModal"
      @update-task="handleUpdateTask"
      @archive-task="handleArchiveFromModal"
      @duplicate-task="handleDuplicateFromModal"
    />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import TaskModal from "@/components/modals/task-modal/TaskModal.vue";
import TaskActionsMenu from "@/components/kanban/menus/TaskActionsMenu.vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  "open-card",
  "edit-labels",
  "change-members",
  "change-cover",
  "edit-date",
  "move-task",
  "copy-task",
  "copy-link",
  "mirror-task",
  "archive-task",
  "drag-start",
  "drag-end",
  "toggle-completed",
  "update-task",
]);

const open = ref(false);
const menuOpen = ref(false);
const rootRef = ref(null);
const initialPopover = ref(null);
const isDragging = ref(false);
const localCompleted = ref(Boolean(props.task?.completed));

watch(
  () => props.task?.completed,
  (value) => {
    localCompleted.value = Boolean(value);
  }
);

const isCompleted = computed(() => localCompleted.value);

const priorityConfig = computed(() => {
  const map = {
    High: { bg: "bg-red-500" },
    Medium: { bg: "bg-yellow-500" },
    Low: { bg: "bg-green-500" },
  };
  return map[props.task.priority] || { bg: "bg-gray-400" };
});

const shortDate = computed(() => {
  if (!props.task.dueDate) return "";
  const d = new Date(props.task.dueDate);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
  });
});

const assigneeInitial = computed(() => {
  const value = String(
    props.task?.assignee || props.task?.assignees?.[0] || "?"
  ).trim();
  return value ? value.charAt(0).toUpperCase() : "?";
});

function buildDragPayload() {
  return {
    taskId: props.task?.id ?? null,
    sourceListId: props.task?.listId ?? null,
    task: props.task,
  };
}

function onCardDragStart(event) {
  const payload = buildDragPayload();

  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("application/json", JSON.stringify(payload));
    event.dataTransfer.setData("text/plain", String(payload.taskId ?? ""));
  }

  emit("drag-start", payload);
  isDragging.value = true;
}

function onCardDragEnd() {
  isDragging.value = false;
  emit("drag-end", buildDragPayload());
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

function toggleCompleted() {
  localCompleted.value = !localCompleted.value;

  emit("toggle-completed", {
    ...props.task,
    completed: localCompleted.value,
  });
}

function openCardFromBody() {
  initialPopover.value = null;
  open.value = true;
  emit("open-card", props.task);
}

function handleOpenCard() {
  closeMenu();
  initialPopover.value = null;
  open.value = true;
  emit("open-card", props.task);
}

function handleEditLabels() {
  closeMenu();
  initialPopover.value = "labels";
  open.value = true;
}

function handleChangeMembers() {
  closeMenu();
  initialPopover.value = "members";
  open.value = true;
}

function handleChangeCover() {
  closeMenu();
  initialPopover.value = "cover";
  open.value = true;
}

function handleEditDate() {
  closeMenu();
  initialPopover.value = "date";
  open.value = true;
}

function handleMove() {
  closeMenu();
  initialPopover.value = "more";
  open.value = true;
  emit("move-task", props.task);
}

async function handleCopyCard() {
  closeMenu();
  emit("copy-task", props.task);

  try {
    await navigator.clipboard.writeText(JSON.stringify(props.task, null, 2));
  } catch {}
}

async function handleCopyLink() {
  closeMenu();

  const cardId = props.task?.id ?? props.task?._id ?? props.task?.uuid ?? "";
  const link = cardId
    ? `${window.location.origin}${window.location.pathname}?card=${cardId}`
    : window.location.href;

  emit("copy-link", {
    task: props.task,
    link,
  });

  try {
    await navigator.clipboard.writeText(link);
  } catch {}
}

function handleMirror() {
  closeMenu();
  emit("mirror-task", props.task);
}

function handleArchive() {
  closeMenu();
  emit("archive-task", props.task);
}

function handleCloseModal() {
  open.value = false;
  initialPopover.value = null;
}

function handleUpdateTask(updatedTask) {
  open.value = false;
  initialPopover.value = null;
  localCompleted.value = Boolean(updatedTask?.completed);
  emit("update-task", updatedTask);
}

function handleArchiveFromModal(taskFromModal) {
  open.value = false;
  initialPopover.value = null;
  emit("archive-task", taskFromModal);
}

function handleDuplicateFromModal(taskFromModal) {
  emit("copy-task", taskFromModal);
}

function onDocPointerDown(e) {
  if (!menuOpen.value) return;
  const el = rootRef.value;
  if (!el) return;
  if (el.contains(e.target)) return;
  closeMenu();
}

onMounted(() => {
  document.addEventListener("pointerdown", onDocPointerDown);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onDocPointerDown);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>