<template>
  <div ref="rootRef" class="relative">
    <div
      class="bg-[#22272b] rounded-lg p-3 shadow-sm hover:bg-[#2c333a] cursor-pointer border border-[#3f474f] transition-colors group"
      @click="open = true"
    >
      <!-- Priority -->
      <div class="flex items-center gap-2 mb-2">
        <div
          class="w-2 h-2 rounded-full"
          :class="priorityConfig.bg"
        />
        <span class="text-xs text-[#9fadbc]">{{ task.priority }}</span>
      </div>

      <!-- Title -->
      <div class="flex items-start justify-between gap-2 mb-3">
        <h4 class="text-sm text-white font-medium">
          {{ task.title }}
        </h4>

        <!-- Card actions (3 dots like Trello) -->
        <button
          class="opacity-0 group-hover:opacity-100 transition w-8 h-8 -mt-1 -mr-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center"
          type="button"
          aria-label="Thao tác thẻ"
          title="Thao tác"
          @click.stop="toggleMenu"
        >
          ⋯
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
        <div class="flex items-center gap-1">
          <div
            class="w-6 h-6 rounded-full bg-[#34424c] flex items-center justify-center text-xs text-white"
          >
            {{ String(task.assignee || "?")[0] }}
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

    <!-- Dropdown -->
    <div
      v-if="menuOpen"
      class="absolute right-2 top-10 z-30 w-56 rounded-xl bg-[#1f2328] border border-white/10 shadow-2xl overflow-hidden"
      @click.stop
    >
      <div class="px-3 py-2 text-[11px] text-white/45">Thao tác</div>
      <button
        class="w-full text-left px-3 py-2.5 text-sm text-white/85 hover:bg-white/5"
        type="button"
        @click="openCard"
      >
        Mở thẻ
      </button>
      <button
        class="w-full text-left px-3 py-2.5 text-sm text-white/85 hover:bg-white/5"
        type="button"
        @click="copyTitle"
      >
        Sao chép tiêu đề
      </button>
      <button
        class="w-full text-left px-3 py-2.5 text-sm text-white/85 hover:bg-white/5"
        type="button"
        @click="menuOpen = false"
      >
        Đóng
      </button>
    </div>

    <TaskModal
      v-if="open"
      :task="task"
      @close="open = false"
    />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import TaskModal from "../modals/TaskModal.vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const open = ref(false);
const menuOpen = ref(false);
const rootRef = ref(null);

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
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
});

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function openCard() {
  menuOpen.value = false;
  open.value = true;
}

async function copyTitle() {
  menuOpen.value = false;
  const text = String(props.task?.title || "");
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // ignore
  }
}

function onDocPointerDown(e) {
  if (!menuOpen.value) return;
  const el = rootRef.value;
  if (!el) return;
  if (el.contains(e.target)) return;
  menuOpen.value = false;
}

onMounted(() => document.addEventListener("pointerdown", onDocPointerDown));
onBeforeUnmount(() => document.removeEventListener("pointerdown", onDocPointerDown));
</script>
