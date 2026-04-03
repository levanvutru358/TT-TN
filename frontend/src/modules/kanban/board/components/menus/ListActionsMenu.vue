<template>
  <div class="relative">
    <button
      class="text-white/60 hover:text-white p-1 rounded hover:bg-white/10"
      type="button"
      aria-label="Mở menu danh sách"
      title="Thao tác danh sách"
      @click.stop="openMain"
    >
      ⋮
    </button>

    <teleport to="body">
      <div v-if="open" class="fixed inset-0 z-[80]">
        <div class="absolute inset-0 bg-black/50" @click="close" />

        <div
          class="absolute"
          :style="{ left: `${pos.left}px`, top: `${pos.top}px` }"
        >
          <div
            class="w-[22rem] max-w-[92vw] h-auto max-h-[70vh] rounded-2xl bg-[#1f2328] border border-white/10 shadow-2xl overflow-hidden flex flex-col"
          >
            <!-- Header -->
            <div class="px-4 py-3 flex items-center justify-between shrink-0">
              <div class="flex items-center gap-2">
                <button
                  v-if="page !== 'main'"
                  class="w-9 h-9 rounded-xl bg-black/25 border border-white/10 hover:bg-black/35 flex items-center justify-center"
                  type="button"
                  aria-label="Quay lại"
                  title="Quay lại"
                  @click="page = 'main'"
                >
                  <svg
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>

                <div class="text-sm font-semibold text-white/90">
                  {{ headerTitle }}
                </div>
              </div>

              <button
                class="w-9 h-9 rounded-xl bg-black/25 border border-white/10 hover:bg-black/35 flex items-center justify-center"
                type="button"
                aria-label="Đóng"
                title="Đóng"
                @click="close"
              >
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6L18 18M18 6L6 18"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>

            <!-- Scrollable body -->
            <div class="flex-1 overflow-y-auto hide-scrollbar">
              <!-- MAIN -->
              <div v-if="page === 'main'" class="px-2 pb-3">
                <button
                  class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-sm text-white/85"
                  type="button"
                  @click="emitAddCard"
                >
                  Thêm thẻ
                </button>

                <button
                  class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-sm text-white/85"
                  type="button"
                  @click="emitCopyList"
                >
                  Sao chép danh sách
                </button>

                <button
                  class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-sm text-white/85 flex items-center justify-between"
                  type="button"
                  @click="page = 'move'"
                >
                  <span>Di chuyển danh sách</span>
                  <span class="text-white/40">›</span>
                </button>

                <button
                  class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-sm text-white/85"
                  type="button"
                  @click="emitToggleWatch"
                >
                  Theo dõi
                </button>

                <div class="mt-2 px-3 py-2 text-[11px] text-white/45">
                  Thay đổi màu danh sách
                  <span
                    class="ml-2 inline-flex text-[10px] px-2 py-0.5 rounded-full bg-[#6d28d9]/25 border border-[#6d28d9]/25 text-[#c4b5fd] font-semibold"
                  >
                    PREMIUM
                  </span>
                </div>

                <div class="px-3 pb-1">
                  <div class="grid grid-cols-5 gap-2">
                    <button
                      v-for="c in colors"
                      :key="c"
                      class="h-9 rounded-lg border border-white/10 hover:scale-[1.02] transition relative"
                      type="button"
                      :style="{ backgroundColor: c }"
                      @click="emitSetColor(c)"
                      :aria-label="`Chọn màu ${c}`"
                      :title="c"
                    >
                      <span
                        v-if="String(selectedColor || '').toLowerCase() === String(c).toLowerCase()"
                        class="absolute inset-0 flex items-center justify-center text-black"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                    </button>
                  </div>

                  <button
                    class="w-full mt-2 text-left px-3 py-2.5 rounded-xl bg-black/25 border border-white/10 hover:bg-black/35 transition text-sm text-white/85 flex items-center justify-center gap-2"
                    type="button"
                    @click="emitClearColor"
                  >
                    <span>✕</span>
                    <span>Gỡ bỏ màu</span>
                  </button>
                </div>

                <div class="mt-3 px-3 py-2 text-[11px] text-white/45">
                  Tự động hóa
                </div>

                <button
                  class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-sm text-white/75"
                  type="button"
                  @click="emitAutomation"
                >
                  Khi thêm thẻ vào danh sách...
                </button>

                <button
                  class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-sm text-white/75"
                  type="button"
                  @click="emitAutomation"
                >
                  Hàng ngày, sắp xếp danh sách theo...
                </button>

                <button
                  class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-sm text-white/75"
                  type="button"
                  @click="emitAutomation"
                >
                  Thứ 2 hàng tuần, sắp xếp danh sách theo...
                </button>

                <button
                  class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-sm text-white/75"
                  type="button"
                  @click="emitAutomation"
                >
                  Tạo quy tắc
                </button>

                <div class="mt-3 border-t border-white/10" />

                <button
                  class="w-full text-left px-3 py-3 rounded-xl hover:bg-white/5 transition text-sm text-white/85"
                  type="button"
                  @click="emitArchive"
                >
                  Lưu trữ danh sách này
                </button>
              </div>

              <!-- MOVE -->
              <div v-else-if="page === 'move'" class="px-2 pb-3">
                <div class="px-3 py-2 text-[11px] text-white/45">
                  Di chuyển nhanh
                </div>

                <button
                  class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-sm disabled:opacity-40 disabled:cursor-not-allowed text-white/85"
                  type="button"
                  :disabled="!canMoveLeft"
                  @click="emitMove('left')"
                >
                  ← Sang trái
                </button>

                <button
                  class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-sm disabled:opacity-40 disabled:cursor-not-allowed text-white/85"
                  type="button"
                  :disabled="!canMoveRight"
                  @click="emitMove('right')"
                >
                  → Sang phải
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  columnId: { type: String, required: true },
  canMoveLeft: { type: Boolean, default: true },
  canMoveRight: { type: Boolean, default: true },
  selectedColor: { type: String, default: "" },
});

const emit = defineEmits([
  "add-card",
  "copy-list",
  "move",
  "archive",
  "toggle-watch",
  "set-color",
  "clear-color",
  "automation",
]);

const open = ref(false);
const page = ref("main");
const pos = ref({ left: 16, top: 80 });

const colors = [
  "#1f6f4a",
  "#8b6b00",
  "#a04800",
  "#a11f1f",
  "#6d28d9",
  "#1d4ed8",
  "#0f766e",
  "#3f6212",
  "#b83280",
  "#6b7280",
];

const headerTitle = computed(() => {
  if (page.value === "move") return "Di chuyển danh sách";
  return "Thao tác";
});

function computePositionFromClick(e) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const panelW = 352;
  const panelH = Math.min(560, vh * 0.7);
  const margin = 12;

  const baseLeft = Math.min(
    vw - panelW - margin,
    Math.max(margin, e.clientX - panelW + 28)
  );

  const baseTop = Math.min(
    vh - panelH - margin,
    Math.max(margin, e.clientY - 10)
  );

  pos.value = { left: baseLeft, top: baseTop };
}

function openMain(e) {
  computePositionFromClick(e);
  page.value = "main";
  open.value = true;
}

function close() {
  open.value = false;
  page.value = "main";
}

function onKeydown(e) {
  if (e.key === "Escape") close();
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));

function emitAddCard() {
  emit("add-card", props.columnId);
  close();
}

function emitMove(dir) {
  emit("move", { columnId: props.columnId, dir });
  close();
}

function emitArchive() {
  emit("archive", props.columnId);
  close();
}

function emitSetColor(c) {
  emit("set-color", { columnId: props.columnId, color: c });
  close();
}

function emitClearColor() {
  emit("clear-color", props.columnId);
  close();
}

function emitCopyList() {
  emit("copy-list", props.columnId);
  close();
}

function emitToggleWatch() {
  emit("toggle-watch", props.columnId);
  close();
}

function emitAutomation() {
  emit("automation", props.columnId);
  close();
}
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>