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
              <path
                d="M12 8.5V6M12 18V15.5M8.5 12H6M18 12H15.5M9.2 9.2L7.4 7.4M16.6 16.6L14.8 14.8M14.8 9.2L16.6 7.4M7.4 16.6L9.2 14.8"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              />
              <circle cx="12" cy="12" r="2.8" stroke="currentColor" stroke-width="1.8" />
            </svg>
            <span class="text-[15px] font-semibold">Cài đặt</span>
          </button>

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
          <h1 class="mb-5 text-[28px] font-semibold">Các cài đặt Không gian làm việc</h1>

          <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[#8f5fd3] to-[#1669e2] text-lg font-semibold text-white"
            >
              T
            </div>

            <div class="relative">
              <div class="flex flex-wrap items-center gap-2">
                <!-- Hiển thị tên hoặc input edit -->
                <div v-if="!isEditingName" class="flex items-center gap-2">
                  <h2 class="text-[21px] font-semibold leading-none">{{ workspaceName }}</h2>
                  <button
                    type="button"
                    class="rounded p-1 hover:bg-[#e9ebef] transition-colors"
                    aria-label="Sửa tên"
                    @click="startEditing"
                  >
                    <svg
                      class="h-4 w-4 text-[#44546f]"
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

                <!-- Input chỉnh sửa -->
                <div v-else class="relative inline-flex max-w-full flex-col items-start">
                  <input
                    ref="nameInputRef"
                    v-model="editName"
                    type="text"
                    :style="{ width: `${nameInputWidthCh}ch` }"
                    class="max-w-full min-w-[10ch] rounded border border-[#388bff] px-3 py-2 text-[21px] font-semibold leading-none outline-none focus:border-[#388bff] focus:ring-1 focus:ring-[#388bff]"
                    @keyup.enter="saveName"
                    @keyup.escape="cancelEditing"
                  />
                  <div class="mt-2 flex gap-2">
                    <button
                      type="button"
                      class="rounded bg-[#0c66e4] px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-[#0055cc] transition-colors"
                      @click="saveName"
                    >
                      Lưu
                    </button>
                    <button
                      type="button"
                      class="rounded px-3 py-1.5 text-[13px] font-semibold text-[#44546f] hover:bg-[#e9ebef] transition-colors"
                      @click="cancelEditing"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>

              <div class="mt-1 flex items-center gap-1.5 text-[14px] text-[#44546f]">
                <component :is="currentVisibility.badgeIcon" class="h-4 w-4" />
                <span>{{ currentVisibility.label }}</span>
              </div>
            </div>
          </div>

          <section ref="visibilityPanelRef" class="relative mb-8 border-b border-[#d0d4db] pb-6">
            <h3 class="mb-4 text-[20px] font-semibold">Khả năng hiển thị trong Không gian làm việc</h3>

            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <p class="max-w-[840px] text-[15px] leading-[1.5]">
                <component :is="currentVisibility.inlineIcon" class="mr-1 inline h-4 w-4" />
                <span class="font-medium">{{ currentVisibility.label }}</span>
                <span> - {{ currentVisibility.summary }}</span>
              </p>

              <button
                type="button"
                class="h-9 w-full rounded-md bg-[#dfe1e6] px-3.5 text-[13px] font-semibold hover:bg-[#d0d4db] sm:w-auto sm:shrink-0"
                @click="toggleVisibilityPanel"
              >
                Thay đổi
              </button>
            </div>

            <div
              v-if="showVisibilityPanel"
              class="absolute left-0 top-14 z-30 w-full max-w-[calc(100vw-2rem)] overflow-hidden rounded-[16px] border border-[#d0d4db] bg-white shadow-[0_12px_24px_rgba(9,30,66,0.22)] sm:left-auto sm:right-0 sm:w-[368px]"
            >
              <div class="flex items-start justify-between gap-4 border-b border-[#ebecf0] px-6 py-5">
                <h4 class="max-w-[250px] text-[18px] font-semibold leading-[1.3]">
                  Chọn khả năng hiển thị trong Không gian làm việc
                </h4>

                <button
                  type="button"
                  class="flex h-10 w-10 items-center justify-center rounded-[14px] border border-[#0c66e4] text-[#44546f] hover:bg-[#f7f8fa]"
                  aria-label="Đóng"
                  @click="showVisibilityPanel = false"
                >
                  <svg
                    class="h-5 w-5"
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

              <div class="px-6 py-2">
                <button
                  v-for="option in visibilityOptions"
                  :key="option.id"
                  type="button"
                  class="flex w-full items-start gap-4 py-5 text-left"
                  @click="selectVisibility(option.id)"
                >
                  <component :is="option.panelIcon" class="mt-1 h-5 w-5 shrink-0" />

                  <div class="min-w-0 flex-1">
                    <div class="mb-2 text-[16px] font-medium text-[#172b4d]">{{ option.label }}</div>
                    <p class="text-[15px] leading-[1.45] text-[#5e6c84]">
                      {{ option.description }}
                    </p>
                  </div>

                  <svg
                    v-if="selectedVisibility === option.id"
                    class="mt-1 h-5 w-5 shrink-0 text-[#172b4d]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12.5L9.5 17L19 7.5"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          <section>
            <h3 class="mb-4 text-[20px] font-semibold">Đang liên kết các Không gian làm việc Slack</h3>

            <div class="flex flex-col gap-4 border-t border-[#d0d4db] pt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div>
                <p class="text-[15px] leading-[1.5]">
                  Liên kết các Không gian làm việc Slack và Trello với nhau để cộng tác trong các dự án
                  Trello từ Slack.
                </p>
                <a href="#" class="mt-2 inline-block text-[13px] text-[#0c66e4] underline">
                  Tìm hiểu thêm.
                </a>
              </div>

              <button
                type="button"
                class="h-9 w-full rounded-md bg-[#dfe1e6] px-4 text-[13px] font-semibold hover:bg-[#d0d4db] sm:w-auto sm:shrink-0"
              >
                Thêm vào Slack
              </button>
            </div>
          </section>

          <div class="pt-10">
            <button
              type="button"
              class="text-[14px] font-medium text-[#c9372c] underline decoration-[#c9372c] decoration-[1.5px] underline-offset-2 hover:text-[#ae2a19]"
            >
              Xóa Không gian làm việc này?
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, nextTick } from "vue";
import { useResponsiveSidebarCollapse } from "@/composables/useResponsiveSidebarCollapse.js";

const LockIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="10" width="12" height="9" rx="2" stroke="currentColor" stroke-width="1.8" />
      <path
        d="M8.5 10V8C8.5 6.067 10.067 4.5 12 4.5C13.933 4.5 15.5 6.067 15.5 8V10"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </svg>
  `,
};

const GlobeIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8" />
      <path d="M4.5 12H19.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
      <path
        d="M12 4C13.9 6 15 8.8 15 12C15 15.2 13.9 18 12 20"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
      <path
        d="M12 4C10.1 6 9 8.8 9 12C9 15.2 10.1 18 12 20"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </svg>
  `,
};

const PrivateInlineIcon = {
  components: { LockIcon },
  template: '<LockIcon class="text-[#c9372c]" />',
};

const PublicInlineIcon = {
  components: { GlobeIcon },
  template: '<GlobeIcon class="text-[#22a06b]" />',
};

const PrivatePanelIcon = {
  components: { LockIcon },
  template: '<LockIcon class="text-[#e34935]" />',
};

const PublicPanelIcon = {
  components: { GlobeIcon },
  template: '<GlobeIcon class="text-[#22a06b]" />',
};

const visibilityOptions = [
  {
    id: "private",
    label: "Riêng tư",
    summary:
      "Đây là Không gian làm việc riêng tư. Chỉ những người trong Không gian làm việc có thể truy cập hoặc nhìn thấy Không gian làm việc.",
    description:
      "Đây là Không gian làm việc riêng tư. Chỉ những người trong Không gian làm việc có thể truy cập hoặc nhìn thấy Không gian làm việc.",
    badgeIcon: PrivateInlineIcon,
    inlineIcon: PrivateInlineIcon,
    panelIcon: PrivatePanelIcon,
  },
  {
    id: "public",
    label: "Công khai",
    summary:
      "Đây là Không gian làm việc công khai. Bất kỳ ai có đường dẫn tới Không gian làm việc đều có thể nhìn thấy Không gian làm việc và Không gian làm việc có thể được tìm thấy trên các công cụ tìm kiếm như Google. Chỉ những người được mời vào Không gian làm việc mới có thể thêm và chỉnh sửa các bảng của Không gian làm việc.",
    description:
      "Đây là Không gian làm việc công khai. Bất kỳ ai có đường dẫn tới Không gian làm việc đều có thể nhìn thấy Không gian làm việc và Không gian làm việc có thể được tìm thấy trên các công cụ tìm kiếm như Google. Chỉ những người được mời vào Không gian làm việc mới có thể thêm và chỉnh sửa các bảng của Không gian làm việc.",
    badgeIcon: PublicInlineIcon,
    inlineIcon: PublicInlineIcon,
    panelIcon: PublicPanelIcon,
  },
];

const isSidebarCollapsed = ref(false);
useResponsiveSidebarCollapse(isSidebarCollapsed);
const showVisibilityPanel = ref(false);
const selectedVisibility = ref("private");
const visibilityPanelRef = ref(null);

// Thêm các state cho chức năng chỉnh sửa tên
const workspaceName = ref("Trello Không gian làm việc");
const isEditingName = ref(false);
const editName = ref("");
const nameInputRef = ref(null);

const currentVisibility = computed(
  () => visibilityOptions.find((option) => option.id === selectedVisibility.value) ?? visibilityOptions[0]
);

const nameInputWidthCh = computed(() => {
  const charCount = editName.value.length || workspaceName.value.length || 10;
  return Math.min(Math.max(charCount + 1, 10), 28);
});

const toggleVisibilityPanel = () => {
  showVisibilityPanel.value = !showVisibilityPanel.value;
};

const selectVisibility = (visibilityId) => {
  selectedVisibility.value = visibilityId;
  showVisibilityPanel.value = false;
};

// Các hàm xử lý chỉnh sửa tên
const startEditing = () => {
  editName.value = workspaceName.value;
  isEditingName.value = true;
  nextTick(() => {
    if (nameInputRef.value) {
      nameInputRef.value.focus();
      nameInputRef.value.select();
    }
  });
};

const saveName = () => {
  const trimmedName = editName.value.trim();
  if (trimmedName && trimmedName !== workspaceName.value) {
    workspaceName.value = trimmedName;
    // Có thể thêm logic lưu vào API ở đây
    console.log("Đã đổi tên thành:", trimmedName);
  }
  cancelEditing();
};

const cancelEditing = () => {
  isEditingName.value = false;
  editName.value = "";
};

const handleDocumentClick = (event) => {
  const target = event.target;

  if (
    showVisibilityPanel.value &&
    visibilityPanelRef.value &&
    !visibilityPanelRef.value.contains(target)
  ) {
    showVisibilityPanel.value = false;
  }
  
  // Đóng panel chỉnh sửa khi click ra ngoài
  if (isEditingName.value && nameInputRef.value && !nameInputRef.value.contains(target)) {
    // Kiểm tra xem click có phải là vào button chỉnh sửa không
    const editButton = event.target.closest('button[aria-label="Sửa tên"]');
    if (!editButton) {
      saveName();
    }
  }
};

onMounted(() => {
  document.addEventListener("click", handleDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleDocumentClick);
});
</script>
