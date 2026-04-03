<template>
  <aside class="hidden min-h-screen w-72 shrink-0 bg-slate-950 text-white lg:block">
    <div class="border-b border-slate-500 px-2 py-3">
      <h1 class="text-lg font-semibold tracking-tight text-white">Admin Panel</h1>
    </div>

    <nav class="space-y-2 px-4 py-5">
      <RouterLink
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        class="block rounded-2xl px-4 py-3 text-sm font-medium transition"
        :class="
          route.path === item.to
            ? 'bg-white text-slate-950 shadow-sm'
            : 'text-slate-300 hover:bg-slate-900 hover:text-white'
        "
      >
        {{ item.label }}
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const menuItems = [
  { label: 'Dashboard', to: '/admin/dashboard' },
  { label: 'Quan ly User', to: '/admin/users' },
  { label: 'Quan ly Workspace', to: '/admin/workspaces' },
  { label: 'Quan ly Board', to: '/admin/boards' }
]
</script>
