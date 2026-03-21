<template>
  <section class="space-y-8">
    <PageHeader
      breadcrumb="Admin / Workspaces / Detail"
      :title="workspaceDetail?.name || 'Workspace Detail'"
      description="Chỉ hiển thị thông tin và các thành phần bên trong workspace."
    />

    <LoadingBlock v-if="adminStore.isLoadingWorkspaceDetail" />

    <template v-else-if="workspaceDetail">
      <WorkspaceOverviewCard :workspace="workspaceDetail" />

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="text-xl font-bold text-slate-950">Thông tin workspace</h3>
          <div class="mt-4 space-y-3 text-sm text-slate-700">
            <p><span class="font-semibold text-slate-950">Tên workspace:</span> {{ workspaceDetail.name }}</p>
            <p><span class="font-semibold text-slate-950">Owner:</span> {{ workspaceDetail.ownerName }}</p>
            <p><span class="font-semibold text-slate-950">Trạng thái:</span> {{ workspaceDetail.status === 'active' ? 'Hoạt động' : 'Lưu trữ' }}</p>
            <p><span class="font-semibold text-slate-950">Số board:</span> {{ workspaceDetail.totalBoards }}</p>
            <p><span class="font-semibold text-slate-950">Số thành viên:</span> {{ workspaceDetail.totalMembers }}</p>
          </div>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="text-xl font-bold text-slate-950">Phân bổ thành viên</h3>
          <div class="mt-4 space-y-3 text-sm text-slate-700">
            <p><span class="font-semibold text-slate-950">Admin:</span> {{ workspaceDetail.totalAdmins }}</p>
            <p><span class="font-semibold text-slate-950">Member:</span> {{ workspaceDetail.totalMemberUsers }}</p>
            <p><span class="font-semibold text-slate-950">Ngày tạo:</span> {{ formatDate(workspaceDetail.createdAt) }}</p>
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
import WorkspaceOverviewCard from '@/admin/components/AdminDashbord/workspace/WorkspaceOverviewCard.vue'
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