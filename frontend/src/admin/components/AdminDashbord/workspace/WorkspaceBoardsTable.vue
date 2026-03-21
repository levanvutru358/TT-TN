<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-5 py-4">
      <h3 class="text-xl font-bold text-slate-950">Boards trong workspace</h3>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-slate-50">
          <tr class="text-left font-semibold text-slate-700">
            <th class="px-5 py-4">Tên board</th>
            <th class="px-5 py-4">Visibility</th>
            <th class="px-5 py-4">Số thành viên</th>
            <th class="px-5 py-4">Số card</th>
            <th class="px-5 py-4">Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="board in boards"
            :key="board.id"
            class="border-t border-slate-100"
          >
            <td class="px-5 py-4 font-semibold text-slate-950">
              {{ board.name }}
            </td>
            <td class="px-5 py-4">
              <AppBadge
                :label="board.visibility"
                :variant="board.visibility === 'public' ? 'info' : 'neutral'"
              />
            </td>
            <td class="px-5 py-4 text-slate-700">
              {{ board.totalMembers }}
            </td>
            <td class="px-5 py-4 text-slate-700">
              {{ board.totalCards }}
            </td>
            <td class="px-5 py-4 text-slate-700">
              {{ formatDate(board.createdAt) }}
            </td>
          </tr>

          <tr v-if="boards.length === 0">
            <td colspan="5" class="px-5 py-8">
              <div class="text-center text-sm text-slate-500">
                Không có board trong workspace
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { PropType } from 'vue'
import type { WorkspaceBoardItem } from '@/admin/types/admin'
import AppBadge from '@/admin/components/AdminDashbord/common/AppBadge.vue'

defineProps({
  boards: {
    type: Array as PropType<WorkspaceBoardItem[]>,
    default: () => [],
  },
})

const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY')
</script>