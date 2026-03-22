<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-5 py-4">
      <div>
        <h3 class="text-xl font-bold text-slate-950">Danh sách Workspace</h3>
        <p class="mt-1 text-sm text-slate-600">
          Theo dõi các workspace trong toàn hệ thống
        </p>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead class="bg-slate-50">
          <tr class="text-left text-sm font-semibold text-slate-700">
            <th class="px-5 py-4">Tên workspace</th>
            <th class="px-5 py-4">Owner</th>
            <th class="px-5 py-4">Số thành viên</th>
            <th class="px-5 py-4">Số board</th>
            <th class="px-5 py-4">Ngày tạo</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="workspace in workspaces"
            :key="workspace.id"
            class="border-t border-slate-100 transition hover:bg-slate-50"
          >
            <td class="px-5 py-4 font-semibold text-slate-950">
              {{ workspace.name }}
            </td>
            <td class="px-5 py-4 text-slate-700">{{ workspace.ownerName }}</td>
            <td class="px-5 py-4 text-slate-700">{{ workspace.totalMembers }}</td>
            <td class="px-5 py-4 text-slate-700">{{ workspace.totalBoards }}</td>
            <td class="px-5 py-4 text-slate-700">
              {{ formatDate(workspace.createdAt) }}
            </td>
          </tr>

          <tr v-if="workspaces.length === 0">
            <td colspan="5" class="px-5 py-8 text-center text-slate-500">
              Không có workspace
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WorkspaceItem } from '@/admin/types/admin'

defineProps<{
  workspaces: WorkspaceItem[]
}>()

const formatDate = (date: string) => new Date(date).toLocaleDateString('vi-VN')
</script>