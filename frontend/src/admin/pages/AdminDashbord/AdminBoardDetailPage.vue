<template>
  <section class="space-y-8">
    <PageHeader
      breadcrumb="Admin / Boards / Detail"
      :title="boardDetail?.name || 'Board Detail'"
      description="Thông tin chi tiết board, workspace liên quan và danh sách thành viên."
    />

    <LoadingBlock v-if="adminStore.isLoadingBoardDetail" />

    <template v-else-if="boardDetail">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryMiniCard label="Tên board" :value="boardDetail.name" />
        <SummaryMiniCard label="Workspace" :value="boardDetail.workspaceName" />
        <SummaryMiniCard label="Tổng list" :value="boardDetail.totalLists" />
        <SummaryMiniCard label="Tổng card" :value="boardDetail.totalCards" />
      </div>

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div class="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-xl font-bold text-slate-950">Thông tin board</h3>
              <p class="mt-1 text-sm text-slate-600">
                Chi tiết board, workspace, owner và trạng thái hiển thị.
              </p>
            </div>

            <AppBadge
              :label="boardDetail.visibility"
              :variant="boardDetail.visibility === 'public' ? 'info' : 'neutral'"
            />
          </div>

          <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm font-medium text-slate-500">Tên board</p>
              <p class="mt-2 text-base font-semibold text-slate-950">
                {{ boardDetail.name }}
              </p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm font-medium text-slate-500">Workspace</p>
              <p class="mt-2 text-base font-semibold text-slate-950">
                {{ boardDetail.workspaceName }}
              </p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm font-medium text-slate-500">Owner</p>
              <p class="mt-2 text-base font-semibold text-slate-950">
                {{ boardDetail.ownerName }}
              </p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm font-medium text-slate-500">Ngày tạo</p>
              <p class="mt-2 text-base font-semibold text-slate-950">
                {{ formatDate(boardDetail.createdAt) }}
              </p>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="text-xl font-bold text-slate-950">Chỉ số board</h3>
          <p class="mt-1 text-sm text-slate-600">
            Tổng quan nhanh về cấu trúc và thành viên.
          </p>

          <div class="mt-6 space-y-4">
            <div class="rounded-2xl border border-slate-200 p-4">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="text-sm font-medium text-slate-500">Tổng thành viên</p>
                  <p class="mt-2 text-2xl font-bold text-slate-950">{{ boardDetail.totalMembers }}</p>
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
                <p class="text-sm font-medium text-slate-500">List</p>
                <p class="mt-2 text-2xl font-bold text-slate-950">{{ boardDetail.totalLists }}</p>
              </div>

              <div class="rounded-2xl border border-slate-200 p-4">
                <p class="text-sm font-medium text-slate-500">Card</p>
                <p class="mt-2 text-2xl font-bold text-slate-950">{{ boardDetail.totalCards }}</p>
              </div>
            </div>

            <div class="rounded-2xl border border-slate-200 p-4">
              <p class="text-sm font-medium text-slate-500">Visibility</p>
              <p class="mt-2 text-2xl font-bold capitalize text-slate-950">
                {{ boardDetail.visibility }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showMembersSection" class="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <BoardMembersTable
          :members="boardDetail.members"
          @request-remove-member="openRemoveConfirm"
        />
      </div>
    </template>

    <ConfirmModal
      :open="isConfirmOpen"
      title="Xác nhận xóa thành viên"
      :message="confirmMessage"
      @cancel="closeConfirm"
      @confirm="handleConfirmRemove"
    />
  </section>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminStore } from '@/admin/stores/admin.store'
import type { BoardMemberItem } from '@/admin/types/admin'
import PageHeader from '@/admin/components/AdminDashbord/common/PageHeader.vue'
import LoadingBlock from '@/admin/components/AdminDashbord/common/LoadingBlock.vue'
import SummaryMiniCard from '@/admin/components/AdminDashbord/common/SummaryMiniCard.vue'
import AppBadge from '@/admin/components/AdminDashbord/common/AppBadge.vue'
import ConfirmModal from '@/admin/components/AdminDashbord/common/ConfirmModal.vue'
import BoardMembersTable from '@/admin/components/AdminDashbord/board/BoardMembersTable.vue'

const route = useRoute()
const adminStore = useAdminStore()

const isConfirmOpen = ref(false)
const selectedMember = ref<BoardMemberItem | null>(null)
const showMembersSection = ref(false)

onMounted(() => {
  adminStore.fetchBoardDetail(String(route.params.id))
})

const boardDetail = computed(() => adminStore.currentBoardDetail)
const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY')

const confirmMessage = computed(() => {
  if (!selectedMember.value) {
    return 'Bạn có muốn xóa thành viên này khỏi board không?'
  }
  return `Bạn có muốn xóa thành viên "${selectedMember.value.name}" khỏi board không?`
})

const toggleMembers = () => {
  showMembersSection.value = !showMembersSection.value
}

const openRemoveConfirm = (member: BoardMemberItem) => {
  selectedMember.value = member
  isConfirmOpen.value = true
}

const closeConfirm = () => {
  isConfirmOpen.value = false
  selectedMember.value = null
}

const handleConfirmRemove = async () => {
  if (!selectedMember.value) return

  await adminStore.removeBoardMember(String(route.params.id), selectedMember.value.id)
  closeConfirm()
}
</script>