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
              <p class="mt-2 text-base font-semibold text-slate-950">{{ workspaceDetail.name }}</p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm font-medium text-slate-500">Owner</p>
              <p class="mt-2 text-base font-semibold text-slate-950">{{ workspaceDetail.ownerName }}</p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm font-medium text-slate-500">Ngày tạo</p>
              <p class="mt-2 text-base font-semibold text-slate-950">{{ formatDate(workspaceDetail.createdAt) }}</p>
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
        <template v-if="!selectedWorkspaceMember">
          <WorkspaceMembersTable
            :members="workspaceDetail.members"
            @select-member="handleSelectMember"
          />
        </template>

        <template v-else>
          <div class="border-b border-slate-200 px-5 py-4">
            <div class="flex items-center justify-between gap-4">
              <h3 class="text-xl font-bold text-slate-950">Chi tiết thành viên workspace</h3>

              <div class="flex items-center gap-3">
                <button
                  type="button"
                  class="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  @click="selectedWorkspaceMember = null"
                >
                  Quay lại danh sách
                </button>

                <button
                  type="button"
                  class="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                  @click="closeMembersSection"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>

          <div class="p-6">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-sm font-medium text-slate-500">Tên</p>
                <p class="mt-2 text-base font-semibold text-slate-950">{{ selectedWorkspaceMember.name }}</p>
              </div>
              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-sm font-medium text-slate-500">Email</p>
                <p class="mt-2 text-base font-semibold text-slate-950">{{ selectedWorkspaceMember.email }}</p>
              </div>
              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-sm font-medium text-slate-500">Vai trò</p>
                <p class="mt-2 text-base font-semibold capitalize text-slate-950">{{ selectedWorkspaceMember.role }}</p>
              </div>
              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-sm font-medium text-slate-500">Trạng thái</p>
                <p class="mt-2 text-base font-semibold text-slate-950">
                  {{ selectedWorkspaceMember.status === 'active' ? 'Hoạt động' : 'Đã khóa' }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div v-if="showBoardsSection" class="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <template v-if="!selectedWorkspaceBoard">
          <WorkspaceBoardsTable
            :boards="workspaceDetail.boards"
            @select-board="handleSelectBoard"
          />
        </template>

        <template v-else>
          <div class="border-b border-slate-200 px-5 py-4">
            <div class="flex items-center justify-between gap-4">
              <h3 class="text-xl font-bold text-slate-950">Chi tiết board trong workspace</h3>

              <div class="flex items-center gap-3">
                <button
                  type="button"
                  class="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  @click="selectedWorkspaceBoard = null"
                >
                  Quay lại danh sách
                </button>

                <button
                  type="button"
                  class="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                  @click="closeBoardsSection"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>

          <div class="p-6">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-sm font-medium text-slate-500">Tên board</p>
                <p class="mt-2 text-base font-semibold text-slate-950">{{ selectedWorkspaceBoard.name }}</p>
              </div>
              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-sm font-medium text-slate-500">Visibility</p>
                <p class="mt-2 text-base font-semibold text-slate-950">{{ selectedWorkspaceBoard.visibility }}</p>
              </div>
              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-sm font-medium text-slate-500">Số thành viên</p>
                <p class="mt-2 text-base font-semibold text-slate-950">{{ selectedWorkspaceBoard.totalMembers }}</p>
              </div>
              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-sm font-medium text-slate-500">Số card</p>
                <p class="mt-2 text-base font-semibold text-slate-950">{{ selectedWorkspaceBoard.totalCards }}</p>
              </div>
              <div class="rounded-2xl bg-slate-50 p-4 md:col-span-2">
                <p class="text-sm font-medium text-slate-500">Ngày tạo</p>
                <p class="mt-2 text-base font-semibold text-slate-950">{{ formatDate(selectedWorkspaceBoard.createdAt) }}</p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminStore } from '@/admin/stores/admin.store'
import type { WorkspaceBoardItem, WorkspaceMemberItem } from '@/admin/types/admin'
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
const selectedWorkspaceBoard = ref<WorkspaceBoardItem | null>(null)

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
  if (!showBoardsSection.value) selectedWorkspaceBoard.value = null
}

const closeMembersSection = () => {
  showMembersSection.value = false
  selectedWorkspaceMember.value = null
}

const closeBoardsSection = () => {
  showBoardsSection.value = false
  selectedWorkspaceBoard.value = null
}

const handleSelectMember = (member: WorkspaceMemberItem) => {
  selectedWorkspaceMember.value = member
}

const handleSelectBoard = (board: WorkspaceBoardItem) => {
  selectedWorkspaceBoard.value = board
}
</script>