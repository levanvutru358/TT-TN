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

        <h2 class="text-[38px] font-semibold mb-6">Cài đặt cá nhân</h2>

        <div class="space-y-1">
          <button
            type="button"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-[#e9ebef]"
          >
            <svg
              class="w-5 h-5 text-[#2c2f36]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" />
              <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.8" />
              <path
                d="M7.5 18C8.2 16.1 10 14.8 12 14.8C14 14.8 15.8 16.1 16.5 18"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
            <span class="text-[17px] font-semibold">Hồ sơ và hiển thị</span>
          </button>

          <button
            type="button"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-[#e9ebef]"
          >
            <svg
              class="w-5 h-5 text-[#2c2f36]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 8H18M6 12H14M6 16H18"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
              <circle cx="16.5" cy="12" r="1.5" fill="currentColor" />
            </svg>
            <span class="text-[17px] font-semibold">Hoạt động</span>
          </button>

          <button
            type="button"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg border border-[#0c66e4] bg-[#dce4f0] text-[#0c66e4]"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="4.5"
                y="7"
                width="15"
                height="10"
                rx="2"
                stroke="currentColor"
                stroke-width="1.8"
              />
              <path d="M9 7V17" stroke="currentColor" stroke-width="1.8" />
            </svg>
            <span class="text-[17px] font-semibold">Thẻ</span>
          </button>

          <button
            type="button"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-[#e9ebef]"
          >
            <svg
              class="w-5 h-5 text-[#2c2f36]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 8.5V6M12 18V15.5M8.5 12H6M18 12H15.5M9.2 9.2L7.4 7.4M16.6 16.6L14.8 14.8M14.8 9.2L16.6 7.4M7.4 16.6L9.2 14.8"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              />
              <circle cx="12" cy="12" r="2.8" stroke="currentColor" stroke-width="1.8" />
            </svg>
            <span class="text-[17px] font-semibold">Cài đặt</span>
          </button>
        </div>

        <div class="border-t border-[#d0d4db] mt-8 pt-7">
          <h3 class="text-[38px] font-semibold mb-3">Không gian làm việc</h3>

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
            <svg
              class="w-5 h-5 text-[#2c2f36]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="4.5"
                y="4.5"
                width="15"
                height="15"
                rx="2"
                stroke="currentColor"
                stroke-width="1.8"
              />
              <path d="M10 4.5V19.5" stroke="currentColor" stroke-width="1.8" />
            </svg>
            <span class="text-[17px] font-semibold">Bảng</span>
          </router-link>

          <router-link
            to="/workspace/members"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#e9ebef]"
          >
            <svg
              class="w-5 h-5 text-[#2c2f36]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="9" cy="8.5" r="3" stroke="currentColor" stroke-width="1.8" />
              <path
                d="M4.5 18C4.5 15.7 6.4 13.8 8.7 13.8H9.3C11.6 13.8 13.5 15.7 13.5 18"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
              <path d="M16 9V15M13 12H19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
            <span class="text-[17px] font-semibold">Thành viên</span>
          </router-link>

          <router-link
            to="/workspace/settings"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#e9ebef]"
          >
            <svg
              class="w-5 h-5 text-[#2c2f36]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 8.5V6M12 18V15.5M8.5 12H6M18 12H15.5M9.2 9.2L7.4 7.4M16.6 16.6L14.8 14.8M14.8 9.2L16.6 7.4M7.4 16.6L9.2 14.8"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              />
              <circle cx="12" cy="12" r="2.8" stroke="currentColor" stroke-width="1.8" />
            </svg>
            <span class="text-[17px] font-semibold">Cài đặt</span>
          </router-link>

          <button
            type="button"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#e9ebef]"
          >
            <svg
              class="w-5 h-5 text-[#2c2f36]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="4.5"
                y="5"
                width="15"
                height="14"
                rx="2"
                stroke="currentColor"
                stroke-width="1.8"
              />
              <path d="M8 9H16M8 13H16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
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

        <div class="max-w-[1380px] pt-8">
          <h1 class="text-[52px] font-semibold mb-10">Thẻ</h1>

          <div class="flex flex-wrap items-center justify-end gap-3 mb-6">
            <button
              type="button"
              class="h-11 px-5 rounded-md border border-[#d0d4db] bg-white text-[16px] hover:bg-[#f7f8fa] flex items-center gap-2"
            >
              <span>Sắp xếp theo ngày đến hạn</span>
              <svg
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              class="h-11 px-5 rounded-md border border-[#d0d4db] bg-[#dfe1e6] text-[16px] hover:bg-[#d0d4db] flex items-center gap-2"
            >
              <svg
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 7H20M7 12H17M10 17H14"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
              <span>Lọc thẻ</span>
            </button>

            <button
              type="button"
              class="h-11 px-5 rounded-md border border-[#d0d4db] bg-[#eef0f3] text-[16px] text-[#6b778c]"
              disabled
            >
              Xóa bộ lọc
            </button>
          </div>

          <div
            class="h-[220px] rounded-lg bg-[#dfe1e6] text-[#44546f] text-[44px] flex items-center justify-center text-center px-8"
          >
            Không nhìn thấy thẻ nào. Bạn phải được thêm vào thẻ để thẻ xuất hiện ở đây.
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
