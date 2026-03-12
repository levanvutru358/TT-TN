<template>
  <div class="min-h-screen bg-[#f1f2f4] text-[#172b4d]">
    <WorkspaceHeader
      v-model="searchKeyword"
      @create-click="isCreateBoardOpen = true"
    />

    <div class="max-w-[1820px] mx-auto flex">
      <aside class="hidden lg:block w-[320px] px-8 py-10">
        <nav class="space-y-2">
          <button
            v-for="item in mainMenus"
            :key="item.label"
            type="button"
            class="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left text-[18px]"
            :class="
              item.active
                ? 'bg-[#dce4f0] text-[#0c66e4] font-semibold'
                : 'hover:bg-[#ebedf1]'
            "
          >
            <span class="text-base">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </button>
        </nav>

        <div class="border-t border-[#d0d4db] mt-6 pt-7">
          <p class="text-[17px] font-semibold text-[#44546f] mb-3 px-2">
            Các Không gian làm việc
          </p>

          <button
            type="button"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#d1d3d7] hover:bg-[#c5c9cf] transition-colors"
            @click="workspaceOpen = !workspaceOpen"
            :aria-expanded="workspaceOpen"
          >
            <div
              class="w-8 h-8 rounded-md bg-gradient-to-br from-[#8f5fd3] to-[#1669e2] text-white font-semibold flex items-center justify-center"
            >
              T
            </div>
            <span class="text-[15px] font-medium text-[#172b4d]">
              Trello Không gian làm việc
            </span>
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
              class="w-full flex items-center gap-3 pl-14 pr-3 py-2 rounded-lg transition-colors text-left"
              :class="
                activeWorkspaceSection === 'board'
                  ? 'bg-[#dce4f0]'
                  : 'hover:bg-[#e9ebef]'
              "
              @click="activeWorkspaceSection = 'board'"
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
              <span class="text-[17px] text-[#172b4d]">Bảng</span>
            </button>

            <router-link
              to="/workspace/members"
              class="w-full flex items-center gap-3 pl-14 pr-3 py-2 rounded-lg hover:bg-[#e9ebef] transition-colors text-left"
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
              <span class="text-[17px] text-[#172b4d]">Thành viên</span>
              <span class="ml-auto text-[24px] leading-none text-[#172b4d]">+</span>
            </router-link>

            <router-link
              to="/workspace/settings"
              class="w-full flex items-center gap-3 pl-14 pr-3 py-2 rounded-lg hover:bg-[#e9ebef] transition-colors text-left"
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
              <span class="text-[17px] text-[#172b4d]">Cài đặt</span>
            </router-link>
          </div>
        </div>
      </aside>

      <main class="flex-1 px-6 py-9 lg:px-12">
        <section v-if="activeWorkspaceSection === 'board'" class="max-w-[1160px] mx-auto">
          <div class="flex items-center gap-4">
            <div
              class="w-16 h-16 rounded-md bg-gradient-to-br from-[#8f5fd3] to-[#1669e2] text-white text-5xl font-semibold flex items-center justify-center"
            >
              T
            </div>

            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-[24px] font-semibold text-[#2c2f36]">
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

          <div class="border-b border-[#c9cbd1] mt-8 mb-8" />

          <div class="pb-8">
            <svg
              class="mx-auto w-[520px] max-w-full h-auto"
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

            <p class="max-w-[760px] mx-auto mt-8 text-center text-[18px] leading-[1.5] text-[#44546f]">
              Các bảng là nơi hoàn thành công việc ở Trello. Trên bảng, bạn có thể di
              chuyển các thẻ giữa các danh sách để giữ cho các dự án, nhiệm vụ và hơn
              thế nữa luôn đi đúng hướng.
            </p>

            <div class="mt-8 flex justify-center">
              <button
                type="button"
                class="inline-flex items-center justify-center px-8 h-11 rounded-lg bg-[#0c66e4] text-white text-[18px] font-semibold hover:bg-[#0055cc] border border-[#0055cc]"
                @click="isCreateBoardOpen = true"
              >
                Tạo bảng đầu tiên của bạn
              </button>
            </div>
          </div>
        </section>

        <template v-else>
          <section class="mb-14">
            <div class="flex items-center gap-3 mb-5">
              <span class="text-xl">◷</span>
              <h2 class="text-[22px] font-bold text-[#172b4d]">Đã xem gần đây</h2>
            </div>

            <router-link
              to="/projects/1"
              class="group block w-[320px] rounded-xl overflow-hidden border border-[#c8ced8] bg-white shadow-sm hover:shadow-md transition-shadow"
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
              <div class="px-3 py-2 text-[18px] font-medium text-[#172b4d]">
                Premortem
              </div>
            </router-link>
          </section>

          <section class="max-w-[1280px]">
            <h2 class="text-[24px] font-bold uppercase text-[#44546f] mb-6">
              Các không gian làm việc của bạn
            </h2>

            <div
              class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-5"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-md bg-gradient-to-br from-[#8f5fd3] to-[#1669e2] text-white text-xl font-semibold flex items-center justify-center"
                >
                  T
                </div>
                <h3 class="text-[24px] font-semibold">
                  Trello Không gian làm việc
                </h3>
              </div>

              <div class="flex flex-wrap gap-3">
                <button
                  v-for="action in workspaceActions"
                  :key="action.label"
                  type="button"
                  class="h-9 px-3.5 rounded-md text-[18px] border border-[#d0d4db] bg-[#e9ebef] hover:bg-[#dde1e7] flex items-center gap-2"
                  :class="
                    action.upgrade
                      ? 'bg-[#e8d9f2] border-[#e8d9f2] hover:bg-[#dbc5eb]'
                      : ''
                  "
                >
                  <span>{{ action.icon }}</span>
                  <span>{{ action.label }}</span>
                </button>
              </div>
            </div>

            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-9">
              <button
                type="button"
                class="h-34 rounded-xl border border-[#d0d4db] bg-[#e5e7eb] text-[20px] text-[#44546f] hover:bg-[#dce0e6] flex items-center justify-center transition-colors"
                @click="isCreateBoardOpen = true"
              >
                Tạo bảng mới
              </button>
            </div>

            <button
              type="button"
              class="h-9 px-4 rounded-md border border-[#d0d4db] bg-[#e9ebef] text-[18px] hover:bg-[#dde1e7]"
            >
              Xem tất cả các bảng đã đóng
            </button>
          </section>
        </template>
      </main>
    </div>

    <CreateBoardModal v-model="isCreateBoardOpen" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import WorkspaceHeader from "@/components/common/WorkspaceHeader.vue";
import CreateBoardModal from "@/components/modals/CreateBoardModal.vue";

const searchKeyword = ref("");
const workspaceOpen = ref(false);
const activeWorkspaceSection = ref("home");
const isCreateBoardOpen = ref(false);

const mainMenus = [
  { label: "Bảng", icon: "▣", active: true },
  { label: "Mẫu", icon: "◫", active: false },
  { label: "Trang chủ", icon: "⌁", active: false },
];

const workspaceActions = [
  { label: "Bảng", icon: "▣", upgrade: false },
  { label: "Thành viên", icon: "◔", upgrade: false },
  { label: "Cài đặt", icon: "⚙", upgrade: false },
  { label: "Nâng cấp", icon: "▤", upgrade: true },
];
</script>