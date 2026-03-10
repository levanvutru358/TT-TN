<template>
  <aside
    class="hidden sm:flex w-80 bg-[#111827] border-r border-black/60 px-3 py-3"
  >
    <div
      class="flex-1 rounded-3xl bg-gradient-to-b from-[#0f3d2e] via-[#124734] to-[#0b2d21] px-4 pt-4 pb-3 flex flex-col shadow-lg text-white"
    >
      <div class="flex items-center gap-2 mb-5">
        <div
          class="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center"
        >
          <span class="text-sm">▦</span>
        </div>
        <h2 class="text-sm font-semibold">Bảng thông tin</h2>
      </div>

      <div class="space-y-3 text-sm">
        <div class="rounded-2xl bg-black/30 p-3">
          <div class="text-xs text-white/60 mb-1">Đã gắn sao</div>
          <div class="font-medium">UI Trello Clone</div>
        </div>

        <div class="rounded-2xl bg-black/30 p-3">
          <div class="text-xs text-white/60 mb-1">Gần đây</div>
          <div class="font-medium">Sprint tuần 2</div>
        </div>

        <div class="rounded-2xl bg-black/30 p-3">
          <div class="text-xs text-white/60 mb-1">Workspace</div>
          <div class="font-medium">My Workspace</div>
        </div>
      </div>

      <div class="mt-auto pt-4">
        <button
          class="w-full text-left px-3 py-2 rounded-xl bg-black/40 text-gray-100 hover:bg-black/55 transition-colors"
        >
          Xem tất cả bảng
        </button>
      </div>
    </div>
  </aside>
</template>