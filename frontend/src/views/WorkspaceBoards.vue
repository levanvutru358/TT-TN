<template>
  <div class="min-h-screen bg-[#f1f2f4] text-[#172b4d]">
    <div class="relative flex min-h-screen">
      <button
        type="button"
        class="absolute top-16 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#dfe1e6] text-[#2c2f36] transition-[left] duration-200"
        :class="isSidebarCollapsed ? 'left-3' : 'left-[274px]'"
        :aria-label="isSidebarCollapsed ? 'Mở cài đặt không gian làm việc' : 'Thu gọn cài đặt không gian làm việc'"
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

          <router-link
            to="/personal/settings"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-[#e9ebef]"
          >
            <span class="text-[15px] font-semibold">Cài đặt</span>
          </router-link>
        </div>

        <div class="mt-8 border-t border-[#d0d4db] pt-7">
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

          <button
            type="button"
            class="flex w-full items-center gap-3 rounded-lg border border-[#0c66e4] bg-[#dce4f0] px-3 py-2 text-[#0c66e4]"
          >
            <svg
              class="h-[18px] w-[18px]"
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
          </button>

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
          to="/"
          class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#dfe1e6] text-[#2c2f36] hover:bg-[#d0d4db]"
          aria-label="Đóng"
        >
          <svg
            class="h-[18px] w-[18px]"
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

        <div class="max-w-[1180px]">
          <h1 class="mb-5 text-[28px] font-semibold">Bảng</h1>

          <div class="mb-10 grid grid-cols-1 items-end gap-4 xl:grid-cols-12">
            <div class="relative xl:col-span-3">
              <label class="mb-1 block text-[15px] font-semibold">Sắp xếp theo</label>
              <button
                type="button"
                class="flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 text-left transition-colors"
                :class="
                  showSortDropdown
                    ? 'border-[#0c66e4] shadow-[inset_0_0_0_1px_#0c66e4]'
                    : 'border-[#9fadbc]'
                "
                @click="
                  showSortDropdown = !showSortDropdown;
                  if (showSortDropdown) showFilterDropdown = false;
                "
              >
                <span class="truncate pr-3 text-[15px]">{{ selectedSortLabel }}</span>
                <svg
                  class="h-4 w-4 text-[#44546f]"
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

              <button
                v-if="showSortDropdown"
                type="button"
                class="fixed inset-0 z-10 cursor-default"
                aria-label="Đóng sắp xếp"
                @click="showSortDropdown = false"
              />

              <div
                v-if="showSortDropdown"
                class="absolute left-0 top-[calc(100%+8px)] z-20 w-full overflow-hidden rounded-md border border-[#d0d4db] bg-white shadow-[0_8px_16px_rgba(9,30,66,0.16)]"
              >
                <button
                  v-for="option in sortOptions"
                  :key="option.id"
                  type="button"
                  class="w-full border-l-2 px-4 py-3 text-left text-[15px] transition-colors"
                  :class="
                    selectedSort === option.id
                      ? 'border-l-[#0c66e4] bg-[#dce4f0] text-[#0c66e4]'
                      : 'border-l-transparent text-[#172b4d] hover:bg-[#f4f5f7]'
                  "
                  @click="selectSortOption(option.id)"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>

            <div class="relative xl:col-span-3">
              <label class="mb-1 block text-[15px] font-semibold">Lọc theo</label>
              <button
                type="button" @click="showFilterDropdown = !showFilterDropdown; if (showFilterDropdown) showSortDropdown = false;"
                class="flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 text-left transition-colors"
                :class="
                  showFilterDropdown
                    ? 'border-[#0c66e4] shadow-[inset_0_0_0_1px_#0c66e4]'
                    : 'border-[#9fadbc]'
                "
              >
                <span class="truncate pr-3 text-[15px]" :class="selectedFilter === 'all' ? 'text-[#7a869a]' : 'text-[#172b4d]'">{{ selectedFilter === 'all' ? 'Chon bo suu tap' : selectedFilter === 'private' ? 'Rieng tu' : selectedFilter === 'workspace' ? 'Khong gian lam viec' : 'Cong khai' }}</span>
                <svg class="h-4 w-4 text-[#44546f]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </button>
              <button v-if="showFilterDropdown" type="button" class="fixed inset-0 z-10 cursor-default" aria-label="????ng l???c" @click="showFilterDropdown = false" /><div v-if="showFilterDropdown" class="absolute left-0 top-[calc(100%+8px)] z-20 w-full overflow-hidden rounded-md border border-[#d0d4db] bg-white shadow-[0_8px_16px_rgba(9,30,66,0.16)]"><button v-for="option in filterOptions" :key="option.id" type="button" class="w-full border-l-2 px-4 py-3 text-left text-[15px] transition-colors" :class="selectedFilter === option.id ? 'border-l-[#0c66e4] bg-[#dce4f0] text-[#0c66e4]' : 'border-l-transparent text-[#172b4d] hover:bg-[#f4f5f7]'" @click="selectFilterOption(option.id)">{{ option.label }}</button></div>
            </div>

            <div class="xl:col-span-3 xl:col-start-10">
              <label class="mb-1 block text-[15px] font-semibold">Tìm kiếm</label>
              <div class="flex h-10 items-center gap-3 rounded-md border border-[#9fadbc] bg-white px-3">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Tìm kiếm các bảng"
                  class="w-full bg-transparent text-[15px] placeholder:text-[#7a869a] outline-none"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-4">
            <router-link
              v-for="board in displayedBoards"
              :key="board.id"
              :to="{
                name: 'ProjectDetail',
                params: { id: board.id },
                query: {
                  title: board.name,
                  bg: board.background,
                  visibility: board.visibility
                }
              }"
              class="group relative flex h-[96px] w-[248px] overflow-hidden rounded-xl border border-[#c4c9d1] bg-[#dfe1e6] transition-transform hover:-translate-y-0.5"
            >
              <div class="absolute inset-0" :style="{ background: board.background }"></div>
              <div
                class="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,30,66,0.04),rgba(9,30,66,0.45))]"
              ></div>
              <div class="relative mt-auto p-4">
                <p class="text-[18px] font-semibold text-white">{{ board.name }}</p>
              </div>
            </router-link>

            <button
              ref="createBoardTileRef"
              type="button"
              class="flex h-[96px] w-[248px] items-center justify-center rounded-xl border border-[#c4c9d1] bg-[#dfe1e6] text-[20px] text-[#44546f] transition-colors hover:bg-[#d4d9e1]"
              @click="openCreateBoardModal"
            >
              Tạo bảng mới
            </button>
          </div>
        </div>
      </main>

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
              class="flex h-10 w-10 items-center justify-center rounded-full text-[#172b4d] hover:bg-[#f1f2f4]"
              aria-label="Đóng"
              @click="closeCreateBoardModal"
            >
              <svg
                class="h-6 w-6"
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
                class="h-10 rounded-md border-2 transition-[border-color,filter]"
                :class="
                  selectedBoardBackground === bg
                    ? 'border-[#0c66e4]'
                    : 'border-transparent hover:brightness-[1.03]'
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
                class="h-8 rounded-md border-2 transition-[border-color,filter]"
                :class="
                  selectedBoardBackground === bg
                    ? 'border-[#0c66e4]'
                    : 'border-transparent hover:brightness-[1.03]'
                "
                :style="{ background: bg }"
                @click="selectedBoardBackground = bg"
              />
              <button
                type="button"
                class="h-8 rounded-md bg-[#dfe1e6] text-[20px] leading-none text-[#8c99ad]"
                disabled
                aria-label="Nhiều lựa chọn hơn"
              >
                ...
              </button>
            </div>
          </div>

          <label class="mt-2.5 block">
            <span class="text-[14px] font-semibold text-[#44546f]">
              Tiêu đề bảng <span class="text-[#e2483d]">*</span>
            </span>
            <input
              v-model="newBoardTitle"
              type="text"
              class="mt-1 h-10 w-full rounded-md border bg-white px-3 text-[14px] outline-none"
              :class="
                newBoardTitle.trim().length === 0

                  ? 'border-[#0c66e4] focus:ring-1 focus:ring-[#0c66e4]'
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

          <div class="relative mt-3">
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
                  <div>
                    <p class="text-[14px] font-semibold text-[#172b4d]">{{ option.label }}</p>
                    <p class="text-[12px] leading-[1.35] text-[#44546f]">
                      {{ option.description }}
                    </p>
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
                : 'cursor-not-allowed bg-[#dfe1e6] text-[#97a0af]'
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
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from "vue";
import { useRouter } from "vue-router";
import { useResponsiveSidebarCollapse } from "@/composables/useResponsiveSidebarCollapse.js";
import { useWorkspaceBoardsState } from "@/composables/stages/useWorkspaceBoardsState.js";

const router = useRouter();

const isSidebarCollapsed = ref(false);
useResponsiveSidebarCollapse(isSidebarCollapsed);

const sortOptions = [
  { id: "recent-desc", label: "Hoạt động gần đây nhất" },
  { id: "recent-asc", label: "Ít hoạt động nhất gần đây" },
  { id: "alpha-asc", label: "Theo bảng chữ cái A-Z" },
  { id: "alpha-desc", label: "Theo bảng chữ cái Z-A" },
];
const filterOptions = [{ id: "all", label: "Chon bo suu tap" }, { id: "private", label: "Rieng tu" }, { id: "workspace", label: "Khong gian lam viec" }, { id: "public", label: "Cong khai" }];
const showSortDropdown = ref(false);
const selectedSort = ref("recent-desc");
const searchQuery = ref("");
const showFilterDropdown = ref(false); const selectedFilter = ref("all");
const { workspaceBoards } = useWorkspaceBoardsState();

const showCreateBoardModal = ref(false);
const createBoardTileRef = ref(null);
const createBoardModalRef = ref(null);
const createBoardModalStyle = ref({
  top: "56px",
  left: "8px",
  width: "320px",
});

const newBoardTitle = ref("");
const showVisibilityDropdown = ref(false);
const selectedVisibility = ref("workspace");

const createBoardImageBackgrounds = [
  "linear-gradient(145deg,#6f4a2a 0%,#9b7042 40%,#4f3b2a 100%)",
  "linear-gradient(145deg,#f7a347 0%,#f28b2f 45%,#5f3f1f 100%)",
  "linear-gradient(145deg,#d5b18b 0%,#efd6b6 45%,#a36f44 100%)",
  "linear-gradient(145deg,#8aa95b 0%,#5c7e3c 45%,#2f4d27 100%)",
];

const createBoardColorBackgrounds = [
  "#cfdcf0",
  "linear-gradient(135deg,#35b2d6,#2a63d3)",
  "linear-gradient(135deg,#0f5ec8,#1545a4)",
  "linear-gradient(135deg,#2d3c88,#b14484)",
  "linear-gradient(135deg,#8161d0,#de67a9)",
];

const selectedBoardBackground = ref(createBoardImageBackgrounds[0]);

const visibilityOptions = [
  {
    id: "private",
    label: "Riêng tư",
    description:
      "Chỉ thành viên bảng thông tin mới có quyền xem bảng thông tin này. Quản trị viên Không gian làm việc có thể đóng bảng thông tin và xoá thành viên.",
  },
  {
    id: "workspace",
    label: "Không gian làm việc",
    description:
      "Tất cả thành viên của Không gian làm việc Trello có thể xem và sửa bảng thông tin này.",
  },
  {
    id: "public",
    label: "Công khai",
    description:
      "Bất kỳ ai trên mạng internet đều có thể xem bảng thông tin này. Chỉ thành viên bảng thông tin mới có quyền sửa.",
  },
];

const canCreateBoard = computed(() => newBoardTitle.value.trim().length > 0);

const selectedVisibilityOption = computed(
  () =>
    visibilityOptions.find((item) => item.id === selectedVisibility.value) || visibilityOptions[1]
);

const selectedSortLabel = computed(
  () =>
    sortOptions.find((option) => option.id === selectedSort.value)?.label ||
    sortOptions[0].label
);

const displayedBoards = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  let boards = [...workspaceBoards.value];
  if (selectedFilter.value !== "all") { boards = boards.filter((board) => board.visibility === selectedFilter.value); }
  if (query) {
    boards = boards.filter((board) => board.name.toLowerCase().includes(query));
  }

  switch (selectedSort.value) {
    case "recent-asc":
      boards.sort((a, b) => a.updatedAt - b.updatedAt);
      break;
    case "alpha-asc":
      boards.sort((a, b) => a.name.localeCompare(b.name, "vi"));
      break;
    case "alpha-desc":
      boards.sort((a, b) => b.name.localeCompare(a.name, "vi"));
      break;
    default:
      boards.sort((a, b) => b.updatedAt - a.updatedAt);
      break;
  }

  return boards;
});

const selectSortOption = (id) => {
  selectedSort.value = id;
  showSortDropdown.value = false;
};
const selectFilterOption = (id) => { selectedFilter.value = id; showFilterDropdown.value = false; };
const selectVisibilityMode = (mode) => {
  selectedVisibility.value = mode;
  showVisibilityDropdown.value = false;
};

const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

const positionCreateBoardModal = (anchorRect) => {
  if (typeof window === "undefined") return;

  const modalWidth = 320;
  const screenPadding = 8;
  const measuredModalWidth = createBoardModalRef.value?.offsetWidth || modalWidth;
  const measuredModalHeight = createBoardModalRef.value?.offsetHeight || 620;

  let top = anchorRect.top - 20;
  let left = anchorRect.right + 12;

  if (left + measuredModalWidth > window.innerWidth - screenPadding) {
    left = anchorRect.left - measuredModalWidth - 12;
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
    width: `${modalWidth}px`,
  };
};

const openCreateBoardModal = async () => {
  showSortDropdown.value = false; showFilterDropdown.value = false;
  newBoardTitle.value = "";
  selectedBoardBackground.value = createBoardImageBackgrounds[0];
  selectedVisibility.value = "workspace";
  showVisibilityDropdown.value = false;

  const tileEl = createBoardTileRef.value;

  if (tileEl && typeof window !== "undefined") {
    const rect = tileEl.getBoundingClientRect();
    positionCreateBoardModal(rect);
    showCreateBoardModal.value = true;
    await nextTick();
    positionCreateBoardModal(rect);
    return;
  }

  showCreateBoardModal.value = true;
};

const closeCreateBoardModal = () => {
  showCreateBoardModal.value = false; showFilterDropdown.value = false;
  showVisibilityDropdown.value = false;
};

const submitCreateBoard = () => {
  if (!canCreateBoard.value) return;

  const newBoard = {
    id: Date.now(),
    name: newBoardTitle.value.trim(),
    background: selectedBoardBackground.value,
    updatedAt: Date.now(),
    visibility: selectedVisibility.value,
  };

  workspaceBoards.value.unshift(newBoard);

  closeCreateBoardModal();
  newBoardTitle.value = "";

  router.push({
    name: "ProjectDetail",
    params: { id: newBoard.id },
    query: {
      title: newBoard.name,
      bg: newBoard.background,
      visibility: newBoard.visibility,
    },
  });
};
</script>
