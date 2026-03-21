<template>
  <section>
    <div class="overflow-hidden rounded-[38px] border border-white/70 bg-[#eaf0f8] p-5 shadow-[0_40px_90px_rgba(148,163,184,0.35)]">
      <div class="rounded-[32px] border border-white/70 bg-white/75 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div class="flex flex-wrap items-center gap-4">
              <div class="flex items-center gap-3 rounded-[24px] bg-white px-4 py-3 shadow-sm">
                <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 text-sm font-black text-white">
                  ST
                </div>
                <div>
                  <div class="text-lg font-black tracking-tight text-slate-950">Admin Statistics</div>
                  <div class="text-xs font-medium text-slate-400">data analysis</div>
                </div>
              </div>

              <div class="flex items-center gap-2 rounded-full bg-white px-2 py-2 shadow-sm">
                <button
                  v-for="tab in tabs"
                  :key="tab.label"
                  type="button"
                  class="rounded-full px-4 py-2 text-sm font-semibold transition"
                  :class="tab.active ? 'bg-slate-950 text-white' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'"
                >
                  {{ tab.label }}
                </button>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
                  <path d="M10 17a2 2 0 0 0 4 0" />
                </svg>
              </div>
              <div class="flex items-center gap-3 rounded-full bg-white px-3 py-2 shadow-sm">
                <div class="h-10 w-10 rounded-full bg-gradient-to-br from-amber-300 to-orange-500" />
                <div class="hidden sm:block">
                  <div class="text-sm font-semibold text-slate-950">Admin</div>
                  <div class="text-xs text-slate-400">control room</div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid gap-6 2xl:grid-cols-[1.6fr,0.9fr]">
            <div class="space-y-6 rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,240,255,0.92))] p-6 shadow-[0_24px_40px_rgba(148,163,184,0.12)]">
              <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">P. Statistics</p>
                  <h1 class="mt-3 text-3xl font-black tracking-tight text-slate-950">Thong ke he thong</h1>
                  <p class="mt-2 text-sm leading-7 text-slate-500">
                    Theo doi 5 chi so chinh: tong so user, tong so workspace, tong so board, tong so card va active users.
                  </p>
                </div>
                <div class="flex items-center gap-3 text-xs font-semibold text-slate-400">
                  <span class="inline-flex items-center gap-2">
                    <span class="h-2.5 w-2.5 rounded-full bg-violet-500" />
                    Cards
                  </span>
                  <span class="inline-flex items-center gap-2">
                    <span class="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    Members
                  </span>
                </div>
              </div>

              <div class="rounded-[30px] border border-white/70 bg-white/70 p-4 shadow-[0_18px_30px_rgba(148,163,184,0.12)]">
                <div class="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <div class="text-sm font-black uppercase tracking-[0.24em] text-slate-400">2. Thong ke</div>
                    <div class="mt-2 text-lg font-black tracking-tight text-slate-950">Tong quan 5 chi so can theo doi</div>
                  </div>
                  <div class="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-500">
                    live metrics
                  </div>
                </div>

                <AdminStatsOverview :stats="stats" />
              </div>

              <div class="relative overflow-hidden rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(240,235,255,0.98))] px-5 pb-6 pt-5">
                <div class="pointer-events-none absolute inset-x-14 top-6 bottom-14 grid" :style="chartColumnStyle">
                  <span
                    v-for="item in chartSeries"
                    :key="`${item.label}-grid`"
                    class="border-r border-dashed border-slate-200/80"
                  />
                </div>
                <div class="pointer-events-none absolute left-0 top-8 bottom-16 flex w-12 flex-col justify-between pl-1 text-[11px] font-semibold text-slate-300">
                  <span v-for="label in yAxisLabels" :key="label">{{ label }}</span>
                </div>

                <svg class="relative z-10 h-[320px] w-full" :viewBox="`0 0 ${chart.width} ${chart.height}`" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="stats-wave" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.95" />
                      <stop offset="100%" stop-color="#4f46e5" stop-opacity="0.35" />
                    </linearGradient>
                    <linearGradient id="stats-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#d7d7ee" stop-opacity="0.65" />
                      <stop offset="100%" stop-color="#eef2ff" stop-opacity="0.12" />
                    </linearGradient>
                  </defs>
                  <path :d="shadowAreaPath" fill="url(#stats-shadow)" />
                  <path :d="mainAreaPath" fill="url(#stats-wave)" />
                  <path :d="mainLinePath" fill="none" stroke="#5b21b6" stroke-width="4" stroke-linecap="round" />
                  <line
                    v-if="hasChartData"
                    :x1="highlightPoint.x"
                    :x2="highlightPoint.x"
                    :y1="42"
                    :y2="chart.baseY"
                    stroke="#5b21b6"
                    stroke-width="3"
                    opacity="0.35"
                  />
                  <circle
                    v-if="hasChartData"
                    :cx="highlightPoint.x"
                    :cy="highlightPoint.y"
                    r="9"
                    fill="#5b21b6"
                    stroke="white"
                    stroke-width="5"
                  />
                </svg>

                <div
                  v-if="hasChartData"
                  class="absolute z-20 rounded-full bg-white px-4 py-2 text-xs font-black text-slate-950 shadow-md"
                  :style="highlightBadgeStyle"
                >
                  {{ highlightBadgeLabel }}
                </div>

                <div class="ml-10 mt-2 grid gap-2 text-center text-xs font-semibold text-slate-400" :style="chartColumnStyle">
                  <span v-for="item in chartSeries" :key="item.fullLabel" :title="item.fullLabel">
                    {{ item.label }}
                  </span>
                </div>
              </div>

              <div class="grid gap-6 xl:grid-cols-[0.72fr,1.28fr]">
                <article class="rounded-[28px] bg-white p-5 shadow-sm">
                  <div class="flex items-center justify-between">
                    <h2 class="text-lg font-black tracking-tight text-slate-950">P. Head</h2>
                    <span class="text-slate-300">...</span>
                  </div>
                  <div class="mt-5 space-y-4">
                    <div
                      v-for="user in topUsers"
                      :key="user.id"
                      class="flex items-center justify-between gap-3 rounded-2xl bg-[#f8fbff] px-4 py-3"
                    >
                      <div class="flex items-center gap-3">
                        <div class="flex h-11 w-11 items-center justify-center rounded-full text-sm font-black text-white" :style="{ background: user.avatarGradient }">
                          {{ user.initials }}
                        </div>
                        <div>
                          <div class="text-sm font-semibold text-slate-950">{{ user.name }}</div>
                          <div class="text-xs text-slate-400">{{ user.roleLabel }}</div>
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="text-sm font-black text-slate-950">{{ user.activityLabel }}</div>
                        <div class="mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold" :class="user.badgeClass">
                          <svg class="h-3 w-3" viewBox="0 0 16 16" fill="currentColor">
                            <path :d="user.badgeIcon" />
                          </svg>
                          <span>{{ user.statusLabel }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                <article class="rounded-[28px] bg-white p-5 shadow-sm">
                  <div class="flex items-center justify-between">
                    <h2 class="text-lg font-black tracking-tight text-slate-950">Boards</h2>
                    <span class="text-slate-300">...</span>
                  </div>
                  <div class="mt-5 grid gap-3 sm:grid-cols-2">
                    <div
                      v-for="card in boardCards"
                      :key="card.id"
                      class="rounded-2xl bg-[#f8fbff] p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div class="flex items-start justify-between gap-3">
                        <div class="flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-black text-white" :style="{ background: card.iconGradient }">
                          {{ card.shortLabel }}
                        </div>
                        <span class="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-400">
                          {{ card.rankLabel }}
                        </span>
                      </div>
                      <div class="mt-4 text-base font-black tracking-tight text-slate-950">{{ card.name }}</div>
                      <div class="mt-1 text-xs text-slate-400">{{ card.workspaceName }}</div>
                      <div class="mt-4 flex items-end justify-between gap-3">
                        <div>
                          <div class="text-lg font-black text-slate-950">{{ card.metric }}</div>
                          <div class="text-xs text-slate-400">{{ card.helper }}</div>
                        </div>
                        <span class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold" :class="card.badgeClass">
                          <svg class="h-3 w-3" viewBox="0 0 16 16" fill="currentColor">
                            <path :d="card.badgeIcon" />
                          </svg>
                          <span>{{ card.statusLabel }}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <div class="space-y-5">
              <article class="rounded-[30px] bg-white p-6 shadow-[0_24px_40px_rgba(148,163,184,0.14)]">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-sm font-semibold text-slate-500">Active User Rate</div>
                    <div class="mt-1 text-xs text-slate-400">Current system engagement</div>
                  </div>
                  <span class="text-slate-300">o</span>
                </div>
                <div class="mt-6 flex items-center justify-center">
                  <div class="relative h-44 w-44">
                    <svg viewBox="0 0 160 160" class="h-full w-full">
                      <defs>
                        <linearGradient id="score-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stop-color="#111827" />
                          <stop offset="100%" stop-color="#94a3b8" />
                        </linearGradient>
                      </defs>
                      <circle cx="80" cy="80" r="54" fill="none" stroke="#edf1f7" stroke-width="18" />
                      <circle
                        cx="80"
                        cy="80"
                        r="54"
                        fill="none"
                        stroke="url(#score-ring)"
                        stroke-width="18"
                        stroke-linecap="round"
                        :stroke-dasharray="scoreDash"
                        :stroke-dashoffset="scoreOffset"
                        transform="rotate(-90 80 80)"
                      />
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <div class="text-4xl font-black tracking-tight text-slate-950">{{ activeRate }}</div>
                      <div class="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Percent</div>
                    </div>
                  </div>
                </div>
                <div class="mt-5 text-center text-sm font-semibold text-slate-500">
                  {{ activeUsers }} / {{ totalUsers }} users dang active
                </div>
              </article>

              <article class="rounded-[30px] bg-white p-6 shadow-[0_24px_40px_rgba(148,163,184,0.14)]">
                <div class="flex items-center justify-between">
                  <h2 class="text-lg font-black tracking-tight text-slate-950">Data Split</h2>
                  <span class="text-slate-300">...</span>
                </div>
                <div class="mt-5 space-y-4">
                  <div
                    v-for="item in activityCards"
                    :key="item.label"
                    class="rounded-[22px] p-4 text-white shadow-sm"
                    :style="{ background: item.gradient }"
                  >
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <div class="text-3xl font-black tracking-tight">{{ item.value }}</div>
                        <div class="mt-1 text-sm font-semibold text-white/90">{{ item.label }}</div>
                      </div>
                      <span class="rounded-full border border-white/20 px-2.5 py-1 text-[11px] font-semibold text-white/80">
                        {{ item.badge }}
                      </span>
                    </div>
                    <div class="mt-4 h-2 rounded-full bg-white/20">
                      <div class="h-2 rounded-full bg-white" :style="{ width: item.progressWidth }" />
                    </div>
                  </div>
                </div>
              </article>

              <article class="rounded-[30px] bg-white p-6 shadow-[0_24px_40px_rgba(148,163,184,0.14)]">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-lg font-black tracking-tight text-slate-950">Workload</div>
                    <div class="mt-1 text-xs text-slate-400">Distribution across workspaces</div>
                  </div>
                  <span class="h-3 w-3 rounded-full border border-slate-300" />
                </div>
                <div class="mt-6 text-3xl font-black tracking-tight text-slate-950">{{ totalCardsLabel }}</div>
                <div class="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">total cards in system</div>
                <div class="mt-5 h-4 rounded-full bg-[#eef2f8]">
                  <div class="h-4 rounded-full bg-[linear-gradient(90deg,#f472b6,#ec4899,#c026d3)]" :style="{ width: workloadSummary.width }" />
                </div>
                <div class="mt-5 flex items-center justify-between gap-4">
                  <span class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    <svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M3 7h10v2H3z" />
                    </svg>
                    <span>{{ workloadSummary.averageLabel }}</span>
                  </span>
                  <div class="text-right text-xs text-slate-400">
                    <div>{{ workloadSummary.shareLabel }}</div>
                    <div class="mt-1">{{ workloadSummary.peakLabel }}</div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import AdminStatsOverview from '@/admin/components/AdminDashbord/common/AdminStatsOverview.vue'
import { useAdminStore } from '@/admin/stores/admin.store'
import type { BoardItem } from '@/admin/types/admin'

const adminStore = useAdminStore()
const numberFormatter = new Intl.NumberFormat('vi-VN')
const decimalFormatter = new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 1 })
const dateFormatter = new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit' })

const chart = {
  width: 720,
  height: 280,
  left: 26,
  right: 24,
  top: 24,
  baseY: 242
}

const upIcon = 'M8 3l4.5 5H9.5v5h-3V8H3.5L8 3z'
const downIcon = 'M8 13L3.5 8h3V3h3v5h3L8 13z'

const tabs = [
  { label: 'Workspace', active: true },
  { label: 'Boards', active: false },
  { label: 'Users', active: false }
]

const formatNumber = (value: number) => numberFormatter.format(value)
const formatDecimal = (value: number) => decimalFormatter.format(value)
const shortDate = (value: string) => dateFormatter.format(new Date(value))

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item[0]?.toUpperCase() ?? '')
    .join('')

const shortLabel = (value: string) => {
  const words = value.split(' ').filter(Boolean)

  if (words.length === 0) return 'NA'
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase()

  return words
    .slice(0, 2)
    .map((item) => item[0]?.toUpperCase() ?? '')
    .join('')
}

const linePath = (points: Array<{ x: number; y: number }>) =>
  points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')

const areaPath = (points: Array<{ x: number; y: number }>, baseY: number) =>
  !points.length ? '' : `${linePath(points)} L ${points[points.length - 1].x} ${baseY} L ${points[0].x} ${baseY} Z`

const loadStatistics = async () => {
  await Promise.allSettled([
    adminStore.fetchStats(),
    adminStore.fetchUsers(),
    adminStore.fetchWorkspaces(),
    adminStore.fetchBoards()
  ])
}

onMounted(() => {
  void loadStatistics()
})

const stats = computed(() => adminStore.stats)
const totalUsers = computed(() => stats.value?.totalUsers ?? adminStore.users.length)
const totalBoards = computed(() => stats.value?.totalBoards ?? adminStore.boards.length)
const totalCards = computed(() => stats.value?.totalCards ?? 0)
const activeUsers = computed(() => stats.value?.activeUsers ?? 0)
const totalCardsLabel = computed(() => formatNumber(totalCards.value))
const activeRate = computed(() => (totalUsers.value === 0 ? 0 : Math.round((activeUsers.value / totalUsers.value) * 100)))
const privateBoards = computed(() => adminStore.boards.filter((board) => board.visibility === 'private').length)
const privateBoardRate = computed(() => (totalBoards.value === 0 ? 0 : Math.round((privateBoards.value / totalBoards.value) * 100)))
const averageCardsPerBoard = computed(() => (totalBoards.value === 0 ? 0 : totalCards.value / totalBoards.value))

const workspaceInsights = computed(() => {
  const boardsByWorkspace = adminStore.boards.reduce<Record<string, BoardItem[]>>((groups, board) => {
    if (!groups[board.workspaceName]) {
      groups[board.workspaceName] = []
    }

    groups[board.workspaceName].push(board)
    return groups
  }, {})

  const baseInsights = adminStore.workspaces.map((workspace) => {
    const relatedBoards = boardsByWorkspace[workspace.name] ?? []
    const workspaceCards = relatedBoards.reduce((sum, board) => sum + board.totalCards, 0)

    return {
      ...workspace,
      actualBoards: relatedBoards.length,
      totalCards: workspaceCards
    }
  })

  const knownNames = new Set(baseInsights.map((workspace) => workspace.name))
  const derivedInsights = Object.entries(boardsByWorkspace)
    .filter(([workspaceName]) => !knownNames.has(workspaceName))
    .map(([workspaceName, boards]) => ({
      id: `derived-${workspaceName}`,
      name: workspaceName,
      ownerName: 'Unknown',
      totalMembers: boards.reduce((sum, board) => sum + board.totalMembers, 0),
      totalBoards: boards.length,
      createdAt: boards[0]?.createdAt ?? new Date().toISOString(),
      actualBoards: boards.length,
      totalCards: boards.reduce((sum, board) => sum + board.totalCards, 0)
    }))

  return [...baseInsights, ...derivedInsights].sort(
    (left, right) => right.totalCards - left.totalCards || right.actualBoards - left.actualBoards
  )
})

const busiestWorkspace = computed(() => workspaceInsights.value[0] ?? null)
const workloadShare = computed(() => {
  const peakCards = busiestWorkspace.value?.totalCards ?? 0
  return totalCards.value === 0 ? 0 : Math.round((peakCards / totalCards.value) * 100)
})

const activityCards = computed(() => [
  {
    label: 'Active users',
    value: `${activeRate.value}%`,
    badge: `${activeUsers.value}/${totalUsers.value}`,
    gradient: 'linear-gradient(135deg,#38bdf8 0%,#60a5fa 100%)',
    progressWidth: `${Math.max(activeRate.value, 18)}%`
  },
  {
    label: 'Private boards',
    value: `${privateBoardRate.value}%`,
    badge: `${privateBoards.value}/${totalBoards.value}`,
    gradient: 'linear-gradient(135deg,#fbbf24 0%,#fb923c 100%)',
    progressWidth: `${Math.max(privateBoardRate.value, 12)}%`
  },
  {
    label: 'Top workspace share',
    value: `${workloadShare.value}%`,
    badge: busiestWorkspace.value ? shortLabel(busiestWorkspace.value.name) : 'NA',
    gradient: 'linear-gradient(135deg,#8b5cf6 0%,#6366f1 100%)',
    progressWidth: `${Math.max(workloadShare.value, 12)}%`
  }
])

const topUsers = computed(() => {
  const palette = [
    'linear-gradient(135deg,#60a5fa 0%,#2563eb 100%)',
    'linear-gradient(135deg,#f59e0b 0%,#ef4444 100%)'
  ]

  return [...adminStore.users]
    .sort((left, right) => {
      if (left.status !== right.status) {
        return left.status === 'active' ? -1 : 1
      }

      return new Date(right.lastActiveAt).getTime() - new Date(left.lastActiveAt).getTime()
    })
    .slice(0, 2)
    .map((user, index) => ({
      ...user,
      initials: initials(user.name),
      avatarGradient: palette[index % palette.length],
      roleLabel: user.role === 'admin' ? 'Admin' : 'Member',
      activityLabel: `Last active ${shortDate(user.lastActiveAt)}`,
      statusLabel: user.status === 'active' ? 'Active' : 'Locked',
      badgeClass: user.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700',
      badgeIcon: user.status === 'active' ? upIcon : downIcon
    }))
})

const boardCards = computed(() => {
  const palette = [
    'linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%)',
    'linear-gradient(135deg,#facc15 0%,#f59e0b 100%)',
    'linear-gradient(135deg,#38bdf8 0%,#2563eb 100%)',
    'linear-gradient(135deg,#1d4ed8 0%,#312e81 100%)'
  ]

  return [...adminStore.boards]
    .sort((left, right) => right.totalCards - left.totalCards)
    .slice(0, 4)
    .map((board, index) => {
      const workspace = workspaceInsights.value.find((item) => item.name === board.workspaceName)
      const workspaceAverage =
        workspace && workspace.actualBoards > 0
          ? workspace.totalCards / workspace.actualBoards
          : averageCardsPerBoard.value
      const isAboveAverage = board.totalCards >= workspaceAverage

      return {
        ...board,
        shortLabel: shortLabel(board.name).slice(0, 2),
        iconGradient: palette[index % palette.length],
        rankLabel: `Top ${index + 1}`,
        metric: `${formatNumber(board.totalCards)} cards`,
        helper: `${board.totalMembers} members`,
        statusLabel: isAboveAverage ? 'Above avg' : 'Below avg',
        badgeClass: isAboveAverage ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700',
        badgeIcon: isAboveAverage ? upIcon : downIcon
      }
    })
})

const chartSeries = computed(() => {
  if (workspaceInsights.value.length > 0) {
    return workspaceInsights.value.map((workspace) => ({
      label: shortLabel(workspace.name),
      fullLabel: workspace.name,
      value: workspace.totalCards,
      shadowValue: workspace.totalMembers
    }))
  }

  return adminStore.boards.map((board) => ({
    label: shortLabel(board.name),
    fullLabel: board.name,
    value: board.totalCards,
    shadowValue: board.totalMembers
  }))
})

const hasChartData = computed(() => chartSeries.value.length > 0)
const chartColumnStyle = computed(() => ({
  gridTemplateColumns: `repeat(${Math.max(chartSeries.value.length, 1)}, minmax(0, 1fr))`
}))

const maxChartValue = computed(() => Math.max(...chartSeries.value.flatMap((item) => [item.value, item.shadowValue]), 1) * 1.1)
const yAxisLabels = computed(() => [1, 0.75, 0.5, 0.25].map((ratio) => formatNumber(Math.round(maxChartValue.value * ratio))))

const mainPoints = computed(() => {
  const step = (chart.width - chart.left - chart.right) / Math.max(chartSeries.value.length - 1, 1)

  return chartSeries.value.map((item, index) => ({
    x: chart.left + index * step,
    y: chart.top + (1 - item.value / maxChartValue.value) * (chart.baseY - chart.top)
  }))
})

const shadowPoints = computed(() => {
  const step = (chart.width - chart.left - chart.right) / Math.max(chartSeries.value.length - 1, 1)

  return chartSeries.value.map((item, index) => ({
    x: chart.left + index * step,
    y: chart.top + (1 - item.shadowValue / maxChartValue.value) * (chart.baseY - chart.top)
  }))
})

const mainAreaPath = computed(() => areaPath(mainPoints.value, chart.baseY))
const shadowAreaPath = computed(() => areaPath(shadowPoints.value, chart.baseY))
const mainLinePath = computed(() => linePath(mainPoints.value))

const highlightIndex = computed(() => {
  if (chartSeries.value.length === 0) return -1

  return chartSeries.value.reduce(
    (best, item, index, list) => (item.value > list[best].value ? index : best),
    0
  )
})

const highlightPoint = computed(() => mainPoints.value[highlightIndex.value] ?? { x: 0, y: 0 })
const highlightBadgeStyle = computed(() => `left:${Math.min(Math.max((highlightPoint.value.x / chart.width) * 100 - 7, 10), 58)}%;top:${Math.max((highlightPoint.value.y / chart.height) * 100 - 12, 8)}%;`)
const highlightBadgeLabel = computed(() => {
  const item = chartSeries.value[highlightIndex.value]
  if (!item) return 'No data'
  return `${item.fullLabel}: ${formatNumber(item.value)} cards`
})

const scoreLength = 2 * Math.PI * 54
const scoreDash = computed(() => `${(activeRate.value / 100) * scoreLength} ${scoreLength}`)
const scoreOffset = computed(() => scoreLength * 0.15)

const workloadSummary = computed(() => ({
  width: `${Math.max(workloadShare.value, 18)}%`,
  averageLabel: `${formatDecimal(averageCardsPerBoard.value)} cards / board`,
  shareLabel: `${workloadShare.value}% cards in top workspace`,
  peakLabel: busiestWorkspace.value
    ? `${busiestWorkspace.value.name} | ${formatNumber(busiestWorkspace.value.totalCards)} cards`
    : 'No workspace data'
}))
</script>
