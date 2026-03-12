<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[100] bg-black/55 flex items-start justify-center px-4 pt-16 pb-6"
      @click.self="handleClose"
    >
      <div
        class="w-full max-w-[400px] rounded-xl bg-[#282e33] border border-[#3f474f] shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
      >
        <!-- Header -->
        <div class="relative px-6 pt-4 pb-3">
          <h2 class="text-center text-[20px] font-semibold text-[#f1f2f4]">
            Tạo bảng
          </h2>

          <button
            type="button"
            class="absolute right-4 top-4 w-8 h-8 rounded-md text-[#9fadbc] hover:bg-[#3a4148] hover:text-[#f1f2f4] flex items-center justify-center transition-colors"
            aria-label="Đóng"
            @click="handleClose"
          >
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>

        <div class="px-5 pb-5">
          <!-- Preview -->
          <div
            class="h-[120px] w-[240px] mx-auto rounded-lg overflow-hidden border border-[#4a525a] bg-cover bg-center relative"
            :style="{ background: selectedBackground.style }"
          >
            <div class="absolute inset-0 bg-black/20"></div>

            <div class="relative z-10 h-full flex items-center justify-center gap-2 px-3">
              <div class="w-[62px] h-[86px] rounded bg-white/95 p-2 shadow-sm">
                <div class="w-4 h-2 rounded bg-[#dfe1e6] mb-2"></div>
                <div class="h-4 rounded bg-[#ebecf0] mb-2"></div>
                <div class="h-1.5 rounded bg-[#ebecf0] mb-1.5"></div>
                <div class="h-1.5 w-4/5 rounded bg-[#ebecf0] mb-1.5"></div>
                <div class="h-1.5 w-3/5 rounded bg-[#ebecf0]"></div>
              </div>

              <div class="w-[62px] h-[86px] rounded bg-white/95 p-2 shadow-sm -mt-2">
                <div class="w-4 h-2 rounded bg-[#dfe1e6] mb-2"></div>
                <div class="h-4 rounded bg-[#ebecf0] mb-2"></div>
                <div class="h-1.5 rounded bg-[#ebecf0] mb-1.5"></div>
                <div class="h-1.5 w-4/5 rounded bg-[#ebecf0] mb-1.5"></div>
                <div class="h-1.5 w-3/5 rounded bg-[#ebecf0]"></div>
              </div>

              <div class="w-[62px] h-[86px] rounded bg-white/95 p-2 shadow-sm">
                <div class="w-4 h-2 rounded bg-[#dfe1e6] mb-2"></div>
                <div class="h-4 rounded bg-[#ebecf0] mb-2"></div>
                <div class="h-1.5 rounded bg-[#ebecf0] mb-1.5"></div>
                <div class="h-1.5 w-4/5 rounded bg-[#ebecf0] mb-1.5"></div>
                <div class="h-1.5 w-3/5 rounded bg-[#ebecf0]"></div>
              </div>
            </div>
          </div>

          <!-- Background -->
          <div class="mt-4">
            <p class="text-[14px] font-semibold text-[#b6c2cf] mb-2">Phông nền</p>

            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="bg in backgrounds"
                :key="bg.id"
                type="button"
                class="relative h-12 rounded-md border overflow-hidden transition-all"
                :class="
                  selectedBackground.id === bg.id
                    ? 'border-[#85b8ff] ring-2 ring-[#85b8ff]'
                    : 'border-[#4a525a] hover:border-[#6b7785]'
                "
                :style="{ background: bg.style }"
                @click="selectedBackground = bg"
              >
                <span
                  v-if="selectedBackground.id === bg.id"
                  class="absolute inset-0 flex items-center justify-center bg-black/15"
                >
                  <svg
                    class="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      stroke-width="2.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <!-- Title -->
          <div class="mt-4">
            <label class="block text-[14px] font-semibold text-[#b6c2cf] mb-2">
              Tiêu đề bảng <span class="text-[#f87462]">*</span>
            </label>

            <input
              v-model.trim="boardTitle"
              type="text"
              class="w-full h-10 rounded-md border bg-[#22272b] px-3 text-[15px] text-[#f1f2f4] outline-none transition-colors"
              :class="
                showError && !boardTitle
                  ? 'border-[#f87462] focus:border-[#f87462]'
                  : 'border-[#4a525a] focus:border-[#85b8ff]'
              "
            />

            <p
              v-if="showError && !boardTitle"
              class="mt-2 text-[13px] text-[#f87462] flex items-center gap-2"
            >
              <span>👋</span>
              <span>Tiêu đề bảng là bắt buộc</span>
            </p>
          </div>

          <!-- View permission -->
          <div class="mt-4">
            <label class="block text-[14px] font-semibold text-[#b6c2cf] mb-2">
              Quyền xem
            </label>

            <div
              class="h-10 rounded-md border border-[#4a525a] bg-[#22272b] px-3 flex items-center justify-between text-[#f1f2f4]"
            >
              <span class="text-[15px]">Không gian làm việc</span>
              <svg
                class="w-4 h-4 text-[#9fadbc]"
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
            </div>
          </div>

          <!-- Buttons -->
          <div class="mt-5 space-y-3">
            <button
              type="button"
              class="w-full h-10 rounded-md text-[15px] font-semibold transition-colors"
              :class="
                boardTitle
                  ? 'bg-[#579dff] text-[#1d2125] hover:bg-[#85b8ff]'
                  : 'bg-[#2a2f34] text-[#8c9bab] cursor-not-allowed'
              "
              @click="handleCreate"
            >
              Tạo mới
            </button>

            <button
              type="button"
              class="w-full h-10 rounded-md bg-[#3a4148] text-[#f1f2f4] text-[15px] font-semibold hover:bg-[#4a525a] transition-colors"
            >
              Bắt đầu với Mẫu
            </button>
          </div>

          <p class="mt-3 text-[12px] leading-5 text-[#9fadbc]">
            Bằng cách sử dụng hình ảnh từ Unsplash, bạn đồng ý với giấy phép và
            Điều khoản dịch vụ
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const router = useRouter();

const boardTitle = ref("");
const showError = ref(false);

const backgrounds = [
  {
    id: 1,
    style: "linear-gradient(135deg, #b06ce2 0%, #d779c1 100%)",
  },
  {
    id: 2,
    style: "linear-gradient(135deg, #b98b5c 0%, #3d2a1d 100%)",
  },
  {
    id: 3,
    style: "linear-gradient(135deg, #d9c3a3 0%, #8f6f4f 100%)",
  },
  {
    id: 4,
    style: "linear-gradient(135deg, #4a90e2 0%, #50c9c3 100%)",
  },
  {
    id: 5,
    style: "linear-gradient(135deg, #0f2747 0%, #164d9c 100%)",
  },
  {
    id: 6,
    style: "linear-gradient(135deg, #1f6feb 0%, #0d47a1 100%)",
  },
  {
    id: 7,
    style: "linear-gradient(135deg, #8e44ad 0%, #ff6ec7 100%)",
  },
  {
    id: 8,
    style: "linear-gradient(135deg, #3a3f47 0%, #2a2f36 100%)",
  },
];

const selectedBackground = ref(backgrounds[0]);

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      boardTitle.value = "";
      showError.value = false;
      selectedBackground.value = backgrounds[0];
    }
  }
);

function handleClose() {
  emit("update:modelValue", false);
}

function handleCreate() {
  if (!boardTitle.value) {
    showError.value = true;
    return;
  }

  router.push({
    path: "/projects/1",
    query: {
      title: boardTitle.value,
      bg: selectedBackground.value.id,
    },
  });

  emit("update:modelValue", false);
}
</script>