<template>
  <header class="border-b border-slate-200 bg-white">
    <div
      class="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8"
    >
      <div class="flex min-w-0 items-center gap-3 sm:gap-4">
        <button
          type="button"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-300 bg-white text-slate-900 transition hover:bg-slate-50"
          :aria-label="toggleLabel"
          @click="$emit('toggle-sidebar')"
        >
          <Menu v-if="!isDesktop" class="h-5 w-5" />
          <PanelLeftOpen v-else-if="isSidebarCollapsed" class="h-5 w-5" />
          <PanelLeftClose v-else class="h-5 w-5" />
        </button>

        <div class="min-w-0">
          <p class="truncate text-xs font-medium text-slate-500 sm:text-sm">Enterprise Admin</p>
          <h2 class="mt-1 truncate text-lg font-semibold text-slate-950 sm:text-xl">
            System Management
          </h2>
        </div>
      </div>

      <div class="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          class="hidden rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 sm:inline-flex"
        >
          Notifications
        </button>

        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-300 bg-white text-slate-900 transition hover:bg-slate-50 sm:hidden"
          aria-label="Notifications"
        >
          <Bell class="h-5 w-5" />
        </button>

        <div
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white"
        >
          A
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed } from "vue";
import { Bell, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-vue-next";

const props = defineProps<{
  isDesktop: boolean
  isSidebarCollapsed: boolean
  isMobileSidebarOpen: boolean
}>()

defineEmits<{
  (event: "toggle-sidebar"): void
}>()

const toggleLabel = computed(() => {
  if (!props.isDesktop) {
    return props.isMobileSidebarOpen ? "Dong thanh dieu huong admin" : "Mo thanh dieu huong admin";
  }

  return props.isSidebarCollapsed ? "Mo rong thanh dieu huong admin" : "Thu gon thanh dieu huong admin";
});
</script>