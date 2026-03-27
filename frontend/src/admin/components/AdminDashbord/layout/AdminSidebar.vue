<template>
  <div>
    <button
      v-if="isMobileOpen"
      type="button"
      class="fixed inset-0 z-30 bg-slate-950/55 lg:hidden"
      aria-label="Dong thanh dieu huong admin"
      @click="$emit('close')"
    />

    <aside
      class="fixed inset-y-0 left-0 z-40 flex min-h-screen flex-col border-r border-slate-800 bg-slate-950 text-white transition-[transform,width] duration-200 lg:relative lg:translate-x-0"
      :class="sidebarClass"
    >
      <div
        class="border-b border-slate-800"
        :class="isDesktop && isCollapsed ? 'px-3 py-5' : 'px-6 py-6'"
      >
        <div
          class="flex items-center gap-3"
          :class="isDesktop && isCollapsed ? 'justify-center' : 'justify-between'"
        >
          <div
            v-if="!isDesktop || !isCollapsed"
            class="min-w-0"
          >
            <p class="truncate text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Management
            </p>
            <h1 class="mt-2 truncate text-lg font-semibold tracking-wide text-white">
              Admin Panel
            </h1>
          </div>

          <div
            v-else
            class="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-black text-white"
          >
            AP
          </div>

          <button
            v-if="!isDesktop"
            type="button"
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-slate-200 transition hover:bg-slate-800"
            aria-label="Dong thanh dieu huong admin"
            @click="$emit('close')"
          >
            <X class="h-5 w-5" />
          </button>
        </div>
      </div>

      <nav class="flex-1 space-y-2 px-3 py-6">
        <RouterLink
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          class="flex min-w-0 items-center gap-3 rounded-2xl py-3 text-sm font-medium transition"
          :class="linkClass(item.to)"
          @click="handleNavigate"
        >
          <component :is="item.icon" class="h-5 w-5 shrink-0" />
          <span
            v-if="!isDesktop || !isCollapsed"
            class="truncate"
          >
            {{ item.label }}
          </span>
        </RouterLink>
      </nav>
    </aside>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import {
  FolderKanban,
  Layers3,
  LayoutDashboard,
  Users,
  X,
} from "lucide-vue-next";

const props = defineProps({
  isDesktop: {
    type: Boolean,
    default: false,
  },
  isCollapsed: {
    type: Boolean,
    default: false,
  },
  isMobileOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const route = useRoute();

const menuItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Workspaces", to: "/admin/workspaces", icon: Layers3 },
  { label: "Boards", to: "/admin/boards", icon: FolderKanban },
];

const sidebarClass = computed(() => {
  if (props.isDesktop) {
    return props.isCollapsed ? "w-[92px]" : "w-72";
  }

  return props.isMobileOpen ? "w-[280px] translate-x-0" : "w-[280px] -translate-x-full";
});

const isActive = (path) => route.path.startsWith(path);

const linkClass = (path) => {
  const activeClass = isActive(path)
    ? "bg-white text-slate-950 shadow-sm"
    : "text-slate-300 hover:bg-slate-900 hover:text-white";

  return props.isDesktop && props.isCollapsed
    ? `${activeClass} justify-center px-3`
    : `${activeClass} px-4`;
};

const handleNavigate = () => {
  if (!props.isDesktop) {
    emit("close");
  }
};
</script>
