<template>
  <aside class="flex min-h-screen w-72 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-white">
    <div class="border-b border-slate-800 px-6 py-6">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        Management
      </p>
      <h1 class="mt-2 text-lg font-semibold tracking-wide text-white">
        Admin Panel
      </h1>
    </div>

    <nav class="flex-1 space-y-2 px-4 py-6">
      <RouterLink
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition"
        :class="
          isActive(item.to)
            ? 'bg-white text-slate-950 shadow-sm'
            : 'text-slate-300 hover:bg-slate-900 hover:text-white'
        "
      >
        <component :is="item.icon" class="h-5 w-5" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { useRoute } from "vue-router";
import {
  LayoutDashboard,
  Users,
  Layers3,
  FolderKanban,
} from "lucide-vue-next";

const route = useRoute();

const menuItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Workspaces", to: "/admin/workspaces", icon: Layers3 },
  { label: "Boards", to: "/admin/boards", icon: FolderKanban },
];

const isActive = (path) => route.path.startsWith(path);
</script>
