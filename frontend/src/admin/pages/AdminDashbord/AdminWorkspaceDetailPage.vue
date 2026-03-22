<template>
  <section class="space-y-8">
    <PageHeader
      breadcrumb="Admin / Workspaces / Detail"
      :title="workspaceDetail?.name || 'Workspace Detail'"
      description="Thông tin chi tiết workspace và các thành phần bên trong."
    />

    <LoadingBlock v-if="adminStore.isLoadingWorkspaceDetail" />

    <template v-else-if="workspaceDetail">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryMiniCard label="Tên workspace" :value="workspaceDetail.name" />
        <SummaryMiniCard label="Owner" :value="workspaceDetail.ownerName" />
        <SummaryMiniCard label="Số thành viên" :value="workspaceDetail.totalMembers" />
        <SummaryMiniCard label="Số board" :value="workspaceDetail.totalBoards" />
      </div>

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div class="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-xl font-bold text-slate-950">Thông tin workspace</h3>
              <p class="mt-1 text-sm text-slate-600">
                Tổng quan về workspace, owner và trạng thái hoạt động.
              </p>
            </div>

            <AppBadge
              :label="workspaceDetail.status === 'active' ? 'Hoạt động' : 'Lưu trữ'"
              :variant="workspaceDetail.status === 'active' ? 'success' : 'warning'"
            />
          </div>

          <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm font-medium text-slate-500">Tên workspace</p>
              <p class="mt-2 text-base font-semibold text-slate-950">
                {{ workspaceDetail.name }}
              </p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm font-medium text-slate-500">Owner</p>
              <p class="mt-2 text-base font-semibold text-slate-950">
                {{ workspaceDetail.ownerName }}
              </p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm font-medium text-slate-500">Ngày tạo</p>
              <p class="mt-2 text-base font-semibold text-slate-950">
                {{ formatDate(workspaceDetail.createdAt) }}
              </p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm font-medium text-slate-500">Trạng thái</p>
              <p class="mt-2 text-base font-semibold text-slate-950">
                {{ workspaceDetail.status === 'active' ? 'Hoạt động' : 'Lưu trữ' }}
              </p>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="text-xl font-bold text-slate-950">Phân bổ thành viên</h3>
          <p class="mt-1 text-sm text-slate-600">
            Thống kê nhanh thành viên trong workspace.
          </p>

          <div class="mt-6 space-y-4">
            <div class="rounded-2xl border border-slate-200 p-4">
              <p class="text-sm font-medium text-slate-500">Tổng thành viên</p>
              <p class="mt-2 text-2xl font-bold text-slate-950">
                {{ workspaceDetail.totalMembers }}
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-2xl border border-slate-200 p-4">
                <p class="text-sm font-medium text-slate-500">Admin</p>
                <p class="mt-2 text-2xl font-bold text-slate-950">
                  {{ workspaceDetail.totalAdmins }}
                </p>
              </div>

              <div class="rounded-2xl border border-slate-200 p-4">
                <p class="text-sm font-medium text-slate-500">Member</p>
                <p class="mt-2 text-2xl font-bold text-slate-950">
                  {{ workspaceDetail.totalMemberUsers }}
                </p>
              </div>
            </div>

            <div class="rounded-2xl border border-slate-200 p-4">
              <p class="text-sm font-medium text-slate-500">Số board</p>
              <p class="mt-2 text-2xl font-bold text-slate-950">
                {{ workspaceDetail.totalBoards }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <WorkspaceMembersTable :members="workspaceDetail.members" />
      <WorkspaceBoardsTable :boards="workspaceDetail.boards" />
    </template>
  </section>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminStore } from '@/admin/stores/admin.store'
import PageHeader from '@/admin/components/AdminDashbord/common/PageHeader.vue'
import LoadingBlock from '@/admin/components/AdminDashbord/common/LoadingBlock.vue'
import SummaryMiniCard from '@/admin/components/AdminDashbord/common/SummaryMiniCard.vue'
import AppBadge from '@/admin/components/AdminDashbord/common/AppBadge.vue'
import WorkspaceMembersTable from '@/admin/components/AdminDashbord/workspace/WorkspaceMembersTable.vue'
import WorkspaceBoardsTable from '@/admin/components/AdminDashbord/workspace/WorkspaceBoardsTable.vue'

const route = useRoute()
const adminStore = useAdminStore()

onMounted(() => {
  adminStore.fetchWorkspaceDetail(String(route.params.id))
})

const workspaceDetail = computed(() => adminStore.currentWorkspaceDetail)
const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY')
</script>