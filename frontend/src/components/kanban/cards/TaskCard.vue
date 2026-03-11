<template>
  <div ref="rootRef" class="relative">
    <!-- Card -->
    <div
      class="group bg-[#22272b] rounded-xl p-3 shadow-sm hover:bg-[#2c333a] cursor-pointer border border-[#3f474f] transition-colors"
      @click="openCardFromBody"
    >
      <!-- Top -->
      <div class="flex items-start justify-between gap-2 mb-3">
        <div class="min-w-0 flex-1">
          <!-- Priority -->
          <div class="flex items-center gap-2 mb-2">
            <div class="w-2 h-2 rounded-full" :class="priorityConfig.bg" />
            <span class="text-xs text-[#9fadbc]">{{ task.priority }}</span>
          </div>

          <!-- Title -->
          <h4 class="text-sm text-white font-medium break-words leading-5">
            {{ task.title }}
          </h4>
        </div>

        <!-- Edit / Actions button -->
        <button
          class="shrink-0 w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          type="button"
          aria-label="Thao tác thẻ"
          title="Thao tác thẻ"
          @click.stop="toggleMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="5" r="1.6" />
            <circle cx="12" cy="12" r="1.6" />
            <circle cx="12" cy="19" r="1.6" />
          </svg>
        </button>
      </div>

      <!-- Description -->
      <p
        v-if="task.description"
        class="text-xs text-[#9fadbc] mb-3 line-clamp-2"
      >
        {{ task.description }}
      </p>

      <!-- Footer -->
      <div class="flex items-center justify-between mt-2">
        <div class="flex items-center gap-2">
          <div
            class="w-6 h-6 rounded-full bg-[#34424c] flex items-center justify-center text-xs text-white font-medium"
          >
            {{ assigneeInitial }}
          </div>
        </div>

        <div
          v-if="task.dueDate"
          class="flex items-center gap-1 text-xs text-[#9fadbc]"
        >
          <span>📅</span>
          <span>{{ shortDate }}</span>
        </div>
      </div>
    </div>

    <!-- Dropdown menu -->
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

    <!-- Modal -->
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
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
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
]);

const open = ref(false);
const menuOpen = ref(false);
const rootRef = ref(null);
const initialPopover = ref(null);

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
    props.task?.assignee ||
      props.task?.assignees?.[0] ||
      "?"
  ).trim();

  return value ? value.charAt(0).toUpperCase() : "?";
});

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
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
  } catch {
    // ignore
  }
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
  } catch {
    // ignore
  }
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
  emit("open-card", updatedTask);
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