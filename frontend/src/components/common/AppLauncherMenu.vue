<template>
  <div
    class="absolute left-0 top-full z-50 mt-2 w-[360px] max-w-[calc(100vw-16px)] overflow-hidden rounded-xl border border-white/10 bg-[#1f2128] text-white shadow-[0_20px_60px_rgba(0,0,0,0.38)]"
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

      <div class="mx-4 border-t border-white/10"></div>

      <div class="px-4 pt-3 pb-2 text-[13px] text-white/60">
        Được đề xuất cho đội ngũ của bạn
      </div>

      <div class="px-2 pb-3">
        <button
          v-for="item in suggestedApps"
          :key="item.label"
          type="button"
          class="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/10"
        >
          <span
            class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            :class="item.iconBg"
          >
            <component :is="item.icon" class="h-5 w-5" />
          </span>

          <span class="min-w-0 flex-1">
            <span class="block truncate text-[15px] font-medium text-white">
              {{ item.label }}
            </span>
            <span class="block truncate text-[12px] text-white/55">
              {{ item.description }}
            </span>
          </span>

          <span class="pt-1 text-white/55">
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="5" cy="12" r="1.6" />
              <circle cx="12" cy="12" r="1.6" />
              <circle cx="19" cy="12" r="1.6" />
            </svg>
          </span>
        </button>
      </div>

      <div class="mx-4 border-t border-white/10"></div>

      <div class="px-2 py-2">
        <button
          type="button"
          class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/10"
        >
          <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#1f2128]">
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="4" width="7" height="7" rx="1.5" />
              <rect x="13" y="4" width="7" height="7" rx="1.5" />
              <rect x="4" y="13" width="7" height="7" rx="1.5" />
              <rect x="13" y="13" width="7" height="7" rx="1.5" />
            </svg>
          </span>

          <span class="text-[15px] font-medium text-white">
            Các ứng dụng Atlassian khác
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

const JiraIcon = {
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
        h("path", {
          d: "M10.2 4C10.2 5.8 11.7 7.3 13.5 7.3H16.4V10.1C16.4 11.9 17.9 13.4 19.7 13.4V6.8C19.7 5.2 18.4 4 16.9 4H10.2Z",
          fill: "currentColor",
        }),
        h("path", {
          d: "M6.6 7.6C6.6 9.4 8.1 10.9 9.9 10.9H12.8V13.7C12.8 15.5 14.3 17 16.1 17V10.4C16.1 8.8 14.8 7.6 13.3 7.6H6.6Z",
          fill: "currentColor",
        }),
        h("path", {
          d: "M3 11.2C3 13 4.5 14.5 6.3 14.5H9.2V17.3C9.2 19.1 10.7 20.6 12.5 20.6V14C12.5 12.4 11.2 11.2 9.7 11.2H3Z",
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

const TargetIcon = {
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
        h("circle", {
          cx: "12",
          cy: "12",
          r: "7",
          stroke: "currentColor",
          "stroke-width": "2.4",
        }),
        h("circle", {
          cx: "12",
          cy: "12",
          r: "2.5",
          fill: "currentColor",
        }),
      ]
    );
  },
};

const RocketIcon = {
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
          d: "M14.5 5.5C12.8 5.7 10.7 6.8 9.3 8.3L6 11.6L8.4 14L11.7 10.7C13.2 9.3 14.3 7.2 14.5 5.5Z",
          fill: "currentColor",
        }),
        h("path", {
          d: "M14.7 9.3L18.7 5.3C18.9 5.1 19.2 5 19.5 5C20.3 5 21 5.7 21 6.5C21 6.8 20.9 7.1 20.7 7.3L16.7 11.3L14.7 9.3Z",
          fill: "currentColor",
        }),
      ]
    );
  },
};

const TeamIcon = {
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
        h("circle", { cx: "8", cy: "9", r: "3", fill: "currentColor" }),
        h("circle", { cx: "16", cy: "9", r: "3", fill: "currentColor" }),
        h("path", {
          d: "M4.5 18C4.5 15.8 6.3 14 8.5 14H8.8C11 14 12.8 15.8 12.8 18V19H4.5V18Z",
          fill: "currentColor",
        }),
        h("path", {
          d: "M11.2 18C11.2 15.8 13 14 15.2 14H15.5C17.7 14 19.5 15.8 19.5 18V19H11.2V18Z",
          fill: "currentColor",
        }),
      ]
    );
  },
};

const AdminIcon = {
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
          d: "M12 4L13.2 6.2L15.7 6.6L16.1 9.1L18.3 10.3L17.4 12.7L18.3 15.1L16.1 16.3L15.7 18.8L13.2 19.2L12 21.4L10.8 19.2L8.3 18.8L7.9 16.3L5.7 15.1L6.6 12.7L5.7 10.3L7.9 9.1L8.3 6.6L10.8 6.2L12 4Z",
          fill: "currentColor",
        }),
        h("circle", {
          cx: "12",
          cy: "12.7",
          r: "3.2",
          fill: "white",
        }),
      ]
    );
  },
};

const ServiceIcon = {
  render() {
    return h(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        class: "text-black",
      },
      [
        h("path", {
          d: "M5 5H13L8 19H5L10 5H5Z",
          fill: "currentColor",
        }),
        h("path", {
          d: "M12 5H19L11.5 19H8.5L16 5H12Z",
          fill: "currentColor",
        }),
      ]
    );
  },
};

const DiscoveryIcon = {
  render() {
    return h(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        class: "text-black",
      },
      [
        h("circle", {
          cx: "12",
          cy: "12",
          r: "8",
          fill: "currentColor",
        }),
        h("path", {
          d: "M12 6V12L16 10",
          stroke: "white",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        }),
      ]
    );
  },
};

const ConfluenceIcon = {
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
        h("path", {
          d: "M8.2 8.1C9.6 6.5 10.4 6 12 6C13.7 6 14.4 6.7 15.8 8.2L18.2 6.3C16.4 4.2 14.9 3 12 3C9.2 3 7.6 4.2 5.8 6.3L8.2 8.1Z",
          fill: "currentColor",
        }),
        h("path", {
          d: "M15.8 15.9C14.4 17.5 13.6 18 12 18C10.3 18 9.6 17.3 8.2 15.8L5.8 17.7C7.6 19.8 9.1 21 12 21C14.8 21 16.4 19.8 18.2 17.7L15.8 15.9Z",
          fill: "currentColor",
        }),
      ]
    );
  },
};

const primaryApps = [
  { label: "Trang chủ", icon: HomeIcon, iconBg: "bg-white", active: false },
  { label: "Jira", icon: JiraIcon, iconBg: "bg-[#1D7AFC]", active: false },
  { label: "Trello", icon: TrelloIcon, iconBg: "bg-[#0C66E4]", active: true },
  { label: "Mục tiêu", icon: TargetIcon, iconBg: "bg-white", active: false },
  { label: "Dự án", icon: RocketIcon, iconBg: "bg-white", active: false },
  { label: "Đội ngũ", icon: TeamIcon, iconBg: "bg-white", active: false },
  { label: "Quản trị", icon: AdminIcon, iconBg: "bg-white", active: false },
];

const suggestedApps = [
  {
    label: "Jira Service Management",
    description: "Quản lý dịch vụ CNTT công tác",
    icon: ServiceIcon,
    iconBg: "bg-[#FFCC00]",
  },
  {
    label: "Jira Product Discovery",
    description: "Ưu tiên, cộng tác và đưa ra các ý tưởng",
    icon: DiscoveryIcon,
    iconBg: "bg-[#D28BFF]",
  },
  {
    label: "Confluence",
    description: "Cộng tác trên tài liệu",
    icon: ConfluenceIcon,
    iconBg: "bg-[#377DFF]",
  },
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
