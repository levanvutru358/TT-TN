<template>
  <div class="min-h-screen bg-[#f1f2f4] text-[#172b4d]">
    <div class="flex min-h-screen">
      <aside
        class="relative w-[340px] shrink-0 border-r border-[#d0d4db] bg-[#f5f6f8] px-10 py-12"
      >
        <button
          type="button"
          class="absolute right-[-15px] top-20 w-8 h-8 rounded-full bg-[#dfe1e6] text-[#2c2f36] flex items-center justify-center"
          aria-label="Thu gọn"
        >
          <svg
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M14 6L8 12L14 18"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <h2 class="text-[30px] font-semibold mb-6">Cài đặt cá nhân</h2>

        <div class="space-y-1">
          <button
            type="button"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-[#e9ebef]"
          >
            <span class="text-base">◎</span>
            <span class="text-[17px] font-semibold">Hồ sơ và hiển thị</span>
          </button>
          <button
            type="button"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-[#e9ebef]"
          >
            <span class="text-base">☰</span>
            <span class="text-[17px] font-semibold">Hoạt động</span>
          </button>
          <router-link
            to="/workspace/cards"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-[#e9ebef]"
          >
            <span class="text-base">▭</span>
            <span class="text-[17px] font-semibold">Thẻ</span>
          </router-link>
          <button
            type="button"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-[#e9ebef]"
          >
            <span class="text-base">⚙</span>
            <span class="text-[17px] font-semibold">Cài đặt</span>
          </button>
        </div>

        <div class="border-t border-[#d0d4db] mt-8 pt-7">
          <h3 class="text-[30px] font-semibold mb-3">Không gian làm việc</h3>

          <div class="flex items-center gap-3 px-2 py-2 mb-2">
            <div
              class="w-8 h-8 rounded-md bg-gradient-to-br from-[#8f5fd3] to-[#1669e2] text-white text-base font-semibold flex items-center justify-center"
            >
              T
            </div>
            <span class="text-[17px]">Trello Không gian làm việc</span>
          </div>

          <button
            type="button"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg border border-[#0c66e4] bg-[#dce4f0] text-[#0c66e4]"
          >
            <span class="text-base">▣</span>
            <span class="text-[17px] font-semibold">Bảng</span>
          </button>

          <router-link
            to="/workspace/members"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#e9ebef]"
          >
            <span class="text-base">◔</span>
            <span class="text-[17px] font-semibold">Thành viên</span>
          </router-link>

          <router-link
            to="/workspace/settings"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#e9ebef]"
          >
            <span class="text-base">⚙</span>
            <span class="text-[17px] font-semibold">Cài đặt</span>
          </router-link>

          <button
            type="button"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#e9ebef]"
          >
            <span class="text-base">◫</span>
            <span class="text-[17px] font-semibold">Nâng cấp Không gian làm việc</span>
          </button>
        </div>
      </aside>

      <main class="relative flex-1 px-14 py-12">
        <router-link
          to="/"
          class="absolute top-5 right-5 w-14 h-14 rounded-full bg-[#dfe1e6] text-[#2c2f36] flex items-center justify-center hover:bg-[#d0d4db]"
          aria-label="Đóng"
        >
          <svg
            class="w-7 h-7"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </router-link>

        <div class="max-w-[1380px]">
          <h1 class="text-[42px] font-semibold mb-6">Bảng</h1>

          <div class="grid grid-cols-1 xl:grid-cols-12 gap-4 items-end mb-10">
            <div class="xl:col-span-3">
              <label class="block text-[16px] font-semibold mb-1">Sắp xếp theo</label>
              <div
                class="h-11 rounded-md border border-[#9fadbc] bg-white px-3 flex items-center justify-between"
              >
                <span class="text-[16px]">Hoạt động gần đây n...</span>
                <span class="text-[18px] text-[#44546f]">⌄</span>
              </div>
            </div>

            <div class="xl:col-span-3">
              <label class="block text-[16px] font-semibold mb-1">Lọc theo</label>
              <div
                class="h-11 rounded-md border border-[#9fadbc] bg-white px-3 flex items-center justify-between"
              >
                <span class="text-[16px] text-[#7a869a]">Chọn bộ sưu tập</span>
                <span class="text-[18px] text-[#44546f]">⌄</span>
              </div>
            </div>

            <div class="xl:col-span-3 xl:col-start-10">
              <label class="block text-[16px] font-semibold mb-1">Tìm kiếm</label>
              <div class="h-11 rounded-md border border-[#9fadbc] bg-white px-3 flex items-center gap-3">
                <span class="text-[18px] text-[#44546f]">⌕</span>
                <input
                  type="text"
                  placeholder="Tìm kiếm các bảng"
                  class="w-full bg-transparent text-[16px] placeholder:text-[#7a869a] outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            class="w-[330px] h-[140px] rounded-xl border border-[#c4c9d1] bg-[#dfe1e6] text-[36px] text-[#44546f] hover:bg-[#d4d9e1] transition-colors"
          >
            Tạo bảng mới
          </button>
        </div>
      </main>
    </div>
  </div>
</template>
