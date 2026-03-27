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
          <button
            type="button"
            class="flex w-full items-center gap-3 rounded-lg border border-[#0c66e4] bg-[#e9f2ff] px-3 py-2 text-left text-[#0c66e4]"
          >
            <span class="text-[15px] font-semibold">Hồ sơ và hiển thị</span>
          </button>

          <router-link
            to="/personal/activity"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-[#e9ebef]"
          >
            <span class="text-[15px] font-semibold">Hoạt động</span>
          </router-link>

          <router-link
            to="/workspace/cards"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-[#e9ebef]"
          >
            <span class="text-[15px] font-semibold">Thẻ</span>
          </router-link>

          <router-link
            to="/personal/settings"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-[#e9ebef]"
          >
            <span class="text-[15px] font-semibold">Cài đặt</span>
          </router-link>
        </div>

        <div class="mt-7 border-t border-[#d0d4db] pt-6">
          <h3 class="mb-3 text-[20px] font-semibold">Không gian làm việc</h3>

          <router-link
            to="/"
            class="mb-2 flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-[#e9ebef]"
            aria-label="Về trang chủ Trello"
          >
            <div
              class="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#8f5fd3] to-[#1669e2] text-sm font-semibold text-white"
            >
              T
            </div>
            <span class="text-[15px]">Trello Không gian làm việc</span>
          </router-link>

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

      <main class="relative flex-1 overflow-y-auto px-6 py-6 lg:px-8 lg:py-8">
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

        <div class="mx-auto max-w-[920px] pt-6">
          <h1 class="text-[32px] font-semibold leading-none">Hồ sơ và hiển thị</h1>

          <div class="mt-8 h-[128px] overflow-hidden bg-[#f3ebf7]">
            <svg
              class="h-full w-full"
              viewBox="0 0 900 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect width="900" height="200" fill="#f3ebf7" />
              <circle cx="455" cy="155" r="120" fill="#dfc8ee" />
              <rect x="272" y="44" width="42" height="42" rx="4" fill="#1f85d0" />
              <rect x="346" y="18" width="42" height="42" rx="4" fill="#ef70bf" />
              <rect x="575" y="18" width="42" height="42" rx="4" fill="#b662d6" />
              <rect x="648" y="42" width="42" height="42" rx="4" fill="#61b345" />
              <path d="M409 90L441 34L452 82L409 90Z" fill="#e8edf0" stroke="#7a8c99" stroke-width="6" />
              <path d="M499 90L467 34L456 82L499 90Z" fill="#e8edf0" stroke="#7a8c99" stroke-width="6" />
              <path
                d="M407 91C418 60 440 41 454 41C468 41 490 60 501 91L521 183H387L407 91Z"
                fill="#8d9ca7"
              />
              <path
                d="M418 93C426 72 442 57 454 57C466 57 482 72 490 93L503 176H405L418 93Z"
                fill="#f7f7f7"
              />
              <path d="M430 105L408 73L425 77L437 95L430 105Z" fill="#8d9ca7" />
              <path d="M478 105L500 73L483 77L471 95L478 105Z" fill="#8d9ca7" />
              <ellipse cx="430" cy="112" rx="10" ry="13" fill="#8d9ca7" />
              <ellipse cx="478" cy="112" rx="10" ry="13" fill="#8d9ca7" />
              <ellipse cx="430" cy="114" rx="5" ry="6" fill="#172b4d" />
              <ellipse cx="478" cy="114" rx="5" ry="6" fill="#172b4d" />
              <path d="M446 128L454 136L462 128" stroke="#172b4d" stroke-width="4" stroke-linecap="round" />
              <path d="M438 142C444 149 451 151 454 151C457 151 464 149 470 142" stroke="#172b4d" stroke-width="4" stroke-linecap="round" />
              <path d="M425 134C432 141 438 145 442 147" stroke="#d3d9de" stroke-width="6" stroke-linecap="round" />
              <path d="M483 134C476 141 470 145 466 147" stroke="#d3d9de" stroke-width="6" stroke-linecap="round" />
              <circle cx="293" cy="65" r="11" stroke="#0f5fa8" stroke-width="4" />
              <path d="M281 65H305M293 53V77" stroke="#0f5fa8" stroke-width="4" stroke-linecap="round" />
              <path d="M364 39H381M372 31V47" stroke="#d64a9d" stroke-width="4" stroke-linecap="round" />
              <circle cx="669" cy="63" r="11" stroke="#397e2b" stroke-width="4" />
              <path d="M657 63H681M669 51V75" stroke="#397e2b" stroke-width="4" stroke-linecap="round" />
              <rect x="586" y="31" width="20" height="14" rx="3" stroke="#8e41ad" stroke-width="4" />
              <path d="M590 30V24C590 19.5817 593.582 16 598 16C602.418 16 606 19.5817 606 24V30" stroke="#8e41ad" stroke-width="4" stroke-linecap="round" />
            </svg>
          </div>

          <section class="mt-10">
            <h2 class="text-[28px] font-semibold">Quản lý thông tin cá nhân của bạn</h2>

            <div class="mt-4 bg-[#eef0f3] px-5 py-5 text-[15px] leading-[1.55] text-[#44546f]">
              <p>
                Đây là tài khoản Atlassian. Chỉnh sửa thông tin cá nhân và cài đặt hiển thị của bạn
                thông qua
                <a href="#" class="text-[#0c66e4] underline">Hồ sơ Atlassian.</a>
              </p>
              <p class="mt-5">
                Để tìm hiểu thêm, vui lòng xem
                <a href="#" class="text-[#0c66e4] underline">Điều khoản dịch vụ</a>
                hoặc
                <a href="#" class="text-[#0c66e4] underline">Chính sách Riêng tư.</a>
              </p>
            </div>
          </section>

          <div class="mt-7 border-t border-[#dfe1e6]" />

          <section class="mt-10 pb-10">
            <h2 class="text-[26px] font-semibold">Về chúng tôi</h2>
            <p class="mt-3 text-[15px] leading-[1.55]">
              Các trường bắt buộc được đánh dấu bằng dấu hoa thị
              <span class="text-[#c9372c]">*</span>
            </p>

            <label class="mt-8 block">
              <span class="text-[16px] font-semibold">
                Tên người dùng <span class="text-[#c9372c]">*</span>
              </span>
              <input
                v-model="username"
                type="text"
                class="mt-2.5 h-10 w-full rounded-md border border-[#9fadbc] bg-white px-3 text-[16px] outline-none"
              />
            </label>

            <div class="mt-3 flex items-start gap-2 text-[15px] leading-[1.45] text-[#44546f]">
              <svg
                class="mt-0.5 h-[18px] w-[18px] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8" />
                <path
                  d="M4 12H20M12 4C14.8 6.4 16.2 9.2 16.2 12C16.2 14.8 14.8 17.6 12 20M12 4C9.2 6.4 7.8 9.2 7.8 12C7.8 14.8 9.2 17.6 12 20"
                  stroke="currentColor"
                  stroke-width="1.4"
                />
              </svg>
              <p>
                <span class="font-semibold text-[#172b4d]">Luôn công khai.</span>
                Hiển thị cho bất kỳ ai trên Internet, bao gồm cả những người tìm thấy bạn thông qua
                các công cụ tìm kiếm như Google.
              </p>
            </div>

            <label class="mt-10 block">
              <span class="text-[16px] font-semibold">Lý lịch</span>
              <textarea
                v-model="bio"
                rows="4"
                class="mt-2.5 w-full rounded-md border border-[#9fadbc] bg-white px-3 py-3 text-[16px] outline-none"
              />
            </label>

            <div class="mt-3 flex items-start gap-2 text-[15px] leading-[1.45] text-[#44546f]">
              <svg
                class="mt-0.5 h-[18px] w-[18px] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8" />
                <path
                  d="M4 12H20M12 4C14.8 6.4 16.2 9.2 16.2 12C16.2 14.8 14.8 17.6 12 20M12 4C9.2 6.4 7.8 9.2 7.8 12C7.8 14.8 9.2 17.6 12 20"
                  stroke="currentColor"
                  stroke-width="1.4"
                />
              </svg>
              <p>
                <span class="font-semibold text-[#172b4d]">Luôn công khai.</span>
                Hiển thị cho bất kỳ ai trên Internet, bao gồm cả những người tìm thấy bạn thông qua
                các công cụ tìm kiếm như Google.
              </p>
            </div>

            <div class="mt-12 flex justify-end">
              <button
                type="button"
                class="inline-flex h-10 items-center rounded-md bg-[#0c66e4] px-6 text-[16px] font-semibold text-white hover:bg-[#0055cc]"
              >
                Lưu
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useResponsiveSidebarCollapse } from "@/composables/useResponsiveSidebarCollapse.js";

const isSidebarCollapsed = ref(false);
useResponsiveSidebarCollapse(isSidebarCollapsed);
const username = ref("39levanvutr");
const bio = ref("");
</script>
