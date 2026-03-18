<template>
  <header class="sticky top-0 z-20 border-b border-[#dfe1e6] bg-white">
    <div class="flex h-16 items-center justify-between px-5 lg:px-7">
      <router-link to="/" class="flex shrink-0 items-center gap-2.5">
        <div class="flex h-8 w-8 items-center justify-center rounded-md bg-[#0c66e4] text-white">
          <svg
            class="h-[18px] w-[18px]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="5" y="4" width="14" height="16" rx="3" fill="currentColor" />
            <rect x="8" y="7" width="3" height="8" rx="1.2" fill="#0C66E4" />
            <rect x="13" y="7" width="3" height="5.5" rx="1.2" fill="#0C66E4" />
          </svg>
        </div>
        <span class="text-[18px] font-semibold text-[#172b4d]">Trello</span>
      </router-link>

      <div class="relative z-30">
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full bg-[#de350b] text-[12px] font-bold text-white"
          aria-label="Mở menu tài khoản"
          @click="showAccountMenu = !showAccountMenu"
        >
          LT
        </button>

        <div
          v-if="showAccountMenu"
          class="absolute right-0 top-[calc(100%+10px)] z-40 w-[340px] max-w-[calc(100vw-1rem)] rounded-[10px] border border-[#d0d4db] bg-white p-2.5 shadow-[0_8px_20px_rgba(9,30,66,0.2)]"
        >
          <div class="rounded-[8px] bg-[#f7f8fa] px-5 py-5">
            <div class="flex items-center gap-4">
              <div
                class="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full bg-[#de350b] text-[36px] font-semibold text-white"
              >
                LT
              </div>

              <div class="min-w-0">
                <p class="truncate text-[16px] font-semibold leading-none text-[#172b4d]">
                  Lê văn vũ trụ
                </p>
                <p class="mt-1.5 truncate text-[13px] leading-none text-[#626f86]">letru7@gmail.com</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="mt-2.5 flex w-full items-center gap-3 rounded-[8px] px-3.5 py-2.5 text-left text-[14px] text-[#172b4d] transition-colors hover:bg-[#f7f8fa]"
          >
            <svg
              class="h-5 w-5 text-[#172b4d]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10 7H6.8C5.8 7 5 7.8 5 8.8V17.2C5 18.2 5.8 19 6.8 19H15.2C16.2 19 17 18.2 17 17.2V14"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path d="M12 12H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              <path
                d="M17 9L20 12L17 15"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>

    <button
      v-if="showAccountMenu"
      type="button"
      class="fixed inset-0 z-20 cursor-default"
      aria-label="Đóng menu tài khoản"
      @click="showAccountMenu = false"
    />
  </header>
</template>

<script setup>
import { ref } from "vue";

const showAccountMenu = ref(false);
</script>
