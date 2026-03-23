<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-6 py-5">
      <h3 class="text-xl font-bold text-slate-950">Workspace Table</h3>
      <p class="mt-1 text-sm text-slate-600">
        Quản lý workspace, trạng thái và các chỉ số liên quan.
      </p>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full table-fixed text-sm">
        <thead class="bg-slate-50">
          <tr class="text-left font-semibold text-slate-700">
            <th class="w-16 px-4 py-4 text-center">STT</th>
            <th class="w-[20%] px-4 py-4">Tên workspace</th>
            <th class="w-[16%] px-4 py-4">Owner</th>
            <th class="w-[10%] px-4 py-4 text-center">Thành viên</th>
            <th class="w-[8%] px-4 py-4 text-center">Admin</th>
            <th class="w-[8%] px-4 py-4 text-center">Member</th>
            <th class="w-[10%] px-4 py-4 text-center">Board</th>
            <th class="w-[12%] px-4 py-4 text-center">Trạng thái</th>
            <th class="w-[14%] px-4 py-4 text-center">Ngày tạo</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(workspace, index) in workspaces"
            :key="workspace.id"
            class="cursor-pointer border-t border-slate-100 transition hover:bg-slate-50"
            @click="goToDetail(workspace.id)"
          >
            <td class="px-4 py-4 text-center font-medium text-slate-700">
              {{ index + 1 }}
            </td>

            <td class="px-4 py-4">
              <div class="min-w-0">
                <p class="truncate font-semibold text-slate-950">
                  {{ workspace.name }}
                </p>
              </div>
            </td>

            <td class="px-4 py-4">
              <div class="min-w-0">
                <p class="truncate text-slate-700">
                  {{ workspace.ownerName }}
                </p>
              </div>
            </td>

            <td class="px-4 py-4 text-center font-medium text-slate-700">
              {{ workspace.totalMembers }}
            </td>

            <td class="px-4 py-4 text-center text-slate-700">
              {{ workspace.totalAdmins }}
            </td>

            <td class="px-4 py-4 text-center text-slate-700">
              {{ workspace.totalMemberUsers }}
            </td>

            <td class="px-4 py-4 text-center text-slate-700">
              {{ workspace.totalBoards }}
            </td>

            <td class="px-4 py-4 text-center">
              <div class="flex justify-center">
                <AppBadge
                  :label="workspace.status === 'active' ? 'Hoạt động' : 'Lưu trữ'"
                  :variant="workspace.status === 'active' ? 'success' : 'warning'"
                />
              </div>
            </td>

            <td class="px-4 py-4 text-center text-slate-700">
              {{ formatDate(workspace.createdAt) }}
            </td>
          </tr>

          <tr v-if="workspaces.length === 0">
            <td colspan="9" class="px-5 py-10">
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
import { useRouter } from 'vue-router'
import type { WorkspaceItem } from '@/admin/types/admin'
import AppBadge from '@/admin/components/AdminDashbord/common/AppBadge.vue'
import EmptyState from '@/admin/components/AdminDashbord/common/EmptyState.vue'

defineProps({
  workspaces: {
    type: Array as PropType<WorkspaceItem[]>,
    default: () => [],
  },
})

const router = useRouter()

const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY')

const goToDetail = (workspaceId: string) => {
  router.push(`/admin/workspaces/${workspaceId}`)
}
</script>
