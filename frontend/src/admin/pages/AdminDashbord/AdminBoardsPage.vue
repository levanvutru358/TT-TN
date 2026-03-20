<template>
  <section class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight text-slate-950 text-black">Quản lý Board</h1>
      <p class="mt-2 text-base text-slate-600">
        Theo dõi danh sách board và thông tin liên quan.
      </p>
    </div>

    <div
      v-if="adminStore.isLoadingBoards"
      class="rounded-3xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm"
    >
      Đang tải dữ liệu board...
    </div>

    <BoardTable
      v-else
      :boards="adminStore.boards"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAdminStore } from '@/admin/stores/admin.store'
import BoardTable from '@/admin/components/AdminDashbord/BoardTable.vue'

const adminStore = useAdminStore()

onMounted(() => {
  adminStore.fetchBoards()
})
</script>