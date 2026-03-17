<template>
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
        <h2 class="text-white text-sm font-semibold">Hộp thư đến</h2>
      </div>

      <div class="space-y-3 text-sm">
        <div class="rounded-2xl bg-black/25 p-2">
          <button
            v-if="!showAddCard"
            class="w-full text-left px-3 py-2 rounded-xl bg-black/40 text-gray-100 hover:bg-black/55 transition-colors flex items-center gap-2"
            type="button"
            @click="openAddCard"
          >
            <span class="text-base leading-none">＋</span>
            <span>Thêm thẻ</span>
          </button>

          <div v-else class="space-y-2">
            <textarea
              ref="textareaRef"
              v-model.trim="newCardTitle"
              rows="3"
              class="w-full resize-none rounded-xl border border-white/10 bg-[#0f172a]/80 px-3 py-2 text-sm text-white outline-none placeholder:text-white/45 focus:border-white/20"
              placeholder="Nhập tiêu đề cho thẻ..."
              @keydown.enter.exact.prevent="submitAddCard"
              @keydown.esc="closeAddCard"
            />

            <input
              v-model.trim="newCardDescription"
              type="text"
              class="w-full rounded-xl border border-white/10 bg-[#0f172a]/80 px-3 py-2 text-sm text-white outline-none placeholder:text-white/45 focus:border-white/20"
              placeholder="Mô tả ngắn (không bắt buộc)"
            />

            <div class="flex items-center gap-2">
              <button
                class="rounded-xl bg-[#0c66e4] px-3 py-2 text-sm font-medium text-white hover:bg-[#0055cc] transition-colors disabled:opacity-60"
                type="button"
                :disabled="!newCardTitle"
                @click="submitAddCard"
              >
                Thêm thẻ
              </button>

              <button
                class="rounded-xl px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                type="button"
                @click="closeAddCard"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>

        <button
          class="w-full text-left px-3 py-2 rounded-xl bg-black/40 text-gray-100 hover:bg-black/55 transition-colors"
          type="button"
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
</template>

<script setup>
import { nextTick, ref } from "vue";

const emit = defineEmits(["add-card"]);

const showAddCard = ref(false);
const newCardTitle = ref("");
const newCardDescription = ref("");
const textareaRef = ref(null);

function openAddCard() {
  showAddCard.value = true;

  nextTick(() => {
    textareaRef.value?.focus();
  });
}

function closeAddCard() {
  showAddCard.value = false;
  newCardTitle.value = "";
  newCardDescription.value = "";
}

function submitAddCard() {
  const title = newCardTitle.value.trim();
  if (!title) return;

  emit("add-card", {
    id: cryptoId(),
    title,
    description: newCardDescription.value.trim(),
    priority: "Medium",
    status: "Todo",
    dueDate: "",
    createdAt: new Date().toISOString(),
    labels: [],
    members: [],
    assignees: [],
    checklists: [],
    activities: [],
    completed: false,
  });

  closeAddCard();
}

function cryptoId() {
  return Math.random().toString(36).slice(2, 10);
}
</script>