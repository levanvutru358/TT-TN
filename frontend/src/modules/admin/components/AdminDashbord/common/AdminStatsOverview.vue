<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-5">
    <article
      v-for="item in metricItems"
      :key="item.title"
      class="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r" :class="item.accent" />

      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            {{ item.badge }}
          </p>
          <h3 class="mt-3 text-sm font-semibold text-slate-600">{{ item.title }}</h3>
        </div>

        <div class="flex flex-col items-end gap-2">
          <span
            class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
          >
            {{ item.shortLabel }}
          </span>

          <span
            v-if="item.trend"
            class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
            :class="item.trend.toneClass"
          >
            <svg
              v-if="item.trend.direction === 'up'"
              class="h-3.5 w-3.5"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 3l4.5 5H9.5v5h-3V8H3.5L8 3z" />
            </svg>

            <svg
              v-else-if="item.trend.direction === 'down'"
              class="h-3.5 w-3.5"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 13L3.5 8h3V3h3v5h3L8 13z" />
            </svg>

            <svg
              v-else
              class="h-3.5 w-3.5"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3 7h10v2H3z" />
            </svg>

            <span>{{ item.trend.changeLabel }}</span>
          </span>
        </div>
      </div>

      <div class="mt-8 text-4xl font-black tracking-tight text-slate-950">
        {{ item.displayValue }}
      </div>

      <p class="mt-3 min-h-[48px] text-sm leading-6 text-slate-500">
        {{ item.subtitle }}
      </p>

      <div
        v-if="item.trend"
        class="mt-4 text-xs font-semibold uppercase tracking-[0.2em]"
        :class="item.trend.textClass"
      >
        {{ item.trend.periodLabel }}
      </div>

      <div class="mt-5 h-2 rounded-full bg-slate-100">
        <div
          class="h-2 rounded-full bg-gradient-to-r transition-all duration-500"
          :class="item.accent"
          :style="{ width: item.barWidth }"
        />
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed } from 'vue'
import type { AdminStats } from '@/modules/admin/types/admin'

type MetricKey =
  | 'totalUsers'
  | 'totalWorkspaces'
  | 'totalBoards'
  | 'totalCards'
  | 'activeUsers'

type TrendDirection = 'up' | 'down' | 'flat'

interface TrendDisplay {
  direction: TrendDirection
  changeLabel: string
  periodLabel: string
}

const props = defineProps<{
  stats: AdminStats | null
  trends?: Partial<Record<MetricKey, TrendDisplay>>
}>()

const numberFormatter = new Intl.NumberFormat('vi-VN')

const trendToneClass = (direction: TrendDirection) => {
  if (direction === 'up') {
    return 'bg-emerald-100 text-emerald-700'
  }

  if (direction === 'down') {
    return 'bg-rose-100 text-rose-700'
  }

  return 'bg-slate-100 text-slate-600'
}

const trendTextClass = (direction: TrendDirection) => {
  if (direction === 'up') {
    return 'text-emerald-600'
  }

  if (direction === 'down') {
    return 'text-rose-600'
  }

  return 'text-slate-500'
}

const baseItems = computed(() => [
  {
    key: 'totalUsers' as MetricKey,
    title: 'Tong so user',
    rawValue: props.stats?.totalUsers ?? 0,
    subtitle: 'Tong so tai khoan dang co trong he thong.',
    badge: 'Users',
    shortLabel: 'USR',
    accent: 'from-sky-500 via-blue-500 to-cyan-400'
  },
  {
    key: 'totalWorkspaces' as MetricKey,
    title: 'Tong so workspace',
    rawValue: props.stats?.totalWorkspaces ?? 0,
    subtitle: 'Khong gian lam viec dang duoc van hanh.',
    badge: 'Spaces',
    shortLabel: 'WSP',
    accent: 'from-emerald-500 via-teal-500 to-cyan-400'
  },
  {
    key: 'totalBoards' as MetricKey,
    title: 'Tong so board',
    rawValue: props.stats?.totalBoards ?? 0,
    subtitle: 'Bang cong viec dang duoc quan ly toan he thong.',
    badge: 'Boards',
    shortLabel: 'BRD',
    accent: 'from-violet-500 via-fuchsia-500 to-pink-400'
  },
  {
    key: 'totalCards' as MetricKey,
    title: 'Tong so card',
    rawValue: props.stats?.totalCards ?? 0,
    subtitle: 'Tong khoi luong dau viec dang duoc theo doi.',
    badge: 'Cards',
    shortLabel: 'CRD',
    accent: 'from-amber-500 via-orange-500 to-rose-400'
  },
  {
    key: 'activeUsers' as MetricKey,
    title: 'Active users',
    rawValue: props.stats?.activeUsers ?? 0,
    subtitle: 'So tai khoan dang o trang thai hoat dong.',
    badge: 'Health',
    shortLabel: 'ACT',
    accent: 'from-slate-900 via-slate-700 to-slate-500'
  }
])

const maxValue = computed(() => {
  return Math.max(...baseItems.value.map((item) => item.rawValue), 1)
})

const metricItems = computed(() => {
  return baseItems.value.map((item) => {
    const trend = props.trends?.[item.key]

    return {
      ...item,
      displayValue: numberFormatter.format(item.rawValue),
      barWidth: `${Math.max(28, Math.round((item.rawValue / maxValue.value) * 100))}%`,
      trend: trend
        ? {
            ...trend,
            toneClass: trendToneClass(trend.direction),
            textClass: trendTextClass(trend.direction)
          }
        : null
    }
  })
})
</script>