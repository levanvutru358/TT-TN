<!-- src/components/common/BottomQuickNav.vue -->
<template>
  <div
    class="pointer-events-none fixed left-1/2 bottom-3 md:bottom-4 -translate-x-1/2"
  >
    <div
      class="pointer-events-auto flex items-center gap-0.5 px-1.5 py-1.5 rounded-3xl bg-[#020617] border border-black/70 shadow-[0_4px_14px_rgba(0,0,0,0.6)]"
    >
      <button
        class="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-[#0c66e4] text-xs font-medium text-white hover:bg-[#0855c0]"
        type="button"
      >
        <span class="text-[13px]">✉️</span>
        <span>Hộp thư đến</span>
        <span
          class="absolute left-3 right-3 -bottom-1 h-[2px] bg-[#4c9aff] rounded-full"
        />
      </button>

      <button
        class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-transparent text-xs font-medium text-white/80 hover:bg-white/5"
        type="button"
      >
        <span class="text-[13px]">📅</span>
        <span>Trình lập kế hoạch</span>
      </button>

      <button
        class="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-[#0c66e4] text-xs font-medium text-white hover:bg-[#0855c0]"
        type="button"
      >
        <span class="text-[13px]">▦</span>
        <span>Bảng thông tin</span>
        <span
          class="absolute left-3 right-3 -bottom-1 h-[2px] bg-[#4c9aff] rounded-full"
        />
      </button>

      <button
        class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-transparent text-xs font-medium text-white/80 hover:bg-white/5"
        type="button"
      >
        <span class="text-[13px]">▤</span>
        <span>Chuyển đổi các bảng</span>
      </button>
    </div>
  </div>
</template>