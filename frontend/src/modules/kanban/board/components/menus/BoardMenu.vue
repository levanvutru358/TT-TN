<template>
  <teleport to="body">
    <div v-if="open" class="fixed inset-0 z-[80]">
      <div class="absolute inset-0 bg-black/50" @click="handleClose" />

      <div class="absolute right-4 top-20 md:right-6 md:top-16">
        <div
          class="w-[23rem] max-w-[92vw] overflow-hidden rounded-2xl border border-white/10 bg-[#1f2328] shadow-2xl"
        >
          <template v-if="currentView === 'main'">
            <div class="flex items-center justify-between px-4 py-3">
              <div class="text-sm font-semibold text-white/90">Menu</div>
              <button
                class="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/25 hover:bg-black/35"
                type="button"
                aria-label="Đóng"
                title="Đóng"
                @click="handleClose"
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

            <div class="max-h-[72vh] overflow-auto px-2 pb-3">
              <div class="mx-2 mb-2 rounded-xl border border-white/10 bg-black/20 p-3">
                <div class="flex items-center gap-2">
                  <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0c66e4] text-sm font-semibold text-white">
                    Jira
                  </span>
                  <div class="min-w-0">
                    <div class="text-sm font-semibold text-white/90">
                      Xuất bảng thông tin sang Jira
                    </div>
                    <div class="text-xs text-white/60">
                      Biến bảng này dự án nhanh chóng và dễ dàng hơn.
                    </div>
                  </div>
                </div>
              </div>

              <div class="mx-2 mb-3 rounded-xl border border-white/10 bg-black/20 p-3">
                <div class="flex items-center gap-2">
                  <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0c66e4] text-sm font-semibold text-white">
                    Jira
                  </span>
                  <div class="min-w-0">
                    <div class="text-sm font-semibold text-white/90">
                      Mời thành viên Không gian làm việc tham gia Jira
                    </div>
                    <div class="text-xs text-white/60">
                      Duy trì dự án hoạt động và cộng tác với đội ngũ.
                    </div>
                  </div>
                </div>
              </div>

              <div class="mx-2 space-y-1">
                <BoardMenuItem label="Chia sẻ" :svg="ICONS.share" @click="openFeature('share')" />
                <BoardMenuItem
                  label="Về bảng này"
                  sub="Thêm mô tả vào bảng của bạn"
                  :svg="ICONS.info"
                  @click="openFeature('about')"
                />
                <BoardMenuItem
                  label="Khả năng hiển thị: Không gian làm việc"
                  :svg="ICONS.eye"
                  @click="openFeature('visibility')"
                />
                <BoardMenuItem
                  label="In, xuất và chia sẻ"
                  :svg="ICONS.print"
                  @click="openFeature('print')"
                />
                <BoardMenuItem
                  label="Gắn sao"
                  :svg="ICONS.star"
                  @click="openFeature('star')"
                />
              </div>

              <div class="mx-2 my-3 border-t border-white/10" />

              <div class="mx-2 space-y-1">
                <div class="px-2 py-2 text-[11px] text-white/45">Cài đặt</div>

                <BoardMenuItem
                  label="Thay đổi hình nền"
                  :svg="ICONS.bg"
                  @click="openBackgroundPanel"
                />
                <BoardMenuItem
                  label="Trường tùy chỉnh"
                  :svg="ICONS.fields"
                  @click="openFeature('fields')"
                />
                <BoardMenuItem
                  label="Tự động hóa"
                  :svg="ICONS.bolt"
                  active
                  @click="openFeature('automation')"
                />
                <BoardMenuItem
                  label="Tiện ích bổ sung"
                  :svg="ICONS.power"
                  @click="openFeature('powerups')"
                />
                <BoardMenuItem
                  label="Nhãn"
                  :svg="ICONS.tag"
                  @click="openFeature('labels')"
                />
                <BoardMenuItem
                  label="Các nhãn dán"
                  :svg="ICONS.sticker"
                  @click="openFeature('stickers')"
                />
                <BoardMenuItem
                  label="Tạo mẫu"
                  :svg="ICONS.template"
                  @click="openFeature('templates')"
                />
                <BoardMenuItem
                  label="Hoạt động"
                  :svg="ICONS.activity"
                  @click="openFeature('activity')"
                />
                <BoardMenuItem
                  label="Mục đã lưu trữ"
                  :svg="ICONS.archive"
                  @click="openFeature('archive')"
                />
              </div>

              <div class="mx-2 my-3 border-t border-white/10" />

              <div class="mx-2 space-y-1">
                <BoardMenuItem
                  label="Theo dõi"
                  :svg="ICONS.follow"
                  @click="openFeature('watch')"
                />
                <BoardMenuItem
                  label="Thu gọn tất cả danh sách"
                  :svg="ICONS.collapse"
                  @click="openFeature('collapse')"
                />
                <BoardMenuItem
                  label="Sao chép bảng thông tin"
                  :svg="ICONS.copy"
                  @click="openFeature('copyBoard')"
                />
                <BoardMenuItem
                  label="Cài đặt Email-tới-bảng"
                  :svg="ICONS.mail"
                  @click="openFeature('emailToBoard')"
                />
                <BoardMenuItem
                  label="Đóng bảng thông tin"
                  :svg="ICONS.close"
                  @click="openFeature('closeBoard')"
                />
              </div>
            </div>
          </template>

          <template v-else-if="currentView === 'background'">
            <BoardBackgroundPanel
              v-model="draftBackground"
              :image-options="imageOptions"
              :color-options="colorOptions"
              @back="currentView = 'main'"
              @save="handleSaveBackground"
              @reset="handleResetBackground"
            />
          </template>

          <template v-else>
            <BoardMenuFeaturePanel
              :screen="currentScreen"
              @back="currentView = 'main'"
            />
          </template>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import BoardMenuItem from "@/modules/kanban/board/components/menus/BoardMenuItem.vue";
import BoardBackgroundPanel from "@/modules/kanban/board/components/menus/BoardBackgroundPanel.vue";
import BoardMenuFeaturePanel from "@/modules/kanban/board/components/menus/BoardMenuFeaturePanel.vue";
import { BOARD_MENU_SCREENS } from "@/modules/kanban/board/components/menus/data/boardMenuScreens";

const DEFAULT_BACKGROUND = "linear-gradient(135deg,#4b3f72,#7b3ea8,#c1558b)";

const props = defineProps({
  open: { type: Boolean, default: false },
  background: {
    type: String,
    default: DEFAULT_BACKGROUND,
  },
  imageOptions: {
    type: Array,
    default: () => [
      {
        id: "bg-1",
        value:
          "linear-gradient(rgba(0,0,0,.20), rgba(0,0,0,.35)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80') center/cover",
      },
      {
        id: "bg-2",
        value:
          "linear-gradient(rgba(0,0,0,.20), rgba(0,0,0,.35)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80') center/cover",
      },
      {
        id: "bg-3",
        value:
          "linear-gradient(rgba(0,0,0,.20), rgba(0,0,0,.35)), url('https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80') center/cover",
      },
      {
        id: "bg-4",
        value:
          "linear-gradient(rgba(0,0,0,.20), rgba(0,0,0,.35)), url('https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&w=1200&q=80') center/cover",
      },
    ],
  },
  colorOptions: {
    type: Array,
    default: () => [
      { id: "color-1", value: "linear-gradient(135deg,#0f766e,#115e59)" },
      { id: "color-2", value: "linear-gradient(135deg,#1d4ed8,#1e3a8a)" },
      { id: "color-3", value: "linear-gradient(135deg,#7c3aed,#4c1d95)" },
      { id: "color-4", value: "linear-gradient(135deg,#be185d,#831843)" },
      { id: "color-5", value: "linear-gradient(135deg,#ea580c,#9a3412)" },
      { id: "color-6", value: "linear-gradient(135deg,#65a30d,#3f6212)" },
      { id: "color-7", value: "linear-gradient(135deg,#334155,#0f172a)" },
      { id: "color-8", value: "linear-gradient(135deg,#0f766e,#164e63,#1d4ed8)" },
    ],
  },
});

const emit = defineEmits(["close", "save-background"]);

const currentView = ref("main");
const currentScreenKey = ref("share");
const draftBackground = ref(props.background || DEFAULT_BACKGROUND);

const currentScreen = computed(
  () => BOARD_MENU_SCREENS[currentScreenKey.value] || BOARD_MENU_SCREENS.share
);

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      currentView.value = "main";
      draftBackground.value = props.background || DEFAULT_BACKGROUND;
    }
  }
);

watch(
  () => props.background,
  (newValue) => {
    if (props.open) {
      draftBackground.value = newValue || DEFAULT_BACKGROUND;
    }
  }
);

function openFeature(key) {
  currentScreenKey.value = key;
  currentView.value = "feature";
}

function openBackgroundPanel() {
  draftBackground.value = props.background || DEFAULT_BACKGROUND;
  currentView.value = "background";
}

function handleSaveBackground() {
  emit("save-background", draftBackground.value);
  emit("close");
}

function handleResetBackground() {
  draftBackground.value = DEFAULT_BACKGROUND;
}

function handleClose() {
  currentView.value = "main";
  draftBackground.value = props.background || DEFAULT_BACKGROUND;
  emit("close");
}

function onKeydown(e) {
  if (e.key === "Escape" && props.open) {
    if (currentView.value !== "main") {
      currentView.value = "main";
      return;
    }
    handleClose();
  }
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));

const ICONS = {
  share: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8C18.2091 8 20 6.20914 20 4C20 1.79086 18.2091 0 16 0C13.7909 0 12 1.79086 12 4C12 4.12596 12.0062 4.25047 12.0182 4.37312L6.9236 7.21925C6.20773 6.45718 5.19166 6 4 6C1.79086 6 0 7.79086 0 10C0 12.2091 1.79086 14 4 14C5.19166 14 6.20773 13.5428 6.9236 12.7808L12.0182 15.6269C12.0062 15.7495 12 15.874 12 16C12 18.2091 13.7909 20 16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C14.8083 12 13.7923 12.4572 13.0764 13.2192L7.9818 10.3731C7.99376 10.2505 8 10.126 8 10C8 9.87404 7.99376 9.74953 7.9818 9.62688L13.0764 6.78075C13.7923 7.54282 14.8083 8 16 8Z" fill="currentColor"/></svg>`,
  info: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z" stroke="currentColor" stroke-width="1.6"/><path d="M12 10.5V17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 7.5H12.01" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  eye: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12C2 12 5.5 5 12 5C18.5 5 22 12 22 12C22 12 18.5 19 12 19C5.5 19 2 12 2 12Z" stroke="currentColor" stroke-width="1.6"/><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="1.6"/></svg>`,
  print: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9V3H18V9" stroke="currentColor" stroke-width="1.6"/><path d="M6 17H4C2.89543 17 2 16.1046 2 15V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V15C22 16.1046 21.1046 17 20 17H18" stroke="currentColor" stroke-width="1.6"/><path d="M6 14H18V21H6V14Z" stroke="currentColor" stroke-width="1.6"/></svg>`,
  star: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.3L6.18 20.9L7.64 14.2L2.5 9.8L9.28 9.2L12 2.8L14.72 9.2L21.5 9.8L16.36 14.2L17.82 20.9L12 17.3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  bg: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5C4 3.89543 4.89543 3 6 3H18C19.1046 3 20 3.89543 20 5V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V5Z" stroke="currentColor" stroke-width="1.6"/><path d="M8 16L11 13L14 16L16 14L20 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  fields: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7H20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M4 12H20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M4 17H20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M8 7V7" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M16 12V12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M10 17V17" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  bolt: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L3 14H11L9 22L21 8H13L13 2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  power: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M7.5 4.5C4.5 6.5 2.5 9.5 2.5 13C2.5 18.2467 6.75329 22.5 12 22.5C17.2467 22.5 21.5 18.2467 21.5 13C21.5 9.5 19.5 6.5 16.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  tag: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 13L12.5 20.5C11.6716 21.3284 10.3284 21.3284 9.5 20.5L3.5 14.5C2.67157 13.6716 2.67157 12.3284 3.5 11.5L11 4H20V13Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M16 8H16.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  sticker: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 13V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H13" stroke="currentColor" stroke-width="1.6"/><path d="M14 20L20 14V20H14Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  template: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3H18C19.1046 3 20 3.89543 20 5V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3Z" stroke="currentColor" stroke-width="1.6"/><path d="M8 7H16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M8 11H16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M8 15H12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  activity: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 14L8 14L10 6L14 18L16 10L20 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  archive: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7H20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M6 7V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V7" stroke="currentColor" stroke-width="1.6"/><path d="M10 11H14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  follow: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21C12 21 18 16.5 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 16.5 12 21 12 21Z" stroke="currentColor" stroke-width="1.6"/><path d="M12 10.5H12.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  collapse: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9H18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M6 15H18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M8 7L6 9L8 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 13L18 15L16 17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  copy: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 8H20V20H8V8Z" stroke="currentColor" stroke-width="1.6"/><path d="M4 16H3C2.44772 16 2 15.5523 2 15V3C2 2.44772 2.44772 2 3 2H15C15.5523 2 16 2.44772 16 3V4" stroke="currentColor" stroke-width="1.6"/></svg>`,
  mail: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20V18H4V6Z" stroke="currentColor" stroke-width="1.6"/><path d="M4 7L12 13L20 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  close: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
};
</script>
