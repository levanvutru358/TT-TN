<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-5 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-xl font-bold text-slate-950">Users Table</h3>
          <p class="mt-1 text-sm text-slate-600">
            View and manage user accounts in the system.
          </p>
        </div>

        <button
          type="button"
          class="rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Add user
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-slate-50">
          <tr class="text-left font-semibold text-slate-700">
            <th class="px-5 py-4">User</th>
            <th class="px-5 py-4">Role</th>
            <th class="px-5 py-4">Status</th>
            <th class="px-5 py-4">Last active</th>
            <th class="px-5 py-4">Joined</th>
            <th class="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-t border-slate-100 transition hover:bg-slate-50"
          >
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-700">
                  {{ user.name.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <p class="font-semibold text-slate-950">{{ user.name }}</p>
                  <p class="text-slate-600">{{ user.email }}</p>
                </div>
              </div>
            </td>

            <td class="px-5 py-4 capitalize text-slate-700">
              {{ user.role }}
            </td>

            <td class="px-5 py-4">
              <AppBadge
                :label="user.status === 'active' ? 'Active' : 'Locked'"
                :variant="user.status === 'active' ? 'success' : 'danger'"
              />
            </td>

            <td class="px-5 py-4 text-slate-700">
              {{ formatDateTime(user.lastActiveAt) }}
            </td>

            <td class="px-5 py-4 text-slate-700">
              {{ formatDate(user.createdAt) }}
            </td>

            <td class="px-5 py-4">
              <div class="flex justify-end gap-2">
                <button
                  type="button"
                  class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  View
                </button>

                <button
                  type="button"
                  class="rounded-xl px-3 py-2 text-xs font-semibold text-white transition"
                  :class="
                    user.status === 'active'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-slate-900 hover:bg-slate-800'
                  "
                  @click="$emit('toggle-lock', user.id)"
                >
                  {{ user.status === "active" ? "Lock" : "Unlock" }}
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="users.length === 0">
            <td colspan="6" class="px-5 py-8">
              <EmptyState
                title="No users found"
                description="Try changing your search or filters."
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="border-t border-slate-200 px-5 py-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-sm text-slate-600">
          Showing <span class="font-semibold text-slate-950">{{ users.length }}</span> users
        </p>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Previous
          </button>
          <button
            type="button"
            class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import AppBadge from "@/admin/components/AdminDashbord/common/AppBadge.vue";
import EmptyState from "@/admin/components/AdminDashbord/common/EmptyState.vue";

defineProps({
  users: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["toggle-lock"]);

const formatDate = (date) => dayjs(date).format("DD/MM/YYYY");
const formatDateTime = (date) => dayjs(date).format("DD/MM/YYYY HH:mm");
</script>