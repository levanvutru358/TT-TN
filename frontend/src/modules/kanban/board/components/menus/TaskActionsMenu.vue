<template>
  <div
    class="w-[230px] max-h-[300px] overflow-y-auto rounded-xl bg-[#323940] border border-white/10 shadow-2xl py-2 custom-scrollbar"
    @click.stop
  >
    <MenuActionItem label="Mở Thẻ" @click="$emit('open-card')">
      <template #icon>
        <IconOpenCard />
      </template>
    </MenuActionItem>

    <MenuActionItem label="Chỉnh sửa nhãn" @click="$emit('edit-labels')">
      <template #icon>
        <IconTag />
      </template>
    </MenuActionItem>

    <MenuActionItem label="Thay đổi thành viên" @click="$emit('change-members')">
      <template #icon>
        <IconUser />
      </template>
    </MenuActionItem>

    <MenuActionItem label="Thay đổi bìa" @click="$emit('change-cover')">
      <template #icon>
        <IconImage />
      </template>
    </MenuActionItem>

    <MenuActionItem label="Chỉnh sửa ngày" @click="$emit('edit-date')">
      <template #icon>
        <IconClock />
      </template>
    </MenuActionItem>

    <MenuActionItem label="Di chuyển" @click="$emit('move-task')">
      <template #icon>
        <IconArrowRight />
      </template>
    </MenuActionItem>

    <MenuActionItem label="Sao chép thẻ" @click="$emit('copy-task')">
      <template #icon>
        <IconCopy />
      </template>
    </MenuActionItem>

    <MenuActionItem label="Sao chép liên kết" @click="$emit('copy-link')">
      <template #icon>
        <IconLink />
      </template>
    </MenuActionItem>

    <MenuActionItem label="Đối xứng" @click="$emit('mirror-task')">
      <template #icon>
        <IconMirror />
      </template>
    </MenuActionItem>

    <MenuActionItem label="Lưu trữ" danger @click="$emit('archive-task')">
      <template #icon>
        <IconArchive />
      </template>
    </MenuActionItem>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { defineComponent, h } from "vue";

defineEmits([
  "open-card",
  "edit-labels",
  "change-members",
  "change-cover",
  "edit-date",
  "move-task",
  "copy-task",
  "copy-link",
  "mirror-task",
  "archive-task",
]);

const MenuActionItem = defineComponent({
  name: "MenuActionItem",
  props: {
    label: {
      type: String,
      required: true,
    },
    danger: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  setup(itemProps, { emit, slots }) {
    return () =>
      h(
        "button",
        {
          type: "button",
          class: [
            "w-full flex items-center gap-3 px-4 py-2.5 text-left text-[15px] transition-colors",
            itemProps.danger
              ? "text-red-300 hover:bg-white/10"
              : "text-white/90 hover:bg-white/10",
          ],
          onClick: () => emit("click"),
        },
        [
          h(
            "span",
            {
              class: "w-4 h-4 shrink-0 text-white/80 flex items-center justify-center",
            },
            slots.icon ? slots.icon() : []
          ),
          h("span", { class: "leading-none" }, itemProps.label),
        ]
      );
  },
});

const IconOpenCard = defineComponent({
  name: "IconOpenCard",
  setup() {
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          class: "w-4 h-4",
        },
        [
          h("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
          h("path", { d: "M7 8h10" }),
          h("path", { d: "M7 12h10" }),
        ]
      );
  },
});

const IconTag = defineComponent({
  name: "IconTag",
  setup() {
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          class: "w-4 h-4",
        },
        [
          h("path", {
            d: "M20 10.5 13.5 17a2.12 2.12 0 0 1-3 0L4 10.5V4h6.5L20 13.5Z",
          }),
          h("circle", { cx: "7.5", cy: "7.5", r: "1" }),
        ]
      );
  },
});

const IconUser = defineComponent({
  name: "IconUser",
  setup() {
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          class: "w-4 h-4",
        },
        [
          h("path", { d: "M20 21a8 8 0 0 0-16 0" }),
          h("circle", { cx: "12", cy: "8", r: "4" }),
        ]
      );
  },
});

const IconImage = defineComponent({
  name: "IconImage",
  setup() {
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          class: "w-4 h-4",
        },
        [
          h("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
          h("circle", { cx: "8.5", cy: "10", r: "1.5" }),
          h("path", { d: "M21 15l-5-5L5 21" }),
        ]
      );
  },
});

const IconClock = defineComponent({
  name: "IconClock",
  setup() {
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          class: "w-4 h-4",
        },
        [
          h("circle", { cx: "12", cy: "12", r: "9" }),
          h("path", { d: "M12 7v5l3 3" }),
        ]
      );
  },
});

const IconArrowRight = defineComponent({
  name: "IconArrowRight",
  setup() {
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          class: "w-4 h-4",
        },
        [
          h("path", { d: "M5 12h14" }),
          h("path", { d: "m13 6 6 6-6 6" }),
        ]
      );
  },
});

const IconCopy = defineComponent({
  name: "IconCopy",
  setup() {
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          class: "w-4 h-4",
        },
        [
          h("rect", { x: "9", y: "9", width: "11", height: "11", rx: "2" }),
          h("rect", { x: "4", y: "4", width: "11", height: "11", rx: "2" }),
        ]
      );
  },
});

const IconLink = defineComponent({
  name: "IconLink",
  setup() {
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          class: "w-4 h-4",
        },
        [
          h("path", {
            d: "M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 1 0-7.07-7.07L11 4",
          }),
          h("path", {
            d: "M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L13 20",
          }),
        ]
      );
  },
});

const IconMirror = defineComponent({
  name: "IconMirror",
  setup() {
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          class: "w-4 h-4",
        },
        [
          h("path", { d: "M4 6h16" }),
          h("path", { d: "M7 6v12" }),
          h("path", { d: "M17 6v12" }),
          h("path", { d: "M7 12h10" }),
        ]
      );
  },
});

const IconArchive = defineComponent({
  name: "IconArchive",
  setup() {
    return () =>
      h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          class: "w-4 h-4",
        },
        [
          h("rect", { x: "3", y: "4", width: "18", height: "4", rx: "1" }),
          h("path", { d: "M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" }),
          h("path", { d: "M10 12h4" }),
        ]
      );
  },
});
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.25) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}
</style>