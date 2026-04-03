<template>
  <section class="mb-10">
    <div class="flex items-center gap-3 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M8 6h13" />
        <path d="M8 12h13" />
        <path d="M8 18h13" />
        <path d="M3 6h.01" />
        <path d="M3 12h.01" />
        <path d="M3 18h.01" />
      </svg>
      <h3 class="text-[30px] font-semibold text-white leading-none">Mô tả</h3>
    </div>

    <textarea
      :value="modelValue"
      class="w-full min-h-[140px] rounded-lg bg-transparent border border-white/30 px-4 py-4 text-white placeholder:text-white/45 outline-none resize-none"
      placeholder="Thêm mô tả chi tiết hơn..."
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </section>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: "" },
});

defineEmits(["update:modelValue"]);
</script>