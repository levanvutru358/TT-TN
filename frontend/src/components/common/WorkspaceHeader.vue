<template>
  <header
    class="sticky top-0 z-20 h-12 border-b border-[#d0d4db] bg-[#f8f9fb]/95 backdrop-blur"
  >
    <div class="h-full flex items-center gap-3 px-4 lg:px-7">
      <div class="relative">
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-md border border-[#cfd5de] text-[#44546f] hover:bg-[#e9ebef]"
          aria-label="Mở danh sách ứng dụng"
          @click="isLauncherOpen = !isLauncherOpen"
        >
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              x="4"
              y="4"
              width="6"
              height="6"
              rx="1.2"
              stroke="currentColor"
              stroke-width="1.7"
            />
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
        class="flex items-center gap-2 min-w-[140px] rounded-md px-1 py-1 hover:bg-[#e9ebef] transition-colors"
      >
        <div
          class="flex h-7 w-7 items-center justify-center rounded-md bg-[#0c66e4] text-white"
        >
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

        <span class="text-[20px] leading-none text-[#0747a6] font-semibold">
          Trello
        </span>
      </router-link>

      <div class="flex-1 max-w-4xl">
        <label
          class="h-9 px-3 rounded-md border border-[#cfd5de] bg-white flex items-center gap-2 text-[#5e6c84]"
        >
          <svg
            class="w-3.5 h-3.5"
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
        class="h-8 px-3.5 rounded-md bg-[#0c66e4] text-white text-xs font-semibold hover:bg-[#0055cc]"
        @click="$emit('create-click')"
      >
        {{ createButtonText }}
      </button>

      <div class="hidden md:flex items-center gap-1 text-[#44546f] ml-auto">
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
          aria-label="Chuông"
        >
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 20C13.1 20 14 19.1 14 18H10C10 19.1 10.9 20 12 20Z"
              fill="currentColor"
            />
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
          class="flex h-7 w-7 items-center justify-center rounded-md hover:bg-[#e9ebef]"
          aria-label="Trợ giúp"
        >
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="8"
              stroke="currentColor"
              stroke-width="1.8"
            />
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
          class="ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#1D4ED8] text-[10px] font-bold text-white"
        >
          TV
        </div>
      </div>
    </div>
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

defineEmits(["update:modelValue", "create-click"]);

const isLauncherOpen = ref(false);
</script>