<template>
  <header
    class="sticky top-0 z-20 h-12 border-b border-[#d0d4db] bg-[#f8f9fb]/95 backdrop-blur"
  >
    <div class="flex h-full items-center gap-3 px-4 lg:px-7">
      <div class="relative">
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-md border border-[#cfd5de] text-[#44546f] hover:bg-[#e9ebef]"
          aria-label="Mở danh sách ứng dụng"
          @click="toggleLauncher"
        >
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="4" y="4" width="6" height="6" rx="1.2" stroke="currentColor" stroke-width="1.7" />
            <rect
              x="14"
              y="4"
              width="6"
              height="6"
              rx="1.2"
              stroke="currentColor"
              stroke-width="1.7"
            />
            <rect
              x="4"
              y="14"
              width="6"
              height="6"
              rx="1.2"
              stroke="currentColor"
              stroke-width="1.7"
            />
            <rect
              x="14"
              y="14"
              width="6"
              height="6"
              rx="1.2"
              stroke="currentColor"
              stroke-width="1.7"
            />
          </svg>
        </button>

        <AppLauncherMenu v-if="isLauncherOpen" />
      </div>

      <router-link
        to="/"
        class="flex min-w-[140px] items-center gap-2 rounded-md px-1 py-1 transition-colors hover:bg-[#e9ebef]"
      >
        <div class="flex h-7 w-7 items-center justify-center rounded-md bg-[#0c66e4] text-white">
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="5" y="4" width="14" height="16" rx="3" fill="currentColor" />
            <rect x="8" y="7" width="3" height="8" rx="1.2" fill="#0C66E4" />
            <rect x="13" y="7" width="3" height="5.5" rx="1.2" fill="#0C66E4" />
          </svg>
        </div>

        <span class="text-[20px] font-semibold leading-none text-[#0747a6]">Trello</span>
      </router-link>

      <div class="max-w-4xl flex-1">
        <label
          class="flex h-9 items-center gap-2 rounded-md border border-[#cfd5de] bg-white px-3 text-[#5e6c84]"
        >
          <svg
            class="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M11 4C14.866 4 18 7.13401 18 11C18 12.7407 17.3641 14.333 16.3124 15.5564L20.3787 19.6228L18.9645 21.037L14.8982 16.9706C13.6748 18.0224 12.0825 18.6583 10.3418 18.6583C6.4758 18.6583 3.3418 15.5243 3.3418 11.6583C3.3418 7.79231 6.4758 4.65831 10.3418 4.65831C10.5617 4.65831 10.7815 4.66965 11 4.69218V4Z"
              fill="currentColor"
            />
          </svg>

          <input
            :value="modelValue"
            type="text"
            :placeholder="searchPlaceholder"
            class="w-full bg-transparent text-xs text-[#172b4d] placeholder:text-[#5e6c84] outline-none"
            @input="$emit('update:modelValue', $event.target.value)"
          />
        </label>
      </div>

      <button
        v-if="showCreateButton"
        type="button"
        class="h-8 rounded-md bg-[#0c66e4] px-3.5 text-xs font-semibold text-white hover:bg-[#0055cc]"
        @click="handleCreateClick"
      >
        {{ createButtonText }}
      </button>

      <div class="ml-auto hidden items-center gap-1 text-[#44546f] md:flex">
        <div class="relative z-40">
        <button
          type="button"
          @click="toggleBroadcastMenu"
          class="flex h-7 w-7 items-center justify-center rounded-md border transition-colors"
          :class="
            showBroadcastMenu
              ? 'border-[#0c66e4] bg-white text-[#0c66e4]'
              : 'border-transparent hover:bg-[#e9ebef]'
          "
          aria-label="Thông báo cập nhật"
        >
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5 14H8L13 18V6L8 10H5V14Z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"
            />
            <path
              d="M16 9C17.3 10 18 11 18 12C18 13 17.3 14 16 15"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </button>

          <div
            v-if="showBroadcastMenu"
            class="absolute right-0 top-11 z-50 w-[280px] max-w-[calc(100vw-1rem)] overflow-hidden rounded-[10px] border border-[#d0d4db] bg-white p-2 shadow-[0_12px_24px_rgba(9,30,66,0.18)]"
          >
            <button
              type="button"
              class="flex w-full items-center rounded-[7px] bg-white px-3.5 py-3.5 text-left text-[15px] font-normal leading-6 text-[#172b4d] transition-colors hover:bg-[#f1f2f4] active:bg-[#f1f2f4]"
            >
              Chia sẻ cảm nghĩ của bạn về Trello
            </button>
          </div>
        </div>

        <div class="relative z-40">
          <button
            type="button"
            class="flex h-7 w-7 items-center justify-center rounded-md border transition-colors"
            :class="
              showNotificationMenu
                ? 'border-[#0c66e4] bg-white text-[#0c66e4]'
                : 'border-transparent hover:bg-[#e9ebef]'
            "
            aria-label="Thông báo"
            @click="toggleNotificationMenu"
          >
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12 20C13.1 20 14 19.1 14 18H10C10 19.1 10.9 20 12 20Z" fill="currentColor" />
              <path
                d="M6 16H18L16.5 14V10.5C16.5 8 14.7 6 12 6C9.3 6 7.5 8 7.5 10.5V14L6 16Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <div
            v-if="showNotificationMenu"
            class="absolute right-0 top-11 z-50 w-[400px] max-w-[calc(100vw-1rem)] overflow-hidden rounded-[12px] border border-[#d0d4db] bg-white shadow-[0_12px_24px_rgba(9,30,66,0.18)]"
          >
            <div class="flex items-center justify-between gap-2 px-4 py-4">
              <h2 class="text-[18px] font-semibold text-[#172b4d]">Thông báo</h2>

              <div class="flex items-center gap-2">
                <span class="text-[12px] text-[#626f86]">Chỉ hiển thị chưa đọc</span>

                <button
                  type="button"
                  class="relative inline-flex h-[18px] w-[32px] items-center rounded-full transition-colors"
                  :class="notificationUnreadOnly ? 'bg-[#5f8f1f]' : 'bg-[#8590a2]'"
                  :aria-pressed="notificationUnreadOnly"
                  @click="notificationUnreadOnly = !notificationUnreadOnly"
                >
                  <span
                    v-if="notificationUnreadOnly"
                    class="absolute left-[5px] text-[9px] font-semibold leading-none text-white"
                  >
                    ✓
                  </span>
                  <span
                    class="inline-block h-[14px] w-[14px] rounded-full bg-white transition-transform"
                    :class="notificationUnreadOnly ? 'translate-x-[16px]' : 'translate-x-[2px]'"
                  ></span>
                </button>

                <button
                  type="button"
                  class="flex h-6 w-6 items-center justify-center rounded-full text-[#44546f] hover:bg-[#f1f2f4]"
                  aria-label="Thêm tùy chọn thông báo"
                >
                  <svg
                    class="h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="5" r="1.8" />
                    <circle cx="12" cy="12" r="1.8" />
                    <circle cx="12" cy="19" r="1.8" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="border-t border-[#dfe1e6]"></div>

            <div class="flex min-h-[270px] flex-col items-center justify-center px-5 py-7 text-center">
              <div class="relative mb-5 flex h-[126px] w-[126px] items-center justify-center">
                <div class="absolute inset-[10px] rounded-full bg-[#f3eafb]"></div>
                <span class="absolute left-[24px] top-[18px] text-[16px] text-[#d3b1ef]">✦</span>
                <span class="absolute left-[40px] top-[38px] text-[12px] text-[#d3b1ef]">✦</span>
                <span class="absolute right-[33px] top-[32px] text-[11px] text-[#d3b1ef]">✦</span>
                <span class="absolute left-[22px] top-[60px] text-[12px] text-[#d3b1ef]">✦</span>

                <svg
                  class="relative h-[98px] w-[98px]"
                  viewBox="0 0 160 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M39 78C39 54.8 57.8 36 81 36C104.2 36 123 54.8 123 78V98C123 121.2 104.2 140 81 140C57.8 140 39 121.2 39 98V78Z"
                    fill="#8C9CAA"
                  />
                  <path d="M54 70L63 34L86 55L100 31L111 70" fill="#8C9CAA" />
                  <path
                    d="M64 43L81 58L91 46L98 56L101 36L111 70H49L58 37L64 43Z"
                    fill="#EEF2F6"
                  />
                  <ellipse cx="81" cy="93" rx="36" ry="29" fill="#FDFDFE" />
                  <ellipse cx="66.5" cy="85.5" rx="6.5" ry="8.5" fill="#FDFDFE" />
                  <ellipse cx="95.5" cy="85.5" rx="6.5" ry="8.5" fill="#FDFDFE" />
                  <path
                    d="M66 94C68.8 94 71 91.8 71 89"
                    stroke="#1D2125"
                    stroke-width="2.2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M91 89C91 91.8 93.2 94 96 94"
                    stroke="#1D2125"
                    stroke-width="2.2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M76 108C79.8 111.2 84.2 111.2 88 108"
                    stroke="#1D2125"
                    stroke-width="2.4"
                    stroke-linecap="round"
                  />
                  <path d="M80.5 97L75.8 102.8H85.2L80.5 97Z" fill="#1D2125" />
                  <path
                    d="M47 111C57.5 123.5 71.6 130 89.5 130C102.5 130 112.6 126.4 120 119V124.5C111.3 134.1 99.4 139 84.5 139C66.5 139 53.4 132.9 45 120.7L47 111Z"
                    fill="#8C9CAA"
                  />
                  <path
                    d="M42 106C48.5 107 55.5 113.1 60 120.5L43.5 129L33.5 115L42 106Z"
                    fill="#1473E6"
                  />
                </svg>
              </div>

              <p class="text-[16px] font-medium text-[#253858]">Không có Thông báo chưa đọc</p>
            </div>
          </div>
        </div>

        <div class="relative z-40">
        <button
          type="button"
          @click="toggleHelpMenu"
          class="relative flex h-7 w-7 items-center justify-center rounded-md border transition-colors"
          :class="
            showHelpMenu
              ? 'border-[#0c66e4] bg-white text-[#0c66e4]'
              : 'border-transparent hover:bg-[#e9ebef]'
          "
          aria-label="Trợ giúp"
        >
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8" />
            <path
              d="M9.8 9.3C10 8.3 10.9 7.6 12 7.6C13.2 7.6 14.2 8.5 14.2 9.7C14.2 10.7 13.6 11.2 12.8 11.7C12.1 12.1 11.6 12.5 11.6 13.4V13.8"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
            <circle cx="12" cy="16.8" r="1" fill="currentColor" />
          </svg>
        </button>

          <div
            v-if="showHelpMenu"
            class="absolute right-0 top-11 z-50 w-[336px] max-w-[calc(100vw-1rem)] overflow-hidden rounded-[12px] border border-[#d0d4db] bg-white px-6 py-5 shadow-[0_12px_24px_rgba(9,30,66,0.18)]"
          >
            <h2 class="text-[16px] font-semibold leading-7 text-[#172b4d]">
              Khám phá những điểm mới trên Trello
            </h2>
            <p class="mt-3 text-[14px] leading-6 text-[#44546f]">
              Tận dụng Trello hiệu quả hơn nhờ các tính năng mới nhất.
            </p>
            <button
              type="button"
              class="mt-4 flex h-10 w-full items-center justify-center rounded-[6px] bg-[#0c66e4] px-4 text-[14px] font-semibold text-white transition-colors hover:bg-[#0055cc]"
            >
              Xem bản cập nhật
            </button>
          </div>
        </div>

        <div class="relative z-40 ml-1">
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-md border transition-colors"
            :class="
              showAccountMenu
                ? 'border-[#0c66e4] bg-white'
                : 'border-transparent hover:bg-[#e9ebef]'
            "
            aria-label="Mở menu tài khoản"
            @click="toggleAccountMenu"
          >
            <div
              class="flex h-7 w-7 items-center justify-center rounded-full bg-[#de350b] text-[10px] font-bold text-white"
            >
              LT
            </div>
          </button>

          <div
            v-if="showAccountMenu"
            class="absolute right-0 top-11 z-50 max-h-[calc(100vh-4rem)] w-[320px] overflow-y-auto overscroll-contain rounded-[14px] border border-[#d0d4db] bg-white px-5 py-5 shadow-[0_8px_24px_rgba(9,30,66,0.25)]"
          >
            <p class="text-[12px] font-semibold text-[#626f86]">TÀI KHOẢN</p>

            <div class="mt-4 flex items-center gap-3">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-full bg-[#de350b] text-[22px] font-semibold text-white"
              >
                LT
              </div>

              <div>
                <p class="text-[14px] leading-none text-[#172b4d]">Lê văn vũ trụ</p>
                <p class="mt-1 text-[13px] leading-none text-[#626f86]">letru7@gmail.com</p>
              </div>
            </div>

            <button type="button" class="mt-5 block text-[14px] text-[#172b4d] hover:underline">
              Chuyển đổi Tài khoản
            </button>

            <router-link
              :to="{ name: 'TrelloAccountProfile' }"
              class="mt-4 flex w-full items-center justify-between text-[14px] text-[#172b4d] hover:underline"
              @click="closeFloatingMenus"
            >
              <span>Quản lý tài khoản</span>
              <svg
                class="h-4 w-4 text-[#44546f]"
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
            </router-link>

            <div class="my-5 border-t border-[#d0d4db]" />

            <p class="text-[12px] font-semibold text-[#626f86]">TRELLO</p>

            <div class="mt-4 space-y-4 text-[14px] text-[#172b4d]">
              <router-link
                v-for="item in accountLinks"
                :key="item.label"
                :to="item.to"
                class="block hover:underline"
                @click="closeFloatingMenus"
              >
                {{ item.label }}
              </router-link>

              <button
                type="button"
                class="flex w-full items-center justify-between text-left hover:underline"
              >
                <span>Chủ đề</span>
                <svg
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M10 6L16 12L10 18"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div class="my-5 border-t border-[#d0d4db]" />

            <button
              type="button"
              class="flex items-center gap-3 text-[14px] text-[#172b4d] hover:underline"
            >
              <svg
                class="h-[18px] w-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="8" cy="8.5" r="2.5" stroke="currentColor" stroke-width="1.8" />
                <circle cx="16" cy="8.5" r="2.5" stroke="currentColor" stroke-width="1.8" />
                <path
                  d="M3.5 18C3.5 15.8 5.3 14 7.5 14H8.5C10.7 14 12.5 15.8 12.5 18"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
                <path
                  d="M11.5 18C11.5 15.8 13.3 14 15.5 14H16.5C18.7 14 20.5 15.8 20.5 18"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
              <span>Tạo Không gian làm việc</span>
            </button>

            <div class="my-5 border-t border-[#d0d4db]" />

            <button type="button" class="block text-[14px] text-[#172b4d] hover:underline">
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="showAccountMenu || showBroadcastMenu || showNotificationMenu || showHelpMenu"
      type="button"
      class="fixed inset-0 z-30 cursor-default"
      aria-label="Đóng menu"
      @click="closeFloatingMenus"
    />
  </header>
</template>

<script setup>
import { ref } from "vue";
import AppLauncherMenu from "@/components/common/AppLauncherMenu.vue";

defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  searchPlaceholder: {
    type: String,
    default: "Tìm kiếm",
  },
  showCreateButton: {
    type: Boolean,
    default: true,
  },
  createButtonText: {
    type: String,
    default: "Tạo mới",
  },
});

const emit = defineEmits(["update:modelValue", "create-click"]);

const isLauncherOpen = ref(false);
const showAccountMenu = ref(false);
const showBroadcastMenu = ref(false);
const showNotificationMenu = ref(false);
const showHelpMenu = ref(false);
const notificationUnreadOnly = ref(true);

const accountLinks = [
  { label: "Hồ sơ và Hiển thị", to: { name: "PersonalProfile" } },
  { label: "Hoạt động", to: { name: "PersonalActivity" } },
  { label: "Thẻ", to: { name: "WorkspaceCards" } },
  { label: "Cài đặt", to: { name: "PersonalSettings" } },
];

const toggleLauncher = () => {
  isLauncherOpen.value = !isLauncherOpen.value;
  if (isLauncherOpen.value) {
    showAccountMenu.value = false;
    showBroadcastMenu.value = false;
    showNotificationMenu.value = false;
    showHelpMenu.value = false;
  }
};

const toggleAccountMenu = () => {
  showAccountMenu.value = !showAccountMenu.value;
  if (showAccountMenu.value) {
    isLauncherOpen.value = false;
    showBroadcastMenu.value = false;
    showNotificationMenu.value = false;
    showHelpMenu.value = false;
  }
};

const toggleBroadcastMenu = () => {
  showBroadcastMenu.value = !showBroadcastMenu.value;
  if (showBroadcastMenu.value) {
    isLauncherOpen.value = false;
    showAccountMenu.value = false;
    showNotificationMenu.value = false;
    showHelpMenu.value = false;
  }
};

const toggleNotificationMenu = () => {
  showNotificationMenu.value = !showNotificationMenu.value;
  if (showNotificationMenu.value) {
    isLauncherOpen.value = false;
    showAccountMenu.value = false;
    showBroadcastMenu.value = false;
    showHelpMenu.value = false;
  }
};

const toggleHelpMenu = () => {
  showHelpMenu.value = !showHelpMenu.value;
  if (showHelpMenu.value) {
    isLauncherOpen.value = false;
    showAccountMenu.value = false;
    showBroadcastMenu.value = false;
    showNotificationMenu.value = false;
  }
};

const closeFloatingMenus = () => {
  showAccountMenu.value = false;
  showBroadcastMenu.value = false;
  showNotificationMenu.value = false;
  showHelpMenu.value = false;
};

const handleCreateClick = (event) => {
  const anchorRect = event.currentTarget?.getBoundingClientRect?.();
  emit("create-click", {
    source: "header",
    anchorRect,
  });
};
</script>
