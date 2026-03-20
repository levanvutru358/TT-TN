<template>
  <section class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight text-slate-950 text-black">
        Quản lý Workspace
      </h1>
      <p class="mt-2 text-base text-slate-600">
        Theo dõi danh sách workspace trong toàn hệ thống.
      </p>
    </div>

    <div
      v-if="adminStore.isLoadingWorkspaces"
      class="rounded-3xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm"
    >
      Đang tải dữ liệu workspace...
    </div>

    <WorkspaceTable
      v-else
      :workspaces="adminStore.workspaces"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAdminStore } from '@/admin/stores/admin.store'
import WorkspaceTable from '@/admin/components/AdminDashbord/WorkspaceTable.vue'

const adminStore = useAdminStore()

onMounted(() => {
  adminStore.fetchWorkspaces()
})
</script>