<template>
  <div class="rounded-xl bg-[#2b3138] border border-white/10 shadow-2xl p-4">
    <div class="flex items-center justify-between mb-4">
      <div class="text-white font-semibold">{{ title }}</div>
      <button
        class="w-8 h-8 rounded-lg hover:bg-white/10 text-white/80"
        @click="$emit('close')"
      >
        ✕
      </button>
    </div>

    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});

defineEmits(["close"]);
</script>