<template>
  <section class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight text-slate-950 text-black">Quản lý User</h1>
      <p class="mt-2 text-base text-slate-600">
        Xem danh sách user và thay đổi trạng thái khóa hoặc mở khóa.
      </p>
    </div>

    <div
      v-if="adminStore.isLoadingUsers"
      class="rounded-3xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm"
    >
      Đang tải dữ liệu user...
    </div>

    <UserTable
      v-else
      :users="adminStore.users"
      @toggle-lock="handleToggleLock"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAdminStore } from '@/admin/stores/admin.store'
import UserTable from '@/admin/components/AdminDashbord/UserTable.vue'

const adminStore = useAdminStore()

onMounted(() => {
  adminStore.fetchUsers()
})

const handleToggleLock = async (userId: string) => {
  await adminStore.toggleUserLock(userId)
}
</script>