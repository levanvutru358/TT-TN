<!-- src/components/common/AppTopBar.vue -->
<template>
  <div
    class="h-14 px-3 md:px-5 flex items-center justify-between border-b border-black bg-[#020617]"
  >
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-2">
        <div
          class="w-8 h-8 rounded bg-[#0c66e4] flex items-center justify-center"
        >
          <span class="text-xs font-semibold">T</span>
        </div>
        <span class="text-sm font-semibold">Trolleo</span>
      </div>

      <div class="hidden md:flex items-center ml-3">
        <input
          class="w-72 bg-[#1d2125] border border-[#4b5563] rounded px-3 py-1.5 text-xs placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tìm kiếm"
        />
      </div>
    </div>

    <div class="flex items-center gap-3">
      <button
        class="hidden md:inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-[#a855f7] hover:bg-[#9333ea] text-white font-semibold"
        type="button"
      >
        <span aria-hidden="true">✨</span>
        <span>Còn 1 ngày</span>
      </button>

      <button
        class="w-9 h-9 rounded-lg bg-black/20 border border-white/10 hover:bg-black/30 flex items-center justify-center"
        type="button"
        aria-label="Thông báo"
        title="Thông báo"
      >
        📣
      </button>

      <button
        class="w-9 h-9 rounded-lg bg-black/20 border border-white/10 hover:bg-black/30 flex items-center justify-center"
        type="button"
        aria-label="Chuông"
        title="Chuông"
      >
        🔔
      </button>

      <button
        class="w-9 h-9 rounded-lg bg-black/20 border border-white/10 hover:bg-black/30 flex items-center justify-center"
        type="button"
        aria-label="Trợ giúp"
        title="Trợ giúp"
      >
        ?
      </button>

      <button
        class="w-9 h-9 rounded-full bg-white/10 border border-white/10 hover:bg-white/15 flex items-center justify-center text-xs font-semibold"
        type="button"
        aria-label="Tài khoản"
        title="Tài khoản"
      >
        TV
      </button>
    </div>
  </div>
</template>