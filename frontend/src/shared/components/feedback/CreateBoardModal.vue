<!-- src/components/common/CreateBoardModal.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50"
    role="dialog"
    aria-modal="true"
    aria-label="Tạo bảng"
  >
    <div class="absolute inset-0 bg-black/10" @click="closeModal"></div>

    <section
      ref="modalRef"
      class="absolute max-h-[calc(100vh-16px)] overflow-y-auto rounded-xl border border-[#d0d4db] bg-[#f1f2f4] p-3 shadow-[0_8px_24px_rgba(9,30,66,0.25)]"
      :style="modalStyle"
    >
      <div class="mb-2.5 flex items-center justify-end">
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-full text-[#172b4d] hover:bg-[#f1f2f4]"
          aria-label="Đóng"
          @click="closeModal"
        >
          <svg
            class="h-6 w-6"
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

      <div
        class="mx-auto h-[132px] w-[220px] overflow-hidden rounded-md"
        :style="{ background: selectedBoardBackground }"
      >
        <div class="flex h-full items-end justify-center gap-2 px-2.5 pb-3 pt-7">
          <div class="w-[62px] rounded bg-white/85 p-1.5">
            <div class="mb-1 h-2 w-8 rounded bg-[#d9dde3]"></div>
            <div class="mb-1 h-2 w-full rounded bg-[#d9dde3]"></div>
            <div class="h-2 w-11 rounded bg-[#d9dde3]"></div>
          </div>
          <div class="w-[62px] rounded bg-white/85 p-1.5">
            <div class="mb-1 h-2 w-7 rounded bg-[#d9dde3]"></div>
            <div class="mb-1 h-2 w-full rounded bg-[#d9dde3]"></div>
            <div class="mb-1 h-2 w-10 rounded bg-[#d9dde3]"></div>
            <div class="h-2 w-8 rounded bg-[#d9dde3]"></div>
          </div>
          <div class="w-[62px] rounded bg-white/85 p-1.5">
            <div class="mb-1 h-2 w-6 rounded bg-[#d9dde3]"></div>
            <div class="mb-1 h-2 w-full rounded bg-[#d9dde3]"></div>
            <div class="mb-1 h-2 w-full rounded bg-[#d9dde3]"></div>
            <div class="h-2 w-9 rounded bg-[#d9dde3]"></div>
          </div>
        </div>
      </div>

      <div class="mt-2.5">
        <p class="text-[14px] font-semibold text-[#44546f]">Phông nền</p>

        <div class="mt-1.5 grid grid-cols-4 gap-2">
          <button
            v-for="(bg, idx) in createBoardImageBackgrounds"
            :key="`img-${idx}`"
            type="button"
            class="h-10 rounded-md border-2 transition-[border-color,filter]"
            :class="
              selectedBoardBackground === bg
                ? 'border-transparent brightness-[1.04] shadow-[0_8px_18px_rgba(9,30,66,0.18)]'
                : 'border-transparent hover:brightness-[1.03]'
            "
            :style="{ background: bg }"
            @click="selectedBoardBackground = bg"
          />
        </div>

        <div class="mt-1.5 grid grid-cols-6 gap-2">
          <button
            v-for="(bg, idx) in createBoardColorBackgrounds"
            :key="`color-${idx}`"
            type="button"
            class="h-8 rounded-md border-2 transition-[border-color,filter]"
            :class="
              selectedBoardBackground === bg
                ? 'border-transparent brightness-[1.04] shadow-[0_8px_18px_rgba(9,30,66,0.18)]'
                : 'border-transparent hover:brightness-[1.03]'
            "
            :style="{ background: bg }"
            @click="selectedBoardBackground = bg"
          />
          <button
            type="button"
            class="h-8 rounded-md bg-[#dfe1e6] text-[20px] leading-none text-[#8c99ad]"
            disabled
            aria-label="Nhiều lựa chọn hơn"
          >
            ...
          </button>
        </div>
      </div>

      <label class="mt-2.5 block">
        <span class="text-[14px] font-semibold text-[#44546f]">
          Tiêu đề bảng <span class="text-[#e2483d]">*</span>
        </span>
        <input
          v-model="newBoardTitle"
          type="text"
          class="mt-1 h-10 w-full rounded-md border bg-white px-3 text-[14px] outline-none"
          :class="
            newBoardTitle.trim().length === 0
              ? 'border-[#0c66e4] focus:ring-1 focus:ring-[#0c66e4]'
              : 'border-[#c7cdd8] focus:ring-1 focus:ring-[#0c66e4]'
          "
        />
      </label>

      <p
        v-if="newBoardTitle.trim().length === 0"
        class="mt-1.5 text-[13px] text-[#44546f]"
      >
        👋 Tiêu đề bảng là bắt buộc
      </p>

      <div class="relative mt-3">
        <span class="text-[14px] font-semibold text-[#44546f]">Quyền xem</span>
        <button
          type="button"
          class="mt-1 flex h-10 w-full items-center justify-between rounded-md border border-[#9fadbc] bg-[#f7f8f9] px-3 text-[14px] text-[#172b4d] hover:bg-[#f1f2f4]"
          @click="showVisibilityDropdown = !showVisibilityDropdown"
        >
          <span>{{ selectedVisibilityOption.label }}</span>
          <svg
            class="h-4 w-4 text-[#626f86]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <div
          v-if="showVisibilityDropdown"
          class="absolute left-0 right-0 top-[100%] z-10 mt-2 max-h-[170px] overflow-y-auto overscroll-contain rounded-md border border-[#9fadbc] bg-[#f1f2f4] pr-1 shadow-[0_8px_16px_rgba(9,30,66,0.16)]"
        >
          <button
            v-for="option in visibilityOptions"
            :key="option.id"
            type="button"
            class="w-full border-l-2 px-3 py-2 text-left transition-colors"
            :class="
              selectedVisibility === option.id
                ? 'border-l-[#0c66e4] bg-[#dce4f0]'
                : 'border-l-transparent hover:bg-[#ebedf0]'
            "
            @click="selectVisibilityMode(option.id)"
          >
            <div class="flex items-start gap-2.5">
              <div>
                <p class="text-[14px] font-semibold text-[#172b4d]">{{ option.label }}</p>
                <p class="text-[12px] leading-[1.35] text-[#44546f]">
                  {{ option.description }}
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <button
        type="button"
        class="mt-3 h-9 w-full rounded-md text-[14px] font-semibold"
        :class="
          canCreateBoard
            ? 'bg-[#0c66e4] text-white hover:bg-[#0055cc]'
            : 'cursor-not-allowed bg-[#dfe1e6] text-[#97a0af]'
        "
        :disabled="!canCreateBoard"
        @click="submitCreateBoard"
      >
        Tạo mới
      </button>

      <button
        type="button"
        class="mt-2 h-9 w-full rounded-md bg-[#dfe1e6] text-[14px] font-medium text-[#172b4d] hover:bg-[#d4d8dd]"
      >
        Bắt đầu với Mẫu
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from "vue";
import { useRouter } from "vue-router";
import { useWorkspaceBoardsState } from "@/modules/kanban/board/composables/useWorkspaceBoardsState.js";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  anchorElement: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close", "create"]);

const router = useRouter();
const { workspaceBoards } = useWorkspaceBoardsState();

const modalRef = ref(null);
const modalStyle = ref({});
const newBoardTitle = ref("");
const selectedBoardBackground = ref("linear-gradient(145deg,#6f4a2a 0%,#9b7042 40%,#4f3b2a 100%)");
const selectedVisibility = ref("workspace");
const showVisibilityDropdown = ref(false);

const createBoardImageBackgrounds = [
  "linear-gradient(145deg,#6f4a2a 0%,#9b7042 40%,#4f3b2a 100%)",
  "linear-gradient(145deg,#f7a347 0%,#f28b2f 45%,#5f3f1f 100%)",
  "linear-gradient(145deg,#d5b18b 0%,#efd6b6 45%,#a36f44 100%)",
  "linear-gradient(145deg,#8aa95b 0%,#5c7e3c 45%,#2f4d27 100%)",
];

const createBoardColorBackgrounds = [
  "#cfdcf0",
  "linear-gradient(135deg,#35b2d6,#2a63d3)",
  "linear-gradient(135deg,#0f5ec8,#1545a4)",
  "linear-gradient(135deg,#2d3c88,#b14484)",
  "linear-gradient(135deg,#8161d0,#de67a9)",
];

const visibilityOptions = [
  {
    id: "private",
    label: "Riêng tư",
    description:
      "Chỉ thành viên bảng thông tin mới có quyền xem bảng thông tin này. Quản trị viên Không gian làm việc có thể đóng bảng thông tin và xoá thành viên.",
  },
  {
    id: "workspace",
    label: "Không gian làm việc",
    description:
      "Tất cả thành viên của Không gian làm việc Trello có thể xem và sửa bảng thông tin này.",
  },
  {
    id: "public",
    label: "Công khai",
    description:
      "Bất kỳ ai trên mạng internet đều có thể xem bảng thông tin này. Chỉ thành viên bảng thông tin mới có quyền sửa.",
  },
];

const canCreateBoard = computed(() => newBoardTitle.value.trim().length > 0);

const selectedVisibilityOption = computed(
  () =>
    visibilityOptions.find((item) => item.id === selectedVisibility.value) || visibilityOptions[1]
);

const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

const positionModal = () => {
  if (typeof window === "undefined") return;

  const modalWidth = 320;
  const screenPadding = 16; // Tăng padding lên 16px để modal không sát mép
  const measuredModalWidth = modalRef.value?.offsetWidth || modalWidth;
  const measuredModalHeight = modalRef.value?.offsetHeight || 620;

  let top = 56;
  let left = 8;

  if (props.anchorElement) {
    const anchorRect = props.anchorElement.getBoundingClientRect();
    top = anchorRect.top - 20;
    
    // Mặc định hiển thị bên phải, nhưng cách một khoảng
    left = anchorRect.right + 16;

    // Kiểm tra nếu modal bị tràn ra ngoài màn hình bên phải
    if (left + measuredModalWidth > window.innerWidth - screenPadding) {
      // Hiển thị bên trái của element neo
      left = anchorRect.left - measuredModalWidth - 16;
    }

    if (left < screenPadding) {
      left = screenPadding;
    }
    
    if (left + measuredModalWidth > window.innerWidth - screenPadding) {
      left = window.innerWidth - measuredModalWidth - screenPadding;
    }
  } else {
    top = (window.innerHeight - measuredModalHeight) / 2;
    left = (window.innerWidth - measuredModalWidth) / 2;
  }

  const boundedLeft = clampValue(
    left,
    screenPadding,
    Math.max(screenPadding, window.innerWidth - measuredModalWidth - screenPadding)
  );

  const boundedTop = clampValue(
    top,
    screenPadding,
    Math.max(screenPadding, window.innerHeight - measuredModalHeight - screenPadding)
  );

  modalStyle.value = {
    top: `${boundedTop}px`,
    left: `${boundedLeft}px`,
    width: `${modalWidth}px`,
  };
};

const selectVisibilityMode = (mode) => {
  selectedVisibility.value = mode;
  showVisibilityDropdown.value = false;
};

const resetForm = () => {
  newBoardTitle.value = "";
  selectedBoardBackground.value = createBoardImageBackgrounds[0];
  selectedVisibility.value = "workspace";
  showVisibilityDropdown.value = false;
};

const closeModal = () => {
  resetForm();
  emit("close");
};

const submitCreateBoard = () => {
  if (!canCreateBoard.value) return;

  const newBoard = {
    id: Date.now(),
    name: newBoardTitle.value.trim(),
    background: selectedBoardBackground.value,
    updatedAt: Date.now(),
    visibility: selectedVisibility.value,
  };

  workspaceBoards.value.unshift(newBoard);

  closeModal();

  router.push({
    name: "ProjectDetail",
    params: { id: newBoard.id },
    query: {
      title: newBoard.name,
      bg: newBoard.background,
      visibility: newBoard.visibility,
    },
  });

  emit("create", newBoard);
};

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      resetForm();
      nextTick(() => {
        positionModal();
      });
    }
  }
);
</script>