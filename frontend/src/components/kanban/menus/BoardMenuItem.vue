<template>
  <button
    type="button"
    class="w-full text-left px-2 py-2 rounded-xl hover:bg-white/5 transition flex items-center gap-3"
  >
    <span
      class="w-9 h-9 rounded-xl bg-black/25 border border-white/10 flex items-center justify-center text-white/80"
      v-html="svg"
      aria-hidden="true"
    />
    <span class="min-w-0">
      <span class="block text-sm text-white/85" :class="active ? 'font-semibold' : ''">
        {{ label }}
      </span>
      <span v-if="sub" class="block text-xs text-white/55 truncate">{{ sub }}</span>
    </span>
  </button>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  sub: { type: String, default: "" },
  svg: { type: String, default: "" },
  active: { type: Boolean, default: false },
});
</script>

