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
        Thay đổi hình nền
      </div>

      <div class="w-9"></div>
    </div>

    <div class="mx-2 mb-4 overflow-hidden rounded-2xl border border-white/10">
      <div class="h-28 w-full" :style="previewStyle"></div>
    </div>

    <div class="mx-2 mb-2 text-[11px] uppercase tracking-wide text-white/40">
      Ảnh nền
    </div>

    <div class="mx-2 grid grid-cols-2 gap-2">
      <button
        v-for="bg in imageOptions"
        :key="bg.id"
        type="button"
        class="overflow-hidden rounded-xl border transition-all"
        :class="
          isActive(bg)
            ? 'border-[#579dff] ring-1 ring-[#579dff]'
            : 'border-white/10 hover:border-white/20'
        "
        @click="$emit('update:modelValue', bg)"
      >
        <div class="h-20 w-full" :style="getOptionStyle(bg)"></div>
      </button>
    </div>

    <div class="mx-2 mb-2 mt-5 text-[11px] uppercase tracking-wide text-white/40">
      Màu sắc
    </div>

    <div class="mx-2 grid grid-cols-4 gap-2">
      <button
        v-for="bg in colorOptions"
        :key="bg.id"
        type="button"
        class="h-14 rounded-xl border transition-all"
        :class="
          isActive(bg)
            ? 'border-[#579dff] ring-1 ring-[#579dff]'
            : 'border-white/10 hover:border-white/20'
        "
        :style="getOptionStyle(bg)"
        @click="$emit('update:modelValue', bg)"
      />
    </div>

    <div class="mx-2 mt-5 flex gap-2">
      <button
        type="button"
        class="flex-1 rounded-xl bg-[#0c66e4] px-3 py-2.5 text-sm font-medium text-white hover:bg-[#0055cc]"
        @click="$emit('save')"
      >
        Áp dụng
      </button>
      <button
        type="button"
        class="flex-1 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-black/30"
        @click="$emit('reset')"
      >
        Mặc định
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      type: "color",
      value: "linear-gradient(135deg,#4b3f72,#7b3ea8,#c1558b)",
    }),
  },
  imageOptions: {
    type: Array,
    default: () => [],
  },
  colorOptions: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["update:modelValue", "back", "save", "reset"]);

const previewStyle = computed(() => getOptionStyle(props.modelValue));

function isActive(option) {
  return (
    props.modelValue?.type === option?.type &&
    props.modelValue?.value === option?.value
  );
}

function getOptionStyle(option) {
  if (!option) return {};

  if (option.type === "image") {
    return {
      backgroundImage: `linear-gradient(rgba(0,0,0,.20), rgba(0,0,0,.35)), url('${option.value}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  }

  return {
    background: option.value,
  };
}
</script>