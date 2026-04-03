<template>
  <div class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
    <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div class="flex flex-1 flex-col gap-3 md:flex-row">
        <input
          :value="search"
          @input="$emit('update:search', $event.target.value)"
          type="text"
          placeholder="Search workspace name..."
          class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 md:flex-1"
        />

        <select
          :value="status"
          @change="$emit('update:status', $event.target.value)"
          class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 md:w-56"
        >
          <option value="">All status</option>
          <option value="active">Hoạt động</option>
          <option value="archived">Lưu trữ</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
defineProps({
  search: { type: String, default: '' },
  status: { type: String, default: '' },
})

defineEmits(['update:search', 'update:status'])
</script>