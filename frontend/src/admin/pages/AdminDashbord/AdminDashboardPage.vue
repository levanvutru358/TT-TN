<template>
  <section class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">
        Tong quan he thong
      </h1>
      <p class="mt-2 text-base text-slate-600">
        Theo doi nhanh so luong user, workspace, board va trang thai hoat dong.
      </p>
    </div>

    <AdminStatsOverview :stats="stats" />

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-xl font-bold text-slate-950">Tong quan quan tri</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          Khu vuc nay dung de theo doi cac chi so chinh cua he thong va di nhanh
          toi cac khu vuc quan ly.
        </p>
      </div>

      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-xl font-bold text-slate-950">Tac vu nhanh</h3>

        <div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <RouterLink
            to="/admin/users"
            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Di toi quan ly user
          </RouterLink>

          <RouterLink
            to="/admin/workspaces"
            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Di toi quan ly workspace
          </RouterLink>

          <RouterLink
            to="/admin/boards"
            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Di toi quan ly board
          </RouterLink>

          <RouterLink
            to="/admin/statistics"
            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Xem thong ke
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import AdminStatsOverview from '@/admin/components/AdminDashbord/AdminStatsOverview.vue'
import { useAdminStore } from '@/admin/stores/admin.store'

const adminStore = useAdminStore()

onMounted(() => {
  adminStore.fetchStats()
})

const stats = computed(() => adminStore.stats)
</script>
