<template>
  <header
    :style="headerThemeStyle"
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
        <div class="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--workspace-accent)] text-white">
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="5" y="4" width="14" height="16" rx="3" fill="currentColor" />
            <rect x="8" y="7" width="3" height="8" rx="1.2" fill="var(--workspace-accent)" />
            <rect x="13" y="7" width="3" height="5.5" rx="1.2" fill="var(--workspace-accent)" />
          </svg>
        </div>

        <span class="text-[20px] font-semibold leading-none text-[var(--workspace-brand-text)]">Trello</span>
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
        class="h-8 rounded-md bg-[var(--workspace-accent)] px-3.5 text-xs font-semibold text-white hover:bg-[var(--workspace-accent-hover)]"
        @click="handleCreateClick"
      >
        {{ createButtonText }}
      </button>

      <div class="ml-auto flex items-center gap-1 text-[#44546f]">
        <div class="relative z-40 hidden md:block">
        <button
          type="button"
          @click="toggleBroadcastMenu"
          class="flex h-7 w-7 items-center justify-center rounded-md border transition-colors"
          :class="
            showBroadcastMenu
              ? 'border-[var(--workspace-accent)] bg-white text-[var(--workspace-accent)]'
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

        <div class="relative z-40 hidden md:block">
          <button
            type="button"
            class="flex h-7 w-7 items-center justify-center rounded-md border transition-colors"
            :class="
              showNotificationMenu
                ? 'border-[var(--workspace-accent)] bg-white text-[var(--workspace-accent)]'
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

        <div class="relative z-40 hidden md:block">
        <button
          type="button"
          @click="toggleHelpMenu"
          class="relative flex h-7 w-7 items-center justify-center rounded-md border transition-colors"
          :class="
            showHelpMenu
              ? 'border-[var(--workspace-accent)] bg-white text-[var(--workspace-accent)]'
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
              class="mt-4 flex h-10 w-full items-center justify-center rounded-[6px] bg-[var(--workspace-accent)] px-4 text-[14px] font-semibold text-white transition-colors hover:bg-[var(--workspace-accent-hover)]"
            >
              Xem bản cập nhật
            </button>
          </div>
        </div>

        <div ref="accountMenuAnchor" class="relative z-40 ml-1">
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-md border transition-colors"
            :class="
              showAccountMenu
                ? 'border-[var(--workspace-accent)] bg-white'
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
            v-if="showAccountMenu && showThemeMenu"
            class="absolute z-[60] w-[292px] max-w-[calc(100vw-1rem)] overflow-hidden rounded-[14px] border border-[#d0d4db] bg-white py-2 shadow-[0_12px_24px_rgba(9,30,66,0.18)]"
            :style="themeMenuStyle"
          >
            <button
              v-for="option in themeOptions"
              :key="option.id"
              type="button"
              class="relative flex w-full items-center gap-4 px-5 py-3 text-left transition-colors"
              :class="
                currentTheme === option.id
                  ? 'bg-[var(--workspace-accent-subtle)] text-[var(--workspace-accent)]'
                  : 'text-[#172b4d] hover:bg-[#f1f2f4]'
              "
              @click="selectTheme(option.id)"
            >
              <span
                v-if="currentTheme === option.id"
                class="absolute inset-y-0 left-0 w-[3px] bg-[var(--workspace-accent)]"
              ></span>

              <span
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border bg-white"
                :class="currentTheme === option.id ? 'border-[var(--workspace-accent)]' : 'border-[#c7ced8]'"
              >
                <span
                  v-if="currentTheme === option.id"
                  class="h-[10px] w-[10px] rounded-full bg-[var(--workspace-accent)]"
                ></span>
              </span>

              <div
                class="relative h-[60px] w-[76px] shrink-0 overflow-hidden rounded-[12px] border"
                :class="
                  option.id === 'dark'
                    ? 'border-[#1d2125] bg-[#1d2125]'
                    : 'border-[#d0d4db] bg-[#f7f8f9]'
                "
              >
                <template v-if="option.id === 'light'">
                  <div class="absolute inset-x-0 top-0 h-[16px] bg-white"></div>
                  <div class="absolute left-[8px] top-[6px] h-[4px] w-[16px] rounded-full bg-[#d7dde6]"></div>
                  <div class="absolute left-[7px] top-[21px] h-[30px] w-[14px] rounded-[5px] bg-[#d6dbe4]"></div>
                  <div class="absolute left-[25px] top-[21px] h-[26px] w-[11px] rounded-[5px] bg-[#d6dbe4]"></div>
                  <div class="absolute left-[40px] top-[21px] h-[22px] w-[11px] rounded-[5px] bg-[#d6dbe4]"></div>
                  <div class="absolute left-[55px] top-[21px] h-[28px] w-[12px] rounded-[5px] bg-[#d6dbe4]"></div>
                </template>

                <template v-else-if="option.id === 'dark'">
                  <div class="absolute inset-x-0 top-0 h-[16px] bg-[#2c333a]"></div>
                  <div class="absolute left-[8px] top-[6px] h-[4px] w-[16px] rounded-full bg-[#778496]"></div>
                  <div class="absolute left-[7px] top-[21px] h-[30px] w-[14px] rounded-[5px] bg-[#5b6676]"></div>
                  <div class="absolute left-[25px] top-[21px] h-[26px] w-[11px] rounded-[5px] bg-[#4f5968]"></div>
                  <div class="absolute left-[40px] top-[21px] h-[22px] w-[11px] rounded-[5px] bg-[#45505f]"></div>
                  <div class="absolute left-[55px] top-[21px] h-[28px] w-[12px] rounded-[5px] bg-[#6d798a]"></div>
                </template>

                <template v-else>
                  <div class="absolute inset-y-0 left-0 w-1/2 bg-[#f7f8f9]"></div>
                  <div class="absolute inset-y-0 right-0 w-1/2 bg-[#1d2125]"></div>
                  <div class="absolute left-0 top-0 h-[16px] w-1/2 bg-white"></div>
                  <div class="absolute right-0 top-0 h-[16px] w-1/2 bg-[#2c333a]"></div>
                  <div class="absolute left-[8px] top-[6px] h-[4px] w-[16px] rounded-full bg-[#d7dde6]"></div>
                  <div class="absolute right-[8px] top-[6px] h-[4px] w-[16px] rounded-full bg-[#778496]"></div>
                  <div class="absolute left-[7px] top-[21px] h-[30px] w-[12px] rounded-[5px] bg-[#d6dbe4]"></div>
                  <div class="absolute left-[23px] top-[21px] h-[24px] w-[10px] rounded-[5px] bg-[#d6dbe4]"></div>
                  <div class="absolute right-[22px] top-[21px] h-[24px] w-[10px] rounded-[5px] bg-[#4f5968]"></div>
                  <div class="absolute right-[7px] top-[21px] h-[30px] w-[12px] rounded-[5px] bg-[#6d798a]"></div>
                  <div class="absolute left-[35px] top-[-7px] h-[78px] w-[20px] rotate-[35deg] bg-black/70"></div>
                </template>
              </div>

              <span class="max-w-[108px] text-[15px] leading-6">{{ option.label }}</span>
            </button>

            <div class="mx-5 my-2 border-t border-[#dfe1e6]"></div>

            <div class="px-5 pb-4 pt-2">
              <p class="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#626f86]">
                Mau nhan
              </p>

              <div class="mt-3 grid grid-cols-5 gap-2">
                <button
                  v-for="option in accentOptions"
                  :key="option.id"
                  type="button"
                  class="group flex flex-col items-center gap-2 rounded-[10px] px-2 py-2 transition-colors hover:bg-[#f1f2f4]"
                  :class="currentAccent === option.id ? 'bg-[#f1f5f9]' : ''"
                  :aria-pressed="currentAccent === option.id"
                  :title="option.label"
                  @click="selectAccent(option.id)"
                >
                  <span
                    class="flex h-8 w-8 items-center justify-center rounded-full border-2 text-white"
                    :class="
                      currentAccent === option.id ? 'border-[#172b4d]' : 'border-transparent'
                    "
                    :style="{ backgroundColor: option.accent }"
                  >
                    <svg
                      v-if="currentAccent === option.id"
                      class="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 12.5L10 16.5L18 8.5"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>

                  <span class="text-[11px] font-medium leading-none text-[#44546f]">
                    {{ option.shortLabel }}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div
            v-if="showAccountMenu"
            ref="accountMenuPanel"
            class="absolute right-0 top-11 z-50 max-h-[calc(100vh-4rem)] w-[320px] overflow-y-auto overscroll-contain rounded-[14px] border border-[#d0d4db] bg-white px-5 py-5 shadow-[0_8px_24px_rgba(9,30,66,0.25)]"
            @scroll="handleAccountMenuScroll"
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

            <router-link
              :to="{ name: 'AccountSwitcher' }"
              class="mt-5 block text-[14px] text-[#172b4d] hover:underline"
              @click="closeFloatingMenus"
            >
              Chuyển đổi Tài khoản
            </router-link>

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

              <div ref="themeMenuTrigger">
                <button
                  type="button"
                  class="flex w-full items-center justify-between rounded-[10px] px-4 py-3 text-left transition-colors"
                  :class="
                    showThemeMenu
                      ? 'border border-[var(--workspace-accent)] bg-[var(--workspace-accent-subtle)] text-[var(--workspace-accent)]'
                      : 'text-[#172b4d] hover:bg-[#f1f2f4]'
                  "
                  :aria-expanded="showThemeMenu"
                  @click="toggleThemeMenu"
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
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
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
const showThemeMenu = ref(false);
const notificationUnreadOnly = ref(true);
const currentTheme = ref("system");
const currentAccent = ref("blue");
const accountMenuAnchor = ref(null);
const accountMenuPanel = ref(null);
const themeMenuTrigger = ref(null);
const themeMenuStyle = ref({
  right: "calc(100% + 12px)",
  top: "44px",
});

const accountLinks = [
  { label: "Hồ sơ và Hiển thị", to: { name: "PersonalProfile" } },
  { label: "Hoạt động", to: { name: "PersonalActivity" } },
  { label: "Thẻ", to: { name: "WorkspaceCards" } },
  { label: "Cài đặt", to: { name: "PersonalSettings" } },
];

const themeOptions = [
  { id: "light", label: "Màu sáng" },
  { id: "dark", label: "Tối" },
  { id: "system", label: "Hệ thống so khớp" },
];

const THEME_STORAGE_KEY = "workspace-theme-preference";
const ACCENT_STORAGE_KEY = "workspace-theme-accent";
const accentOptions = [
  {
    id: "blue",
    label: "Xanh duong",
    shortLabel: "Xanh",
    accent: "#0c66e4",
    hover: "#0055cc",
    subtle: "#e9f2ff",
    brandText: "#0747a6",
  },
  {
    id: "green",
    label: "Xanh la",
    shortLabel: "La",
    accent: "#1f845a",
    hover: "#216e4e",
    subtle: "#dcfff1",
    brandText: "#1f6b45",
  },
  {
    id: "orange",
    label: "Cam",
    shortLabel: "Cam",
    accent: "#c25100",
    hover: "#a54800",
    subtle: "#fff3eb",
    brandText: "#943d00",
  },
  {
    id: "rose",
    label: "Hong do",
    shortLabel: "Hong",
    accent: "#c9372c",
    hover: "#ae2e24",
    subtle: "#ffeceb",
    brandText: "#9f251c",
  },
  {
    id: "violet",
    label: "Tim",
    shortLabel: "Tim",
    accent: "#6e5dc6",
    hover: "#5e4db2",
    subtle: "#f3f0ff",
    brandText: "#5b4ab1",
  },
];
let systemThemeMediaQuery;

const resolveTheme = (theme) => {
  if (theme !== "system" || typeof window === "undefined") {
    return theme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const resolveAccent = (accentId) => {
  return accentOptions.find((option) => option.id === accentId) || accentOptions[0];
};

const hexToRgba = (hex, alpha) => {
  const normalized = hex.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  const value = Number.parseInt(expanded, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

const buildThemeTokens = (accent, resolvedTheme) => {
  const isDark = resolvedTheme === "dark";
  const subtle = isDark ? "rgba(255, 255, 255, 0.06)" : accent.subtle;
  const brandText = isDark ? "#f1f5f9" : accent.brandText;
  const pageBg = isDark
    ? "linear-gradient(180deg, #0f1215 0%, #15191d 18%, #1b2025 42%, #0f1215 100%)"
    : "linear-gradient(180deg, #ffffff 0%, #f8f9fb 18%, #f1f2f4 42%, #f1f2f4 100%)";
  const badgeGradient = isDark
    ? `linear-gradient(135deg, ${accent.hover} 0%, ${accent.accent} 100%)`
    : `linear-gradient(135deg, ${accent.brandText} 0%, ${accent.accent} 100%)`;

  return {
    subtle,
    brandText,
    pageBg,
    badgeGradient,
  };
};

const resolvedColorMode = computed(() => resolveTheme(currentTheme.value));

const headerThemeStyle = computed(() => {
  const accent = resolveAccent(currentAccent.value);
  const isDark = resolvedColorMode.value === "dark";
  const tokens = buildThemeTokens(accent, resolvedColorMode.value);

  return {
    "--workspace-accent": accent.accent,
    "--workspace-accent-hover": accent.hover,
    "--workspace-accent-subtle": tokens.subtle,
    "--workspace-brand-text": tokens.brandText,
    background: isDark
      ? "rgba(21, 25, 29, 0.96)"
      : "rgba(248, 249, 251, 0.96)",
    borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "#d0d4db",
  };
});

const applyAccentPreference = (accentId, resolvedTheme = resolvedColorMode.value) => {
  if (typeof document === "undefined") {
    return;
  }

  const accent = resolveAccent(accentId);
  const tokens = buildThemeTokens(accent, resolvedTheme);
  document.documentElement.dataset.workspaceAccent = accent.id;
  document.documentElement.style.setProperty("--workspace-accent", accent.accent);
  document.documentElement.style.setProperty("--workspace-accent-hover", accent.hover);
  document.documentElement.style.setProperty("--workspace-accent-subtle", tokens.subtle);
  document.documentElement.style.setProperty("--workspace-brand-text", tokens.brandText);
  document.documentElement.style.setProperty("--workspace-page-bg", tokens.pageBg);
  document.documentElement.style.setProperty("--workspace-badge-gradient", tokens.badgeGradient);
};

const applyThemePreference = (theme) => {
  if (typeof document === "undefined") {
    return;
  }

  const resolvedTheme = resolveTheme(theme);
  document.documentElement.dataset.themePreference = theme;
  document.documentElement.dataset.colorMode = resolvedTheme;
  document.documentElement.style.colorScheme = resolvedTheme;
  applyAccentPreference(currentAccent.value, resolvedTheme);
};

const selectTheme = (theme) => {
  currentTheme.value = theme;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  applyThemePreference(theme);
};

const selectAccent = (accentId) => {
  currentAccent.value = resolveAccent(accentId).id;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(ACCENT_STORAGE_KEY, currentAccent.value);
  }

  applyAccentPreference(currentAccent.value, resolvedColorMode.value);
};

const handleSystemThemeChange = () => {
  if (currentTheme.value === "system") {
    applyThemePreference("system");
  }
};

const updateThemeMenuPosition = () => {
  if (!accountMenuAnchor.value || !themeMenuTrigger.value) {
    return;
  }

  const anchorRect = accountMenuAnchor.value.getBoundingClientRect();
  const triggerRect = themeMenuTrigger.value.getBoundingClientRect();
  const panelRect = accountMenuPanel.value?.getBoundingClientRect?.();
  const rightOffset = panelRect ? anchorRect.right - panelRect.left + 12 : 332;

  themeMenuStyle.value = {
    right: `${rightOffset}px`,
    top: `${Math.max(triggerRect.top - anchorRect.top, 44)}px`,
  };
};

const handleOpenMenuLayoutChange = () => {
  if (showThemeMenu.value) {
    updateThemeMenuPosition();
  }
};

const handleAccountMenuScroll = () => {
  if (showThemeMenu.value) {
    updateThemeMenuPosition();
  }
};

onMounted(() => {
  if (typeof window === "undefined") {
    return;
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  const savedAccent = window.localStorage.getItem(ACCENT_STORAGE_KEY);

  if (themeOptions.some((option) => option.id === savedTheme)) {
    currentTheme.value = savedTheme;
  }

  if (accentOptions.some((option) => option.id === savedAccent)) {
    currentAccent.value = savedAccent;
  }

  applyThemePreference(currentTheme.value);
  systemThemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  if (typeof systemThemeMediaQuery.addEventListener === "function") {
    systemThemeMediaQuery.addEventListener("change", handleSystemThemeChange);
    window.addEventListener("resize", handleOpenMenuLayoutChange);
    return;
  }

  systemThemeMediaQuery.addListener(handleSystemThemeChange);
  window.addEventListener("resize", handleOpenMenuLayoutChange);
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", handleOpenMenuLayoutChange);
  }

  if (!systemThemeMediaQuery) {
    return;
  }

  if (typeof systemThemeMediaQuery.removeEventListener === "function") {
    systemThemeMediaQuery.removeEventListener("change", handleSystemThemeChange);
    return;
  }

  systemThemeMediaQuery.removeListener(handleSystemThemeChange);
});

const toggleLauncher = () => {
  isLauncherOpen.value = !isLauncherOpen.value;
  if (isLauncherOpen.value) {
    showAccountMenu.value = false;
    showBroadcastMenu.value = false;
    showNotificationMenu.value = false;
    showHelpMenu.value = false;
    showThemeMenu.value = false;
  }
};

const toggleAccountMenu = () => {
  showAccountMenu.value = !showAccountMenu.value;
  showThemeMenu.value = false;

  if (!showAccountMenu.value) {
    return;
  }

  isLauncherOpen.value = false;
  showBroadcastMenu.value = false;
  showNotificationMenu.value = false;
  showHelpMenu.value = false;
};

const toggleBroadcastMenu = () => {
  showBroadcastMenu.value = !showBroadcastMenu.value;
  if (showBroadcastMenu.value) {
    isLauncherOpen.value = false;
    showAccountMenu.value = false;
    showNotificationMenu.value = false;
    showHelpMenu.value = false;
    showThemeMenu.value = false;
  }
};

const toggleNotificationMenu = () => {
  showNotificationMenu.value = !showNotificationMenu.value;
  if (showNotificationMenu.value) {
    isLauncherOpen.value = false;
    showAccountMenu.value = false;
    showBroadcastMenu.value = false;
    showHelpMenu.value = false;
    showThemeMenu.value = false;
  }
};

const toggleHelpMenu = () => {
  showHelpMenu.value = !showHelpMenu.value;
  if (showHelpMenu.value) {
    isLauncherOpen.value = false;
    showAccountMenu.value = false;
    showBroadcastMenu.value = false;
    showNotificationMenu.value = false;
    showThemeMenu.value = false;
  }
};

const toggleThemeMenu = () => {
  showThemeMenu.value = !showThemeMenu.value;

  if (showThemeMenu.value) {
    nextTick(updateThemeMenuPosition);
  }
};

const closeFloatingMenus = () => {
  showAccountMenu.value = false;
  showBroadcastMenu.value = false;
  showNotificationMenu.value = false;
  showHelpMenu.value = false;
  showThemeMenu.value = false;
};

const handleCreateClick = (event) => {
  const anchorRect = event.currentTarget?.getBoundingClientRect?.();
  emit("create-click", {
    source: "header",
    anchorRect,
  });
};
</script>
