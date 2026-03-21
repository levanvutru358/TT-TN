<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-5 py-4">
      <h3 class="text-xl font-bold text-slate-950">Board Table</h3>
      <p class="mt-1 text-sm text-slate-600">
        Quản lý board, workspace liên quan và chỉ số hoạt động.
      </p>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-slate-50">
          <tr class="text-left font-semibold text-slate-700">
            <th class="px-5 py-4">STT</th>
            <th class="px-5 py-4">Tên board</th>
            <th class="px-5 py-4">Workspace</th>
            <th class="px-5 py-4">Owner</th>
            <th class="px-5 py-4">Visibility</th>
            <th class="px-5 py-4">List</th>
            <th class="px-5 py-4">Card</th>
            <th class="px-5 py-4">Thành viên</th>
            <th class="px-5 py-4">Ngày tạo</th>
            <th class="px-5 py-4 text-right">Hành động</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(board, index) in boards"
            :key="board.id"
            class="border-t border-slate-100 transition hover:bg-slate-50"
          >
            <td class="px-5 py-4 text-slate-700">{{ index + 1 }}</td>
            <td class="px-5 py-4 font-semibold text-slate-950">{{ board.name }}</td>
            <td class="px-5 py-4 text-slate-700">{{ board.workspaceName }}</td>
            <td class="px-5 py-4 text-slate-700">{{ board.ownerName }}</td>
            <td class="px-5 py-4">
              <AppBadge
                :label="board.visibility"
                :variant="board.visibility === 'public' ? 'info' : 'neutral'"
              />
            </td>
            <td class="px-5 py-4 text-slate-700">{{ board.totalLists }}</td>
            <td class="px-5 py-4 text-slate-700">{{ board.totalCards }}</td>
            <td class="px-5 py-4 text-slate-700">{{ board.totalMembers }}</td>
            <td class="px-5 py-4 text-slate-700">{{ formatDate(board.createdAt) }}</td>
            <td class="px-5 py-4">
              <div class="flex justify-end gap-2">
                <RouterLink
                  :to="`/admin/boards/${board.id}`"
                  class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Chi tiết
                </RouterLink>
              </div>
            </td>
          </tr>

          <tr v-if="boards.length === 0">
            <td colspan="10" class="px-5 py-8">
              <EmptyState
                title="Không có board"
                description="Không tìm thấy board phù hợp."
              />
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
import type { BoardItem } from '@/admin/types/admin'
import AppBadge from '@/admin/components/AdminDashbord/common/AppBadge.vue'
import EmptyState from '@/admin/components/AdminDashbord/common/EmptyState.vue'

defineProps({
  boards: {
    type: Array as PropType<BoardItem[]>,
    default: () => [],
  },
})

const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY')
</script>