<template>
  <div class="min-h-screen bg-white text-[#172b4d]">
    <TrelloAccountHeader />

    <main class="mx-auto max-w-[980px] px-6 py-9 lg:px-8">
      <section class="mb-10">
        <h1 class="mb-5 text-[28px] font-semibold text-[#172b4d]">Hồ sơ và chế độ hiển thị</h1>
        <p class="max-w-[820px] text-[15px] leading-8 text-[#172b4d]">
          Quản lý thông tin cá nhân của bạn, đồng thời kiểm soát thông tin nào người khác xem
          được và ứng dụng nào có thể truy cập.
        </p>
        <div class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px]">
          <a
            href="https://support.atlassian.com/atlassian-account/docs/update-your-profile-and-visibility-settings/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#0c66e4] underline underline-offset-2"
          >
            Tìm hiểu thêm về hồ sơ và chế độ hiển thị của bạn
          </a>
          <span>hoặc</span>
          <a
            href="https://www.atlassian.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#0c66e4] underline underline-offset-2"
          >
            xem chính sách quyền riêng tư của chúng tôi
          </a>
        </div>
      </section>

      <section class="mb-10">
        <h2 class="mb-5 text-[18px] font-semibold text-[#172b4d]">Ảnh hồ sơ và ảnh tiêu đề</h2>

        <div class="rounded-lg border border-[#d0d7e2] bg-white">
          <div
            class="relative h-[138px]"
            @mouseenter="isHeaderHovered = true"
            @mouseleave="isHeaderHovered = false"
          >
            <input
              ref="headerImageInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleHeaderImageChange"
            />

            <div class="absolute inset-0" :style="headerBannerStyle"></div>

            <button
              type="button"
              class="absolute inset-0 flex items-center justify-center transition-colors duration-200"
              :class="showHeaderImageOverlay ? 'bg-[#5e6c84]/82' : 'bg-transparent'"
              @click="openHeaderImageMenu"
            >
              <div
                class="relative z-10 flex flex-col items-center gap-3 text-white transition-opacity duration-200"
                :class="isHeaderActionVisible ? 'opacity-100' : 'opacity-0'"
              >
                <svg
                  class="h-8 w-8"
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
                    fill="currentColor"
                    fill-opacity="0.92"
                  />
                  <circle cx="9" cy="10" r="1.4" fill="#6b778c" />
                  <path
                    d="M7 16L10.5 12.5L13 15L15.8 11.8L17 13V17H7V16Z"
                    fill="#6b778c"
                  />
                </svg>
                <span class="text-[14px] font-medium">Add your header image</span>
              </div>
            </button>

            <div
              v-if="showHeaderImageMenu"
              class="absolute left-1/2 top-[calc(50%+18px)] z-20 w-[172px] -translate-x-1/2 overflow-hidden rounded-[8px] border border-[#d0d4db] bg-white py-2 shadow-[0_8px_20px_rgba(9,30,66,0.18)]"
              @click.stop
            >
              <button
                type="button"
                class="flex w-full items-center px-4 py-3 text-left text-[14px] text-[#172b4d] transition-colors hover:bg-[#f7f8fa]"
                @click="triggerHeaderImageUpload"
              >
                Tải hình ảnh lên
              </button>
              <button
                type="button"
                class="flex w-full items-center px-4 py-3 text-left text-[14px] transition-colors"
                :class="
                  headerImageUrl
                    ? 'text-[#172b4d] hover:bg-[#f7f8fa]'
                    : 'cursor-not-allowed text-[#b3bac5]'
                "
                :disabled="!headerImageUrl"
                @click="removeHeaderImage"
              >
                Xóa hình ảnh
              </button>
            </div>
          </div>

          <div class="border-t border-[#d0d7e2] bg-white px-8 pb-8 pt-0">
            <div class="relative">
              <div
                class="absolute -top-[92px] flex h-[126px] w-[126px] items-center justify-center rounded-full border-4 border-white bg-[#de350b] text-[54px] font-semibold text-white shadow-[0_8px_20px_rgba(9,30,66,0.18)]"
              >
                LT
              </div>
              <div class="pt-12 text-[15px] text-[#44546f]">
                Ảnh hồ sơ và ảnh tiêu đề được hiển thị trên hồ sơ Trello của bạn.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-10">
        <h2 class="mb-5 text-[18px] font-semibold text-[#172b4d]">Giới thiệu về bạn</h2>

        <div class="rounded-lg border border-[#d0d7e2] bg-white">
          <div class="divide-y divide-[#edf0f4]">
            <div
              v-for="field in profileFields"
              :key="field.label"
              class="px-8 py-7"
            >
              <div class="mb-4 flex items-center gap-2">
                <h3 class="text-[15px] font-semibold text-[#172b4d]">{{ field.label }}</h3>
                <span
                  v-if="field.showInfo"
                  class="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#44546f] text-[11px] font-semibold text-white"
                >
                  i
                </span>
              </div>

              <button
                v-if="!field.isEditing"
                type="button"
                class="w-full rounded-[4px] px-1 py-2 text-left text-[16px] text-[#172b4d] transition-colors hover:bg-[#f7f8fa]"
                @click="startProfileFieldEdit(field)"
              >
                {{ field.value }}
              </button>

              <div v-else class="flex flex-wrap items-end gap-3">
                <input
                  :ref="(el) => setProfileFieldInputRef(field.label, el)"
                  v-model="field.draft"
                  type="text"
                  class="h-12 min-w-0 flex-1 rounded-[4px] border border-[#0c66e4] px-4 text-[16px] text-[#172b4d] outline-none shadow-[inset_0_0_0_1px_#0c66e4]"
                />

                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="flex h-10 w-10 items-center justify-center rounded-[6px] border border-[#d0d4db] bg-white text-[#172b4d] shadow-[0_1px_2px_rgba(9,30,66,0.14)] transition-colors hover:bg-[#f7f8fa]"
                    :aria-label="`Lưu ${field.label}`"
                    @click="saveProfileField(field)"
                  >
                    <svg
                      class="h-4 w-4"
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
                  </button>

                  <button
                    type="button"
                    class="flex h-10 w-10 items-center justify-center rounded-[6px] border border-[#d0d4db] bg-white text-[#172b4d] shadow-[0_1px_2px_rgba(9,30,66,0.14)] transition-colors hover:bg-[#f7f8fa]"
                    :aria-label="`Khôi phục ${field.label}`"
                    @click="resetProfileField(field)"
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 class="mb-5 text-[18px] font-semibold text-[#172b4d]">Liên hệ</h2>

        <div class="rounded-lg border border-[#d0d7e2] bg-white">
          <div class="grid gap-6 px-8 py-7 md:grid-cols-[minmax(0,1fr)_240px]">
            <div>
              <h3 class="mb-4 text-[15px] font-semibold text-[#172b4d]">Địa chỉ email</h3>
              <p class="text-[16px] text-[#172b4d]">letru7@gmail.com</p>
            </div>

            <div class="relative flex items-center md:justify-end">
              <div
                v-if="showContactVisibilityMenu"
                class="absolute bottom-[calc(100%+12px)] right-0 z-30 w-[344px] overflow-hidden rounded-[10px] border border-[#d0d4db] bg-white shadow-[0_8px_20px_rgba(9,30,66,0.18)]"
              >
                <button
                  v-for="option in contactVisibilityOptions"
                  :key="option.id"
                  type="button"
                  class="flex w-full items-start gap-3 px-5 py-4 text-left transition-colors"
                  :class="option.id === selectedContactVisibility ? 'bg-[#f7f8fa]' : 'bg-white hover:bg-[#f7f8fa]'"
                  @click="selectContactVisibility(option.id)"
                >
                  <span class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center text-[#253858]">
                    <svg
                      v-if="option.icon === 'globe'"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8" />
                      <path
                        d="M4.8 12H19.2M12 4.8C14.1 6.9 15.3 9.4 15.3 12C15.3 14.6 14.1 17.1 12 19.2M12 4.8C9.9 6.9 8.7 9.4 8.7 12C8.7 14.6 9.9 17.1 12 19.2"
                        stroke="currentColor"
                        stroke-width="1.6"
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
                      <rect
                        x="6.5"
                        y="10"
                        width="11"
                        height="9"
                        rx="2"
                        stroke="currentColor"
                        stroke-width="1.8"
                      />
                      <path
                        d="M9 10V8.7C9 6.9 10.3 5.5 12 5.5C13.7 5.5 15 6.9 15 8.7V10"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>

                  <span class="min-w-0">
                    <span class="mb-1 block text-[15px] font-medium text-[#172b4d]">
                      {{ option.label }}
                    </span>
                    <span class="block text-[14px] leading-6 text-[#5e6c84]">
                      {{ option.description }}
                    </span>
                  </span>
                </button>
              </div>

              <button
                type="button"
                class="relative z-20 flex h-10 w-full items-center justify-between rounded-md px-4 text-[15px] text-[#172b4d] transition-colors md:max-w-[220px]"
                :class="
                  showContactVisibilityMenu
                    ? 'border border-[#0c66e4] bg-white shadow-[inset_0_0_0_1px_#0c66e4]'
                    : 'border border-transparent bg-[#f7f8fa]'
                "
                @click="toggleContactVisibilityMenu"
              >
                <span class="flex min-w-0 items-center gap-2">
                  <svg
                    v-if="selectedContactVisibilityOption.icon === 'globe'"
                    class="h-5 w-5 shrink-0 text-[#44546f]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8" />
                    <path
                      d="M4.8 12H19.2M12 4.8C14.1 6.9 15.3 9.4 15.3 12C15.3 14.6 14.1 17.1 12 19.2M12 4.8C9.9 6.9 8.7 9.4 8.7 12C8.7 14.6 9.9 17.1 12 19.2"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-5 w-5 shrink-0 text-[#44546f]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect
                      x="6.5"
                      y="10"
                      width="11"
                      height="9"
                      rx="2"
                      stroke="currentColor"
                      stroke-width="1.8"
                    />
                    <path
                      d="M9 10V8.7C9 6.9 10.3 5.5 12 5.5C13.7 5.5 15 6.9 15 8.7V10"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    />
                  </svg>
                  <span class="truncate">{{ selectedContactVisibilityOption.label }}</span>
                </span>
                <svg
                  class="h-4 w-4 shrink-0 text-[#44546f]"
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
            </div>
          </div>
        </div>
      </section>
    </main>

    <button
      v-if="showHeaderImageMenu"
      type="button"
      class="fixed inset-0 z-10 cursor-default"
      aria-label="Đóng menu ảnh tiêu đề"
      @click="showHeaderImageMenu = false"
    />
    <button
      v-if="showContactVisibilityMenu"
      type="button"
      class="fixed inset-0 z-10 cursor-default"
      aria-label="Đóng menu quyền riêng tư liên hệ"
      @click="showContactVisibilityMenu = false"
    />
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import TrelloAccountHeader from "@/components/common/TrelloAccountHeader.vue";

const headerImageInputRef = ref(null);
const headerImageUrl = ref("");
const showHeaderImageMenu = ref(false);
const isHeaderHovered = ref(false);
const profileFieldInputRefs = ref({});
const showContactVisibilityMenu = ref(false);
const selectedContactVisibility = ref("private");

const isHeaderActionVisible = computed(
  () => isHeaderHovered.value || showHeaderImageMenu.value
);

const showHeaderImageOverlay = computed(
  () => Boolean(headerImageUrl.value) && isHeaderActionVisible.value
);

const contactVisibilityOptions = [
  {
    id: "public",
    label: "Bất kỳ ai",
    icon: "globe",
    description:
      "Hiển thị cho bất kỳ ai có thể xem nội dung của bạn. Có thể truy cập bằng các ứng dụng đã cài đặt.",
  },
  {
    id: "private",
    label: "Chỉ bạn và quản trị viên",
    icon: "lock",
    description:
      "Chỉ hiển thị cho bạn và quản trị viên. Để quản lý quyền truy cập vào các sản phẩm và dịch vụ của Atlassian, quản trị viên cũng cần xem địa chỉ email của bạn.",
  },
];

const selectedContactVisibilityOption = computed(
  () =>
    contactVisibilityOptions.find((option) => option.id === selectedContactVisibility.value) ??
    contactVisibilityOptions[0]
);

const headerBannerStyle = computed(() => {
  if (headerImageUrl.value) {
    return {
      backgroundImage: `url(${headerImageUrl.value})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }

  return {
    background: isHeaderActionVisible.value
      ? "linear-gradient(90deg,#5e6c84 0%,#75839a 100%)"
      : "linear-gradient(90deg,#ff876d 0%,#ffd8d1 100%)",
  };
});

const revokeHeaderImageUrl = () => {
  if (headerImageUrl.value.startsWith("blob:")) {
    URL.revokeObjectURL(headerImageUrl.value);
  }
};

const openHeaderImageMenu = () => {
  showContactVisibilityMenu.value = false;
  showHeaderImageMenu.value = true;
};

const toggleContactVisibilityMenu = () => {
  showHeaderImageMenu.value = false;
  showContactVisibilityMenu.value = !showContactVisibilityMenu.value;
};

const triggerHeaderImageUpload = () => {
  if (headerImageInputRef.value) {
    headerImageInputRef.value.value = "";
    headerImageInputRef.value.click();
  }
};

const handleHeaderImageChange = (event) => {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  revokeHeaderImageUrl();
  headerImageUrl.value = URL.createObjectURL(file);
  showHeaderImageMenu.value = false;
};

const removeHeaderImage = () => {
  if (!headerImageUrl.value) {
    return;
  }

  revokeHeaderImageUrl();
  headerImageUrl.value = "";
  showHeaderImageMenu.value = false;
};

const selectContactVisibility = (optionId) => {
  selectedContactVisibility.value = optionId;
  showContactVisibilityMenu.value = false;
};

onBeforeUnmount(() => {
  revokeHeaderImageUrl();
});

const profileFields = ref([
  {
    label: "Họ tên",
    value: "Lê văn vũ trụ",
    draft: "Lê văn vũ trụ",
    showInfo: false,
    isEditing: false,
  },
  {
    label: "Tên công khai",
    value: "39. Lê văn vũ trụ",
    draft: "39. Lê văn vũ trụ",
    showInfo: true,
    isEditing: false,
  },
  {
    label: "Chức danh",
    value: "Chức danh của bạn",
    draft: "Chức danh của bạn",
    showInfo: false,
    isEditing: false,
  },
  {
    label: "Phòng ban",
    value: "Phòng ban của bạn",
    draft: "Phòng ban của bạn",
    showInfo: false,
    isEditing: false,
  },
  {
    label: "Tổ chức",
    value: "Tổ chức của bạn",
    draft: "Tổ chức của bạn",
    showInfo: false,
    isEditing: false,
  },
  {
    label: "Cư trú tại",
    value: "Vị trí của bạn",
    draft: "Vị trí của bạn",
    showInfo: false,
    isEditing: false,
  },
  {
    label: "Giờ địa phương",
    value: "Bạn chưa đặt múi giờ",
    draft: "Bạn chưa đặt múi giờ",
    showInfo: false,
    isEditing: false,
  },
]);

const setProfileFieldInputRef = (label, element) => {
  if (element) {
    profileFieldInputRefs.value[label] = element;
    return;
  }

  delete profileFieldInputRefs.value[label];
};

const startProfileFieldEdit = async (field) => {
  profileFields.value.forEach((item) => {
    if (item !== field) {
      item.isEditing = false;
      item.draft = item.value;
    }
  });

  field.draft = field.value;
  field.isEditing = true;

  await nextTick();
  profileFieldInputRefs.value[field.label]?.focus();
  profileFieldInputRefs.value[field.label]?.select();
};

const saveProfileField = (field) => {
  const normalizedValue = field.draft.trim();
  if (normalizedValue) {
    field.value = normalizedValue;
    field.draft = normalizedValue;
    field.isEditing = false;
    return;
  }

  field.draft = field.value;
};

const resetProfileField = (field) => {
  field.draft = field.value;
  field.isEditing = false;
};
</script>
