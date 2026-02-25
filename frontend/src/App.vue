<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header v-if="showHeaderNav()" class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 class="text-3xl font-bold text-gray-900">
          Stage Management System
        </h1>
      </div>
    </header>

    <!-- Navigation -->
    <nav v-if="showHeaderNav()" class="bg-blue-600 text-white">
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

    <!-- Main Content -->
    <main :class="{ 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8': showHeaderNav() }">
      <router-view />
    </main>

    <!-- Notification -->
    <Notification v-if="uiStore.showNotification" />
  </div>
</template>

<script setup>
import { useUIStore } from "@/stores/uiStore";
import { useRoute } from "vue-router";
import Notification from "@/components/Notification.vue";

const uiStore = useUIStore();
const route = useRoute();

// Ẩn header/nav khi ở trang project
const showHeaderNav = () => route.name !== "ProjectDetail";
</script>

<style scoped></style>
