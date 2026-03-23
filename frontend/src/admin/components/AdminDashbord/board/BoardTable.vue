<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-6 py-5">
      <h3 class="text-xl font-bold text-slate-950">Board Table</h3>
      <p class="mt-1 text-sm text-slate-600">
        Quản lý board, workspace liên quan và chỉ số hoạt động.
      </p>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full table-fixed text-sm">
        <thead class="bg-slate-50">
          <tr class="text-left font-semibold text-slate-700">
            <th class="w-16 px-4 py-4 text-center">STT</th>
            <th class="w-[18%] px-4 py-4">Tên board</th>
            <th class="w-[16%] px-4 py-4">Workspace</th>
            <th class="w-[14%] px-4 py-4">Owner</th>
            <th class="w-[12%] px-4 py-4 text-center">Visibility</th>
            <th class="w-[8%] px-4 py-4 text-center">List</th>
            <th class="w-[8%] px-4 py-4 text-center">Card</th>
            <th class="w-[10%] px-4 py-4 text-center">Member</th>
            <th class="w-[14%] px-4 py-4 text-center">Ngày tạo</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(board, index) in boards"
            :key="board.id"
            class="cursor-pointer border-t border-slate-100 transition hover:bg-slate-50"
            @click="goToDetail(board.id)"
          >
            <td class="px-4 py-4 text-center font-medium text-slate-700">
              {{ index + 1 }}
            </td>

            <td class="px-4 py-4">
              <div class="min-w-0">
                <p class="truncate font-semibold text-slate-950">
                  {{ board.name }}
                </p>
              </div>
            </td>

            <td class="px-4 py-4">
              <div class="min-w-0">
                <p class="truncate text-slate-700">
                  {{ board.workspaceName }}
                </p>
              </div>
            </td>

            <td class="px-4 py-4">
              <div class="min-w-0">
                <p class="truncate text-slate-700">
                  {{ board.ownerName }}
                </p>
              </div>
            </td>

            <td class="px-4 py-4 text-center">
              <div class="flex justify-center">
                <AppBadge
                  :label="board.visibility"
                  :variant="board.visibility === 'public' ? 'info' : 'neutral'"
                />
              </div>
            </td>

            <td class="px-4 py-4 text-center text-slate-700">
              {{ board.totalLists }}
            </td>

            <td class="px-4 py-4 text-center text-slate-700">
              {{ board.totalCards }}
            </td>

            <td class="px-4 py-4 text-center text-slate-700">
              {{ board.totalMembers }}
            </td>

            <td class="px-4 py-4 text-center text-slate-700">
              {{ formatDate(board.createdAt) }}
            </td>
          </tr>

          <tr v-if="boards.length === 0">
            <td colspan="9" class="px-5 py-10">
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
import { useRouter } from 'vue-router'
import type { BoardItem } from '@/admin/types/admin'
import AppBadge from '@/admin/components/AdminDashbord/common/AppBadge.vue'
import EmptyState from '@/admin/components/AdminDashbord/common/EmptyState.vue'

defineProps({
  boards: {
    type: Array as PropType<BoardItem[]>,
    default: () => [],
  },
})

const router = useRouter()

const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY')

const goToDetail = (boardId: string) => {
  router.push(`/admin/boards/${boardId}`)
}
</script>
