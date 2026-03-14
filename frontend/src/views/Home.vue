<template>
  <div class="min-h-screen bg-[#f1f2f4] text-[#172b4d]">
    <header
      class="sticky top-0 z-20 h-12 border-b border-[#d0d4db] bg-[#f8f9fb]/95 backdrop-blur"
    >
      <div class="h-full flex items-center gap-3 px-4 lg:px-6">
        <button
          type="button"
          class="w-7 h-7 rounded-md text-[#44546f] hover:bg-[#e9ebef] flex items-center justify-center"
          aria-label="Menu"
        >
          <svg
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 6H8V8H6V6ZM11 6H13V8H11V6ZM16 6H18V8H16V6ZM6 11H8V13H6V11ZM11 11H13V13H11V11ZM16 11H18V13H16V11ZM6 16H8V18H6V16ZM11 16H13V18H11V16ZM16 16H18V18H16V16Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <div class="flex items-center gap-2 min-w-[140px]">
          <div
            class="w-7 h-7 rounded-md bg-[#0c66e4] text-white text-xs font-semibold flex items-center justify-center"
          >
            T
          </div>
          <span class="text-[18px] leading-none text-[#0747a6] font-semibold">Trello</span>
        </div>

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
              type="text"
              placeholder="Tìm kiếm"
              class="w-full bg-transparent text-xs text-[#172b4d] placeholder:text-[#5e6c84] outline-none"
            />
          </label>
        </div>

        <button
          ref="createButtonRef"
          type="button"
          class="h-8 px-3.5 rounded-md bg-[#0c66e4] text-white text-xs font-semibold hover:bg-[#0055cc]"
          @click="openCreateBoardModal('header')"
        >
          Tạo mới
        </button>

        <div class="hidden md:flex items-center gap-1 text-[#44546f] ml-auto relative">
          <button
            v-for="item in topActions"
            :key="item"
            type="button"
            class="w-7 h-7 rounded-md hover:bg-[#e9ebef] flex items-center justify-center text-sm"
            :aria-label="item"
          >
            {{ item }}
          </button>
          <button
            type="button"
            class="w-8 h-8 rounded-full bg-[#de350b] text-white text-[10px] font-bold flex items-center justify-center ml-1 ring-2 ring-transparent hover:ring-[#0c66e4]"
            @click="toggleAccountMenu"
          >
            LT
          </button>

          <button
            v-if="showAccountMenu"
            type="button"
            class="fixed inset-0 z-30 cursor-default"
            aria-label="Đóng menu tài khoản"
            @click="closeAccountMenu"
          />

          <div
            v-if="showAccountMenu"
            class="absolute right-0 top-10 z-40 w-[360px] rounded-xl border border-[#d0d4db] bg-[#f1f2f4] p-3.5 shadow-[0_8px_24px_rgba(9,30,66,0.25)]"
          >
            <p class="text-[13px] font-semibold text-[#626f86]">TÀI KHOẢN</p>

            <div class="mt-3 flex items-center gap-3">
              <div
                class="h-11 w-11 rounded-full bg-[#de350b] text-white text-[24px] font-semibold flex items-center justify-center"
              >
                LT
              </div>
              <div>
                <p class="text-[14px] leading-none text-[#172b4d]">Lê văn vũ trụ</p>
                <p class="mt-1 text-[13px] leading-none text-[#44546f]">letru7@gmail.com</p>
              </div>
            </div>

            <button type="button" class="mt-4 block text-[14px] text-[#172b4d] hover:underline">
              Chuyển đổi Tài khoản
            </button>

            <button
              type="button"
              class="mt-3.5 w-full flex items-center justify-between text-[14px] text-[#172b4d] hover:underline"
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

            <div class="my-4 border-t border-[#d0d4db]" />

            <p class="text-[13px] font-semibold text-[#626f86]">TRELLO</p>

            <div class="mt-3 space-y-2.5 text-[14px] text-[#172b4d]">
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
                class="w-full flex items-center justify-between hover:underline"
                @click="showThemeMenu = !showThemeMenu"
              >
                <span>Chủ đề</span>
                <svg
                  class="h-4 w-4 transition-transform"
                  :class="{ 'rotate-90': showThemeMenu }"
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

              <div
                v-if="showThemeMenu"
                class="rounded-xl border border-[#d0d4db] bg-white overflow-hidden"
              >
                <button
                  v-for="theme in themeOptions"
                  :key="theme.id"
                  type="button"
                  class="w-full flex items-center gap-3 px-3 py-3 border-l-2"
                  :class="
                    selectedTheme === theme.id
                      ? 'border-l-[#0c66e4] bg-[#e7f0ff]'
                      : 'border-l-transparent hover:bg-[#f4f5f7]'
                  "
                  @click="selectTheme(theme.id)"
                >
                  <span
                    class="w-5 h-5 rounded-full border border-[#a5adba] flex items-center justify-center"
                    :class="selectedTheme === theme.id ? 'border-[#0c66e4]' : ''"
                  >
                    <span
                      v-if="selectedTheme === theme.id"
                      class="w-3 h-3 rounded-full bg-[#0c66e4]"
                    />
                  </span>

                  <span
                    v-if="theme.id === 'light'"
                    class="h-12 w-[72px] rounded-lg border border-[#d0d4db] bg-[#f5f6f8] p-2 flex items-center gap-1"
                  >
                    <span class="h-7 w-3 rounded bg-[#cfd6df]"></span>
                    <span class="h-7 w-3 rounded bg-[#cfd6df]"></span>
                    <span class="h-7 w-3 rounded bg-[#cfd6df]"></span>
                  </span>

                  <span
                    v-else-if="theme.id === 'dark'"
                    class="h-12 w-[72px] rounded-lg border border-[#1d2125] bg-[#1d2125] p-2 flex items-center gap-1"
                  >
                    <span class="h-7 w-3 rounded bg-[#4f5a6a]"></span>
                    <span class="h-7 w-3 rounded bg-[#4f5a6a]"></span>
                    <span class="h-7 w-3 rounded bg-[#4f5a6a]"></span>
                  </span>

                  <span
                    v-else
                    class="h-12 w-[72px] rounded-lg border border-[#d0d4db] bg-[linear-gradient(135deg,#f5f6f8_0%,#f5f6f8_52%,#1d2125_52%,#1d2125_100%)] p-2 flex items-center gap-1"
                  >
                    <span class="h-7 w-3 rounded bg-[#cfd6df]"></span>
                    <span class="h-7 w-3 rounded bg-[#cfd6df]"></span>
                    <span class="h-7 w-3 rounded bg-[#4f5a6a]"></span>
                  </span>

                  <span
                    class="text-[14px] leading-none"
                    :class="selectedTheme === theme.id ? 'text-[#0c66e4]' : 'text-[#172b4d]'"
                  >
                    {{ theme.label }}
                  </span>
                </button>
              </div>
            </div>

            <div class="my-4 border-t border-[#d0d4db]" />

            <button type="button" class="w-full text-left text-[14px] text-[#172b4d] hover:underline">
              Tạo Không gian làm việc
            </button>

            <div class="my-4 border-t border-[#d0d4db]" />

            <button type="button" class="w-full text-left text-[14px] text-[#172b4d] hover:underline">
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-[1760px] mx-auto flex">
      <aside class="hidden lg:block w-[288px] px-6 py-8">
        <nav class="space-y-2">
          <button
            v-for="item in mainMenus"
            :key="item.id"
            type="button"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-[15px]"
            :class="
              activeMenu === item.id
                ? 'bg-[#dce4f0] text-[#0c66e4] font-semibold'
                : 'hover:bg-[#ebedf1]'
            "
            @click="selectMainMenu(item.id)"
          >
            <span class="text-base">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </button>
        </nav>

        <div class="border-t border-[#d0d4db] mt-6 pt-7">
          <p class="mb-3 px-2 text-[15px] font-semibold text-[#44546f]">
            Các Không gian làm việc
          </p>

          <button
            type="button"
            class="w-full flex items-center gap-3 rounded-lg bg-[#d1d3d7] px-3 py-2 hover:bg-[#c5c9cf] transition-colors"
            @click="workspaceOpen = !workspaceOpen"
            :aria-expanded="workspaceOpen"
          >
            <div
              class="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#8f5fd3] to-[#1669e2] text-sm font-semibold text-white"
            >
              T
            </div>
            <span class="text-[14px] font-medium text-[#172b4d]"
              >Trello Không gian làm việc</span
            >
            <svg
              class="w-4 h-4 ml-auto text-[#172b4d] transition-transform"
              :class="{ 'rotate-180': workspaceOpen }"
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

          <div v-if="workspaceOpen" class="mt-2">
            <button
              type="button"
              class="w-full flex items-center gap-3 rounded-lg py-2 pl-12 pr-3 text-left transition-colors"
              :class="
                activeWorkspaceSection === 'board'
                  ? 'bg-[#dce4f0]'
                  : 'hover:bg-[#e9ebef]'
              "
              @click="openWorkspaceBoards"
            >
              <svg
                class="w-4 h-4 text-[#2c2f36]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="5"
                  y="4"
                  width="14"
                  height="16"
                  rx="2.5"
                  stroke="currentColor"
                  stroke-width="1.8"
                />
                <path d="M10 4V20" stroke="currentColor" stroke-width="1.8" />
              </svg>
              <span class="text-[15px] text-[#172b4d]">Bảng</span>
            </button>

            <router-link
              to="/workspace/members"
              class="w-full flex items-center gap-3 rounded-lg py-2 pl-12 pr-3 text-left transition-colors hover:bg-[#e9ebef]"
            >
              <svg
                class="w-4 h-4 text-[#2c2f36]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M16 19V18C16 15.7909 14.2091 14 12 14H8C5.79086 14 4 15.7909 4 18V19"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
                <circle cx="10" cy="8" r="3" stroke="currentColor" stroke-width="1.8" />
                <path
                  d="M18 9V15M15 12H21"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
              <span class="text-[15px] text-[#172b4d]">Thành viên</span>
              <span class="ml-auto text-[20px] leading-none text-[#172b4d]">+</span>
            </router-link>

            <router-link
              to="/workspace/settings"
              class="w-full flex items-center gap-3 rounded-lg py-2 pl-12 pr-3 text-left transition-colors hover:bg-[#e9ebef]"
            >
              <svg
                class="w-4 h-4 text-[#2c2f36]"
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
              <span class="text-[15px] text-[#172b4d]">Cài đặt</span>
            </router-link>
          </div>
        </div>
      </aside>

      <main class="flex-1 px-6 py-6 lg:px-8">
        <template v-if="activeMenu === 'home'">
          <div class="mx-auto flex max-w-[920px] gap-5">
            <section
              class="w-full max-w-[520px] overflow-hidden rounded-md border border-[#d0d4db] bg-white shadow-[0_1px_0_rgba(9,30,66,0.08)]"
            >
              <template v-if="!showHomeActivityCard">
                <div class="h-[138px] bg-[#ebdff1]">
                  <svg
                    class="mx-auto h-full w-[320px]"
                    viewBox="0 0 430 190"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect x="60" y="20" width="240" height="145" rx="9" fill="#af65dd" />
                    <rect x="74" y="36" width="126" height="12" rx="6" fill="#c89ee6" />
                    <rect x="74" y="56" width="86" height="96" rx="7" fill="#f3f4f6" />
                    <rect x="84" y="68" width="66" height="8" rx="4" fill="#b5bcc7" />
                    <rect x="84" y="81" width="60" height="8" rx="4" fill="#d3d8df" />
                    <rect x="84" y="94" width="62" height="8" rx="4" fill="#d3d8df" />
                    <rect x="84" y="107" width="56" height="8" rx="4" fill="#d3d8df" />
                    <rect x="84" y="120" width="52" height="8" rx="4" fill="#d3d8df" />
                    <rect x="172" y="56" width="86" height="68" rx="7" fill="#f3f4f6" />
                    <rect x="182" y="68" width="28" height="6" rx="3" fill="#cfd5de" />
                    <rect x="214" y="68" width="28" height="6" rx="3" fill="#cfd5de" />
                    <rect x="182" y="80" width="58" height="8" rx="4" fill="#d3d8df" />
                    <circle cx="244" cy="106" r="5" fill="#2ec4b6" />
                    <circle cx="230" cy="106" r="5" fill="#7a9cff" />
                    <rect x="270" y="56" width="66" height="84" rx="7" fill="#bbc1ca" />
                    <path
                      d="M276 66H324M276 78H324M276 90H318"
                      stroke="#a2aab6"
                      stroke-width="5"
                      stroke-linecap="round"
                    />

                    <g transform="translate(310 52) rotate(12 30 40)">
                      <rect x="0" y="0" width="72" height="84" rx="8" fill="#a4d69e" />
                      <rect x="12" y="14" width="48" height="8" rx="4" fill="#88c783" />
                      <path
                        d="M36 18C36 26 29.5 32.5 21.5 32.5C25.5 29 27.5 24 27.5 18"
                        stroke="#4f9a4a"
                        stroke-width="4"
                        stroke-linecap="round"
                      />
                      <rect x="18" y="38" width="36" height="30" rx="4" fill="#e8f4e6" />
                    </g>
                  </svg>
                </div>

                <div class="px-5 py-4 text-center">
                  <h1 class="text-[24px] font-semibold leading-tight text-[#172b4d]">Tổ chức mọi thứ</h1>
                  <p class="mx-auto mt-3 max-w-[430px] text-[13px] leading-[1.5] text-[#172b4d]">
                    Đặt tất cả mọi thứ ở một nơi và bắt đầu di chuyển mọi thứ về phía trước với bảng
                    Trello đầu tiên của bạn!
                  </p>

                  <div class="mt-4">
                    <button type="button" class="inline-flex h-8 items-center justify-center rounded-md bg-[#0c66e4] px-3.5 text-[13px] font-semibold text-white hover:bg-[#0055cc]" @click="openCreateBoardModal('header')">
                      Tạo một bảng Không gian làm việc
                    </button>
                  </div>

                  <button
                    type="button"
                    class="mt-2 text-[13px] font-medium text-[#44546f] underline underline-offset-2 hover:text-[#172b4d]"
                    @click="showHomeActivityCard = true"
                  >
                    Đã hiểu! Bỏ qua điều này.
                  </button>
                </div>
              </template>

              <template v-else>
                <div class="h-[138px] bg-[#f0ead8]">
                  <svg
                    class="mx-auto h-full w-[320px]"
                    viewBox="0 0 430 190"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect x="0" y="0" width="115" height="190" fill="#ece2c8" />
                    <rect x="315" y="0" width="115" height="190" fill="#ece2c8" />
                    <circle cx="214" cy="122" r="92" fill="#f2d7b3" />

                    <rect x="198" y="8" width="60" height="28" rx="4" fill="#eceef0" />
                    <rect x="205" y="14" width="40" height="5" rx="2.5" fill="#c3c7cf" />
                    <rect x="205" y="23" width="30" height="5" rx="2.5" fill="#d2d7df" />

                    <rect x="120" y="28" width="32" height="32" rx="5" fill="#f47dd3" />
                    <circle cx="131" cy="42" r="2" fill="#8e366c" />
                    <circle cx="141" cy="42" r="2" fill="#8e366c" />
                    <path d="M130 50H142" stroke="#8e366c" stroke-width="2.5" stroke-linecap="round" />

                    <rect x="334" y="28" width="36" height="36" rx="5" fill="#67c54a" />
                    <path
                      d="M344 45L350 51L360 39"
                      stroke="#2e7d32"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <circle cx="378" cy="95" r="18" fill="#bf7be1" />
                    <path d="M378 86V95H371" stroke="#8543b0" stroke-width="3" stroke-linecap="round" />

                    <path d="M66 106L132 88L88 128L95 112L66 106Z" fill="#0c7db9" />

                    <path d="M170 78L196 46L208 86Z" fill="#6f8897" />
                    <path d="M260 78L234 46L222 86Z" fill="#6f8897" />
                    <ellipse cx="215" cy="102" rx="52" ry="47" fill="#78909c" />
                    <ellipse cx="215" cy="112" rx="38" ry="31" fill="#f5f7f9" />
                    <ellipse cx="198" cy="107" rx="10" ry="12" fill="#f5f7f9" />
                    <ellipse cx="232" cy="107" rx="10" ry="12" fill="#f5f7f9" />
                    <circle cx="198" cy="107" r="6.8" fill="#0a3e5e" />
                    <circle cx="232" cy="107" r="6.8" fill="#0a3e5e" />
                    <circle cx="198" cy="107" r="2.2" fill="#ffffff" />
                    <circle cx="232" cy="107" r="2.2" fill="#ffffff" />
                    <path d="M205 124H225" stroke="#55626d" stroke-width="3" stroke-linecap="round" />
                  </svg>
                </div>

                <div class="px-5 py-4 text-center">
                  <h1 class="text-[24px] font-semibold leading-tight text-[#172b4d]">Theo dõi và cập nhật</h1>
                  <p class="mx-auto mt-3 max-w-[430px] text-[13px] leading-[1.5] text-[#172b4d]">
                    Mời mọi người vào bảng và thẻ, để lại nhận xét, thêm ngày hết hạn và chúng tôi sẽ
                    hiển thị hoạt động quan trọng nhất ở đây.
                  </p>
                </div>
              </template>
            </section>

            <aside class="hidden w-[232px] shrink-0 pt-2 xl:block">
              <section>
                <h2 class="mb-4 flex items-center gap-2 text-[15px] font-semibold text-[#44546f]">
                  <svg
                    class="h-[18px] w-[18px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8" />
                    <path
                      d="M12 8V12L15 14"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span>Đã xem gần đây</span>
                </h2>

                <div class="space-y-2">
                  <router-link
                    v-for="item in homeRecentBoards"
                    :key="item.name"
                    to="/project"
                    class="flex items-center gap-3 rounded-md px-1.5 py-1.5 hover:bg-[#ebedf0]"
                  >
                    <div class="h-9 w-11 rounded-md" :style="{ background: item.background }"></div>
                    <span class="text-[14px] text-[#172b4d]">{{ item.name }}</span>
                    <span
                      v-if="item.template"
                      class="ml-auto rounded bg-[#1d2125] px-1.5 py-0.5 text-xs font-semibold text-white"
                    >
                      MẪU
                    </span>
                  </router-link>
                </div>
              </section>

              <section class="mt-12">
                <h3 class="mb-4 text-[15px] font-semibold text-[#44546f]">Liên kết</h3>

                <button
                  type="button"
                  class="flex w-full items-center gap-3 rounded-md px-1.5 py-1.5 text-[14px] text-[#172b4d] hover:bg-[#ebedf0] text-left"
                  @click="openCreateBoardModal('header')"
                >
                  <span
                    class="flex h-9 w-9 items-center justify-center rounded-md border border-[#c1c7d0] bg-[#dfe1e6] text-[24px] leading-none text-[#626f86]"
                  >
                    +
                  </span>
                  <span>Tạo bảng mới</span>
                </button>
              </section>
            </aside>
          </div>
        </template>

        <template v-else-if="activeMenu === 'templates'">
          <section class="min-h-[1px]" />
        </template>

        <template v-else>
          <section v-if="activeWorkspaceSection === 'board'" class="mx-auto max-w-[1080px]">
            <div class="flex items-center gap-3">
              <div
                class="flex h-14 w-14 items-center justify-center rounded-md bg-gradient-to-br from-[#8f5fd3] to-[#1669e2] text-[40px] font-semibold text-white"
              >
                T
              </div>

              <div>
                <div class="flex items-center gap-2">
                  <h2 class="text-[21px] font-semibold text-[#2c2f36]">
                    Trello Không gian làm việc
                  </h2>
                  <button
                    type="button"
                    class="p-1 rounded hover:bg-[#e9ebef]"
                    aria-label="Sửa tên không gian làm việc"
                  >
                    <svg
                      class="w-4 h-4 text-[#2c2f36]"
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

                <div class="mt-1 flex items-center gap-1.5 text-[14px] text-[#44546f]">
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

            <div class="my-6 border-b border-[#c9cbd1]" />

            <div class="pb-8">
              <svg
                class="mx-auto h-auto w-[460px] max-w-full"
                viewBox="0 0 520 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="100" y="120" width="90" height="145" rx="8" fill="#C4B5FD" />
                <rect x="110" y="132" width="70" height="20" rx="4" fill="#F1F5F9" />
                <rect x="110" y="160" width="70" height="14" rx="3" fill="#DDD6FE" />
                <rect x="110" y="181" width="56" height="10" rx="3" fill="#EDE9FE" />
                <rect x="110" y="197" width="64" height="10" rx="3" fill="#EDE9FE" />
                <rect x="110" y="213" width="42" height="10" rx="3" fill="#EDE9FE" />

                <rect x="210" y="112" width="102" height="153" rx="8" fill="#A78BFA" />
                <rect x="220" y="124" width="82" height="22" rx="4" fill="#EEF2FF" />
                <rect x="220" y="154" width="82" height="14" rx="3" fill="#DDD6FE" />
                <rect x="220" y="175" width="67" height="10" rx="3" fill="#EDE9FE" />
                <rect x="220" y="191" width="76" height="10" rx="3" fill="#EDE9FE" />
                <rect x="220" y="207" width="58" height="10" rx="3" fill="#EDE9FE" />

                <rect x="332" y="116" width="96" height="149" rx="8" fill="#F0ABFC" />
                <rect x="342" y="128" width="76" height="22" rx="4" fill="#F5F3FF" />
                <rect x="342" y="158" width="76" height="14" rx="3" fill="#E9D5FF" />
                <rect x="342" y="179" width="56" height="10" rx="3" fill="#F3E8FF" />
                <rect x="342" y="195" width="64" height="10" rx="3" fill="#F3E8FF" />
                <rect x="342" y="211" width="42" height="10" rx="3" fill="#F3E8FF" />

                <circle cx="92" cy="243" r="18" fill="#99F6E4" />
                <circle cx="448" cy="244" r="16" fill="#A5F3FC" />
                <path d="M58 238H470" stroke="#67E8F9" stroke-width="3" stroke-linecap="round" />
                <path d="M60 238L45 270" stroke="#67E8F9" stroke-width="3" stroke-linecap="round" />
                <path d="M470 238L487 270" stroke="#67E8F9" stroke-width="3" stroke-linecap="round" />

                <circle cx="164" cy="88" r="45" stroke="#A5F3FC" stroke-width="4" />
                <path d="M164 43V133M119 88H209M132 56L196 120M196 56L132 120" stroke="#BAE6FD" stroke-width="2" />

                <circle cx="292" cy="86" r="40" stroke="#A5F3FC" stroke-width="4" />
                <path d="M292 46V126M252 86H332M263 58L321 116M321 58L263 116" stroke="#BAE6FD" stroke-width="2" />
              </svg>

              <p class="mx-auto mt-6 max-w-[700px] text-center text-[16px] leading-[1.55] text-[#44546f]">
                Các bảng là nơi hoàn thành công việc ở Trello. Trên bảng, bạn có thể di
                chuyển các thẻ giữa các danh sách để giữ cho các dự án, nhiệm vụ và hơn
                thế nữa luôn đi đúng hướng.
              </p>

              <div class="mt-6 flex justify-center">
                <button type="button" class="inline-flex h-10 items-center justify-center rounded-lg border border-[#0055cc] bg-[#0c66e4] px-6 text-[15px] font-semibold text-white hover:bg-[#0055cc]" @click="openCreateBoardModal('header')">
                  Tạo bảng đầu tiên của bạn
                </button>
              </div>
            </div>
          </section>

          <template v-else>
            <section class="mb-12">
              <div class="mb-5 flex items-center gap-3">
                <span class="text-xl">◷</span>
                <h2 class="text-[20px] font-bold text-[#172b4d]">Đã xem gần đây</h2>
              </div>

              <router-link
                to="/project"
                class="group block w-[288px] overflow-hidden rounded-xl border border-[#c8ced8] bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  class="h-24 bg-[linear-gradient(135deg,#d8f0f7_0%,#d4eef6_50%,#c8e9f2_100%)] relative overflow-hidden"
                >
                  <div class="absolute inset-0 opacity-90">
                    <div
                      class="absolute left-4 top-6 w-20 h-6 border border-dashed border-[#ffab00] rounded-full"
                    ></div>
                    <div
                      class="absolute left-9 top-14 w-28 h-6 border border-dashed border-[#ff7452] rounded-full"
                    ></div>
                    <div
                      class="absolute right-4 top-6 w-10 h-10 rounded-lg border-2 border-[#0c66e4]"
                    ></div>
                    <div
                      class="absolute left-2 top-2 w-3 h-3 rounded-full border-2 border-[#0c66e4]"
                    ></div>
                    <div
                      class="absolute right-3 top-2 w-3 h-3 rounded-full border-2 border-[#0c66e4]"
                    ></div>
                  </div>
                  <span
                    class="absolute right-3 bottom-3 text-xs px-2 py-0.5 rounded bg-[#1d2125] text-white font-semibold"
                  >
                    MẪU
                  </span>
                </div>
                <div class="px-3 py-2 text-[16px] font-medium text-[#172b4d]">
                  Premortem
                </div>
              </router-link>
            </section>

            <section class="max-w-[1180px]">
              <h2 class="mb-5 text-[21px] font-bold uppercase text-[#44546f]">
                Các không gian làm việc của bạn
              </h2>

              <div
                class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-5"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[#8f5fd3] to-[#1669e2] text-lg font-semibold text-white"
                  >
                    T
                  </div>
                  <h3 class="text-[21px] font-semibold">
                    Trello Không gian làm việc
                  </h3>
                </div>

                <div class="flex flex-wrap gap-3">
                  <button
                    v-for="action in workspaceActions"
                    :key="action.label"
                    type="button"
                    class="flex h-8 items-center gap-2 rounded-md border border-[#d0d4db] bg-[#e9ebef] px-3 text-[15px] hover:bg-[#dde1e7]"
                    :class="
                      action.upgrade
                        ? 'bg-[#e8d9f2] border-[#e8d9f2] hover:bg-[#dbc5eb]'
                        : ''
                    "
                    @click="onWorkspaceActionClick(action)"
                  >
                    <span>{{ action.icon }}</span>
                    <span>{{ action.label }}</span>
                  </button>
                </div>
              </div>

              <div class="mb-9">
                <button
                  ref="createBoardTileRef"
                  type="button"
                  class="flex h-[152px] w-[152px] items-center justify-center rounded-xl border border-[#d0d4db] bg-[#e5e7eb] text-center text-[18px] text-[#44546f] transition-colors hover:bg-[#dce0e6]"
                  @click="openCreateBoardModal('tile')"
                >
                  Tạo bảng mới
                </button>
              </div>

              <button
                type="button"
                class="h-8 rounded-md border border-[#d0d4db] bg-[#e9ebef] px-3.5 text-[15px] hover:bg-[#dde1e7]"
              >
                Xem tất cả các bảng đã đóng
              </button>
            </section>
          </template>
        </template>
      </main>
    </div>

    <div
      v-if="showCreateBoardModal"
      class="fixed inset-0 z-40"
      role="dialog"
      aria-modal="true"
      aria-label="Tạo bảng"
    >
      <div class="absolute inset-0 bg-black/10" @click="closeCreateBoardModal"></div>

      <section
        ref="createBoardModalRef"
        class="absolute max-h-[calc(100vh-16px)] overflow-y-auto rounded-xl border border-[#d0d4db] bg-[#f1f2f4] p-3 shadow-[0_8px_24px_rgba(9,30,66,0.25)]"
        :style="createBoardModalStyle"
      >
        <div class="mb-2.5 flex items-center">
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-xl border border-[#0c66e4] text-[#44546f] hover:bg-[#e9ebef]"
            aria-label="Quay lại"
            @click="closeCreateBoardModal"
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

          <h2 class="flex-1 text-center text-[18px] font-semibold leading-none text-[#44546f]">
            Tạo bảng
          </h2>

          <button
            type="button"
            class="flex h-8 w-8 items-center justify-center rounded-md text-[#626f86] hover:bg-[#e9ebef]"
            aria-label="Đóng"
            @click="closeCreateBoardModal"
          >
            <svg
              class="h-4 w-4"
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
          </button>
        </div>

        <div
          class="mx-auto h-[132px] w-[220px] overflow-hidden rounded-md"
          :style="{ background: selectedBoardBackground }"
        >
          <div class="flex h-full items-end justify-center gap-2 px-2.5 pb-3 pt-7">
            <div class="w-[62px] rounded bg-white/85 p-1.5">
              <div class="mb-1 h-2 w-8 rounded bg-[#d9dde3]"></div>
              <div class="mb-1 h-2 w-full rounded bg-[#d9dde3]"></div>
              <div class="h-2 w-11 rounded bg-[#d9dde3]"></div>
            </div>
            <div class="w-[62px] rounded bg-white/85 p-1.5">
              <div class="mb-1 h-2 w-7 rounded bg-[#d9dde3]"></div>
              <div class="mb-1 h-2 w-full rounded bg-[#d9dde3]"></div>
              <div class="mb-1 h-2 w-10 rounded bg-[#d9dde3]"></div>
              <div class="h-2 w-8 rounded bg-[#d9dde3]"></div>
            </div>
            <div class="w-[62px] rounded bg-white/85 p-1.5">
              <div class="mb-1 h-2 w-6 rounded bg-[#d9dde3]"></div>
              <div class="mb-1 h-2 w-full rounded bg-[#d9dde3]"></div>
              <div class="mb-1 h-2 w-full rounded bg-[#d9dde3]"></div>
              <div class="h-2 w-9 rounded bg-[#d9dde3]"></div>
            </div>
          </div>
        </div>

        <div class="mt-2.5">
          <p class="text-[14px] font-semibold text-[#44546f]">Phông nền</p>

          <div class="mt-1.5 grid grid-cols-4 gap-2">
            <button
              v-for="(bg, idx) in createBoardImageBackgrounds"
              :key="`img-${idx}`"
              type="button"
              class="h-10 rounded-md border transition-colors"
              :class="
                selectedBoardBackground === bg
                  ? 'border-[#0c66e4]'
                  : 'border-transparent hover:border-[#c7cdd8]'
              "
              :style="{ background: bg }"
              @click="selectedBoardBackground = bg"
            />
          </div>

          <div class="mt-1.5 grid grid-cols-6 gap-2">
            <button
              v-for="(bg, idx) in createBoardColorBackgrounds"
              :key="`color-${idx}`"
              type="button"
              class="h-8 rounded-md border transition-colors"
              :class="
                selectedBoardBackground === bg
                  ? 'border-[#0c66e4]'
                  : 'border-transparent hover:border-[#c7cdd8]'
              "
              :style="{ background: bg }"
              @click="selectedBoardBackground = bg"
            />
            <button
              type="button"
              class="h-8 rounded-md bg-[#dfe1e6] text-[#8c99ad] text-[20px] leading-none"
              disabled
              aria-label="Nhiều lựa chọn hơn"
            >
              ...
            </button>
          </div>
        </div>

        <label class="mt-2.5 block">
          <span class="text-[14px] font-semibold text-[#44546f]">Tiêu đề bảng <span class="text-[#e2483d]">*</span></span>
          <input
            v-model="newBoardTitle"
            type="text"
            class="mt-1 h-10 w-full rounded-md border bg-white px-3 text-[14px] outline-none"
            :class="
              newBoardTitle.trim().length === 0
                ? 'border-[#e2483d] focus:ring-1 focus:ring-[#e2483d]'
                : 'border-[#c7cdd8] focus:ring-1 focus:ring-[#0c66e4]'
            "
          />
        </label>

        <p
          v-if="newBoardTitle.trim().length === 0"
          class="mt-1.5 text-[13px] text-[#44546f]"
        >
          👋 Tiêu đề bảng là bắt buộc
        </p>

        <div class="mt-3 relative">
          <span class="text-[14px] font-semibold text-[#44546f]">Quyền xem</span>
          <button
            type="button"
            class="mt-1 flex h-10 w-full items-center justify-between rounded-md border border-[#9fadbc] bg-[#f7f8f9] px-3 text-[14px] text-[#172b4d] hover:bg-[#f1f2f4]"
            @click="showVisibilityDropdown = !showVisibilityDropdown"
          >
            <span>{{ selectedVisibilityOption.label }}</span>
            <svg
              class="h-4 w-4 text-[#626f86]"
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

          <div
            v-if="showVisibilityDropdown"
            class="absolute left-0 right-0 top-[100%] z-10 mt-2 max-h-[170px] overflow-y-auto overscroll-contain rounded-md border border-[#9fadbc] bg-[#f1f2f4] pr-1 shadow-[0_8px_16px_rgba(9,30,66,0.16)]"
          >
            <button
              v-for="option in visibilityOptions"
              :key="option.id"
              type="button"
              class="w-full border-l-2 px-3 py-2 text-left transition-colors"
              :class="
                selectedVisibility === option.id
                  ? 'border-l-[#0c66e4] bg-[#dce4f0]'
                  : 'border-l-transparent hover:bg-[#ebedf0]'
              "
              @click="selectVisibilityMode(option.id)"
            >
              <div class="flex items-start gap-2.5">
                <span class="mt-1 text-[#44546f]">
                  <svg
                    v-if="option.id === 'private'"
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect
                      x="6.5"
                      y="10.5"
                      width="11"
                      height="9"
                      rx="2"
                      stroke="currentColor"
                      stroke-width="1.8"
                    />
                    <path
                      d="M8.5 10.5V8.2C8.5 6.32223 10.0222 4.8 11.9 4.8C13.7778 4.8 15.3 6.32223 15.3 8.2V10.5"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    />
                  </svg>

                  <svg
                    v-else-if="option.id === 'workspace'"
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <circle cx="8.5" cy="10" r="2.2" stroke="currentColor" stroke-width="1.8" />
                    <circle cx="15.7" cy="9.2" r="1.9" stroke="currentColor" stroke-width="1.8" />
                    <path
                      d="M4.5 18C4.5 15.7909 6.29086 14 8.5 14H10.5C12.7091 14 14.5 15.7909 14.5 18"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    />
                    <path
                      d="M14 17.8C14.2 16.2 15.4 15 16.9 15H17.4C18.9 15 20.1 16.2 20.3 17.8"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    />
                  </svg>

                  <svg
                    v-else
                    class="h-5 w-5"
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
                </span>

                <div>
                  <p class="text-[14px] font-semibold text-[#172b4d]">{{ option.label }}</p>
                  <p class="text-[12px] leading-[1.35] text-[#44546f]">{{ option.description }}</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <button
          type="button"
          class="mt-3 h-9 w-full rounded-md text-[14px] font-semibold"
          :class="
            canCreateBoard
              ? 'bg-[#0c66e4] text-white hover:bg-[#0055cc]'
              : 'bg-[#dfe1e6] text-[#97a0af] cursor-not-allowed'
          "
          :disabled="!canCreateBoard"
          @click="submitCreateBoard"
        >
          Tạo mới
        </button>

        <button
          type="button"
          class="mt-2 h-9 w-full rounded-md bg-[#dfe1e6] text-[14px] font-medium text-[#172b4d] hover:bg-[#d4d8dd]"
        >
          Bắt đầu với Mẫu
        </button>

        <p class="mt-3 text-[13px] leading-[1.35] text-[#626f86]">
          Bằng cách sử dụng hình ảnh từ Unsplash, bạn đồng ý với
          <span class="underline">giấy phép</span> và <span class="underline">Điều khoản dịch vụ</span>
        </p>
      </section>
    </div>

    <CreateBoardModal v-model="isCreateBoardOpen" />
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const searchKeyword = ref("");
const workspaceOpen = ref(false);
const activeWorkspaceSection = ref("home");
const activeMenu = ref("boards");
const showHomeActivityCard = ref(false);
const showCreateBoardModal = ref(false);
const showAccountMenu = ref(false);
const showThemeMenu = ref(false);
const selectedTheme = ref("system");
const newBoardTitle = ref("");
const createButtonRef = ref(null);
const createBoardTileRef = ref(null);
const createBoardModalRef = ref(null);
const showVisibilityDropdown = ref(false);
const selectedVisibility = ref("workspace");
const createBoardModalStyle = ref({
  top: "56px",
  left: "8px",
  width: "320px"
});

const topActions = ["🔔"];
const accountLinks = [
  { label: "Hồ sơ và Hiển thị", to: { name: "PersonalProfile" } },
  { label: "Hoạt động", to: { name: "PersonalActivity" } },
  { label: "Thẻ", to: { name: "WorkspaceCards" } },
  { label: "Cài đặt", to: { name: "PersonalSettings" } }
];
const themeOptions = [
  { id: "light", label: "Màu sáng" },
  { id: "dark", label: "Tối" },
  { id: "system", label: "Hệ thống so khớp" }
];

const mainMenus = [
  { id: "boards", label: "Bảng", icon: "▣" },
  { id: "templates", label: "Mẫu", icon: "◫" },
  { id: "home", label: "Trang chủ", icon: "⌁" }
];

const workspaceActions = [
  { label: "Bảng", icon: "▣", upgrade: false, to: { name: "WorkspaceBoards" } },
  { label: "Thành viên", icon: "◔", upgrade: false, to: { name: "WorkspaceMembers" } },
  { label: "Cài đặt", icon: "⚙", upgrade: false, to: { name: "WorkspaceSettings" } },
  { label: "Nâng cấp", icon: "▤", upgrade: true }
];

const homeRecentBoards = ref([
  {
    name: "Project Management",
    background: "linear-gradient(135deg,#2042d9,#8f3cf0)",
    template: true
  },
  {
    name: "Premortem",
    background: "linear-gradient(135deg,#b7f4ff 0%,#d3faff 50%,#bff0ff 100%)",
    template: true
  }
]);

const createBoardImageBackgrounds = [
  "linear-gradient(145deg,#6f4a2a 0%,#9b7042 40%,#4f3b2a 100%)",
  "linear-gradient(145deg,#f7a347 0%,#f28b2f 45%,#5f3f1f 100%)",
  "linear-gradient(145deg,#d5b18b 0%,#efd6b6 45%,#a36f44 100%)",
  "linear-gradient(145deg,#8aa95b 0%,#5c7e3c 45%,#2f4d27 100%)"
];

const createBoardColorBackgrounds = [
  "#cfdcf0",
  "linear-gradient(135deg,#35b2d6,#2a63d3)",
  "linear-gradient(135deg,#0f5ec8,#1545a4)",
  "linear-gradient(135deg,#2d3c88,#b14484)",
  "linear-gradient(135deg,#8161d0,#de67a9)"
];

const selectedBoardBackground = ref(createBoardImageBackgrounds[0]);

const canCreateBoard = computed(() => newBoardTitle.value.trim().length > 0);
const visibilityOptions = [
  {
    id: "private",
    label: "Riêng tư",
    description:
      "Chỉ thành viên bảng thông tin mới có quyền xem bảng thông tin này. Quản trị viên Không gian làm việc có thể đóng bảng thông tin và xoá thành viên."
  },
  {
    id: "workspace",
    label: "Không gian làm việc",
    description:
      "Tất cả thành viên của Không gian làm việc Trello có thể xem và sửa bảng thông tin này."
  },
  {
    id: "public",
    label: "Công khai",
    description:
      "Bất kỳ ai trên mạng internet đều có thể xem bảng thông tin này. Chỉ thành viên bảng thông tin mới có quyền sửa."
  }
];
const selectedVisibilityOption = computed(
  () => visibilityOptions.find((item) => item.id === selectedVisibility.value) || visibilityOptions[1]
);

const selectVisibilityMode = (mode) => {
  selectedVisibility.value = mode;
  showVisibilityDropdown.value = false;
};

const toggleAccountMenu = () => {
  showAccountMenu.value = !showAccountMenu.value;
  if (!showAccountMenu.value) {
    showThemeMenu.value = false;
  }
};

const closeAccountMenu = () => {
  showAccountMenu.value = false;
  showThemeMenu.value = false;
};

const selectTheme = (themeId) => {
  selectedTheme.value = themeId;
};

const selectMainMenu = (menuId) => {
  activeMenu.value = menuId;
  if (menuId === "boards") {
    activeWorkspaceSection.value = "home";
  }
};

const openWorkspaceBoards = () => {
  activeMenu.value = "boards";
  activeWorkspaceSection.value = "board";
  workspaceOpen.value = true;
};

const onWorkspaceActionClick = (action) => {
  if (!action.to) return;
  router.push(action.to);
};

const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

const positionCreateBoardModal = (source, anchorRect) => {
  if (typeof window === "undefined") return;

  const modalWidth = 320;
  const screenPadding = 8;
  const measuredModalWidth = createBoardModalRef.value?.offsetWidth || modalWidth;
  const measuredModalHeight = createBoardModalRef.value?.offsetHeight || 620;

  let top = anchorRect.bottom + 8;
  let left = anchorRect.left;

  if (source === "tile") {
    // Keep tile modal a bit higher so it does not get visually covered.
    top = anchorRect.top - 20;
    left = anchorRect.right + 12;
    if (left + measuredModalWidth > window.innerWidth - screenPadding) {
      left = anchorRect.left - measuredModalWidth - 12;
    }
  }

  const boundedLeft = clampValue(
    left,
    screenPadding,
    Math.max(screenPadding, window.innerWidth - measuredModalWidth - screenPadding)
  );
  const boundedTop = clampValue(
    top,
    screenPadding,
    Math.max(screenPadding, window.innerHeight - measuredModalHeight - screenPadding)
  );

  createBoardModalStyle.value = {
    top: `${boundedTop}px`,
    left: `${boundedLeft}px`,
    width: `${modalWidth}px`
  };
};

const openCreateBoardModal = async (source = "header") => {
  closeAccountMenu();
  newBoardTitle.value = "";
  selectedBoardBackground.value = createBoardImageBackgrounds[0];
  selectedVisibility.value = "workspace";
  showVisibilityDropdown.value = false;
  const buttonEl = source === "tile" ? createBoardTileRef.value : createButtonRef.value;
  if (buttonEl && typeof window !== "undefined") {
    const rect = buttonEl.getBoundingClientRect();
    positionCreateBoardModal(source, rect);
    showCreateBoardModal.value = true;
    await nextTick();
    positionCreateBoardModal(source, rect);
    return;
  }
  showCreateBoardModal.value = true;
};

const closeCreateBoardModal = () => {
  showCreateBoardModal.value = false;
  showVisibilityDropdown.value = false;
};

const submitCreateBoard = () => {
  if (!canCreateBoard.value) return;
  homeRecentBoards.value.unshift({
    name: newBoardTitle.value.trim(),
    background: selectedBoardBackground.value,
    template: false
  });
  if (homeRecentBoards.value.length > 6) {
    homeRecentBoards.value = homeRecentBoards.value.slice(0, 6);
  }
  showCreateBoardModal.value = false;
  newBoardTitle.value = "";
};
</script>


