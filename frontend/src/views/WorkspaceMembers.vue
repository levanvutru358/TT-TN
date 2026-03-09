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

          <router-link
            to="/workspace/boards"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#e9ebef]"
          >
            <span class="text-base">▣</span>
            <span class="text-[17px] font-semibold">Bảng</span>
          </router-link>

          <button
            type="button"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg border border-[#0c66e4] bg-[#dce4f0] text-[#0c66e4]"
          >
            <span class="text-base">◔</span>
            <span class="text-[17px] font-semibold">Thành viên</span>
          </button>

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
          to="/workspace/boards"
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
          <div class="flex items-center gap-3 mb-5">
            <h1 class="text-[42px] font-semibold">Người cộng tác</h1>
            <span class="px-2 py-0.5 rounded-full bg-[#dfe1e6] text-[18px]">1 / 10</span>
          </div>

          <div
            class="relative border border-[#d0d4db] rounded-lg bg-[#f7f8fa] px-6 py-5 mb-6 overflow-hidden"
          >
            <h2 class="text-[34px] font-semibold">Nâng cấp để kiểm soát nhiều quyền hơn</h2>
            <p class="text-[16px] mt-2 text-[#44546f]">
              Quyết định ai có thể gửi lời mời, chỉnh sửa cài đặt Không gian làm việc và hơn
              thế nữa với Premium.
            </p>
            <a href="#" class="inline-block mt-2 text-[16px] underline">
              Dùng thử Premium miễn phí trong 14 ngày
            </a>
            <div
              class="absolute right-4 bottom-3 w-10 h-10 rounded-lg bg-[#8f5fd3] text-white flex items-center justify-center"
            >
              ▣
            </div>
          </div>

          <div class="flex items-center gap-6 border-b border-[#d0d4db]">
            <button
              v-for="tab in memberTabs"
              :key="tab.label"
              type="button"
              class="pb-3 text-[18px]"
              :class="
                tab.active
                  ? 'text-[#0c66e4] border-b-2 border-[#0c66e4] font-semibold'
                  : 'text-[#2c2f36]'
              "
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="py-5 border-b border-[#d0d4db] flex items-start justify-between gap-6">
            <p class="text-[18px] leading-[1.35] max-w-[950px]">
              Các thành viên trong Không gian làm việc có thể xem và tham gia tất cả các bảng
              Không gian làm việc hiển thị và tạo ra các bảng mới trong Không gian làm việc.
            </p>

            <button
              type="button"
              class="h-10 shrink-0 px-5 rounded-md bg-[#0c66e4] text-white text-[16px] font-semibold hover:bg-[#0055cc]"
            >
              Mời các thành viên Không gian làm việc
            </button>
          </div>

          <div class="py-5 border-b border-[#d0d4db]">
            <input
              type="text"
              placeholder="Lọc theo tên"
              class="w-[420px] h-11 rounded-md border border-[#9fadbc] bg-white px-4 text-[16px] placeholder:text-[#7a869a] outline-none"
            />
          </div>

          <div class="py-4 border-b border-[#d0d4db] flex items-center gap-5">
            <div
              class="w-10 h-10 rounded-full bg-[#de350b] text-white text-[18px] font-bold flex items-center justify-center"
            >
              LT
            </div>

            <div class="text-[18px] font-semibold">
              39. Lê văn vũ trụ
              <span class="font-normal text-[#44546f]">@39levanvutr</span>
            </div>

            <div class="ml-auto text-[18px] text-[#2c2f36]">Lần hoạt động gần nhất Feb 2026</div>

            <button
              type="button"
              class="h-12 px-4 rounded-md bg-[#e6e7ea] text-[16px] font-semibold hover:bg-[#d9dbe0]"
            >
              Quản trị viên
            </button>

            <button
              type="button"
              class="h-12 px-6 rounded-md bg-[#e6e7ea] text-[16px] font-semibold hover:bg-[#d9dbe0]"
            >
              Rời đi
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
const memberTabs = [
  { label: "Thành viên (1)", active: true },
  { label: "Khách một bảng thông tin (0)", active: false },
  { label: "Khách đa bảng thông tin (0)", active: false },
  { label: "Yêu cầu tham gia (0)", active: false },
];
</script>
