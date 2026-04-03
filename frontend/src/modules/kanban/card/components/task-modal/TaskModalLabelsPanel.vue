<template>
  <div class="rounded-xl bg-[#2b3138] border border-white/10 shadow-2xl p-4 w-full max-w-[360px]">
    <div class="flex items-center justify-between mb-4">
      <div class="text-white font-semibold text-lg">Nhãn</div>
      <button
        class="w-8 h-8 rounded-lg hover:bg-white/10 text-white/80"
        @click="$emit('close')"
      >
        ✕
      </button>
    </div>

    <input
      v-model.trim="localSearch"
      class="w-full rounded-lg bg-transparent border border-blue-400 px-3 py-2.5 text-white outline-none mb-5"
      placeholder="Tìm nhãn..."
    />

    <div class="text-white/70 text-sm font-medium mb-3">Nhãn</div>

    <div class="space-y-3">
      <div
        v-for="item in filteredLabelOptions"
        :key="item.id"
        class="flex items-center gap-3"
      >
        <button
          type="button"
          class="w-5 h-5 rounded border border-white/40 flex items-center justify-center text-white text-xs shrink-0"
          @click="toggleLabel(item.id)"
        >
          <span v-if="modelValue.includes(item.id)">✓</span>
        </button>

        <button
          type="button"
          class="flex-1 h-10 rounded-md border border-white/10"
          :style="{ backgroundColor: item.color }"
          @click="toggleLabel(item.id)"
        />

        <button
          type="button"
          class="w-9 h-9 rounded-md hover:bg-white/10 text-white flex items-center justify-center shrink-0"
          title="Chỉnh sửa nhãn"
          @click="startEditLabel(item)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.33H5v-.92l8.06-8.06.92.92L5.92 19.58zM20.71 7.04a1.003 1.003 0 0 0 0-1.42L18.37 3.29a1.003 1.003 0 0 0-1.42 0l-1.13 1.13 3.75 3.75 1.14-1.13z"
            />
          </svg>
        </button>
      </div>
    </div>

    <button
      type="button"
      class="w-full mt-5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium py-3"
      @click="showCreateLabel = true"
    >
      Tạo nhãn mới
    </button>

    <div class="border-t border-white/10 my-5"></div>

    <button
      type="button"
      class="w-full rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium py-3"
    >
      Bật chế độ thân thiện với người mù màu
    </button>

    <div
      v-if="showCreateLabel"
      class="mt-5 rounded-xl bg-white/5 border border-white/10 p-4 space-y-3"
    >
      <div class="text-white font-medium">Tạo nhãn mới</div>

      <input
        v-model.trim="newLabelName"
        class="w-full rounded-lg bg-black/20 border border-white/10 px-3 py-2 text-white outline-none"
        placeholder="Tên nhãn"
      />

      <div class="grid grid-cols-3 gap-2">
        <button
          v-for="color in presetLabelColors"
          :key="color"
          type="button"
          class="h-10 rounded-md border border-white/10"
          :class="newLabelColor === color ? 'ring-2 ring-white/70' : ''"
          :style="{ backgroundColor: color }"
          @click="newLabelColor = color"
        />
      </div>

      <div class="flex gap-2">
        <button
          type="button"
          class="flex-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white py-2"
          @click="createLabel"
        >
          Tạo
        </button>

        <button
          type="button"
          class="flex-1 rounded-lg bg-white/10 hover:bg-white/15 text-white py-2"
          @click="cancelCreateLabel"
        >
          Hủy
        </button>
      </div>
    </div>

    <div
      v-if="editingLabel"
      class="mt-5 rounded-xl bg-white/5 border border-white/10 p-4 space-y-3"
    >
      <div class="text-white font-medium">Chỉnh sửa nhãn</div>

      <input
        v-model.trim="editingLabelName"
        class="w-full rounded-lg bg-black/20 border border-white/10 px-3 py-2 text-white outline-none"
        placeholder="Tên nhãn"
      />

      <div class="grid grid-cols-3 gap-2">
        <button
          v-for="color in presetLabelColors"
          :key="color"
          type="button"
          class="h-10 rounded-md border border-white/10"
          :class="editingLabelColor === color ? 'ring-2 ring-white/70' : ''"
          :style="{ backgroundColor: color }"
          @click="editingLabelColor = color"
        />
      </div>

      <div class="flex gap-2">
        <button
          type="button"
          class="flex-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white py-2"
          @click="saveEditLabel"
        >
          Lưu
        </button>

        <button
          type="button"
          class="flex-1 rounded-lg bg-red-500/80 hover:bg-red-500 text-white py-2"
          @click="removeLabel(editingLabel.id)"
        >
          Xóa
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  labelOptions: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  "update:modelValue",
  "update:labelOptions",
  "close",
]);

const localSearch = ref("");
const showCreateLabel = ref(false);
const newLabelName = ref("");
const newLabelColor = ref("#15803d");
const editingLabel = ref(null);
const editingLabelName = ref("");
const editingLabelColor = ref("");

const presetLabelColors = [
  "#15803d",
  "#a16207",
  "#c2410c",
  "#b91c1c",
  "#7e22ce",
  "#1d4ed8",
];

const filteredLabelOptions = computed(() => {
  const q = localSearch.value.toLowerCase();
  if (!q) return props.labelOptions;

  return props.labelOptions.filter((x) =>
    String(x.name || "").toLowerCase().includes(q)
  );
});

function toggleLabel(id) {
  const next = props.modelValue.includes(id)
    ? props.modelValue.filter((x) => x !== id)
    : [...props.modelValue, id];

  emit("update:modelValue", next);
}

function startEditLabel(item) {
  editingLabel.value = item;
  editingLabelName.value = item.name || "";
  editingLabelColor.value = item.color || "#15803d";
}

function saveEditLabel() {
  if (!editingLabel.value) return;

  const next = props.labelOptions.map((x) =>
    x.id === editingLabel.value.id
      ? {
          ...x,
          name: editingLabelName.value.trim(),
          color: editingLabelColor.value,
        }
      : x
  );

  emit("update:labelOptions", next);

  editingLabel.value = null;
  editingLabelName.value = "";
  editingLabelColor.value = "";
}

function removeLabel(id) {
  const nextOptions = props.labelOptions.filter((x) => x.id !== id);
  const nextSelected = props.modelValue.filter((x) => x !== id);

  emit("update:labelOptions", nextOptions);
  emit("update:modelValue", nextSelected);

  editingLabel.value = null;
  editingLabelName.value = "";
  editingLabelColor.value = "";
}

function createLabel() {
  const next = [
    ...props.labelOptions,
    {
      id: Date.now(),
      name: newLabelName.value.trim(),
      color: newLabelColor.value,
    },
  ];

  emit("update:labelOptions", next);

  newLabelName.value = "";
  newLabelColor.value = "#15803d";
  showCreateLabel.value = false;
}

function cancelCreateLabel() {
  showCreateLabel.value = false;
  newLabelName.value = "";
  newLabelColor.value = "#15803d";
}
</script>