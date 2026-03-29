<template>
  <div
    class="absolute left-0 top-full z-[100] mt-2 w-[360px] max-w-[calc(100vw-16px)] overflow-hidden rounded-xl border border-white/10 bg-[#1f2128] text-white shadow-[0_20px_60px_rgba(0,0,0,0.38)]"
  >
    <div class="max-h-[74vh] overflow-y-auto">
      <div class="px-2 py-2">
        <button
          v-for="item in visiblePrimaryApps"
          :key="item.label"
          type="button"
          class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/10"
          @click="handlePrimaryClick(item)"
        >
          <span
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            :class="item.iconBg"
          >
            <component :is="item.icon" class="h-5 w-5" />
          </span>

          <span class="flex-1 text-[15px] font-medium text-white">
            {{ item.label }}
          </span>

          <span class="text-white/60">
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, h } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth.js";

const router = useRouter();
const { isAuthenticated } = useAuth();

const HomeIcon = {
  render() {
    return h(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        class: "text-[#111827]",
      },
      [
        h("path", {
          d: "M4 10.5L12 4L20 10.5V20H14.5V14H9.5V20H4V10.5Z",
          fill: "currentColor",
        }),
      ]
    );
  },
};

const TrelloIcon = {
  render() {
    return h(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        class: "text-white",
      },
      [
        h("rect", {
          x: "5",
          y: "4",
          width: "14",
          height: "16",
          rx: "3",
          fill: "currentColor",
        }),
        h("rect", {
          x: "8",
          y: "7",
          width: "3",
          height: "8",
          rx: "1.2",
          fill: "var(--workspace-accent)",
        }),
        h("rect", {
          x: "13",
          y: "7",
          width: "3",
          height: "5.5",
          rx: "1.2",
          fill: "var(--workspace-accent)",
        }),
      ]
    );
  },
};

// Chỉ giữ lại Trang chủ và Trello
const primaryApps = [
  { label: "Trang chủ", icon: HomeIcon, iconBg: "bg-white", active: false },
  { label: "Trello", icon: TrelloIcon, iconBg: "bg-[#0C66E4]", active: true },
];

const visiblePrimaryApps = computed(() => {
  if (isAuthenticated.value) {
    return primaryApps.filter((item) => item.label !== "Trang chủ");
  }
  return primaryApps;
});

function handlePrimaryClick(item) {
  if (item.label === "Trang chủ") {
    router.push("/auth/login");
    return;
  }

  if (item.label === "Trello") {
    router.push("/");
  }
}
</script>