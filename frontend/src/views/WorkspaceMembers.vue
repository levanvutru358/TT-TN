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
          </button>

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

        <div class="max-w-[1180px] pr-12 sm:pr-0">
          <div class="mb-5 flex flex-wrap items-center gap-3">
            <h1 class="text-[28px] font-semibold">Người cộng tác</h1>
            <span class="rounded-full bg-[#dfe1e6] px-2 py-0.5 text-[13px]">1 / 10</span>
          </div>

          <div
            class="relative mb-6 overflow-hidden rounded-lg border border-[#d0d4db] bg-[#f7f8fa] px-4 py-4 sm:px-5"
          >
            <h2 class="text-[20px] font-semibold">Nâng cấp để kiểm soát nhiều quyền hơn</h2>
            <p class="mt-2 text-[15px] text-[#44546f]">
              Quyết định ai có thể gửi lời mời, chỉnh sửa cài đặt Không gian làm việc và hơn thế nữa với
              Premium.
            </p>
            <a href="#" class="mt-2 inline-block text-[15px] underline">
              Dùng thử Premium miễn phí trong 14 ngày
            </a>
            <div
              class="mt-4 flex h-9 w-9 items-center justify-center rounded-lg bg-[#8f5fd3] text-sm font-semibold text-white sm:absolute sm:bottom-3 sm:right-4 sm:mt-0"
            >
              T
            </div>
          </div>

          <div class="flex items-center gap-5 overflow-x-auto border-b border-[#d0d4db]">
            <button
              v-for="tab in memberTabs"
              :key="tab.id"
              type="button"
              class="whitespace-nowrap border-b-2 pb-3 text-[15px]"
              :class="
                selectedMemberTab === tab.id
                  ? 'border-[#0c66e4] font-semibold text-[#0c66e4]'
                  : 'border-transparent text-[#2c2f36]'
              "
              @click="
                selectedMemberTab = tab.id;
                showMemberBoardsPanel = false;
              "
            >
              {{ tab.label }}
            </button>
          </div>

          <template v-if="selectedMemberTab === 'members'">
            <div class="flex flex-col gap-4 border-b border-[#d0d4db] py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <p class="max-w-[900px] text-[15px] leading-[1.45]">
                Các thành viên trong Không gian làm việc có thể xem và tham gia tất cả các bảng Không gian
                làm việc hiển thị và tạo ra các bảng mới trong Không gian làm việc.
              </p>

              <button
                type="button"
                class="h-9 w-full rounded-md bg-[#0c66e4] px-4 text-[13px] font-semibold text-white hover:bg-[#0055cc] sm:w-auto sm:shrink-0"
                @click="showInviteMemberModal = true"
              >
                Mời các thành viên Không gian làm việc
              </button>
            </div>

            <div class="border-b border-[#d0d4db] py-5">
              <input
                type="text"
                placeholder="Lọc theo tên"
                class="h-9 w-full rounded-md border border-[#9fadbc] bg-white px-3.5 text-[13px] placeholder:text-[#7a869a] outline-none sm:w-[320px]"
              />
            </div>

            <div class="flex flex-col gap-4 border-b border-[#d0d4db] py-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#de350b] text-[16px] font-bold text-white"
              >
                {{ memberProfile.initials }}
              </div>

              <div class="min-w-0 text-[14px] font-semibold">
                <span class="break-words">{{ memberProfile.name }}</span>
                <span class="break-all font-normal text-[#44546f]">{{ memberProfile.handle }}</span>
              </div>

              <div class="text-[13px] text-[#2c2f36] sm:ml-auto sm:text-right">{{ memberProfile.lastActivity }}</div>

              <div class="relative z-20 w-full sm:w-auto">
                <button
                  type="button"
                  class="flex h-9 w-full items-center justify-between gap-2 rounded-md bg-[#e6e7ea] px-3.5 text-[13px] font-semibold hover:bg-[#d9dbe0] sm:w-auto"
                  @click="showMemberBoardsPanel = !showMemberBoardsPanel"
                >
                  <span>Bảng ({{ memberBoardsCount }})</span>
                  <svg
                    class="h-4 w-4 text-[#44546f] transition-transform"
                    :class="{ 'rotate-180': showMemberBoardsPanel }"
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
                  v-if="showMemberBoardsPanel"
                  type="button"
                  class="fixed inset-0 z-10 cursor-default"
                  aria-label="Đóng danh sách bảng"
                  @click="showMemberBoardsPanel = false"
                />

                <div
                  v-if="showMemberBoardsPanel"
                  class="absolute left-0 top-[calc(100%+10px)] z-20 w-[calc(100vw-2rem)] max-w-[320px] overflow-hidden rounded-xl border border-[#d0d4db] bg-white shadow-[0_8px_24px_rgba(9,30,66,0.22)] sm:w-[320px]"
                >
                  <div class="flex items-center justify-between border-b border-[#ebecf0] px-4 py-3">
                    <h3 class="truncate pr-3 text-[15px] font-semibold">
                      Bảng thông tin Không gian làm việc
                    </h3>

                    <button
                      type="button"
                      class="flex h-8 w-8 items-center justify-center rounded-[12px] border border-[#0c66e4] text-[#44546f] hover:bg-[#f7f8fa]"
                      aria-label="Đóng"
                      @click="showMemberBoardsPanel = false"
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

                  <div class="px-4 py-4">
                    <p class="mb-4 text-[14px] leading-[1.45] text-[#172b4d]">
                      {{ memberProfile.name }} là thành viên của các bảng Không gian làm việc sau:
                    </p>

                    <div v-if="workspaceBoards.length" class="space-y-2">
                      <router-link
                        v-for="board in workspaceBoards"
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
                        class="flex items-center gap-3 rounded-md px-1 py-1.5 hover:bg-[#f4f5f7]"
                        @click="showMemberBoardsPanel = false"
                      >
                        <div
                          class="h-10 w-12 shrink-0 rounded-md border border-[#d0d4db]"
                          :style="{ background: board.background }"
                        ></div>
                        <span class="text-[14px] text-[#172b4d]">{{ board.name }}</span>
                      </router-link>
                    </div>

                    <p v-else class="text-[13px] text-[#626f86]">
                      Chưa có bảng nào trong Không gian làm việc này.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                class="h-9 w-full rounded-md bg-[#e6e7ea] px-3.5 text-[13px] font-semibold hover:bg-[#d9dbe0] sm:w-auto"
              >
                Quản trị viên
              </button>

              <button
                type="button"
                class="h-9 w-full rounded-md bg-[#e6e7ea] px-5 text-[13px] font-semibold hover:bg-[#d9dbe0] sm:w-auto"
              >
                Rời đi
              </button>
            </div>
          </template>

          <template v-else>
            <div class="border-b border-[#d0d4db] py-5">
              <p class="text-[15px] leading-[1.45] text-[#172b4d]">
                {{ currentMemberTab.description }}
              </p>
            </div>

            <div class="border-b border-[#d0d4db] py-5 text-center">
              <p class="text-[17px] italic text-[#44546f]">
                {{ currentMemberTab.emptyMessage }}
              </p>
            </div>
          </template>
        </div>
      </main>

      <div
        v-if="showInviteMemberModal"
        class="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto px-4 py-6 sm:items-center"
        role="dialog"
        aria-modal="true"
        aria-label="Mời vào Không gian làm việc"
      >
        <button
          type="button"
          class="absolute inset-0 bg-[rgba(9,30,66,0.54)]"
          aria-label="Đóng mời thành viên"
          @click="closeInviteMemberModal"
        />

        <section
          class="relative z-10 w-full max-w-[730px] rounded-[18px] bg-white px-4 py-6 shadow-[0_18px_40px_rgba(9,30,66,0.32)] sm:px-8 sm:py-7"
        >
          <div class="mb-6 flex items-center justify-between gap-4">
            <h2 class="text-[20px] font-medium text-[#172b4d]">Mời vào Không gian làm việc</h2>

            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full text-[#172b4d] hover:bg-[#f1f2f4]"
              aria-label="Đóng"
              @click="closeInviteMemberModal"
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

          <input
            v-model="inviteMemberQuery"
            type="text"
            placeholder="Địa chỉ email hoặc tên"
            class="h-12 w-full rounded-md border border-[#0c66e4] px-3.5 text-[15px] outline-none ring-1 ring-[#0c66e4]/20 placeholder:text-[#7a869a]"
          />

          <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div>
              <p class="text-[16px] leading-[1.45] text-[#172b4d]">
                Mời ai đó vào Không gian làm việc này bằng liên kết:
              </p>
              <button
                type="button"
                class="mt-1 text-[14px] text-[#0c66e4] underline underline-offset-2"
              >
                Tắt liên kết
              </button>
            </div>

            <button
              type="button"
              class="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#e9ebef] px-4 text-[14px] font-semibold text-[#172b4d] hover:bg-[#dfe1e6] sm:w-auto sm:shrink-0"
              @click="copyInviteLink"
            >
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M10 13.5L14 9.5M8.5 15C6.84315 15 5.5 13.6569 5.5 12C5.5 10.3431 6.84315 9 8.5 9H10M14 15H15.5C17.1569 15 18.5 13.6569 18.5 12C18.5 10.3431 17.1569 9 15.5 9H14"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>{{ inviteLinkCopied ? "Đã sao chép" : "Sao chép liên kết" }}</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useResponsiveSidebarCollapse } from "@/composables/useResponsiveSidebarCollapse.js";
import { useWorkspaceBoardsState } from "@/composables/stages/useWorkspaceBoardsState.js";

const isSidebarCollapsed = ref(false);
useResponsiveSidebarCollapse(isSidebarCollapsed);
const showMemberBoardsPanel = ref(false);
const showInviteMemberModal = ref(false);
const inviteMemberQuery = ref("");
const inviteLinkCopied = ref(false);
const { workspaceBoards } = useWorkspaceBoardsState();

const memberProfile = {
  initials: "LT",
  name: "39. Lê văn vũ trụ",
  handle: "@39levanvutr",
  lastActivity: "Lần hoạt động gần nhất Feb 2026",
};

const memberTabs = [
  {
    id: "members",
    label: "Thành viên (1)",
    description: "",
    emptyMessage: "",
  },
  {
    id: "single-board-guests",
    label: "Khách một bảng thông tin (0)",
    description:
      "Khách một bảng thông tin là thành viên của một bảng thông tin duy nhất trong Không gian làm việc. Khách chỉ có thể xem và chỉnh sửa bảng mà họ được thêm vào.",
    emptyMessage: "Không có khách nào trong Không gian làm việc này.",
  },
  {
    id: "multi-board-guests",
    label: "Khách đa bảng thông tin (0)",
    description:
      "Khách đa bảng thông tin là thành viên của nhiều bảng thông tin của Không gian làm việc. Khách chỉ có thể xem và chỉnh sửa bảng mà họ được thêm vào.",
    emptyMessage: "Không có khách nào trong Không gian làm việc này.",
  },
  {
    id: "join-requests",
    label: "Yêu cầu tham gia (0)",
    description:
      "Những người này đã yêu cầu tham gia Không gian làm việc này. Việc thêm thành viên Không gian làm việc mới sẽ tự động cập nhật thanh toán của bạn. Khách của Không gian làm việc đã được tính vào giới hạn người cộng tác trong Không gian làm việc miễn phí.",
    emptyMessage: "Không có yêu cầu tham gia nào.",
  },
];

const selectedMemberTab = ref("members");

const currentMemberTab = computed(
  () => memberTabs.find((tab) => tab.id === selectedMemberTab.value) ?? memberTabs[0]
);

const memberBoardsCount = computed(() => workspaceBoards.value.length);

const closeInviteMemberModal = () => {
  showInviteMemberModal.value = false;
  inviteMemberQuery.value = "";
  inviteLinkCopied.value = false;
};

const copyInviteLink = async () => {
  const inviteLink = "https://trello.example/workspace/invite";

  try {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(inviteLink);
    }
  } catch {
    // Ignore clipboard failures and still update button state.
  }

  inviteLinkCopied.value = true;
};
</script>
