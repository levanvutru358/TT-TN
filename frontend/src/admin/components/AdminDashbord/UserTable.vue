<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-6 py-5">
      <h3 class="text-xl font-bold text-slate-950">User Table</h3>
      <p class="mt-1 text-sm text-slate-600">
        Quan ly user, vai tro, trang thai va hoat dong gan day.
      </p>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full table-fixed text-sm">
        <thead class="bg-slate-50">
          <tr class="text-left font-semibold text-slate-700">
            <th class="w-16 px-4 py-4 text-center">STT</th>
            <th class="w-[18%] px-4 py-4">Ten user</th>
            <th class="w-[20%] px-4 py-4">Email</th>
            <th class="w-[10%] px-4 py-4 text-center">Vai tro</th>
            <th class="w-[12%] px-4 py-4 text-center">Trang thai</th>
            <th class="w-[14%] px-4 py-4">Phong ban</th>
            <th class="w-[14%] px-4 py-4 text-center">Lan hoat dong</th>
            <th class="w-[12%] px-4 py-4 text-center">Hanh dong</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(user, index) in users"
            :key="user.id"
            class="cursor-pointer border-t border-slate-100 transition hover:bg-slate-50"
            @click="goToDetail(user.id)"
          >
            <td class="px-4 py-4 text-center font-medium text-slate-700">
              {{ index + 1 }}
            </td>

            <td class="px-4 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                  :class="user.status === 'active' ? 'bg-sky-600' : 'bg-slate-500'"
                >
                  {{ initials(user.name) }}
                </div>

                <div class="min-w-0">
                  <p class="truncate font-semibold text-slate-950">
                    {{ user.name }}
                  </p>
                  <p class="truncate text-xs text-slate-500">
                    {{ user.jobTitle }}
                  </p>
                </div>
              </div>
            </td>

            <td class="px-4 py-4 text-slate-700">
              <p class="truncate">{{ user.email }}</p>
            </td>

            <td class="px-4 py-4 text-center">
              <span class="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-700">
                {{ user.role }}
              </span>
            </td>

            <td class="px-4 py-4 text-center">
              <div class="flex justify-center">
                <AppBadge
                  :label="user.status === 'active' ? 'Hoat dong' : 'Da khoa'"
                  :variant="user.status === 'active' ? 'success' : 'warning'"
                />
              </div>
            </td>

            <td class="px-4 py-4 text-slate-700">
              <p class="truncate">{{ user.department }}</p>
            </td>

            <td class="px-4 py-4 text-center text-slate-700">
              {{ formatDateTime(user.lastActiveAt) }}
            </td>

            <td class="px-4 py-4 text-center">
              <button
                type="button"
                class="rounded-2xl px-3 py-2 text-xs font-semibold text-white transition"
                :class="
                  user.status === 'active'
                    ? 'bg-amber-500 hover:bg-amber-600'
                    : 'bg-slate-900 hover:bg-slate-800'
                "
                :disabled="isUpdatingUser"
                @click.stop="$emit('toggle-lock', user.id)"
              >
                {{ user.status === 'active' ? 'Khoa' : 'Mo khoa' }}
              </button>
            </td>
          </tr>

          <tr v-if="users.length === 0">
            <td colspan="8" class="px-5 py-10">
              <EmptyState
                title="Khong co user"
                description="Khong tim thay user phu hop."
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import type { AdminUser } from '@/admin/types/admin'
import AppBadge from '@/admin/components/AdminDashbord/common/AppBadge.vue'
import EmptyState from '@/admin/components/AdminDashbord/common/EmptyState.vue'

defineProps({
  users: {
    type: Array as PropType<AdminUser[]>,
    default: () => [],
  },
  isUpdatingUser: {
    type: Boolean,
    default: false,
  },
})

defineEmits<{
  (e: 'toggle-lock', userId: string): void
  (e: 'select-user', userId: string): void
}>()

const router = useRouter()

const formatDateTime = (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm')

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

const goToDetail = (userId: string) => {
  router.push(`/admin/users/${userId}`)
}
</script>
