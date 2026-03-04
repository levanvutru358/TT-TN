<template>
  <div class="h-screen flex flex-col bg-[#020617] text-white">
    <!-- Top App Bar - Giống Trello -->
    <div
      class="h-14 px-3 md:px-5 flex items-center justify-between border-b border-black bg-[#020617]"
    >
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded bg-[#0c66e4] flex items-center justify-center font-bold text-sm"
          >
            T
          </div>
          <span class="text-sm font-semibold">Trolleo</span>
        </div>

        <div class="hidden md:flex items-center ml-4">
          <input
            class="w-72 bg-[#1d2125] border border-[#4b5563] rounded px-3 py-1.5 text-xs placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tìm kiếm"
            v-model="searchQuery"
          />
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          class="hidden md:inline-flex text-xs px-3 py-1.5 rounded bg-[#0c66e4] hover:bg-[#0b5ac7] transition-colors"
          @click="showCreateBoardModal = true"
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

    <!-- Main Content -->
    <main class="flex-1 overflow-auto bg-gradient-to-b from-[#1a1f36] to-[#0f1419] p-4 md:p-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header Section -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold mb-2">Các Không Gian Làm Việc Của Bạn</h1>
          <p class="text-white/60">Quản lý và tổ chức các dự án của bạn</p>
        </div>

        <!-- Recently Viewed Section -->
        <div v-if="recentBoards.length > 0" class="mb-12">
          <h2 class="text-lg font-semibold mb-4">Đã xem gần đây</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="board in recentBoards"
              :key="board.id"
              class="group relative cursor-pointer rounded-lg overflow-hidden h-32 transition-transform hover:scale-105"
              @click="navigateToBoard(board)"
            >
              <!-- Gradient Background -->
              <div
                class="absolute inset-0 transition-all duration-300"
                :style="{
                  background: board.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }"
              ></div>

              <!-- Overlay -->
              <div
                class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"
              ></div>

              <!-- Content -->
              <div class="relative h-full p-4 flex flex-col justify-between">
                <h3 class="font-semibold text-white truncate pr-8">{{ board.name }}</h3>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-white/80">{{ board.taskCount }} thẻ</span>
                  <button
                    class="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded hover:bg-white/20 duration-200"
                    @click.stop="showBoardMenu(board, $event)"
                  >
                    ⋮
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- All Boards Section -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold">Tất cả bảng</h2>
            <button
              class="text-xs px-3 py-1.5 rounded bg-[#0c66e4] hover:bg-[#0b5ac7] transition-colors md:hidden"
              @click="showCreateBoardModal = true"
            >
              + Tạo
            </button>
          </div>

          <div v-if="filteredBoards.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="board in filteredBoards"
              :key="board.id"
              class="group relative cursor-pointer rounded-lg overflow-hidden h-32 transition-transform hover:scale-105"
              @click="navigateToBoard(board)"
            >
              <!-- Gradient Background -->
              <div
                class="absolute inset-0 transition-all duration-300"
                :style="{
                  background: board.gradient || generateGradient(board.id)
                }"
              ></div>

              <!-- Overlay -->
              <div
                class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"
              ></div>

              <!-- Content -->
              <div class="relative h-full p-4 flex flex-col justify-between">
                <h3 class="font-semibold text-white truncate pr-8">{{ board.name }}</h3>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-white/80">{{ board.taskCount || 0 }} thẻ</span>
                  <button
                    class="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded hover:bg-white/20 duration-200"
                    @click.stop="showBoardMenu(board, $event)"
                  >
                    ⋮
                  </button>
                </div>
              </div>
            </div>

            <!-- Add New Board Card -->
            <div
              class="rounded-lg overflow-hidden h-32 border-2 border-dashed border-white/20 hover:border-white/40 transition-colors flex items-center justify-center cursor-pointer bg-white/5 hover:bg-white/10"
              @click="showCreateBoardModal = true"
            >
              <div class="text-center">
                <div class="text-3xl mb-2">+</div>
                <p class="text-sm text-white/80">Tạo bảng mới</p>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-12">
            <p class="text-white/60 mb-4">Chưa có bảng nào</p>
            <button
              class="px-4 py-2 rounded bg-[#0c66e4] hover:bg-[#0b5ac7] transition-colors text-sm"
              @click="showCreateBoardModal = true"
            >
              Tạo bảng đầu tiên
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Create Board Modal -->
    <div
      v-if="showCreateBoardModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showCreateBoardModal = false"
    >
      <div class="bg-[#111827] rounded-lg p-6 w-full max-w-md shadow-xl border border-white/10">
        <h2 class="text-xl font-semibold mb-4">Tạo bảng mới</h2>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Tên bảng</label>
          <input
            v-model="newBoardName"
            type="text"
            class="w-full bg-[#1d2125] border border-[#4b5563] rounded px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tên bảng"
            @keydown.enter="createNewBoard"
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium mb-3">Chọn màu</label>
          <div class="grid grid-cols-6 gap-2">
            <button
              v-for="(gradient, index) in gradients"
              :key="index"
              class="w-full h-10 rounded border-2 transition-all"
              :class="selectedGradientIndex === index ? 'border-white' : 'border-transparent'"
              :style="{ background: gradient }"
              @click="selectedGradientIndex = index"
            ></button>
          </div>
        </div>

        <div class="flex gap-2">
          <button
            class="flex-1 px-4 py-2 rounded bg-[#0c66e4] hover:bg-[#0b5ac7] transition-colors font-medium"
            @click="createNewBoard"
          >
            Tạo
          </button>
          <button
            class="flex-1 px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition-colors font-medium"
            @click="showCreateBoardModal = false"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>

    <!-- Board Menu Context -->
    <div
      v-if="activeBoardMenu && contextMenuPos"
      class="fixed z-50 bg-[#111827] rounded-lg shadow-xl border border-white/10 py-2 min-w-[160px]"
      :style="{
        top: contextMenuPos.y + 'px',
        left: contextMenuPos.x + 'px'
      }"
      @click.stop
    >
      <button
        class="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors text-sm"
        @click="editBoard(activeBoardMenu)"
      >
        Chỉnh sửa
      </button>
      <button
        class="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors text-sm"
        @click="cloneBoard(activeBoardMenu)"
      >
        Nhân bản
      </button>
      <button
        class="w-full text-left px-4 py-2 hover:bg-red-900/30 transition-colors text-sm text-red-400"
        @click="deleteBoard(activeBoardMenu)"
      >
        Xóa
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// States
const searchQuery = ref("");
const showCreateBoardModal = ref(false);
const newBoardName = ref("");
const selectedGradientIndex = ref(0);
const boards = ref([
  {
    id: 1,
    name: "Projects managent",
    taskCount: 12,
    gradient: "linear-gradient(135deg, #c084fc 0%, #a855f7 100%)"
  },
  {
    id: 2,
    name: "Marketing Campaign",
    taskCount: 8,
    gradient: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)"
  },
  {
    id: 3,
    name: "Website Redesign",
    taskCount: 15,
    gradient: "linear-gradient(135deg, #34d399 0%, #10b981 100%)"
  },
  {
    id: 4,
    name: "Mobile App",
    taskCount: 20,
    gradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
  },
]);

const recentBoards = computed(() => boards.value.slice(0, 3));

const filteredBoards = computed(() => {
  if (!searchQuery.value.trim()) {
    return boards.value;
  }
  return boards.value.filter((board) =>
    board.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const gradients = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
  "linear-gradient(135deg, #2e2e78 0%, #662d91 100%)",
  "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
];

const activeBoardMenu = ref(null);
const contextMenuPos = ref(null);

// Methods
function generateGradient(id) {
  return gradients[id % gradients.length];
}

function navigateToBoard(board) {
  router.push({ name: "ProjectDetail", params: { id: board.id } });
}

function showBoardMenu(board, event) {
  event.stopPropagation();
  activeBoardMenu.value = board;
  contextMenuPos.value = {
    x: event.clientX,
    y: event.clientY
  };
}

function createNewBoard() {
  if (!newBoardName.value.trim()) return;

  const newBoard = {
    id: Math.max(...boards.value.map(b => b.id), 0) + 1,
    name: newBoardName.value,
    taskCount: 0,
    gradient: gradients[selectedGradientIndex.value]
  };

  boards.value.push(newBoard);
  newBoardName.value = "";
  selectedGradientIndex.value = 0;
  showCreateBoardModal.value = false;
}

function editBoard(board) {
  newBoardName.value = board.name;
  showCreateBoardModal.value = true;
  activeBoardMenu.value = null;
  contextMenuPos.value = null;
}

function cloneBoard(board) {
  const clonedBoard = {
    ...board,
    id: Math.max(...boards.value.map(b => b.id), 0) + 1,
    name: board.name + " (Bản sao)"
  };
  boards.value.push(clonedBoard);
  activeBoardMenu.value = null;
  contextMenuPos.value = null;
}

function deleteBoard(board) {
  boards.value = boards.value.filter(b => b.id !== board.id);
  activeBoardMenu.value = null;
  contextMenuPos.value = null;
}

// Close menu when clicking outside
function closeMenu() {
  activeBoardMenu.value = null;
  contextMenuPos.value = null;
}

onMounted(() => {
  document.addEventListener("click", closeMenu);
});

onUnmounted(() => {
  document.removeEventListener("click", closeMenu);
});
</script>
