<template>
  <section class="space-y-8">
    <PageHeader
      breadcrumb="Admin / Workspaces"
      title="Workspace Management"
      description="Tìm kiếm theo tên workspace, lọc theo trạng thái và xem chi tiết workspace."
    />

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <SummaryMiniCard label="Tổng workspace" :value="adminStore.workspaces.length" />
      <SummaryMiniCard label="Hoạt động" :value="activeCount" />
      <SummaryMiniCard label="Lưu trữ" :value="archivedCount" />
    </div>

    <WorkspaceFilterBar
      v-model:search="search"
      v-model:status="status"
    />

    <LoadingBlock v-if="adminStore.isLoadingWorkspaces" />

    <WorkspaceTable
      v-else
      :workspaces="filteredWorkspaces"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAdminStore } from '@/modules/admin/stores/admin.store'
import type { WorkspaceItem } from '@/modules/admin/types/admin'
import PageHeader from '@/modules/admin/components/AdminDashbord/common/PageHeader.vue'
import SummaryMiniCard from '@/modules/admin/components/AdminDashbord/common/SummaryMiniCard.vue'
import LoadingBlock from '@/modules/admin/components/AdminDashbord/common/LoadingBlock.vue'
import WorkspaceFilterBar from '@/modules/admin/components/AdminDashbord/workspace/WorkspaceFilterBar.vue'
import WorkspaceTable from '@/modules/admin/components/AdminDashbord/workspace/WorkspaceTable.vue'

const adminStore = useAdminStore()
const search = ref('')
const status = ref('')

onMounted(() => {
  adminStore.fetchWorkspaces()
})

const filteredWorkspaces = computed<WorkspaceItem[]>(() =>
  adminStore.workspaces.filter((workspace) => {
    const matchesSearch =
      !search.value ||
      workspace.name.toLowerCase().includes(search.value.toLowerCase())

    const matchesStatus =
      !status.value || workspace.status === status.value

    return matchesSearch && matchesStatus
  })
)

const activeCount = computed(
  () => adminStore.workspaces.filter((item) => item.status === 'active').length
)

const archivedCount = computed(
  () => adminStore.workspaces.filter((item) => item.status === 'archived').length
)
</script>