<!-- src/components/common/AppSidebarInbox.vue -->
<template>
  <aside
    class="hidden sm:flex w-80 bg-[#111827] border-r border-black/60 px-3 py-3"
  >
    <div
      class="flex-1 rounded-3xl bg-gradient-to-b from-[#073b79] via-[#073469] to-[#082b53] px-4 pt-4 pb-3 flex flex-col shadow-lg"
    >
      <div class="flex items-center gap-2 mb-5">
        <div
          class="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center"
        >
          <span class="text-sm">✉️</span>
        </div>
        <h2 class="text-sm font-semibold">Hộp thư đến</h2>
      </div>

      <div class="space-y-3 text-sm">
        <button
          class="w-full text-left px-3 py-2 rounded-xl bg-black/40 text-gray-100 hover:bg-black/55 transition-colors"
        >
          Thêm thẻ
        </button>
        <button
          class="w-full text-left px-3 py-2 rounded-xl bg-black/40 text-gray-100 hover:bg-black/55 transition-colors"
        >
          Bắt đầu sử dụng Trello
        </button>
      </div>

      <div class="mt-auto pt-4">
        <div
          class="rounded-full bg-black/40 px-3 py-1.5 flex items-center gap-2 text-[11px] text-white/90"
        >
          <div
            class="w-5 h-5 rounded-full bg-white flex items-center justify-center overflow-hidden"
          >
            <span class="text-[10px] text-[#0f172a]">G</span>
          </div>
          <span
            class="text-[10px] font-semibold bg-[#0c66e4] text-white px-1.5 py-0.5 rounded"
          >
            MỚI
          </span>
          <span class="truncate">Tổng hợp việc cần làm</span>
          <span class="ml-auto text-[10px]">⌄</span>
        </div>
      </div>
    </div>
  </aside>
</template>