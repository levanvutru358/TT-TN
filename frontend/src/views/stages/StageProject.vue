<template>
  <div class="h-screen flex flex-col bg-[#020617] text-white">
    <!-- Top App Bar -->
    <div
      class="h-14 px-3 md:px-5 flex items-center justify-between border-b border-black bg-[#020617]"
    >
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded bg-[#0c66e4] flex items-center justify-center"
          >
            <span class="text-xs font-semibold">T</span>
          </div>
          <span class="text-sm font-semibold">Trolleo</span>
        </div>

        <div class="hidden md:flex items-center ml-4">
          <input
            class="w-72 bg-[#1d2125] border border-[#4b5563] rounded px-3 py-1.5 text-xs placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tìm kiếm"
          />
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          class="hidden md:inline-flex text-xs px-3 py-1.5 rounded bg-[#0c66e4] hover:bg-[#0b5ac7]"
        >
          Tạo mới
        </button>
        <div
          class="text-[11px] px-2.5 py-1 rounded-full bg-[#f973ff] text-black font-semibold"
        >
          MỚI
        </div>
      </div>
    </div>

    <!-- Main layout -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left sidebar -->
      <aside
        class="hidden sm:flex w-80 bg-[#111827] border-r border-black/60 px-3 py-3"
      >
        <div
          class="flex-1 rounded-3xl bg-gradient-to-b from-[#073b79] via-[#073469] to-[#082b53] px-4 pt-4 pb-3 flex flex-col shadow-lg"
        >
          <div class="flex items-center gap-2 mb-5">
            <div
              class="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center"
            >
              <span class="text-sm">✉️</span>
            </div>
            <h2 class="text-sm font-semibold">Hộp thư đến</h2>
          </div>

          <div class="space-y-3 text-sm">
            <button
              class="w-full text-left px-3 py-2 rounded-xl bg-black/40 text-gray-100 hover:bg-black/55 transition-colors"
            >
              Thêm thẻ
            </button>
            <button
              class="w-full text-left px-3 py-2 rounded-xl bg-black/40 text-gray-100 hover:bg-black/55 transition-colors"
            >
              Bắt đầu sử dụng Trello
            </button>
          </div>

          <div class="mt-auto pt-4">
            <div
              class="rounded-full bg-black/40 px-3 py-1.5 flex items-center gap-2 text-[11px] text-white/90"
            >
              <div
                class="w-5 h-5 rounded-full bg-white flex items-center justify-center overflow-hidden"
              >
                <span class="text-[10px] text-[#0f172a]">G</span>
              </div>
              <span
                class="text-[10px] font-semibold bg-[#0c66e4] text-white px-1.5 py-0.5 rounded"
              >
                MỚI
              </span>
              <span class="truncate">Tổng hợp việc cần làm</span>
              <span class="ml-auto text-[10px]">⌄</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Board area -->
      <main
        ref="boardWrapper"
        class="flex-1 bg-gradient-to-r from-[#4b3f72] via-[#7b3ea8] to-[#c1558b] p-4 md:p-6 overflow-auto"
      >
        <div class="max-w-6xl mx-auto">
          <!-- Board header -->
          <div class="mb-3 md:mb-4 flex items-start justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <!-- Editable title -->
              <div class="min-w-0">
                <!-- view mode -->
                <h1
                  v-if="!isEditingTitle"
                  class="text-lg md:text-xl font-semibold truncate cursor-text select-none"
                  :title="boardTitle"
                  @click="startEditTitle"
                >
                  {{ boardTitle }}
                </h1>

                <!-- edit mode -->
                <input
                  v-else
                  ref="titleInputRef"
                  v-model="titleDraft"
                  class="text-lg md:text-xl font-semibold w-full max-w-[28rem] bg-black/30 border border-white/20 rounded px-2 py-1
                         focus:outline-none focus:ring-2 focus:ring-white/30"
                  @keydown.enter.prevent="commitTitle"
                  @keydown.esc.prevent="cancelEditTitle"
                  @blur="commitTitle"
                />
              </div>
            </div>
            <div class="flex items-center gap-2 text-xs shrink-0">
              <!-- NEW: view switcher -->
              <ViewSwitcher v-model="currentView" />
              <button
                class="px-3 py-2 rounded-lg"
                :class="showMembers ? 'bg-[#0c66e4] text-white' : 'bg-black/30 border border-white/15 hover:bg-black/40'"
                @click="showMembers = !showMembers"
              >
                👥 Thành viên
              </button>
              <button
                class="px-3 py-2 rounded-lg"
                :class="showStats ? 'bg-[#0c66e4] text-white' : 'bg-black/30 border border-white/15 hover:bg-black/40'"
                @click="showStats = !showStats"
              >
                📊 Thống kê
              </button>
              <button
                class="px-3 py-2 rounded-lg bg-black/30 border border-white/15 hover:bg-black/40"
              >
                Chia sẻ
              </button>
            </div>
          </div>

          <!-- Board content -->
          <div v-if="!showMembers" class="flex flex-col h-[calc(100vh-9rem)] md:h-[calc(100vh-8rem)] gap-4">
            <!-- Stats section -->
            <div v-if="showStats && project" class="animate-in fade-in flex-shrink-0">
              <ProjectStats :tasks="project.tasks || []" />
            </div>

            <!-- Kanban board -->
            <div class="flex-1 overflow-hidden">
              <KanbanBoard
                v-if="project"
                :project="project"
                @update-project="project = $event"
              />

              <div
                v-else
                class="h-full rounded-2xl bg-black/20 border border-white/10 flex items-center justify-center"
              >
                <div class="text-sm text-white/80">
                  {{ loading ? "Đang tải dự án..." : "Không có dữ liệu dự án" }}
                </div>
              </div>
            </div>
          </div>

          <!-- Members panel -->
          <div v-else class="h-[calc(100vh-9rem)] md:h-[calc(100vh-8rem)] overflow-y-auto">
            <ProjectMembers
              v-if="project"
              :members="project.members || []"
              @update-members="updateMembers"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from "vue";
import { getProjectDetail } from "@/api/mockApi";
import KanbanBoard from "@/components/kanban/KanbanBoard.vue";
import KanbanBoardDraggable from "@/components/kanban/KanbanBoardDraggable.vue";
import ViewSwitcher from "@/components/kanban/ViewSwitcher.vue";
import ProjectStats from "@/components/ProjectStats.vue";
import ProjectMembers from "@/components/ProjectMembers.vue";

const project = ref(null);
const loading = ref(true);
const boardWrapper = ref(null);

// View switcher state
const currentView = ref("board");

// Show panels state
const showMembers = ref(false);
const showStats = ref(true);

// ===== Board title edit =====
const isEditingTitle = ref(false);
const titleDraft = ref("");
const titleInputRef = ref(null);

const boardTitle = computed(() => {
  const p = project.value;
  const fromProject =
    (p?.name && String(p.name).trim()) ||
    (p?.title && String(p.title).trim()) ||
    (p?.project_name && String(p.project_name).trim()) ||
    "";
  return fromProject || "Bảng Trello của tôi";
});

function startEditTitle() {
  if (!project.value) return;

  isEditingTitle.value = true;
  titleDraft.value = boardTitle.value;

  nextTick(() => {
    if (titleInputRef.value) {
      titleInputRef.value.focus();
      titleInputRef.value.select?.();
    }
  });
}

function cancelEditTitle() {
  isEditingTitle.value = false;
  titleDraft.value = "";
}

function commitTitle() {
  if (!isEditingTitle.value) return;

  const nextTitle = String(titleDraft.value || "").trim();
  if (!nextTitle) {
    cancelEditTitle();
    return;
  }

  const p = project.value || {};
  project.value = {
    ...p,
    name: nextTitle,
  };

  isEditingTitle.value = false;
}

// ===== Members management =====
function updateMembers(updatedMembers) {
  if (project.value) {
    project.value = {
      ...project.value,
      members: updatedMembers,
    };
  }
}

// ===== Fetch project =====
onMounted(async () => {
  try {
    loading.value = true;
    const res = await getProjectDetail();
    project.value = res.data;
  } catch (error) {
    console.error("Failed to fetch project:", error);
  } finally {
    loading.value = false;
  }
});
</script>