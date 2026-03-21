<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-5 py-4">
      <h3 class="text-xl font-bold text-slate-950">Workspace Table</h3>
      <p class="mt-1 text-sm text-slate-600">
        Quản lý workspace, trạng thái và các chỉ số liên quan.
      </p>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-slate-50">
          <tr class="text-left font-semibold text-slate-700">
            <th class="px-5 py-4">STT</th>
            <th class="px-5 py-4">Tên workspace</th>
            <th class="px-5 py-4">Owner</th>
            <th class="px-5 py-4">Số thành viên</th>
            <th class="px-5 py-4">Admin</th>
            <th class="px-5 py-4">Member</th>
            <th class="px-5 py-4">Số board</th>
            <th class="px-5 py-4">Trạng thái</th>
            <th class="px-5 py-4">Ngày tạo</th>
            <th class="px-5 py-4 text-right">Hành động</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(workspace, index) in workspaces"
            :key="workspace.id"
            class="border-t border-slate-100 transition hover:bg-slate-50"
          >
            <td class="px-5 py-4 text-slate-700">{{ index + 1 }}</td>
            <td class="px-5 py-4 font-semibold text-slate-950">
              {{ workspace.name }}
            </td>
            <td class="px-5 py-4 text-slate-700">{{ workspace.ownerName }}</td>
            <td class="px-5 py-4 text-slate-700">{{ workspace.totalMembers }}</td>
            <td class="px-5 py-4 text-slate-700">{{ workspace.totalAdmins }}</td>
            <td class="px-5 py-4 text-slate-700">{{ workspace.totalMemberUsers }}</td>
            <td class="px-5 py-4 text-slate-700">{{ workspace.totalBoards }}</td>
            <td class="px-5 py-4">
              <AppBadge
                :label="workspace.status === 'active' ? 'Hoạt động' : 'Lưu trữ'"
                :variant="workspace.status === 'active' ? 'success' : 'warning'"
              />
            </td>
            <td class="px-5 py-4 text-slate-700">
              {{ formatDate(workspace.createdAt) }}
            </td>
            <td class="px-5 py-4">
              <div class="flex justify-end gap-2">
                <RouterLink
                  :to="`/admin/workspaces/${workspace.id}`"
                  class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Chi tiết
                </RouterLink>
              </div>
            </td>
          </tr>

          <tr v-if="workspaces.length === 0">
            <td colspan="10" class="px-5 py-8">
              <EmptyState
                title="Không có workspace"
                description="Không tìm thấy workspace phù hợp."
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
import type { WorkspaceItem } from '@/admin/types/admin'
import AppBadge from '@/admin/components/AdminDashbord/common/AppBadge.vue'
import EmptyState from '@/admin/components/AdminDashbord/common/EmptyState.vue'

defineProps({
  workspaces: {
    type: Array as PropType<WorkspaceItem[]>,
    default: () => [],
  },
})

const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY')
</script>