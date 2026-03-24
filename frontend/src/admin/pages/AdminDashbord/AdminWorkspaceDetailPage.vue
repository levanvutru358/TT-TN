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
        <SummaryMiniCard label="Tổng thành viên" :value="workspaceDetail.totalMembers" />
        <SummaryMiniCard label="Số board" :value="workspaceDetail.totalBoards" />
      </div>

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div class="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-xl font-bold text-slate-950">
                {{ selectedWorkspaceMember ? 'Thông tin thành viên workspace' : 'Thông tin workspace' }}
              </h3>
              <p class="mt-1 text-sm text-slate-600">
                {{
                  selectedWorkspaceMember
                    ? 'Thông tin chi tiết của thành viên được chọn trong workspace.'
                    : 'Tổng quan về workspace, owner và trạng thái hoạt động.'
                }}
              </p>
            </div>

            <div class="flex items-center gap-3">
              <template v-if="selectedWorkspaceMember">
                <button
                  type="button"
                  class="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  @click="selectedWorkspaceMember = null"
                >
                  Quay lại workspace
                </button>
              </template>

              <template v-else>
                <AppBadge
                  :label="workspaceDetail.status === 'active' ? 'Hoạt động' : 'Lưu trữ'"
                  :variant="workspaceDetail.status === 'active' ? 'success' : 'warning'"
                />
              </template>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <template v-if="!selectedWorkspaceMember">
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
            </template>

            <template v-else>
              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-sm font-medium text-slate-500">Tên thành viên</p>
                <p class="mt-2 text-base font-semibold text-slate-950">
                  {{ selectedWorkspaceMember.name }}
                </p>
              </div>

              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-sm font-medium text-slate-500">Email</p>
                <p class="mt-2 text-base font-semibold text-slate-950">
                  {{ selectedWorkspaceMember.email }}
                </p>
              </div>

              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-sm font-medium text-slate-500">Vai trò</p>
                <p class="mt-2 text-base font-semibold capitalize text-slate-950">
                  {{ selectedWorkspaceMember.role }}
                </p>
              </div>

              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-sm font-medium text-slate-500">Trạng thái</p>
                <p class="mt-2 text-base font-semibold text-slate-950">
                  {{ selectedWorkspaceMember.status === 'active' ? 'Hoạt động' : 'Đã khóa' }}
                </p>
              </div>
            </template>
          </div>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="text-xl font-bold text-slate-950">Thành phần workspace</h3>
          <p class="mt-1 text-sm text-slate-600">
            Xem nhanh thành viên và board trong workspace.
          </p>

          <div class="mt-6 space-y-4">
            <div class="rounded-2xl border border-slate-200 p-4">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="text-sm font-medium text-slate-500">Tổng thành viên</p>
                  <p class="mt-2 text-2xl font-bold text-slate-950">{{ workspaceDetail.totalMembers }}</p>
                </div>

                <button
                  type="button"
                  class="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  @click="toggleMembers"
                >
                  {{ showMembersSection ? 'Đóng' : 'Xem tất cả' }}
                </button>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-2xl border border-slate-200 p-4">
                <p class="text-sm font-medium text-slate-500">Admin</p>
                <p class="mt-2 text-2xl font-bold text-slate-950">{{ workspaceDetail.totalAdmins }}</p>
              </div>

              <div class="rounded-2xl border border-slate-200 p-4">
                <p class="text-sm font-medium text-slate-500">Member</p>
                <p class="mt-2 text-2xl font-bold text-slate-950">{{ workspaceDetail.totalMemberUsers }}</p>
              </div>
            </div>

            <div class="rounded-2xl border border-slate-200 p-4">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="text-sm font-medium text-slate-500">Số board</p>
                  <p class="mt-2 text-2xl font-bold text-slate-950">{{ workspaceDetail.totalBoards }}</p>
                </div>

                <button
                  type="button"
                  class="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  @click="toggleBoards"
                >
                  {{ showBoardsSection ? 'Đóng' : 'Xem tất cả' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showMembersSection" class="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <WorkspaceMembersTable
          :members="workspaceDetail.members"
          @select-member="handleSelectMember"
        />
      </div>

      <div v-if="showBoardsSection" class="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <WorkspaceBoardsTable
          :boards="workspaceDetail.boards"
        />
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminStore } from '@/admin/stores/admin.store'
import type { WorkspaceMemberItem } from '@/admin/types/admin'
import PageHeader from '@/admin/components/AdminDashbord/common/PageHeader.vue'
import LoadingBlock from '@/admin/components/AdminDashbord/common/LoadingBlock.vue'
import SummaryMiniCard from '@/admin/components/AdminDashbord/common/SummaryMiniCard.vue'
import AppBadge from '@/admin/components/AdminDashbord/common/AppBadge.vue'
import WorkspaceMembersTable from '@/admin/components/AdminDashbord/workspace/WorkspaceMembersTable.vue'
import WorkspaceBoardsTable from '@/admin/components/AdminDashbord/workspace/WorkspaceBoardsTable.vue'

const route = useRoute()
const adminStore = useAdminStore()

const showMembersSection = ref(false)
const showBoardsSection = ref(false)
const selectedWorkspaceMember = ref<WorkspaceMemberItem | null>(null)

onMounted(() => {
  adminStore.fetchWorkspaceDetail(String(route.params.id))
})

const workspaceDetail = computed(() => adminStore.currentWorkspaceDetail)
const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY')

const toggleMembers = () => {
  showMembersSection.value = !showMembersSection.value
  if (!showMembersSection.value) selectedWorkspaceMember.value = null
}

const toggleBoards = () => {
  showBoardsSection.value = !showBoardsSection.value
}

const handleSelectMember = (member: WorkspaceMemberItem) => {
  selectedWorkspaceMember.value = member
}
</script>