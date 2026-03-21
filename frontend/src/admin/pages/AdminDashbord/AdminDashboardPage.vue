<template>
  <section class="space-y-8">
    <PageHeader
      breadcrumb="Admin / Dashboard"
      title="Dashboard"
      description="Overview of users, workspaces, boards and current system activity."
    >
      <template #actions>
        <button
          type="button"
          class="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          Last 30 days
        </button>
        <button
          type="button"
          class="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Export report
        </button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4">
      <StatCard
        title="Total Users"
        :value="stats?.totalUsers ?? 0"
        subtitle="Total accounts in the system"
        :icon="Users"
        iconBg="bg-blue-500"
      />
      <StatCard
        title="Workspaces"
        :value="stats?.totalWorkspaces ?? 0"
        subtitle="Total team workspaces"
        :icon="Layers3"
        iconBg="bg-violet-500"
      />
      <StatCard
        title="Boards"
        :value="stats?.totalBoards ?? 0"
        subtitle="Boards across all workspaces"
        :icon="FolderKanban"
        iconBg="bg-emerald-500"
      />
      <StatCard
        title="Active Users"
        :value="stats?.activeUsers ?? 0"
        subtitle="Users currently marked active"
        :icon="Activity"
        iconBg="bg-amber-500"
      />
    </div>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div class="xl:col-span-2">
        <UserGrowthChart />
      </div>

      <UserStatusChart />
    </div>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-xl font-bold text-slate-950">Administration Overview</h3>
        <p class="mt-3 text-sm leading-7 text-slate-600">
          This area helps administrators monitor the main system indicators and
          quickly access the core management sections.
        </p>
      </div>

      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-xl font-bold text-slate-950">Quick Actions</h3>

        <div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <RouterLink
            to="/admin/users"
            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Go to users
          </RouterLink>

          <RouterLink
            to="/admin/workspaces"
            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Go to workspaces
          </RouterLink>

          <RouterLink
            to="/admin/boards"
            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Go to boards
          </RouterLink>

          <button
            type="button"
            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            View analytics
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { Users, Layers3, FolderKanban, Activity } from "lucide-vue-next";
import { useAdminStore } from "@/admin/stores/admin.store";
import PageHeader from "@/admin/components/AdminDashbord/common/PageHeader.vue";
import StatCard from "@/admin/components/AdminDashbord/common/StatCard.vue";
import UserGrowthChart from "@/admin/components/AdminDashbord/charts/UserGrowthChart.vue";
import UserStatusChart from "@/admin/components/AdminDashbord/charts/UserStatusChart.vue";

const adminStore = useAdminStore();

onMounted(() => {
  adminStore.fetchStats();
});

const stats = computed(() => adminStore.stats);
</script>