<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-5 py-4">
      <div>
        <h3 class="text-xl font-bold text-slate-950">Danh sách Board</h3>
        <p class="mt-1 text-sm text-slate-600">
          Theo dõi board theo workspace và quyền hiển thị
        </p>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead class="bg-slate-50">
          <tr class="text-left text-sm font-semibold text-slate-700">
            <th class="px-5 py-4">Tên board</th>
            <th class="px-5 py-4">Workspace</th>
            <th class="px-5 py-4">Visibility</th>
            <th class="px-5 py-4">Members</th>
            <th class="px-5 py-4">Cards</th>
            <th class="px-5 py-4">Ngày tạo</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="board in boards"
            :key="board.id"
            class="border-t border-slate-100 transition hover:bg-slate-50"
          >
            <td class="px-5 py-4 font-semibold text-slate-950">{{ board.name }}</td>
            <td class="px-5 py-4 text-slate-700">{{ board.workspaceName }}</td>
            <td class="px-5 py-4">
              <span
                class="inline-flex rounded-full px-3 py-1 text-xs font-bold"
                :class="
                  board.visibility === 'public'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-slate-200 text-slate-700'
                "
              >
                {{ board.visibility }}
              </span>
            </td>
            <td class="px-5 py-4 text-slate-700">{{ board.totalMembers }}</td>
            <td class="px-5 py-4 text-slate-700">{{ board.totalCards }}</td>
            <td class="px-5 py-4 text-slate-700">
              {{ formatDate(board.createdAt) }}
            </td>
          </tr>

          <tr v-if="boards.length === 0">
            <td colspan="6" class="px-5 py-8 text-center text-slate-500">
              Không có board
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BoardItem } from '@/admin/types/admin'

defineProps<{
  boards: BoardItem[]
}>()

const formatDate = (date: string) => new Date(date).toLocaleDateString('vi-VN')
</script>
