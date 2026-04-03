<template>
  <div class="min-h-screen bg-gray-50">
    <header v-if="shouldShowHeaderNav" class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 class="text-3xl font-bold text-gray-900">
          Stage Management System
        </h1>
      </div>
    </header>

    <nav v-if="shouldShowHeaderNav" class="bg-blue-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex space-x-8 items-center">
            <router-link
              to="/"
              class="hover:bg-blue-700 px-3 py-2 rounded-md transition-colors"
            >
              Home
            </router-link>
            <router-link
              to="/stages"
              class="hover:bg-blue-700 px-3 py-2 rounded-md transition-colors"
            >
              Stages
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main :class="{ 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8': shouldShowHeaderNav }">
      <router-view />
    </main>

    <Notification v-if="uiStore.showNotification" />
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed } from "vue";
import { useRoute } from "vue-router";
import Notification from "@/modules/notification/components/Notification.vue";
import { ROUTE_NAMES } from "@/core/config/route-names";
import { useUIStore } from "@/modules/notification/stores/uiStore";

const uiStore = useUIStore();
const route = useRoute();

const hideHeaderNavRoutes = [
  ROUTE_NAMES.projectDetail,
  ROUTE_NAMES.home,
  ROUTE_NAMES.workspaceMembers,
  ROUTE_NAMES.workspaceSettings,
  ROUTE_NAMES.workspaceBoards,
  ROUTE_NAMES.workspaceCards,
  ROUTE_NAMES.personalSettings,
  ROUTE_NAMES.personalActivity,
  ROUTE_NAMES.personalProfile,
  ROUTE_NAMES.trelloAccountProfile,
  ROUTE_NAMES.accountSwitcher,
  ROUTE_NAMES.login,
  ROUTE_NAMES.register,
  ROUTE_NAMES.adminDashboard,
  ROUTE_NAMES.adminUsers,
  ROUTE_NAMES.adminWorkspaces,
  ROUTE_NAMES.adminBoards,
  ROUTE_NAMES.adminUserDetail,
  ROUTE_NAMES.adminWorkspaceDetail,
  ROUTE_NAMES.adminBoardDetail,
];

const shouldShowHeaderNav = computed(() => {
  return !hideHeaderNavRoutes.includes(String(route.name || ""));
});
</script>
