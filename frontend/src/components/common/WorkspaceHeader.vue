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
        <button
          type="button"
          class="flex h-7 w-7 items-center justify-center rounded-md hover:bg-[#e9ebef]"
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

        <button
          type="button"
          class="flex h-7 w-7 items-center justify-center rounded-md hover:bg-[#e9ebef]"
          aria-label="Thông báo"
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

        <button
          type="button"
          class="relative flex h-7 w-7 items-center justify-center rounded-md hover:bg-[#e9ebef]"
          aria-label="Trợ giúp"
        >
          <span
            class="absolute right-[3px] top-[3px] h-2.5 w-2.5 rounded-full bg-[#8f5fd3] ring-2 ring-[#f8f9fb]"
          />
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

            <button
              type="button"
              class="mt-4 flex w-full items-center justify-between text-[14px] text-[#172b4d] hover:underline"
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
            </button>

            <div class="my-5 border-t border-[#d0d4db]" />

            <p class="text-[12px] font-semibold text-[#626f86]">TRELLO</p>

            <div class="mt-4 space-y-4 text-[14px] text-[#172b4d]">
              <router-link
                v-for="item in accountLinks"
                :key="item.label"
                :to="item.to"
                class="block hover:underline"
                @click="closeAccountMenu"
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
      v-if="showAccountMenu"
      type="button"
      class="fixed inset-0 z-30 cursor-default"
      aria-label="Đóng menu tài khoản"
      @click="closeAccountMenu"
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
  }
};

const toggleAccountMenu = () => {
  showAccountMenu.value = !showAccountMenu.value;
  if (showAccountMenu.value) {
    isLauncherOpen.value = false;
  }
};

const closeAccountMenu = () => {
  showAccountMenu.value = false;
};

const handleCreateClick = (event) => {
  const anchorRect = event.currentTarget?.getBoundingClientRect?.();
  emit("create-click", {
    source: "header",
    anchorRect,
  });
};
</script>
