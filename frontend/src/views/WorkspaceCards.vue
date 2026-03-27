<template>
  <div class="min-h-screen bg-[#f1f2f4] text-[#172b4d]">
    <div class="relative flex min-h-screen">
      <button
        type="button"
        class="absolute top-16 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#dfe1e6] text-[#2c2f36] transition-[left] duration-200"
        :class="isSidebarCollapsed ? 'left-3' : 'left-[274px]'"
        :aria-label="
          isSidebarCollapsed
            ? 'Mở cài đặt không gian làm việc'
            : 'Thu gọn cài đặt không gian làm việc'
        "
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

          <button
            type="button"
            class="flex w-full items-center gap-3 rounded-lg border border-[#0c66e4] bg-[#dce4f0] px-3 py-2 text-[#0c66e4]"
          >
            <span class="text-[15px] font-semibold">Thẻ</span>
          </button>

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

      <main class="relative min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <router-link
          to="/workspace/boards"
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

        <div class="max-w-[1180px] pt-4 pr-12 sm:pr-0">
          <h1 class="mb-5 text-[28px] font-semibold">Thẻ</h1>

          <div class="relative mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-end">
            <div ref="sortMenuRef" class="relative w-full sm:w-auto">
              <button
                type="button"
                class="flex min-h-10 w-full items-center justify-between rounded-md border bg-white px-4 py-2 text-[13px] font-medium transition-colors sm:w-auto sm:min-w-[290px]"
                :class="
                  showSortMenu
                    ? 'border-[#0c66e4] text-[#0c66e4] shadow-[inset_0_0_0_1px_#0c66e4]'
                    : 'border-[#d0d4db] text-[#172b4d] hover:bg-[#f7f8fa]'
                "
                @click="toggleSortMenu"
              >
                <span>{{ selectedSortOption.label }}</span>
                <svg
                  class="h-4 w-4 transition-transform"
                  :class="{ 'rotate-180': showSortMenu }"
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
                v-if="showSortMenu"
                class="absolute left-0 top-[calc(100%+10px)] z-30 w-full overflow-hidden rounded-md border border-[#d0d4db] bg-white shadow-[0_8px_16px_rgba(9,30,66,0.15)] sm:w-[290px]"
              >
                <button
                  v-for="option in sortOptions"
                  :key="option.id"
                  type="button"
                  class="flex w-full items-center border-l-[3px] px-4 py-3 text-left text-[13px] transition-colors"
                  :class="
                    selectedSort === option.id
                      ? 'border-[#0c66e4] bg-[#deebff] text-[#0c66e4]'
                      : 'border-transparent text-[#172b4d] hover:bg-[#f7f8fa]'
                  "
                  @click="selectSort(option.id)"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>

            <div ref="filterPanelRef" class="relative w-full sm:w-auto">
              <button
                type="button"
                class="flex h-10 w-full items-center justify-between gap-2 rounded-md border px-3.5 text-[13px] font-medium transition-colors sm:w-auto"
                :class="
                  showFilterPanel
                    ? 'border-[#0c66e4] bg-white text-[#0c66e4] shadow-[inset_0_0_0_1px_#0c66e4]'
                    : 'border-[#d0d4db] bg-[#dfe1e6] text-[#172b4d] hover:bg-[#d0d4db]'
                "
                @click="toggleFilterPanel"
              >
                <svg
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M4 7H20M7 12H17M10 17H14"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
                <span>Lọc thẻ</span>
              </button>

              <div
                v-if="showFilterPanel"
                class="absolute left-0 right-0 top-[calc(100%+12px)] z-30 w-auto rounded-xl border border-[#d0d4db] bg-white px-5 py-5 shadow-[0_12px_24px_rgba(9,30,66,0.22)] sm:left-auto sm:right-0 sm:w-[360px] sm:max-w-[calc(100vw-3rem)]"
              >
                <div class="mb-5 flex items-center justify-between">
                  <h2 class="text-[18px] font-semibold">Lọc thẻ</h2>
                  <button
                    type="button"
                    class="flex h-8 w-8 items-center justify-center rounded-full text-[#44546f] hover:bg-[#f1f2f4]"
                    aria-label="Đóng bộ lọc"
                    @click="closeFilterPanel"
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

                <div class="max-h-[70vh] space-y-6 overflow-y-auto pr-1">
                  <section>
                    <h3 class="mb-3 text-[14px] font-semibold text-[#44546f]">Thẻ</h3>
                    <input
                      v-model="filterState.keyword"
                      type="text"
                      placeholder="Nhập từ khóa..."
                      class="h-11 w-full rounded-md border border-[#0c66e4] px-3.5 text-[14px] outline-none ring-1 ring-[#0c66e4]/20 placeholder:text-[#7a869a]"
                    />
                    <p class="mt-2 text-[12px] text-[#6b778c]">Lọc theo từ khóa tên thẻ.</p>
                  </section>

                  <section>
                    <h3 class="mb-3 text-[14px] font-semibold text-[#44546f]">Trạng thái thẻ</h3>
                    <label
                      v-for="option in statusOptions"
                      :key="option.id"
                      class="mb-3 flex cursor-pointer items-center gap-3 text-[14px] text-[#172b4d] last:mb-0"
                    >
                      <input
                        v-model="filterState.statuses[option.id]"
                        type="checkbox"
                        class="h-5 w-5 rounded border-[#8590a2] text-[#0c66e4] focus:ring-[#0c66e4]"
                      />
                      <span>{{ option.label }}</span>
                    </label>
                  </section>

                  <section>
                    <h3 class="mb-3 text-[14px] font-semibold text-[#44546f]">Ngày đến hạn</h3>
                    <label
                      v-for="option in dueDateOptions"
                      :key="option.id"
                      class="mb-3 flex cursor-pointer items-center gap-3 text-[14px] text-[#172b4d] last:mb-0"
                    >
                      <input
                        v-model="filterState.dueDates[option.id]"
                        type="checkbox"
                        class="h-5 w-5 rounded border-[#8590a2] text-[#0c66e4] focus:ring-[#0c66e4]"
                      />
                      <span
                        class="flex h-8 w-8 items-center justify-center rounded-full"
                        :class="option.iconClass"
                      >
                        <svg
                          v-if="option.icon === 'calendar'"
                          class="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M8 4.5V7M16 4.5V7M5.5 9.5H18.5M7 6.5H17C18.1 6.5 19 7.4 19 8.5V17C19 18.1 18.1 19 17 19H7C5.9 19 5 18.1 5 17V8.5C5 7.4 5.9 6.5 7 6.5Z"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <svg
                          v-else
                          class="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8" />
                          <path
                            d="M12 8V12L14.8 14.4"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                      <span class="leading-[1.35]">{{ option.label }}</span>
                    </label>
                  </section>

                  <section>
                    <h3 class="mb-3 text-[14px] font-semibold text-[#44546f]">Bảng thông tin</h3>
                    <div class="relative">
                      <button
                        type="button"
                        class="flex h-10 w-full items-center justify-between rounded-md border border-transparent px-3 text-[14px] text-[#44546f] hover:bg-[#f7f8fa]"
                        @click="showBoardMenu = !showBoardMenu"
                      >
                        <span>{{ selectedBoardLabel }}</span>
                        <svg
                          class="h-4 w-4 transition-transform"
                          :class="{ 'rotate-180': showBoardMenu }"
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
                        v-if="showBoardMenu"
                        class="mt-2 overflow-hidden rounded-md border border-[#d0d4db] bg-white shadow-[0_8px_16px_rgba(9,30,66,0.15)]"
                      >
                        <button
                          type="button"
                          class="flex w-full items-center px-3 py-2 text-left text-[13px] text-[#172b4d] hover:bg-[#f7f8fa]"
                          @click="selectBoard('')"
                        >
                          Lọc theo bảng thông tin...
                        </button>
                        <button
                          v-for="option in boardOptions"
                          :key="option.id"
                          type="button"
                          class="flex w-full items-center px-3 py-2 text-left text-[13px] text-[#172b4d] hover:bg-[#f7f8fa]"
                          @click="selectBoard(option.id)"
                        >
                          {{ option.label }}
                        </button>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 class="mb-3 text-[14px] font-semibold text-[#44546f]">Hoạt động</h3>
                    <label
                      v-for="option in activityOptions"
                      :key="option.id"
                      class="mb-3 flex cursor-pointer items-center gap-3 text-[14px] text-[#172b4d] last:mb-0"
                    >
                      <input
                        v-model="filterState.activity[option.id]"
                        type="checkbox"
                        class="h-5 w-5 rounded border-[#8590a2] text-[#0c66e4] focus:ring-[#0c66e4]"
                      />
                      <span>{{ option.label }}</span>
                    </label>
                  </section>
                </div>
              </div>
            </div>

            <button
              type="button"
              class="h-10 w-full rounded-md border px-3.5 text-[13px] font-medium transition-colors sm:w-auto"
              :class="
                hasActiveFilters
                  ? 'border-[#d0d4db] bg-white text-[#172b4d] hover:bg-[#f7f8fa]'
                  : 'border-[#d0d4db] bg-[#eef0f3] text-[#6b778c]'
              "
              :disabled="!hasActiveFilters"
              @click="clearFilters"
            >
              Xóa bộ lọc
            </button>
          </div>

          <div
            v-if="displayedCards.length"
            class="overflow-x-auto rounded-lg border border-[#d0d4db] bg-white"
          >
            <div
              class="grid min-w-[700px] grid-cols-[minmax(0,2.2fr)_1fr_1fr_1.25fr_1.45fr] gap-4 border-b border-[#dfe1e6] px-5 py-3 text-[14px] font-medium text-[#44546f]"
            >
              <div>Thẻ</div>
              <div>Danh sách</div>
              <div>Nhãn</div>
              <div>Ngày đến hạn</div>
              <div>Bảng thông tin</div>
            </div>

            <div
              v-for="card in displayedCards"
              :key="card.id"
              class="grid min-w-[700px] grid-cols-[minmax(0,2.2fr)_1fr_1fr_1.25fr_1.45fr] items-center gap-4 border-b border-[#dfe1e6] px-5 py-3 text-[14px] last:border-b-0"
            >
              <div class="flex min-w-0 items-center gap-3">
                <span
                  class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#5aac44] text-white"
                >
                  <svg
                    class="h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 12.5L10.2 15.7L17 8.8"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <span class="truncate text-[15px] text-[#44546f]">{{ card.title }}</span>
              </div>

              <div class="text-[15px] text-[#44546f]">{{ card.listName }}</div>

              <div>
                <span
                  class="inline-flex min-w-[52px] items-center justify-center rounded-[4px] px-3 py-1 text-[12px] font-semibold"
                  :class="card.labelClass"
                >
                  {{ card.label }}
                </span>
              </div>

              <div>
                <span
                  class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium"
                  :class="card.dueDateClass"
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
                      d="M12 8V12L14.8 14.4"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span>{{ card.dueDateLabel }}</span>
                </span>
              </div>

              <div class="flex min-w-0 items-center gap-3">
                <div
                  class="h-8 w-12 shrink-0 rounded-[3px]"
                  :style="{ background: card.boardBackground }"
                ></div>
                <div class="min-w-0">
                  <div class="truncate text-[15px] text-[#172b4d]">{{ card.boardName }}</div>
                  <div class="truncate text-[12px] text-[#626f86]">{{ card.boardSubtitle }}</div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="flex h-[144px] items-center justify-center rounded-lg bg-[#dfe1e6] px-5 text-center text-[18px] text-[#44546f]"
          >
            Không nhìn thấy thẻ nào. Bạn phải được thêm vào thẻ để thẻ xuất hiện ở đây.
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useResponsiveSidebarCollapse } from "@/composables/useResponsiveSidebarCollapse.js";

const isSidebarCollapsed = ref(false);
useResponsiveSidebarCollapse(isSidebarCollapsed);
const sortMenuRef = ref(null);
const filterPanelRef = ref(null);
const showSortMenu = ref(false);
const showFilterPanel = ref(false);
const showBoardMenu = ref(false);

const sortOptions = [
  { id: "board", label: "Sắp xếp theo bảng thông tin" },
  { id: "due-date", label: "Sắp xếp theo ngày đến hạn" },
];

const statusOptions = [
  { id: "completed", label: "Đã đánh dấu là hoàn tất" },
  { id: "notCompleted", label: "Chưa đánh dấu là đã hoàn tất" },
];

const dueDateOptions = [
  {
    id: "noDate",
    label: "Không có ngày",
    icon: "calendar",
    iconClass: "bg-[#f1f2f4] text-[#5e6c84]",
  },
  {
    id: "overdue",
    label: "Quá hạn",
    icon: "clock",
    iconClass: "bg-[#c9372c] text-white",
  },
  {
    id: "tomorrow",
    label: "Đến hạn vào ngày mai",
    icon: "clock",
    iconClass: "bg-[#f5cd47] text-[#172b4d]",
  },
  {
    id: "nextSevenDays",
    label: "Đến hạn trong bảy ngày tới",
    icon: "clock",
    iconClass: "bg-[#f1f2f4] text-[#5e6c84]",
  },
  {
    id: "nextMonth",
    label: "Đến hạn vào tháng sau",
    icon: "clock",
    iconClass: "bg-[#f1f2f4] text-[#5e6c84]",
  },
];

const activityOptions = [
  { id: "lastDay", label: "Hoạt động trong ngày vừa qua" },
  { id: "lastWeek", label: "Hoạt động trong tuần vừa qua" },
  { id: "lastMonth", label: "Hoạt động trong tháng vừa qua" },
  { id: "lastYear", label: "Hoạt động trong năm vừa qua" },
];

const workspaceCards = ref([
  {
    id: "card-header",
    title: "Header",
    listName: "Done",
    label: "FE",
    labelClass: "bg-[#4bce97] text-[#164b35]",
    dueDateLabel: "20 thg 6, 2025",
    dueDateClass: "bg-[#dcfff1] text-[#216e4e]",
    dueTimestamp: new Date("2025-06-20").getTime(),
    boardId: "cellphones",
    boardName: "CellPhoneS",
    boardSubtitle: "không gian làm việc của Lô...",
    boardBackground: "linear-gradient(135deg,#4f46d9,#d9469b)",
    completed: true,
    dueFilterIds: ["nextMonth"],
    activityFilterIds: ["lastMonth", "lastYear"],
    updatedAt: new Date("2025-06-19").getTime(),
  },
]);

const selectedSort = ref("board");
const filterState = reactive({
  keyword: "",
  statuses: {
    completed: false,
    notCompleted: false,
  },
  dueDates: {
    noDate: false,
    overdue: false,
    tomorrow: false,
    nextSevenDays: false,
    nextMonth: false,
  },
  board: "",
  activity: {
    lastDay: false,
    lastWeek: false,
    lastMonth: false,
    lastYear: false,
  },
});

const boardOptions = computed(() => {
  const seenBoards = new Set();

  return workspaceCards.value.reduce((options, card) => {
    if (seenBoards.has(card.boardId)) {
      return options;
    }

    seenBoards.add(card.boardId);
    options.push({
      id: card.boardId,
      label: card.boardName,
    });

    return options;
  }, []);
});

const selectedSortOption = computed(
  () => sortOptions.find((option) => option.id === selectedSort.value) ?? sortOptions[0]
);

const selectedBoardLabel = computed(() => {
  const selectedBoard = boardOptions.value.find((option) => option.id === filterState.board);
  return selectedBoard?.label ?? "Lọc theo bảng thông tin...";
});

const displayedCards = computed(() => {
  let cards = [...workspaceCards.value];
  const keyword = filterState.keyword.trim().toLowerCase();

  if (keyword) {
    cards = cards.filter((card) => card.title.toLowerCase().includes(keyword));
  }

  const activeStatuses = Object.entries(filterState.statuses)
    .filter(([, isActive]) => isActive)
    .map(([id]) => id);

  if (activeStatuses.length === 1) {
    cards = cards.filter((card) =>
      activeStatuses[0] === "completed" ? card.completed : !card.completed
    );
  }

  const activeDueDates = Object.entries(filterState.dueDates)
    .filter(([, isActive]) => isActive)
    .map(([id]) => id);

  if (activeDueDates.length) {
    cards = cards.filter((card) =>
      activeDueDates.some((dueDateId) => card.dueFilterIds.includes(dueDateId))
    );
  }

  if (filterState.board) {
    cards = cards.filter((card) => card.boardId === filterState.board);
  }

  const activeActivity = Object.entries(filterState.activity)
    .filter(([, isActive]) => isActive)
    .map(([id]) => id);

  if (activeActivity.length) {
    cards = cards.filter((card) =>
      activeActivity.some((activityId) => card.activityFilterIds.includes(activityId))
    );
  }

  if (selectedSort.value === "due-date") {
    cards.sort((a, b) => a.dueTimestamp - b.dueTimestamp);
  } else {
    cards.sort((a, b) => {
      const boardCompare = a.boardName.localeCompare(b.boardName, "vi");
      if (boardCompare !== 0) return boardCompare;
      return a.title.localeCompare(b.title, "vi");
    });
  }

  return cards;
});

const hasActiveFilters = computed(() => {
  const hasKeyword = filterState.keyword.trim().length > 0;
  const hasStatuses = Object.values(filterState.statuses).some(Boolean);
  const hasDueDates = Object.values(filterState.dueDates).some(Boolean);
  const hasBoard = filterState.board !== "";
  const hasActivity = Object.values(filterState.activity).some(Boolean);

  return hasKeyword || hasStatuses || hasDueDates || hasBoard || hasActivity;
});

const toggleSortMenu = () => {
  showSortMenu.value = !showSortMenu.value;

  if (showSortMenu.value) {
    showFilterPanel.value = false;
    showBoardMenu.value = false;
  }
};

const selectSort = (sortId) => {
  selectedSort.value = sortId;
  showSortMenu.value = false;
};

const toggleFilterPanel = () => {
  showFilterPanel.value = !showFilterPanel.value;

  if (showFilterPanel.value) {
    showSortMenu.value = false;
  } else {
    showBoardMenu.value = false;
  }
};

const closeFilterPanel = () => {
  showFilterPanel.value = false;
  showBoardMenu.value = false;
};

const selectBoard = (boardId) => {
  filterState.board = boardId;
  showBoardMenu.value = false;
};

const clearFilters = () => {
  filterState.keyword = "";
  filterState.board = "";
  showBoardMenu.value = false;

  Object.keys(filterState.statuses).forEach((key) => {
    filterState.statuses[key] = false;
  });

  Object.keys(filterState.dueDates).forEach((key) => {
    filterState.dueDates[key] = false;
  });

  Object.keys(filterState.activity).forEach((key) => {
    filterState.activity[key] = false;
  });
};

const handleDocumentClick = (event) => {
  const target = event.target;

  if (showSortMenu.value && sortMenuRef.value && !sortMenuRef.value.contains(target)) {
    showSortMenu.value = false;
  }

  if (showFilterPanel.value && filterPanelRef.value && !filterPanelRef.value.contains(target)) {
    closeFilterPanel();
  }
};

onMounted(() => {
  document.addEventListener("click", handleDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleDocumentClick);
});
</script>
