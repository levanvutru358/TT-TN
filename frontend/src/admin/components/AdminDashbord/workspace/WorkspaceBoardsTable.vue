<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-5 py-4">
      <h3 class="text-xl font-bold text-slate-950">Boards trong workspace</h3>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full table-fixed text-sm">
        <thead class="bg-slate-50">
          <tr class="text-left font-semibold text-slate-700">
            <th class="w-[32%] px-5 py-4">Tên board</th>
            <th class="w-[16%] px-5 py-4 text-center">Visibility</th>
            <th class="w-[16%] px-5 py-4 text-center">Số thành viên</th>
            <th class="w-[16%] px-5 py-4 text-center">Số card</th>
            <th class="w-[20%] px-5 py-4 text-center">Ngày tạo</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="board in boards"
            :key="board.id"
            class="cursor-pointer border-t border-slate-100 transition hover:bg-slate-50"
            @click="goToBoardDetail(board.id)"
          >
            <td class="px-5 py-4">
              <div class="min-w-0">
                <p class="truncate font-semibold text-slate-950" :title="board.name">
                  {{ board.name }}
                </p>
              </div>
            </td>

            <td class="px-5 py-4 text-center">
              <div class="flex justify-center">
                <AppBadge
                  :label="board.visibility"
                  :variant="board.visibility === 'public' ? 'info' : 'neutral'"
                />
              </div>
            </td>

            <td class="px-5 py-4 text-center text-slate-700">
              {{ board.totalMembers }}
            </td>

            <td class="px-5 py-4 text-center text-slate-700">
              {{ board.totalCards }}
            </td>

            <td class="px-5 py-4 text-center text-slate-700">
              <span class="block truncate" :title="formatDate(board.createdAt)">
                {{ formatDate(board.createdAt) }}
              </span>
            </td>
          </tr>

          <tr v-if="boards.length === 0">
            <td colspan="5" class="px-5 py-8">
              <EmptyState
                title="Không có board trong workspace"
                description="Hiện chưa có board nào."
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
import { useRouter } from 'vue-router'
import type { WorkspaceBoardItem } from '@/admin/types/admin'
import AppBadge from '@/admin/components/AdminDashbord/common/AppBadge.vue'
import EmptyState from '@/admin/components/AdminDashbord/common/EmptyState.vue'

defineProps({
  boards: {
    type: Array as PropType<WorkspaceBoardItem[]>,
    default: () => [],
  },
})

const router = useRouter()

const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY')

const goToBoardDetail = (boardId: string) => {
  router.push(`/admin/boards/${boardId}`)
}
</script>