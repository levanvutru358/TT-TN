<template>
  <div class="min-h-screen bg-[#f1f2f4] text-[#172b4d]">
    <div class="relative flex min-h-screen">
      <button
        type="button"
        class="absolute top-16 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#dfe1e6] text-[#2c2f36] transition-[left] duration-200"
        :class="isSidebarCollapsed ? 'left-3' : 'left-[274px]'"
        :aria-label="isSidebarCollapsed ? 'Mở cài đặt cá nhân' : 'Thu gọn cài đặt cá nhân'"
        @click="isSidebarCollapsed = !isSidebarCollapsed"
      >
        <svg
          class="h-4 w-4 transition-transform duration-200"
          :class="{ 'rotate-180': isSidebarCollapsed }"
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

      <aside
        class="relative shrink-0 overflow-hidden bg-[#f5f6f8] transition-[width,padding,border] duration-200"
        :class="
          isSidebarCollapsed
            ? 'w-0 border-r-0 px-0 py-0 pointer-events-none'
            : 'w-[288px] border-r border-[#d0d4db] px-6 py-8'
        "
      >
        <button
          type="button"
          class="hidden absolute right-[-14px] top-16 flex h-8 w-8 items-center justify-center rounded-full bg-[#dfe1e6] text-[#2c2f36]"
          aria-label="Thu gọn"
        >
          <svg
            class="h-4 w-4"
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

        <h2 class="mb-5 text-[20px] font-semibold">Cài đặt cá nhân</h2>

        <div class="space-y-1">
          <router-link
            to="/personal/profile"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-[#e9ebef]"
          >
            <svg
              class="h-[18px] w-[18px] text-[#2c2f36]"
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
            <span class="text-[15px] font-semibold">Hồ sơ và hiển thị</span>
          </router-link>

          <button
            type="button"
            class="flex w-full items-center gap-3 rounded-lg border border-[#0c66e4] bg-[#e9f2ff] px-3 py-2 text-[#0c66e4]"
          >
            <svg
              class="h-[18px] w-[18px]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M5 12C5 8.13401 8.13401 5 12 5C14.4987 5 16.6916 6.3081 17.9282 8.27641M17.9282 8.27641V5.7M17.9282 8.27641H15.2"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19 12C19 15.866 15.866 19 12 19C9.50127 19 7.30839 17.6919 6.0718 15.7236M6.0718 15.7236V18.3M6.0718 15.7236H8.8"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="text-[15px] font-semibold">Hoạt động</span>
          </button>

          <router-link
            to="/workspace/cards"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-[#e9ebef]"
          >
            <svg
              class="h-[18px] w-[18px] text-[#2c2f36]"
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
            <span class="text-[15px] font-semibold">Thẻ</span>
          </router-link>

          <router-link
            to="/personal/settings"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-[#e9ebef]"
          >
            <svg
              class="h-[18px] w-[18px] text-[#2c2f36]"
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
            <span class="text-[15px] font-semibold">Cài đặt</span>
          </router-link>
        </div>

        <div class="mt-7 border-t border-[#d0d4db] pt-6">
          <h3 class="mb-3 text-[20px] font-semibold">Không gian làm việc</h3>

          <div class="mb-2 flex items-center gap-3 px-2 py-2">
            <div
              class="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#8f5fd3] to-[#1669e2] text-sm font-semibold text-white"
            >
              T
            </div>
            <span class="text-[15px]">Trello Không gian làm việc</span>
          </div>

          <router-link
            to="/workspace/boards"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-[#e9ebef]"
          >
            <svg
              class="h-[18px] w-[18px] text-[#2c2f36]"
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
            <span class="text-[15px] font-semibold">Bảng</span>
          </router-link>

          <router-link
            to="/workspace/members"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-[#e9ebef]"
          >
            <svg
              class="h-[18px] w-[18px] text-[#2c2f36]"
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
              <path
                d="M16 9V15M13 12H19"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
            <span class="text-[15px] font-semibold">Thành viên</span>
          </router-link>

          <router-link
            to="/workspace/settings"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-[#e9ebef]"
          >
            <svg
              class="h-[18px] w-[18px] text-[#2c2f36]"
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
            <span class="text-[15px] font-semibold">Cài đặt</span>
          </router-link>

          <button
            type="button"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-[#e9ebef]"
          >
            <svg
              class="h-[18px] w-[18px] text-[#2c2f36]"
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
              <path
                d="M8 9H16M8 13H16"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
            <span class="text-[15px] font-semibold">Nâng cấp Không gian làm việc</span>
          </button>
        </div>
      </aside>

      <main class="relative flex-1 overflow-hidden px-6 py-6 lg:px-8 lg:py-8">
        <router-link
          to="/workspace/boards"
          class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#dfe1e6] text-[#2c2f36] hover:bg-[#d0d4db]"
          aria-label="Đóng"
        >
          <svg
            class="h-5 w-5"
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

        <div class="max-w-[980px] pt-3">
          <div class="pl-6">
            <h1 class="text-[28px] font-semibold leading-none">Hoạt động</h1>

            <div class="mt-6 flex items-center gap-3">
              <svg
                class="h-6 w-6 text-[#2c2f36]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="8" cy="8.5" r="2.7" stroke="currentColor" stroke-width="1.8" />
                <circle cx="16.5" cy="9.5" r="2.2" stroke="currentColor" stroke-width="1.8" />
                <path
                  d="M3.8 18C3.8 15.5 5.8 13.5 8.3 13.5H10.1C12.6 13.5 14.6 15.5 14.6 18"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
                <path
                  d="M13.8 17.8C14 16.1 15.3 14.9 17 14.9H17.8C19.5 14.9 20.8 16.1 21 17.8"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
              <h2 class="text-[18px] font-semibold">Các Không gian làm việc</h2>
            </div>

            <div class="mt-5 border-b border-[#d0d4db] pb-3 pl-10">
              <div class="flex items-center gap-2 text-[16px]">
                <span>Trello Không gian làm việc</span>
                <svg
                  class="h-4 w-4 text-[#c9372c]"
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
              </div>
            </div>

            <div class="mt-6 flex items-center gap-3">
              <svg
                class="h-6 w-6 text-[#2c2f36]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5 12C5 8.13401 8.13401 5 12 5C14.4987 5 16.6916 6.3081 17.9282 8.27641M17.9282 8.27641V5.7M17.9282 8.27641H15.2"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19 12C19 15.866 15.866 19 12 19C9.50127 19 7.30839 17.6919 6.0718 15.7236M6.0718 15.7236V18.3M6.0718 15.7236H8.8"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h2 class="text-[18px] font-semibold">Hoạt động</h2>
            </div>
          </div>

          <div class="mt-8 max-w-[780px] pl-6">
            <article
              v-for="item in activityItems"
              :key="item.id"
              class="mb-6 flex items-start gap-3"
            >
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e3490b] text-[17px] font-semibold text-white"
              >
                LT
              </div>

              <div>
                <p class="max-w-[720px] text-[16px] leading-[1.45]">
                  <span class="font-semibold">Lê văn vũ trụ</span>

                  <template v-if="item.type === 'create-board'">
                    <span> đã tạo bảng </span>
                    <router-link
                      :to="{
                        path: '/projects/1',
                        query: {
                          title: item.target
                        }
                      }"
                      class="text-[#0c66e4] underline"
                    >
                      {{ item.target }}
                    </router-link>
                  </template>

                  <template v-else>
                    <span> đã thêm danh sách công việc {{ item.listName }} vào thẻ </span>
                    <router-link
                      :to="{
                        path: '/projects/1',
                        query: {
                          title: item.board
                        }
                      }"
                      class="text-[#0c66e4] underline"
                    >
                      {{ item.target }}
                    </router-link>
                  </template>
                </p>

                <div class="mt-1 flex flex-wrap items-center gap-2 text-[14px] text-[#44546f]">
                  <span class="text-[#0c66e4] underline">{{ item.date }}</span>
                  <span>•</span>
                  <span>trên bảng</span>
                  <router-link
                    :to="{
                      path: '/projects/1',
                      query: {
                        title: item.board
                      }
                    }"
                    class="text-[#0c66e4] underline"
                  >
                    {{ item.board }}
                  </router-link>
                  <svg
                    class="h-4 w-4 text-[#c9372c]"
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
                </div>
              </div>
            </article>

            <button
              type="button"
              class="inline-flex items-center rounded-md bg-[#dfe1e6] px-4 py-2.5 text-[15px] font-medium hover:bg-[#d0d4db]"
            >
              Tải thêm hoạt động
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const isSidebarCollapsed = ref(false);

const activityItems = [
  {
    id: 1,
    type: "create-board",
    target: "Bảng Trello của tôi",
    board: "Bảng Trello của tôi",
    date: "19:07 23 thg 2, 2026",
  },
  {
    id: 2,
    type: "add-list",
    listName: "Trình lập kế hoạch",
    target: "Tìm hiểu thông tin cơ bản về Trello",
    board: "Bảng Trello của tôi",
    date: "19:07 23 thg 2, 2026",
  },
  {
    id: 3,
    type: "add-list",
    listName: "Thanh điều hướng",
    target: "Tìm hiểu thông tin cơ bản về Trello",
    board: "Bảng Trello của tôi",
    date: "19:07 23 thg 2, 2026",
  },
  {
    id: 4,
    type: "add-list",
    listName: "Jira",
    target: "Quản lý các dự án của đội ngũ",
    board: "Bảng Trello của tôi",
    date: "19:07 23 thg 2, 2026",
  },
  {
    id: 5,
    type: "add-list",
    listName: "Dùng thử các tính năng mạnh mẽ của Trello",
    target: "Làm việc thông minh hơn",
    board: "Bảng Trello của tôi",
    date: "19:07 23 thg 2, 2026",
  },
];
</script>