<template>
  <section class="space-y-8">
    <div class="rounded-[30px] border border-slate-200 bg-white px-7 py-7 shadow-sm">
      <div class="text-xs font-bold uppercase tracking-[0.24em] text-sky-600">
        Admin dashboard
      </div>
      <h1 class="mt-3 text-3xl font-black tracking-tight text-slate-950">
        Tong quan he thong
      </h1>
      <p class="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
        Bieu do tong hop duoc dua len dau trang. Nhan vao tung cot hoac tung khung
        trang thai de di toi khu vuc quan ly lien quan.
      </p>
    </div>

    <div
      v-if="adminStore.isLoadingStats"
      class="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center text-slate-600 shadow-sm"
    >
      Dang tai dashboard...
    </div>

    <template v-else>
      <section class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div class="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
              Bieu do tong hop
            </div>
            <h2 class="mt-2 text-[30px] font-black tracking-tight text-slate-950">
              User, workspace, board va card
            </h2>
          </div>

          <div class="flex flex-wrap gap-2">
            <RouterLink
              to="/admin/users"
              class="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
            >
              Quan ly user
            </RouterLink>
            <RouterLink
              to="/admin/workspaces"
              class="rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
            >
              Quan ly workspace
            </RouterLink>
            <RouterLink
              to="/admin/boards"
              class="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-100"
            >
              Quan ly board
            </RouterLink>
          </div>
        </div>

        <div class="mt-8 flex items-end gap-4 lg:gap-6">
          <div class="flex h-[340px] w-12 flex-col justify-between text-[11px] font-semibold text-slate-400">
            <span>{{ totalBarMax }}</span>
            <span>{{ Math.ceil(totalBarMax * 0.75) }}</span>
            <span>{{ Math.ceil(totalBarMax * 0.5) }}</span>
            <span>{{ Math.ceil(totalBarMax * 0.25) }}</span>
            <span>0</span>
          </div>

          <div class="relative flex-1">
            <div class="absolute inset-0 flex flex-col justify-between">
              <div
                v-for="line in 5"
                :key="line"
                class="border-t border-dashed border-slate-200"
              ></div>
            </div>

            <div class="relative flex h-[340px] items-end justify-around gap-3 px-1 sm:gap-5">
              <RouterLink
                v-for="item in totalChartItems"
                :key="item.label"
                :to="item.to"
                class="group flex h-full flex-1 flex-col items-center justify-end"
              >
                <div class="mb-3 text-lg font-black text-slate-700 transition group-hover:text-slate-950">
                  {{ item.value }}
                </div>
                <div
                  class="w-full max-w-[120px] rounded-t-[30px] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_18px_32px_rgba(15,23,42,0.14)]"
                  :class="item.colorClass"
                  :style="{ height: `${item.height}%` }"
                ></div>
                <div class="mt-4 text-center">
                  <div class="text-sm font-black uppercase tracking-[0.16em] text-slate-700">
                    {{ item.label }}
                  </div>
                  <div class="mt-1 text-xs font-medium text-slate-500">
                    {{ item.helper }}
                  </div>
                  <div class="mt-2 text-[11px] font-semibold text-sky-600 opacity-0 transition group-hover:opacity-100">
                    Nhan de mo
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </section>

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <!-- User status card - no click, no route display -->
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
                Trang thai user
              </div>
              <h2 class="mt-2 text-2xl font-black tracking-tight text-slate-950">
                User hoat dong va bi khoa
              </h2>
              <p class="mt-2 text-sm leading-6 text-slate-500">
                Nhan vao khung nay de den trang quan ly user.
              </p>
            </div>
          </div>

          <div class="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
            <div
              class="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full"
              :style="userStatusChartStyle"
            >
              <div class="flex h-24 w-24 items-center justify-center rounded-full bg-white text-center shadow-inner">
                <div>
                  <div class="text-3xl font-black text-slate-950">{{ stats.totalUsers }}</div>
                  <div class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Users
                  </div>
                </div>
              </div>
            </div>

            <div class="min-w-0 flex-1 space-y-4">
              <div
                v-for="item in userStatusItems"
                :key="item.label"
                class="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100"
              >
                <div class="flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3">
                    <span class="h-3 w-3 rounded-full" :class="item.dotClass"></span>
                    <span class="text-sm font-semibold text-slate-700">{{ item.label }}</span>
                  </div>
                  <span class="text-base font-black text-slate-950">{{ item.value }}</span>
                </div>
                <div class="mt-3 h-2 overflow-hidden rounded-full bg-white">
                  <div
                    class="h-full rounded-full"
                    :class="item.barClass"
                    :style="{ width: `${item.percent}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Workspace status card - no click, no route display -->
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="text-xs font-bold uppercase tracking-[0.22em] text-sky-600">
                Trang thai workspace
              </div>
              <h2 class="mt-2 text-2xl font-black tracking-tight text-slate-950">
                Workspace hoat dong va luu tru
              </h2>
              <p class="mt-2 text-sm leading-6 text-slate-500">
                Nhan vao khung nay de den trang quan ly workspace.
              </p>
            </div>
          </div>

          <div class="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
            <div
              class="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full"
              :style="workspaceStatusChartStyle"
            >
              <div class="flex h-24 w-24 items-center justify-center rounded-full bg-white text-center shadow-inner">
                <div>
                  <div class="text-3xl font-black text-slate-950">{{ stats.totalWorkspaces }}</div>
                  <div class="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Workspace
                  </div>
                </div>
              </div>
            </div>

            <div class="min-w-0 flex-1 space-y-4">
              <div
                v-for="item in workspaceStatusItems"
                :key="item.label"
                class="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100"
              >
                <div class="flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3">
                    <span class="h-3 w-3 rounded-full" :class="item.dotClass"></span>
                    <span class="text-sm font-semibold text-slate-700">{{ item.label }}</span>
                  </div>
                  <span class="text-base font-black text-slate-950">{{ item.value }}</span>
                </div>
                <div class="mt-3 h-2 overflow-hidden rounded-full bg-white">
                  <div
                    class="h-full rounded-full"
                    :class="item.barClass"
                    :style="{ width: `${item.percent}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAdminStore } from '@/admin/stores/admin.store'

const adminStore = useAdminStore()

const stats = computed(() => ({
  totalUsers: adminStore.stats?.totalUsers ?? 0,
  totalWorkspaces: adminStore.stats?.totalWorkspaces ?? 0,
  totalBoards: adminStore.stats?.totalBoards ?? 0,
  totalCards: adminStore.stats?.totalCards ?? 0,
  activeUsers: adminStore.stats?.activeUsers ?? 0,
  lockedUsers: adminStore.stats?.lockedUsers ?? 0,
  archivedWorkspaces: adminStore.stats?.archivedWorkspaces ?? 0,
}))

const activeWorkspaces = computed(() =>
  Math.max(stats.value.totalWorkspaces - stats.value.archivedWorkspaces, 0)
)

const totalBarMax = computed(() =>
  Math.max(
    stats.value.totalUsers,
    stats.value.totalWorkspaces,
    stats.value.totalBoards,
    stats.value.totalCards,
    1
  )
)

const percentOf = (value: number, total: number) =>
  total ? Math.round((value / total) * 100) : 0

const barHeight = (value: number) => {
  if (!value) {
    return 0
  }

  return Math.max((value / totalBarMax.value) * 100, 18)
}

const userActivePercent = computed(() =>
  percentOf(stats.value.activeUsers, stats.value.totalUsers)
)

const workspaceArchivedPercent = computed(() =>
  percentOf(stats.value.archivedWorkspaces, stats.value.totalWorkspaces)
)

const totalChartItems = computed(() => [
  {
    label: 'User',
    helper: 'Mo quan ly user',
    value: stats.value.totalUsers,
    to: '/admin/users',
    colorClass: 'bg-[linear-gradient(180deg,#fb7185_0%,#e11d48_100%)]',
    height: barHeight(stats.value.totalUsers),
  },
  {
    label: 'Workspace',
    helper: 'Mo quan ly workspace',
    value: stats.value.totalWorkspaces,
    to: '/admin/workspaces',
    colorClass: 'bg-[linear-gradient(180deg,#38bdf8_0%,#0284c7_100%)]',
    height: barHeight(stats.value.totalWorkspaces),
  },
  {
    label: 'Board',
    helper: 'Mo quan ly board',
    value: stats.value.totalBoards,
    to: '/admin/boards',
    colorClass: 'bg-[linear-gradient(180deg,#a78bfa_0%,#7c3aed_100%)]',
    height: barHeight(stats.value.totalBoards),
  },
  {
    label: 'Card',
    helper: 'Di den board va card',
    value: stats.value.totalCards,
    to: '/admin/boards',
    colorClass: 'bg-[linear-gradient(180deg,#fbbf24_0%,#d97706_100%)]',
    height: barHeight(stats.value.totalCards),
  },
])

const userStatusItems = computed(() => [
  {
    label: 'Dang hoat dong',
    value: stats.value.activeUsers,
    percent: userActivePercent.value,
    dotClass: 'bg-emerald-500',
    barClass: 'bg-emerald-500',
  },
  {
    label: 'Bi khoa',
    value: stats.value.lockedUsers,
    percent: Math.max(100 - userActivePercent.value, stats.value.lockedUsers ? 8 : 0),
    dotClass: 'bg-amber-500',
    barClass: 'bg-amber-500',
  },
])

const workspaceStatusItems = computed(() => [
  {
    label: 'Dang hoat dong',
    value: activeWorkspaces.value,
    percent: Math.max(
      100 - workspaceArchivedPercent.value,
      activeWorkspaces.value ? 8 : 0
    ),
    dotClass: 'bg-sky-500',
    barClass: 'bg-sky-500',
  },
  {
    label: 'Luu tru',
    value: stats.value.archivedWorkspaces,
    percent: workspaceArchivedPercent.value,
    dotClass: 'bg-slate-400',
    barClass: 'bg-slate-400',
  },
])

const userStatusChartStyle = computed(() => ({
  background: `conic-gradient(#10b981 0 ${userActivePercent.value}%, #f59e0b ${userActivePercent.value}% 100%)`,
}))

const workspaceStatusChartStyle = computed(() => ({
  background: `conic-gradient(#0ea5e9 0 ${100 - workspaceArchivedPercent.value}%, #94a3b8 ${100 - workspaceArchivedPercent.value}% 100%)`,
}))

onMounted(() => {
  void adminStore.fetchStats()
})
</script>