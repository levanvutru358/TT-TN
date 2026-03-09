<template>
  <div class="space-y-6">

    <h1 class="text-2xl font-bold">
      Dashboard
    </h1>

    <!-- STAT CARDS -->

    <div class="grid grid-cols-4 gap-4">

      <div class="bg-white p-4 rounded-lg shadow">
        <div class="text-gray-500 text-sm">Total Users</div>
        <div class="text-3xl font-bold">
          {{ totalUsers }}
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow">
        <div class="text-gray-500 text-sm">Admins</div>
        <div class="text-3xl font-bold text-red-500">
          {{ adminCount }}
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow">
        <div class="text-gray-500 text-sm">Users</div>
        <div class="text-3xl font-bold text-blue-500">
          {{ userCount }}
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow">
        <div class="text-gray-500 text-sm">New Users</div>
        <div class="text-3xl font-bold text-green-500">
          {{ recentUsers.length }}
        </div>
      </div>

    </div>

    <!-- USER ROLE STATS -->

    <div class="bg-white p-6 rounded-lg shadow">

      <h2 class="font-semibold mb-4">
        User Distribution
      </h2>

      <div class="space-y-3">

        <div>
          <div class="flex justify-between text-sm mb-1">
            <span>Admins</span>
            <span>{{ adminCount }}</span>
          </div>

          <div class="w-full bg-gray-200 rounded h-2">
            <div
              class="bg-red-500 h-2 rounded"
              :style="{ width: adminPercent + '%' }"
            ></div>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-sm mb-1">
            <span>Users</span>
            <span>{{ userCount }}</span>
          </div>

          <div class="w-full bg-gray-200 rounded h-2">
            <div
              class="bg-blue-500 h-2 rounded"
              :style="{ width: userPercent + '%' }"
            ></div>
          </div>
        </div>

      </div>

    </div>

    <!-- RECENT + ACTIVITY -->

    <div class="grid grid-cols-2 gap-6">

      <!-- RECENT USERS -->

      <div class="bg-white p-6 rounded-lg shadow">

        <h2 class="font-semibold mb-4">
          Recent Users
        </h2>

        <div
          v-for="u in recentUsers"
          :key="u.id"
          class="flex justify-between border-b py-2 text-sm"
        >
          <div>
            {{ u.name }}
          </div>

          <div class="text-gray-500">
            {{ u.email }}
          </div>
        </div>

      </div>

      <!-- ACTIVITY -->

      <div class="bg-white p-6 rounded-lg shadow">

        <h2 class="font-semibold mb-4">
          Activity
        </h2>

        <div class="space-y-3 text-sm text-gray-600">

          <div v-for="u in recentUsers" :key="u.id">
            New user added: <b>{{ u.name }}</b>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { computed } from "vue"
import { useUserStore } from "../stores/userStore"

const store = useUserStore()

const totalUsers = computed(() => store.users.length)

const adminCount = computed(() =>
  store.users.filter(u => u.role === "admin").length
)

const userCount = computed(() =>
  store.users.filter(u => u.role === "user").length
)

const recentUsers = computed(() =>
  [...store.users].slice(-5).reverse()
)

const adminPercent = computed(() =>
  totalUsers.value ? (adminCount.value / totalUsers.value) * 100 : 0
)

const userPercent = computed(() =>
  totalUsers.value ? (userCount.value / totalUsers.value) * 100 : 0
)
</script>