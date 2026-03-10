<template>
  <Teleport to="body">
    <div class="fixed inset-x-0 bottom-4 z-[9999] flex justify-center pointer-events-none">
      <div
        class="pointer-events-auto flex items-center gap-0.5 px-1.5 py-1.5 rounded-3xl bg-[#020617] border border-black/70 shadow-[0_4px_14px_rgba(0,0,0,0.6)]"
      >
        <button
          v-for="item in navItems"
          :key="item.key"
          class="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-medium transition-colors duration-200"
          :class="
            modelValue === item.key
              ? 'bg-[#0c66e4] text-white hover:bg-[#0855c0]'
              : 'bg-transparent text-white/80 hover:bg-white/10 hover:text-white'
          "
          type="button"
          @click="handleClickTab(item.key)"
        >
          <span class="text-[13px]">{{ item.icon }}</span>
          <span>{{ item.label }}</span>

          <span
            v-if="modelValue === item.key"
            class="absolute left-3 right-3 -bottom-1 h-[2px] bg-[#4c9aff] rounded-full"
          />
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "board",
  },
});

const emit = defineEmits(["update:modelValue"]);

const navItems = [
  { key: "inbox", label: "Hộp thư đến", icon: "✉️" },
  { key: "planner", label: "Trình lập kế hoạch", icon: "📅" },
  { key: "board", label: "Bảng thông tin", icon: "▦" },
  { key: "switch", label: "Chuyển đổi các bảng", icon: "▤" },
];

function handleClickTab(itemKey) {
  if (itemKey === "switch" && props.modelValue === "switch") {
    emit("update:modelValue", "board");
    return;
  }

  emit("update:modelValue", itemKey);
}
</script>