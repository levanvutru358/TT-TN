<template>
  <div class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
    <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div class="flex flex-1 flex-col gap-3 md:flex-row">
        <input
          :value="search"
          @input="$emit('update:search', $event.target.value)"
          type="text"
          placeholder="Search board or workspace..."
          class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 md:flex-1"
        />

        <select
          :value="visibility"
          @change="$emit('update:visibility', $event.target.value)"
          class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 md:w-48"
        >
          <option value="">All visibility</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <select
          :value="sort"
          @change="$emit('update:sort', $event.target.value)"
          class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 md:w-48"
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
defineProps({
  search: { type: String, default: '' },
  visibility: { type: String, default: '' },
  sort: { type: String, default: 'newest' },
})

defineEmits(['update:search', 'update:visibility', 'update:sort'])
</script>
