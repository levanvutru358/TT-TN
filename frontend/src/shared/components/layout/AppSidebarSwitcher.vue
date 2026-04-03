<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[100] flex items-start justify-center bg-black/55 backdrop-blur-sm px-4 pt-4 md:pt-6"
      @click.self="$emit('close')"
    >
      <div
        class="w-full max-w-2xl rounded-3xl bg-[#282a2f] border border-white/10 shadow-2xl text-white overflow-hidden"
      >
        <div class="p-5">
          <!-- Top search row -->
          <div class="flex items-center gap-2 mb-4">
            <div
              class="flex-1 h-11 rounded-xl border border-[#6aa6ff] bg-[#1f2126] px-3 flex items-center gap-2"
            >
              <span class="text-lg text-white/80">⌕</span>
              <input
                v-model="searchQuery"
                class="w-full bg-transparent outline-none text-sm placeholder:text-white/45"
                placeholder="Tìm bảng của bạn"
              />
            </div>

            <button
              type="button"
              class="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center text-lg"
              title="Dạng danh sách"
            >
              ☷
            </button>

            <button
              type="button"
              class="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center text-lg"
              title="Ghim"
            >
              📌
            </button>
          </div>

          <!-- Filter chips -->
          <div class="flex items-center gap-2 mb-7">
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg text-sm font-medium"
              :class="
                activeFilter === 'all'
                  ? 'bg-[#0c66e4] text-white'
                  : 'bg-white/8 text-white/80 hover:bg-white/12'
              "
              @click="activeFilter = 'all'"
            >
              Tất cả
            </button>

            <button
              type="button"
              class="px-3 py-1.5 rounded-lg text-sm font-medium"
              :class="
                activeFilter === 'workspace'
                  ? 'bg-[#0c66e4] text-white'
                  : 'bg-white/8 text-white/80 hover:bg-white/12'
              "
              @click="activeFilter = 'workspace'"
            >
              Trello Không gian làm việc
            </button>
          </div>

          <!-- Recent -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4 text-white/85">
              <span class="text-base">◔</span>
              <h3 class="text-sm font-semibold">Gần đây</h3>
            </div>

            <div class="flex flex-wrap gap-4">
              <button
                v-for="board in filteredRecentBoards"
                :key="board.id"
                type="button"
                class="w-36 rounded-2xl overflow-hidden bg-[#1b1d22] hover:bg-[#23262d] transition-colors text-left"
                @click="handleSelectBoard(board)"
              >
                <div
                  class="h-20"
                  :style="{ background: board.cover }"
                />
                <div class="px-3 py-3">
                  <div class="text-sm leading-5 text-white/90 break-words line-clamp-2">
                    {{ board.name }}
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- Workspace section -->
          <div>
            <button
              type="button"
              class="w-full flex items-center gap-3 text-left text-white/85 hover:text-white"
              @click="workspaceExpanded = !workspaceExpanded"
            >
              <span
                class="text-sm transition-transform duration-200"
                :class="workspaceExpanded ? 'rotate-90' : ''"
              >
                ❯
              </span>
              <span class="text-sm font-semibold">Trello Không gian làm việc</span>
            </button>

            <div v-if="workspaceExpanded" class="mt-4 pl-6 space-y-2">
              <button
                v-for="board in filteredWorkspaceBoards"
                :key="board.id"
                type="button"
                class="w-full flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/8 transition-colors text-left"
                @click="handleSelectBoard(board)"
              >
                <div
                  class="w-10 h-8 rounded-lg shrink-0"
                  :style="{ background: board.cover }"
                />
                <div class="min-w-0">
                  <div class="text-sm text-white/90 truncate">{{ board.name }}</div>
                  <div class="text-xs text-white/45 truncate">{{ board.workspace }}</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- footer / close -->
        <div class="px-5 py-3 border-t border-white/10 flex justify-end bg-black/10">
          <button
            type="button"
            class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-sm"
            @click="$emit('close')"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed, ref } from "vue";

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "select-board"]);

const searchQuery = ref("");
const activeFilter = ref("all");
const workspaceExpanded = ref(true);

const recentBoards = ref([
  {
    id: 1,
    name: "Projects managent",
    workspace: "Trello Không gian làm việc",
    cover: "linear-gradient(135deg, #8b6cf0 0%, #d876b7 100%)",
  },
]);

const workspaceBoards = ref([
  {
    id: 2,
    name: "Trello Clone UI",
    workspace: "Trello Không gian làm việc",
    cover: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
  },
  {
    id: 3,
    name: "Mobile Shop Backend",
    workspace: "Trello Không gian làm việc",
    cover: "linear-gradient(135deg, #0f766e 0%, #14532d 100%)",
  },
  {
    id: 4,
    name: "Sprint tuần 2",
    workspace: "Trello Không gian làm việc",
    cover: "linear-gradient(135deg, #ea580c 0%, #7c2d12 100%)",
  },
]);

const normalizedQuery = computed(() => searchQuery.value.trim().toLowerCase());

const filteredRecentBoards = computed(() => {
  let items = recentBoards.value;

  if (activeFilter.value === "workspace") {
    items = items.filter((item) => item.workspace === "Trello Không gian làm việc");
  }

  if (!normalizedQuery.value) return items;

  return items.filter((item) =>
    item.name.toLowerCase().includes(normalizedQuery.value)
  );
});

const filteredWorkspaceBoards = computed(() => {
  let items = workspaceBoards.value;

  if (activeFilter.value === "workspace") {
    items = items.filter((item) => item.workspace === "Trello Không gian làm việc");
  }

  if (!normalizedQuery.value) return items;

  return items.filter((item) =>
    item.name.toLowerCase().includes(normalizedQuery.value)
  );
});

function handleSelectBoard(board) {
  emit("select-board", board);
  emit("close");
}
</script>