<template>
  <section v-if="checklists.length" class="space-y-6">
    <div
      v-for="list in checklists"
      :key="list.id"
      class="rounded-xl bg-white/[0.03] border border-white/10 p-4"
    >
      <div class="flex items-center justify-between gap-3 mb-4">
        <h4 class="text-white text-lg font-semibold">{{ list.title }}</h4>
        <button
          class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm"
          @click="$emit('remove-checklist', list.id)"
        >
          Xóa
        </button>
      </div>

      <div class="w-full h-2 rounded-full bg-white/10 mb-4 overflow-hidden">
        <div
          class="h-full rounded-full bg-green-500 transition-all"
          :style="{ width: `${checklistProgress(list)}%` }"
        />
      </div>

      <div class="space-y-2 mb-4">
        <label
          v-for="item in list.items"
          :key="item.id"
          class="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/5"
        >
          <input
            v-model="item.done"
            type="checkbox"
            class="w-4 h-4"
          />
          <span :class="item.done ? 'line-through text-white/50' : 'text-white'">
            {{ item.text }}
          </span>
        </label>
      </div>

      <div class="flex gap-2">
        <input
          v-model.trim="list.newItem"
          class="flex-1 rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white outline-none"
          placeholder="Thêm mục việc cần làm..."
          @keyup.enter="$emit('add-item', list.id)"
        />
        <button
          class="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
          @click="$emit('add-item', list.id)"
        >
          Thêm
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  checklists: { type: Array, default: () => [] },
});

defineEmits(["remove-checklist", "add-item"]);

function checklistProgress(list) {
  if (!list.items.length) return 0;
  const done = list.items.filter((x) => x.done).length;
  return Math.round((done / list.items.length) * 100);
}
</script>