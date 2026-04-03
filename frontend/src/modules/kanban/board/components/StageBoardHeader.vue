<!-- src/components/stages/StageBoardHeader.vue -->
<template>
  <div class="mb-3 md:mb-4 flex items-start justify-between gap-3">
    <div class="flex items-center gap-3 min-w-0">
      <div class="min-w-0">
        <h1
          v-if="!isEditingTitle"
          class="text-white md:text-xl font-semibold truncate cursor-text select-none"
          :title="boardTitle"
          @click="$emit('start-edit-title')"
        >
          {{ boardTitle }}
        </h1>

        <input
          v-else
          ref="localTitleInputRef"
          :value="titleDraft"
          class="text-lg md:text-xl font-semibold w-full max-w-[28rem] bg-black/30 border border-white/20 rounded px-2 py-1
                 focus:outline-none focus:ring-2 focus:ring-white/30"
          @input="$emit('update:titleDraft', $event.target.value)"
          @keydown.enter.prevent="$emit('commit-title')"
          @keydown.esc.prevent="$emit('cancel-edit-title')"
          @blur="$emit('commit-title')"
        />
      </div>
    </div>

    <div class="text-white flex items-center gap-2 text-xs shrink-0">
      <ViewSwitcher
        :model-value="currentView"
        @update:model-value="$emit('update:currentView', $event)"
      />

      <button
        class="px-3 py-2 rounded-lg"
        :class="showMembers ? 'bg-[#0c66e4] text-white' : 'bg-black/30 border border-white/15 hover:bg-black/40'"
        @click="$emit('toggle-members')"
      >
        👥 Thành viên
      </button>

      <button
        class="px-3 py-2 rounded-lg"
        :class="filterButtonClass"
        @click="$emit('toggle-filter')"
      >
        🔽 Lọc
      </button>
      <button
        class="w-9 h-9 rounded-lg bg-black/30 border border-white/15 hover:bg-black/40 flex items-center justify-center"
        type="button"
        aria-label="Menu bảng"
        title="Menu"
        @click="$emit('open-board-menu')"
      >
        ⋯
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { nextTick, ref, watch } from "vue";
import ViewSwitcher from "@/modules/kanban/board/components/ViewSwitcher.vue";

const props = defineProps({
  boardTitle: {
    type: String,
    default: "",
  },
  isEditingTitle: {
    type: Boolean,
    default: false,
  },
  titleDraft: {
    type: String,
    default: "",
  },
  currentView: {
    type: String,
    default: "board",
  },
  showMembers: {
    type: Boolean,
    default: false,
  },
  filterButtonClass: {
    type: String,
    default: "",
  },
});

defineEmits([
  "start-edit-title",
  "commit-title",
  "cancel-edit-title",
  "update:titleDraft",
  "update:currentView",
  "toggle-members",
  "toggle-filter",
  "open-board-menu",
]);

const localTitleInputRef = ref(null);

watch(
  () => props.isEditingTitle,
  async (val) => {
    if (val) {
      await nextTick();
      if (localTitleInputRef.value) {
        localTitleInputRef.value.focus();
        localTitleInputRef.value.select?.();
      }
    }
  }
);
</script>