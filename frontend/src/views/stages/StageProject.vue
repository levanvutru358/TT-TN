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
        <div
          class="w-8 h-8 rounded-full bg-[#1d2125] flex items-center justify-center text-xs font-semibold"
        >
          TV
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
        class="flex-1 bg-gradient-to-r from-[#4b3f72] via-[#7b3ea8] to-[#c1558b] p-4 md:p-6 overflow-auto"
      >
        <div class="max-w-6xl mx-auto">
          <!-- Board header -->
          <div class="mb-3 md:mb-4 flex items-center justify-between">
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

              <span
                class="hidden md:inline-flex text-[11px] px-2 py-0.5 rounded-full bg-black/30 border border-white/10 shrink-0"
              >
                TV
              </span>
            </div>

            <div class="flex items-center gap-2 text-xs shrink-0">
              <button
                class="px-3 py-1.5 rounded bg-black/30 border border-white/15 hover:bg-black/40"
              >
                Chia sẻ
              </button>
            </div>
          </div>

          <!-- Board content -->
          <div class="h-[calc(100vh-9rem)] md:h-[calc(100vh-8rem)]">
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
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from "vue";
import { getProjectDetail } from "@/api/mockApi";
import KanbanBoard from "@/components/kanban/KanbanBoard.vue";

const project = ref(null);
const loading = ref(true);

// ===== Board title edit =====
const isEditingTitle = ref(false);
const titleDraft = ref("");
const titleInputRef = ref(null);

const boardTitle = computed(() => {
  // Ưu tiên name/title từ project; fallback về chữ mặc định
  const p = project.value;
  const fromProject =
    (p?.name && String(p.name).trim()) ||
    (p?.title && String(p.title).trim()) ||
    (p?.project_name && String(p.project_name).trim()) ||
    "";
  return fromProject || "Bảng Trello của tôi";
});

function startEditTitle() {
  // Nếu chưa có project thì không edit
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

  // Không cho title rỗng -> revert
  if (!nextTitle) {
    cancelEditTitle();
    return;
  }

  // Update project object (giữ tương thích: ưu tiên field name)
  const p = project.value || {};
  project.value = {
    ...p,
    name: nextTitle,
  };

  isEditingTitle.value = false;
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