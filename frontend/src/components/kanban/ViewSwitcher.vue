<template>
  <div class="relative">
    <!-- Trigger -->
    <button
      class="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-black/30 border border-white/15 hover:bg-black/40 transition"
      @click="toggle"
      type="button"
    >

      <!-- calendar icon -->
      <svg
        class="w-4 h-4 opacity-90"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M8 2V5M16 2V5M3.5 9H20.5"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
        />
        <path
          d="M6 4H18C19.6569 4 21 5.34315 21 7V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V7C3 5.34315 4.34315 4 6 4Z"
          stroke="currentColor"
          stroke-width="1.6"
        />
      </svg>

      <!-- chevron -->
      <svg
        class="w-4 h-4 opacity-90"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6 9L12 15L18 9"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <!-- Overlay + Panel -->
    <teleport to="body">
      <div v-if="open" class="fixed inset-0 z-[70]">
        <!-- backdrop -->
        <div class="absolute inset-0 bg-black/50" @click="close" />

        <!-- panel -->
        <div class="absolute right-4 top-20 md:right-10 md:top-16">
          <div
            class="w-[22rem] max-w-[92vw] rounded-2xl bg-[#1f2328] border border-white/10 shadow-2xl overflow-hidden"
          >
            <!-- header -->
            <div class="px-4 py-3 flex items-center justify-between">
              <div class="text-sm font-semibold text-white/90">Đang xem</div>
              <button
                class="w-9 h-9 rounded-xl bg-black/25 border border-white/10 hover:bg-black/35 flex items-center justify-center"
                @click="close"
                type="button"
                aria-label="Đóng"
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

            <!-- premium -->
            <div class="px-4 pb-3">
              <div
                class="rounded-xl bg-gradient-to-r from-[#2c144b] via-[#2b1f4b] to-[#24173d] border border-white/10 p-4"
              >
                <div
                  class="inline-flex text-[11px] px-2 py-0.5 rounded-full bg-[#6d28d9]/30 border border-[#6d28d9]/30 text-[#c4b5fd] font-semibold"
                >
                  PREMIUM
                </div>
                <div class="mt-2 text-sm font-semibold">
                  Xem công việc của bạn theo cách mới
                </div>
                <div class="mt-1 text-xs text-white/70">
                  Các chế độ xem chỉ dành cho Không gian làm việc Premium.
                </div>
              </div>
            </div>

            <!-- options -->
            <div class="px-2 pb-3">
              <div class="text-[11px] text-white/50 px-3 py-2">Bảng</div>

              <button
                v-for="opt in options"
                :key="opt.value"
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition text-left"
                @click="select(opt.value)"
                type="button"
              >
                <span
                  class="w-6 h-6 rounded-lg bg-black/25 border border-white/10 flex items-center justify-center"
                  v-html="opt.svg"
                />

                <span class="flex-1 text-sm text-white/90">
                  {{ opt.label }}
                </span>

                <svg
                  v-if="modelValue === opt.value"
                  class="w-4 h-4 text-white/90"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "board" },
});
const emit = defineEmits(["update:modelValue"]);

const open = ref(false);

function toggle() {
  open.value = !open.value;
}
function close() {
  open.value = false;
}
function select(v) {
  emit("update:modelValue", v);
  close();
}

function onKeydown(e) {
  if (e.key === "Escape") close();
}
onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));

const options = [
  { 
    value: "board", 
    label: "Bảng", 
    svg: `<svg class="w-4 h-4 text-white/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5C4 3.89543 4.89543 3 6 3H10V21H6C4.89543 21 4 20.1046 4 19V5Z" stroke="currentColor" stroke-width="1.6"/><path d="M14 3H18C19.1046 3 20 3.89543 20 5V12H14V3Z" stroke="currentColor" stroke-width="1.6"/><path d="M14 16H20V19C20 20.1046 19.1046 21 18 21H14V16Z" stroke="currentColor" stroke-width="1.6"/></svg>` 
  },
  { 
    value: "table", 
    label: "Bảng", 
    svg: `<svg class="w-4 h-4 text-white/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V7Z" stroke="currentColor" stroke-width="1.6"/><path d="M4 10H20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M9 5V19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>` 
  },
  { 
    value: "calendar", 
    label: "Lịch", 
    svg: `<svg class="w-4 h-4 text-white/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2V5M16 2V5M3.5 9H20.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M6 4H18C19.6569 4 21 5.34315 21 7V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V7C3 5.34315 4.34315 4 6 4Z" stroke="currentColor" stroke-width="1.6"/></svg>` 
  },
  { 
    value: "dashboard", 
    label: "Bảng điều khiển", 
    svg: `<svg class="w-4 h-4 text-white/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12A9 9 0 1 1 3 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 12L16.5 8.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M7 20H17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>` 
  },
  { 
    value: "timeline", 
    label: "Lịch trình", 
    svg: `<svg class="w-4 h-4 text-white/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M6 12H14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M6 18H10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M18 12V18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M18 18L20 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>` 
  },
  { 
    value: "map", 
    label: "Bản đồ", 
    svg: `<svg class="w-4 h-4 text-white/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21C12 21 18 16.5 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 16.5 12 21 12 21Z" stroke="currentColor" stroke-width="1.6"/><path d="M12 11.5C13.1046 11.5 14 10.6046 14 9.5C14 8.39543 13.1046 7.5 12 7.5C10.8954 7.5 10 8.39543 10 9.5C10 10.6046 10.8954 11.5 12 11.5Z" stroke="currentColor" stroke-width="1.6"/></svg>` 
  },
];

const currentLabel = computed(() => {
  const found = options.find((x) => x.value === props.modelValue);
  return found?.label || "Bảng";
});
</script>