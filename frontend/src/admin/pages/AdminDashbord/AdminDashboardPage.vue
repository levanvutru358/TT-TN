<template>
  <section class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight text-slate-950 text-black">
        Tổng quan hệ thống
      </h1>
      <p class="mt-2 text-base text-slate-600">
        Theo dõi nhanh số lượng user, workspace, board và trạng thái hoạt động.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-5">
      <StatCard
        title="Tổng user"
        :value="stats?.totalUsers ?? 0"
        subtitle="Tổng số user trong hệ thống"
      />
      <StatCard
        title="Tổng workspace"
        :value="stats?.totalWorkspaces ?? 0"
        subtitle="Tổng số workspace hiện có"
      />
      <StatCard
        title="Tổng board"
        :value="stats?.totalBoards ?? 0"
        subtitle="Tổng board toàn hệ thống"
      />
      <StatCard
        title="Tổng card"
        :value="stats?.totalCards ?? 0"
        subtitle="Tổng số card hiện có"
      />
      <StatCard
        title="Active users"
        :value="stats?.activeUsers ?? 0"
        subtitle="Số user đang hoạt động"
      />
    </div>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-xl font-bold text-slate-950">Tổng quan quản trị</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Khu vực này dùng để theo dõi các chỉ số chính của hệ thống. Sau này bạn có
          thể mở rộng thêm biểu đồ, báo cáo theo ngày, tỉ lệ user active hoặc thống kê
          board theo workspace.
        </p>
      </div>

      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-xl font-bold text-slate-950">Tác vụ nhanh</h3>

        <div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <RouterLink
            to="/admin/users"
            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Đi tới quản lý user
          </RouterLink>

          <RouterLink
            to="/admin/workspaces"
            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Đi tới quản lý workspace
          </RouterLink>

          <RouterLink
            to="/admin/boards"
            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Đi tới quản lý board
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAdminStore } from '@/admin/stores/admin.store'
import StatCard from '@/admin/components/AdminDashbord/StatCard.vue'

const adminStore = useAdminStore()

onMounted(() => {
  adminStore.fetchStats()
})

const stats = computed(() => adminStore.stats)
</script>