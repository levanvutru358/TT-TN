<template>
  <section class="space-y-8">
    <PageHeader
      breadcrumb="Admin / Boards / Detail"
      :title="boardDetail?.name || 'Board Detail'"
      description="Hiển thị đầy đủ thông tin board và quản lý thành viên trong board."
    />

    <LoadingBlock v-if="adminStore.isLoadingBoardDetail" />

    <template v-else-if="boardDetail">
      <BoardOverviewCard :board="boardDetail" />

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="text-xl font-bold text-slate-950">Thông tin board</h3>
          <div class="mt-4 space-y-3 text-sm text-slate-700">
            <p><span class="font-semibold text-slate-950">Tên board:</span> {{ boardDetail.name }}</p>
            <p><span class="font-semibold text-slate-950">Workspace:</span> {{ boardDetail.workspaceName }}</p>
            <p><span class="font-semibold text-slate-950">Owner:</span> {{ boardDetail.ownerName }}</p>
            <p><span class="font-semibold text-slate-950">Visibility:</span> {{ boardDetail.visibility }}</p>
            <p><span class="font-semibold text-slate-950">Ngày tạo:</span> {{ formatDate(boardDetail.createdAt) }}</p>
          </div>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="text-xl font-bold text-slate-950">Chỉ số board</h3>
          <div class="mt-4 space-y-3 text-sm text-slate-700">
            <p><span class="font-semibold text-slate-950">Tổng list:</span> {{ boardDetail.totalLists }}</p>
            <p><span class="font-semibold text-slate-950">Tổng card:</span> {{ boardDetail.totalCards }}</p>
            <p><span class="font-semibold text-slate-950">Tổng thành viên:</span> {{ boardDetail.totalMembers }}</p>
          </div>
        </div>
      </div>

      <BoardMembersTable
        :members="boardDetail.members"
        @remove-member="handleRemoveMember"
      />
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
import BoardOverviewCard from '@/admin/components/AdminDashbord/board/BoardOverviewCard.vue'
import BoardMembersTable from '@/admin/components/AdminDashbord/board/BoardMembersTable.vue'

const route = useRoute()
const adminStore = useAdminStore()

onMounted(() => {
  adminStore.fetchBoardDetail(String(route.params.id))
})

const boardDetail = computed(() => adminStore.currentBoardDetail)
const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY')

const handleRemoveMember = async (memberId: string) => {
  await adminStore.removeBoardMember(String(route.params.id), memberId)
}
</script>