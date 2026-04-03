<template>
  <div class="px-2 pb-3">
    <div class="mb-3 flex items-center">
      <button
        type="button"
        class="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-white/80 hover:bg-black/30"
        @click="$emit('back')"
      >
        ‹
      </button>

      <div class="flex-1 text-center text-sm font-semibold text-white/90">
        {{ screen.title }}
      </div>

      <div class="w-9"></div>
    </div>

    <div class="mx-2 mb-4 rounded-2xl border border-white/10 bg-black/20 p-4">
      <div class="text-sm font-semibold text-white/90">
        {{ screen.title }}
      </div>
      <div class="mt-1 text-xs leading-5 text-white/60">
        {{ screen.subtitle }}
      </div>
    </div>

    <div class="mx-2 space-y-4">
      <div
        v-for="section in screen.sections"
        :key="section.title"
        class="rounded-2xl border border-white/10 bg-black/20 p-3"
      >
        <div class="mb-3 text-xs uppercase tracking-wide text-white/40">
          {{ section.title }}
        </div>

        <div class="space-y-3">
          <template v-for="item in section.items" :key="item.id || item.label">
            <div v-if="item.type === 'input'" class="space-y-2">
              <div class="text-sm text-white/85">{{ item.label }}</div>
              <input
                class="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
                :placeholder="item.placeholder || ''"
              />
            </div>

            <div v-else-if="item.type === 'textarea'" class="space-y-2">
              <div class="text-sm text-white/85">{{ item.label }}</div>
              <textarea
                rows="4"
                class="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
                :placeholder="item.placeholder || ''"
              />
            </div>

            <div v-else-if="item.type === 'choice'" class="space-y-2">
              <div class="text-sm text-white/85">{{ item.label }}</div>
              <div class="grid grid-cols-1 gap-2">
                <button
                  v-for="opt in item.options"
                  :key="opt"
                  type="button"
                  class="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-left text-sm text-white/85 hover:bg-black/30"
                >
                  {{ opt }}
                </button>
              </div>
            </div>

            <div
              v-else-if="item.type === 'toggle'"
              class="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-3"
            >
              <div class="min-w-0">
                <div class="text-sm text-white/90">{{ item.label }}</div>
                <div v-if="item.sub" class="mt-1 text-xs text-white/55">
                  {{ item.sub }}
                </div>
              </div>

              <button
                type="button"
                class="relative h-6 w-11 rounded-full transition"
                :class="toggleState[item.label] ? 'bg-[#0c66e4]' : 'bg-white/15'"
                @click="toggleState[item.label] = !toggleState[item.label]"
              >
                <span
                  class="absolute top-0.5 h-5 w-5 rounded-full bg-white transition"
                  :class="toggleState[item.label] ? 'left-[22px]' : 'left-0.5'"
                />
              </button>
            </div>

            <div
              v-else-if="item.type === 'option'"
              class="rounded-xl border border-white/10 bg-black/20 px-3 py-3"
            >
              <div class="text-sm text-white/90">{{ item.label }}</div>
              <div v-if="item.sub" class="mt-1 text-xs text-white/55">
                {{ item.sub }}
              </div>
            </div>

            <div
              v-else-if="item.type === 'tagPreview'"
              class="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-3"
            >
              <span
                class="inline-flex h-5 w-12 rounded-md"
                :style="{ background: item.color }"
              />
              <span class="text-sm text-white/90">{{ item.label }}</span>
            </div>

            <button
              v-else-if="item.type === 'danger'"
              type="button"
              class="w-full rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-3 text-left text-sm font-medium text-red-300 hover:bg-red-500/15"
            >
              {{ item.label }}
            </button>
          </template>
        </div>
      </div>
    </div>

    <div class="mx-2 mt-5 flex gap-2">
      <button
        type="button"
        class="flex-1 rounded-xl bg-[#0c66e4] px-3 py-2.5 text-sm font-medium text-white hover:bg-[#0055cc]"
      >
        Lưu thay đổi
      </button>
      <button
        type="button"
        class="flex-1 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-black/30"
        @click="$emit('back')"
      >
        Quay lại
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { reactive, watch } from "vue";

const props = defineProps({
  screen: {
    type: Object,
    required: true,
  },
});

defineEmits(["back"]);

const toggleState = reactive({});

watch(
  () => props.screen,
  (screen) => {
    Object.keys(toggleState).forEach((key) => delete toggleState[key]);

    (screen?.sections || []).forEach((section) => {
      (section.items || []).forEach((item) => {
        if (item.type === "toggle") {
          toggleState[item.label] = Boolean(item.defaultValue);
        }
      });
    });
  },
  { immediate: true, deep: true }
);
</script>