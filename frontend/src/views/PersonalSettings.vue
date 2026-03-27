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
            <span class="text-[15px] font-semibold">Hồ sơ và hiển thị</span>
          </router-link>

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

          <button
            type="button"
            class="flex w-full items-center gap-3 rounded-lg border border-[#0c66e4] bg-[#dce4f0] px-3 py-2 text-[#0c66e4]"
          >
            <span class="text-[15px] font-semibold">Cài đặt</span>
          </button>
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

      <main class="relative flex-1 px-6 py-6 lg:px-8 lg:py-8">
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
          <h1 class="text-[28px] font-semibold">Cài đặt</h1>

          <div class="mt-5 space-y-10">
            <section class="rounded-md bg-[#deebff] px-5 py-4">
              <div class="flex items-start gap-4">
                <svg
                  class="mt-0.5 h-5 w-5 shrink-0 text-[#1d7afc]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" fill="currentColor" />
                  <path d="M12 10V17" stroke="white" stroke-width="2" stroke-linecap="round" />
                  <circle cx="12" cy="7" r="1.3" fill="white" />
                </svg>

                <div>
                  <p class="text-[16px] font-semibold">
                    Một số cài đặt chỉ có thể được thay đổi từ tài khoản Atlassian của bạn.
                  </p>
                  <a href="#" class="mt-2 inline-block text-[15px] text-[#0c66e4] underline">
                    Đi đến tài khoản Atlassian của bạn
                  </a>
                </div>
              </div>
            </section>

            <section>
              <h2 class="text-[22px] font-semibold">Ngôn ngữ và khu vực</h2>
              <button type="button" class="mt-4 inline-flex items-center gap-2 rounded-md bg-[#ebeef2] px-4 py-2.5 text-[15px] font-medium hover:bg-[#dfe3e8]">
                <span>Thay đổi ngôn ngữ</span>
                <svg
                  class="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M14 5H19V10M19 5L11 13"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 7H7C5.89543 7 5 7.89543 5 9V17C5 18.1046 5.89543 19 7 19H15C16.1046 19 17 18.1046 17 17V14"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </section>

            <section>
              <h2 class="text-[22px] font-semibold">Thông báo bằng email</h2>

              <div class="mt-5">
                <h3 class="text-[16px] font-semibold">Tần suất</h3>
                <p class="mt-3 max-w-[920px] text-[15px] leading-[1.55] text-[#44546f]">
                  Thông báo qua email có thể được gửi ‘Ngay lập tức’ (ngay khi chúng xuất hiện) hoặc
                  ‘Định kỳ’ (hàng giờ). Nếu bạn muốn từ chối tất cả các email thông báo, hãy đặt tần
                  suất là ‘Không bao giờ’.
                </p>

                <div class="mt-5 space-y-2.5">
                  <label
                    v-for="option in emailFrequencyOptions"
                    :key="option.id"
                    class="flex cursor-pointer items-center gap-3 text-[16px]"
                  >
                    <input
                      v-model="emailFrequency"
                      :value="option.id"
                      type="radio"
                      class="h-5 w-5 accent-[#0c66e4]"
                    />
                    <span>{{ option.label }}</span>
                  </label>
                </div>
              </div>

              <div class="mt-9">
                <h3 class="text-[16px] font-semibold">Tùy chọn thông báo qua email</h3>
                <p class="mt-3 max-w-[920px] text-[15px] leading-[1.55] text-[#44546f]">
                  Những tùy chọn này chỉ áp dụng cho thông báo qua email về các bảng, danh sách và thẻ
                  bạn đang theo dõi. Chọn những thông báo bạn muốn nhận qua email.
                </p>
                <p class="mt-4 max-w-[920px] text-[15px] leading-[1.55] text-[#44546f]">
                  Bạn sẽ luôn nhận được email về lời mời, lượt nhắc đến trực tiếp, khi bạn được thêm
                  vào thẻ và
                  <a href="#" class="text-[#0c66e4] underline">hơn thế nữa.</a>
                </p>
              </div>

              <div class="mt-8">
                <h4 class="text-[16px] font-semibold">Thông báo</h4>

                <div class="mt-5 space-y-5">
                  <label class="flex cursor-pointer items-start gap-4">
                    <input
                      v-model="allNotificationsSelected"
                      type="checkbox"
                      class="mt-1 h-5 w-5 accent-[#0c66e4]"
                    />
                    <span class="text-[16px] font-medium">Chọn Tất cả</span>
                  </label>

                  <label
                    v-for="item in notificationOptions"
                    :key="item.id"
                    class="flex cursor-pointer items-start gap-4"
                  >
                    <input
                      v-model="item.checked"
                      type="checkbox"
                      class="mt-1 h-5 w-5 accent-[#0c66e4]"
                    />
                    <div>
                      <p class="text-[16px] font-medium">{{ item.label }}</p>
                      <p class="mt-1 text-[15px] leading-[1.5] text-[#626f86]">
                        {{ item.description }}
                      </p>
                    </div>
                  </label>
                </div>

                <button
                  type="button"
                  class="mt-9 inline-flex items-center rounded-md bg-[#ebeef2] px-4 py-2.5 text-[15px] font-medium hover:bg-[#dfe3e8]"
                >
                  Cho phép thông báo trên Desktop
                </button>
              </div>
            </section>

            <section>
              <h2 class="text-[22px] font-semibold">Gợi ý</h2>
              <p class="mt-3 max-w-[920px] text-[15px] leading-[1.55] text-[#44546f]">
                Trong khi sử dụng Trello, bạn sẽ nhận được các đề xuất về thao tác bạn thường xuyên
                thực hiện hoặc đã thực hiện gần đây. Ví dụ: khi thêm nhãn hoặc di chuyển thẻ.
              </p>
              <button
                type="button"
                class="mt-4 inline-flex items-center rounded-md bg-[#ebeef2] px-4 py-2.5 text-[15px] font-medium hover:bg-[#dfe3e8]"
              >
                Tắt gợi ý
              </button>
            </section>

            <section>
              <h2 class="text-[22px] font-semibold">Email Marketing</h2>
              <button type="button" class="mt-4 inline-flex items-center gap-2 rounded-md bg-[#ebeef2] px-4 py-2.5 text-[15px] font-medium hover:bg-[#dfe3e8]">
                <span>Quản lý cấu hình email</span>
                <svg
                  class="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M14 5H19V10M19 5L11 13"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 7H7C5.89543 7 5 7.89543 5 9V17C5 18.1046 5.89543 19 7 19H15C16.1046 19 17 18.1046 17 17V14"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </section>

            <section>
              <h2 class="text-[22px] font-semibold">Tùy chọn cookie</h2>
              <button
                type="button"
                class="mt-4 inline-flex items-center rounded-md bg-[#ebeef2] px-4 py-2.5 text-[15px] font-medium hover:bg-[#dfe3e8]"
              >
                Quản lý tùy chọn cookie
              </button>
            </section>

            <section>
              <h2 class="text-[22px] font-semibold">Quyền truy cập</h2>

              <div class="mt-5">
                <h3 class="text-[16px] font-semibold">Chế độ thân thiện với người mù màu</h3>
                <p class="mt-3 max-w-[920px] text-[15px] leading-[1.55] text-[#44546f]">
                  Bật chế độ thân thiện với người mù màu sẽ thêm biểu tượng vào toàn bộ nhãn ở tất cả
                  các bảng trong tài khoản Trello của bạn, giúp người dùng thấy được sự khác biệt giữa
                  các nhãn mà không cần dùng đến màu sắc.
                </p>

                <p class="mt-6 text-[16px] font-medium">Bật chế độ thân thiện với người mù màu</p>
                <button
                  type="button"
                  class="relative mt-4 flex h-8 w-14 items-center rounded-full transition-colors"
                  :class="colorBlindFriendly ? 'bg-[#6b8f1a]' : 'bg-[#2c2f36]'"
                  @click="colorBlindFriendly = !colorBlindFriendly"
                >
                  <span
                    class="absolute top-1 h-6 w-6 rounded-full bg-white transition-transform"
                    :class="colorBlindFriendly ? 'translate-x-7' : 'translate-x-1'"
                  />
                  <span
                    v-if="!colorBlindFriendly"
                    class="absolute right-2 text-[14px] font-semibold text-white"
                  >
                    ×
                  </span>
                  <span v-else class="absolute left-2 text-[13px] font-semibold text-white">✓</span>
                </button>
              </div>

              <div class="mt-8">
                <h3 class="text-[16px] font-semibold">Phím tắt</h3>
                <p class="mt-6 text-[16px] font-medium">Bật phím tắt</p>
                <button
                  type="button"
                  class="relative mt-4 flex h-8 w-14 items-center rounded-full transition-colors"
                  :class="shortcutsEnabled ? 'bg-[#6b8f1a]' : 'bg-[#2c2f36]'"
                  @click="shortcutsEnabled = !shortcutsEnabled"
                >
                  <span
                    class="absolute top-1 h-6 w-6 rounded-full bg-white transition-transform"
                    :class="shortcutsEnabled ? 'translate-x-7' : 'translate-x-1'"
                  />
                  <span
                    v-if="!shortcutsEnabled"
                    class="absolute right-2 text-[14px] font-semibold text-white"
                  >
                    ×
                  </span>
                  <span v-else class="absolute left-2 text-[13px] font-semibold text-white">✓</span>
                </button>
              </div>
            </section>

            <section>
              <h2 class="text-[22px] font-semibold">Ứng dụng</h2>
              <p class="mt-3 text-[15px] leading-[1.55] text-[#44546f]">
                Chưa có ứng dụng nào đang sử dụng tài khoản Trello của bạn.
              </p>
            </section>

            <section>
              <h2 class="text-[22px] font-semibold">Phiên làm việc</h2>
              <p class="mt-3 text-[15px] leading-[1.55] text-[#44546f]">
                Đăng xuất khỏi một hoặc tất cả các thiết bị khác của bạn.
              </p>
              <button type="button" class="mt-4 inline-flex items-center gap-2 rounded-md bg-[#ebeef2] px-4 py-2.5 text-[15px] font-medium hover:bg-[#dfe3e8]">
                <span>Quản lý các thiết bị hiện tại của bạn</span>
                <svg
                  class="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M14 5H19V10M19 5L11 13"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 7H7C5.89543 7 5 7.89543 5 9V17C5 18.1046 5.89543 19 7 19H15C16.1046 19 17 18.1046 17 17V14"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
              </button>

              <div class="mt-5">
                <h3 class="text-[16px] font-semibold">Xác minh hai bước</h3>
                <p class="mt-3 text-[15px] leading-[1.55] text-[#44546f]">
                  Giữ tài khoản của bạn an toàn hơn với bước đăng nhập thứ hai.
                  <a href="#" class="text-[#0c66e4] underline">Tìm hiểu thêm</a>
                </p>
                <button type="button" class="mt-4 inline-flex items-center gap-2 rounded-md bg-[#ebeef2] px-4 py-2.5 text-[15px] font-medium hover:bg-[#dfe3e8]">
                  <span>Cấu hình xác thực hai bước</span>
                  <svg
                    class="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M14 5H19V10M19 5L11 13"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10 7H7C5.89543 7 5 7.89543 5 9V17C5 18.1046 5.89543 19 7 19H15C16.1046 19 17 18.1046 17 17V14"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>
            </section>

            <section>
              <h2 class="text-[22px] font-semibold">Xuất Dữ liệu cá nhân</h2>
              <p class="mt-3 max-w-[920px] text-[15px] leading-[1.55] text-[#44546f]">
                Tải xuống tệp .json chứa thông tin cá nhân của bạn được lưu trữ trong Trello. Trong đó
                sẽ có thông tin đăng nhập, cài đặt, thông tin tài khoản trả phí, dữ liệu hồ sơ, cùng
                với cài đặt bảng và Không gian làm việc.
              </p>
              <button type="button" class="mt-4 inline-flex items-center gap-2 rounded-md bg-[#ebeef2] px-4 py-2.5 text-[15px] font-medium hover:bg-[#dfe3e8]">
                <svg
                  class="h-[18px] w-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12 4V14M12 14L8 10M12 14L16 10"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 16V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V16"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
                <span>Tải xuống dữ liệu cá nhân</span>
              </button>
            </section>

            <section>
              <h2 class="text-[22px] font-semibold">Trello Hỗ trợ</h2>
              <p class="mt-3 max-w-[920px] text-[15px] leading-[1.55] text-[#44546f]">
                Trello Hỗ trợ có thể yêu cầu bạn tải xuống gói hỗ trợ bằng cách nhấp vào nút bên dưới.
                Thao tác này sẽ tạo ra một tệp .zip chứa thông tin chẩn đoán về phiên hiện tại của bạn.
              </p>

              <div class="mt-5 rounded-md bg-[#fff3d3] px-5 py-4">
                <div class="flex items-start gap-4">
                  <svg
                    class="mt-0.5 h-5 w-5 shrink-0 text-[#e26b00]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M10.268 3.932C11.037 2.6 12.963 2.6 13.732 3.932L21.196 16.868C21.965 18.2 21.002 19.865 19.464 19.865H4.536C2.998 19.865 2.035 18.2 2.804 16.868L10.268 3.932Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 8V12.5"
                      stroke="white"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    />
                    <circle cx="12" cy="15.7" r="1.2" fill="white" />
                  </svg>

                  <p class="text-[15px] leading-[1.55]">
                    Tệp .zip này có thể bao gồm thông tin cá nhân hoặc thông tin nhạy cảm. Chỉ chia sẻ
                    tệp này với Trello Hỗ trợ.
                  </p>
                </div>
              </div>

              <button type="button" class="mt-5 inline-flex items-center gap-2 rounded-md bg-[#ebeef2] px-4 py-2.5 text-[15px] font-medium hover:bg-[#dfe3e8]">
                <svg
                  class="h-[18px] w-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12 4V14M12 14L8 10M12 14L16 10"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 16V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V16"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
                <span>Tải xuống gói hỗ trợ</span>
              </button>
            </section>

            <section class="pb-8">
              <h2 class="text-[22px] font-semibold">Tài khoản</h2>
              <div class="mt-5 flex flex-wrap items-center gap-4">
                <button type="button" class="inline-flex items-center gap-2 rounded-md bg-[#ebeef2] px-4 py-2.5 text-[15px] font-medium hover:bg-[#dfe3e8]">
                  <span>Quản lý hoặc xóa Tài khoản Atlassian của bạn.</span>
                  <svg
                    class="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M14 5H19V10M19 5L11 13"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10 7H7C5.89543 7 5 7.89543 5 9V17C5 18.1046 5.89543 19 7 19H15C16.1046 19 17 18.1046 17 17V14"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
                <a href="#" class="text-[15px] text-[#0c66e4] underline">Chính sách Riêng tư</a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useResponsiveSidebarCollapse } from "@/composables/useResponsiveSidebarCollapse.js";

const isSidebarCollapsed = ref(false);
useResponsiveSidebarCollapse(isSidebarCollapsed);
const emailFrequency = ref("scheduled");

const emailFrequencyOptions = [
  { id: "never", label: "Không bao giờ" },
  { id: "scheduled", label: "Định kỳ" },
  { id: "instant", label: "Ngay lập tức" },
];

const notificationOptions = ref([
  {
    id: "comments",
    label: "Bình luận",
    description: "Bình luận mới được thêm vào các thẻ bạn đang theo dõi",
    checked: true,
  },
  {
    id: "dueDates",
    label: "Ngày hết hạn",
    description: "Các ngày hết hạn được thêm, thay đổi hoặc sắp đến trên thẻ bạn đang theo dõi",
    checked: true,
  },
  {
    id: "removedFromCard",
    label: "Bạn đã bị xóa khỏi thẻ",
    description: "Ai đó xóa bạn khỏi tư cách thành viên khỏi thẻ",
    checked: true,
  },
  {
    id: "attachments",
    label: "Các tệp đính kèm đã được thêm",
    description: "Tệp hoặc liên kết được thêm vào các thẻ bạn đang theo dõi",
    checked: true,
  },
  {
    id: "createdCards",
    label: "Các thẻ đã được tạo",
    description: "Các thẻ mới được tạo trên các bảng bạn đang theo dõi",
    checked: true,
  },
  {
    id: "deletedCards",
    label: "Các thẻ đã xóa",
    description: "Các thẻ bạn đang theo dõi được di chuyển giữa các danh sách hoặc bảng",
    checked: true,
  },
  {
    id: "savedCards",
    label: "Các thẻ đã lưu",
    description: "Các thẻ bạn đang theo dõi được lưu trữ (hoặc bỏ lưu trữ)",
    checked: true,
  },
]);

const allNotificationsSelected = computed({
  get: () => notificationOptions.value.every((item) => item.checked),
  set: (value) => {
    notificationOptions.value.forEach((item) => {
      item.checked = value;
    });
  },
});

const colorBlindFriendly = ref(false);
const shortcutsEnabled = ref(true);
</script>
