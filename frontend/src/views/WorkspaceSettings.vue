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

          <router-link
            to="/workspace/members"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#e9ebef]"
          >
            <span class="text-base">◔</span>
            <span class="text-[17px] font-semibold">Thành viên</span>
          </router-link>

          <button
            type="button"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg border border-[#0c66e4] bg-[#dce4f0] text-[#0c66e4]"
          >
            <span class="text-base">⚙</span>
            <span class="text-[17px] font-semibold">Cài đặt</span>
          </button>

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
          <h1 class="text-[42px] font-semibold mb-6">Các cài đặt Không gian làm việc</h1>

          <div class="flex items-start gap-4 mb-8">
            <div
              class="w-16 h-16 rounded-md bg-gradient-to-br from-[#8f5fd3] to-[#1669e2] text-white text-5xl font-semibold flex items-center justify-center"
            >
              T
            </div>

            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-[42px] font-semibold leading-none">
                  Trello Không gian làm việc
                </h2>
                <button
                  type="button"
                  class="p-1 rounded hover:bg-[#e9ebef]"
                  aria-label="Sửa tên"
                >
                  <svg
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 20H8L18 10L14 6L4 16V20Z"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.5 7.5L16.5 11.5"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div class="mt-1 flex items-center gap-1.5 text-[16px] text-[#44546f]">
                <svg
                  class="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect
                    x="6"
                    y="10"
                    width="12"
                    height="9"
                    rx="2"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                  <path
                    d="M8.5 10V8C8.5 6.067 10.067 4.5 12 4.5C13.933 4.5 15.5 6.067 15.5 8V10"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
                <span>Riêng tư</span>
              </div>
            </div>
          </div>

          <section class="border-b border-[#d0d4db] pb-6 mb-8">
            <h3 class="text-[36px] font-semibold mb-4">Khả năng hiển thị trong Không gian làm việc</h3>
            <div class="flex items-start justify-between gap-6">
              <p class="text-[16px] leading-[1.4]">
                <span class="text-[#c9372c]">🔒</span>
                <span class="ml-1 font-medium">Riêng tư</span>
                -
                Đây là Không gian làm việc riêng tư. Chỉ những người trong Không gian làm việc có
                thể truy cập hoặc nhìn thấy Không gian làm việc.
              </p>

              <button
                type="button"
                class="h-10 shrink-0 px-4 rounded-md bg-[#dfe1e6] text-[16px] font-semibold hover:bg-[#d0d4db]"
              >
                Thay đổi
              </button>
            </div>
          </section>

          <section>
            <h3 class="text-[36px] font-semibold mb-4">Đang liên kết các Không gian làm việc Slack</h3>
            <div class="flex items-start justify-between gap-6 pt-4 border-t border-[#d0d4db]">
              <div>
                <p class="text-[16px] leading-[1.4]">
                  Liên kết các Không gian làm việc Slack và Trello với nhau để cộng tác trong các dự án
                  Trello từ Slack.
                </p>
                <a href="#" class="inline-block mt-2 text-[16px] text-[#0c66e4] underline">
                  Tìm hiểu thêm.
                </a>
              </div>

              <button
                type="button"
                class="h-10 shrink-0 px-5 rounded-md bg-[#dfe1e6] text-[16px] font-semibold hover:bg-[#d0d4db]"
              >
                Thêm vào Slack
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>
