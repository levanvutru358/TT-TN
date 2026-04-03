<template>
  <div class="min-h-screen w-full bg-slate-100">
    <div class="flex min-h-screen w-full overflow-hidden">
      <AdminSidebar
        :is-desktop="isDesktop"
        :is-collapsed="isDesktop && isSidebarCollapsed"
        :is-mobile-open="!isDesktop && isMobileSidebarOpen"
        @close="closeMobileSidebar"
      />

      <div class="flex min-w-0 flex-1 flex-col">
        <AdminHeader
          :is-desktop="isDesktop"
          :is-sidebar-collapsed="isSidebarCollapsed"
          :is-mobile-sidebar-open="isMobileSidebarOpen"
          @toggle-sidebar="toggleSidebar"
        />

        <main class="flex-1 px-4 py-5 sm:px-6 lg:px-8">
          <div class="mx-auto w-full max-w-[1600px]">
            <router-view />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { onBeforeUnmount, onMounted, ref } from "vue";
import AdminHeader from "@/modules/admin/components/AdminDashbord/layout/AdminHeader.vue";
import AdminSidebar from "@/modules/admin/components/AdminDashbord/layout/AdminSidebar.vue";

const DESKTOP_BREAKPOINT = 1024;

const isDesktop = ref(false);
const isSidebarCollapsed = ref(false);
const isMobileSidebarOpen = ref(false);

const syncViewport = () => {
  if (typeof window === "undefined") return;

  const nextIsDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
  isDesktop.value = nextIsDesktop;

  if (nextIsDesktop) {
    isMobileSidebarOpen.value = false;
    return;
  }

  isSidebarCollapsed.value = false;
};

const toggleSidebar = () => {
  if (isDesktop.value) {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
    return;
  }

  isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
};

const closeMobileSidebar = () => {
  isMobileSidebarOpen.value = false;
};

onMounted(() => {
  syncViewport();
  window.addEventListener("resize", syncViewport);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", syncViewport);
});
</script>
