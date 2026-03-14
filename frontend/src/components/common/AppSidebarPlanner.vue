<template>
  <aside
    class="hidden sm:flex w-80 bg-[#111827] border-r border-black/60 px-3 py-3"
  >
    <div
      class="flex-1 rounded-3xl bg-gradient-to-b from-[#1e293b] via-[#1f3b5b] to-[#0f172a] px-4 pt-4 pb-3 flex flex-col shadow-lg text-white"
    >
      <div class="flex items-center gap-2 mb-5">
        <div
          class="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center"
        >
          <span class="text-sm">📅</span>
        </div>
        <h2 class="text-sm font-semibold">Trình lập kế hoạch</h2>
      </div>

      <div class="space-y-4 text-sm">
        <div class="rounded-2xl bg-black/30 p-3">
          <div class="text-xs text-white/60 mb-1">Hôm nay</div>
          <div class="font-medium">3 công việc cần xử lý</div>
        </div>

        <div class="rounded-2xl bg-black/30 p-3">
          <div class="text-xs text-white/60 mb-1">Sắp tới</div>
          <div class="font-medium">2 deadline trong tuần này</div>
        </div>

        <div class="rounded-2xl bg-black/30 p-3">
          <div class="text-xs text-white/60 mb-1">Lịch gần nhất</div>
          <div class="font-medium">Thiết kế UI board mới</div>
          <div class="text-xs text-white/60 mt-1">10:00 AM - Thứ 2</div>
        </div>
      </div>

      <div class="mt-auto pt-4">
        <button
          class="w-full text-left px-3 py-2 rounded-xl bg-black/40 text-gray-100 hover:bg-black/55 transition-colors"
        >
          Mở lịch đầy đủ
        </button>
      </div>
    </div>
  </aside>
</template>