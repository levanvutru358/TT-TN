<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-5 py-5">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 class="text-xl font-bold text-slate-950">Danh sach user</h3>
            <p class="mt-1 text-sm text-slate-600">
              Tim kiem, loc va nhan vao tung user de xem chi tiet.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-[720px]">
            <input
              v-model="keyword"
              type="text"
              placeholder="Tim theo ten hoac email..."
              class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
            />

            <select
              v-model="statusFilter"
              class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
            >
              <option value="all">Tat ca trang thai</option>
              <option value="active">Dang hoat dong</option>
              <option value="locked">Da khoa</option>
            </select>

            <select
              v-model="roleFilter"
              class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
            >
              <option value="all">Tat ca vai tro</option>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            Ket qua: {{ filteredUsers.length }}
          </span>
          <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Active: {{ activeCount }}
          </span>
          <span class="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            Locked: {{ lockedCount }}
          </span>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead class="bg-slate-50">
          <tr class="text-left text-sm font-semibold text-slate-700">
            <th class="px-5 py-4">User</th>
            <th class="px-5 py-4">Vai tro</th>
            <th class="px-5 py-4">Trang thai</th>
            <th class="px-5 py-4">Phong ban</th>
            <th class="px-5 py-4">Lan hoat dong cuoi</th>
            <th class="px-5 py-4 text-right">Hanh dong</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.id"
            class="cursor-pointer border-t border-slate-100 transition"
            :class="
              selectedUserId === user.id
                ? 'bg-sky-50/80'
                : 'hover:bg-slate-50'
            "
            @click="$emit('select-user', user.id)"
          >
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                  :class="user.status === 'active' ? 'bg-sky-600' : 'bg-slate-500'"
                >
                  {{ initials(user.name) }}
                </div>

                <div class="min-w-0">
                  <div class="truncate font-semibold text-slate-950">{{ user.name }}</div>
                  <div class="truncate text-sm text-slate-500">{{ user.email }}</div>
                </div>
              </div>
            </td>

            <td class="px-5 py-4 text-slate-700">
              <span class="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-700">
                {{ user.role }}
              </span>
            </td>

            <td class="px-5 py-4">
              <span
                class="inline-flex rounded-full px-3 py-1 text-xs font-bold"
                :class="
                  user.status === 'active'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                "
              >
                {{ user.status === 'active' ? 'Dang hoat dong' : 'Da khoa' }}
              </span>
            </td>

            <td class="px-5 py-4 text-slate-700">{{ user.department }}</td>

            <td class="px-5 py-4 text-slate-700">
              {{ formatDateTime(user.lastActiveAt) }}
            </td>

            <td class="px-5 py-4 text-right">
              <div class="flex justify-end gap-2" @click.stop>
                <button
                  type="button"
                  class="rounded-2xl px-4 py-2 text-sm font-semibold text-white transition"
                  :class="
                    user.status === 'active'
                      ? 'bg-amber-500 hover:bg-amber-600'
                      : 'bg-slate-900 hover:bg-slate-800'
                  "
                  :disabled="isUpdatingUser"
                  @click="$emit('toggle-lock', user.id)"
                >
                  {{ user.status === 'active' ? 'Khoa tai khoan' : 'Mo tai khoan' }}
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="filteredUsers.length === 0">
            <td colspan="6" class="px-5 py-8 text-center text-slate-500">
              Khong co user phu hop voi bo loc hien tai
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { AdminUser } from '@/admin/types/admin'

const props = defineProps<{
  users: AdminUser[]
  selectedUserId?: string | null
  isUpdatingUser?: boolean
}>()

defineEmits<{
  (e: 'toggle-lock', userId: string): void
  (e: 'select-user', userId: string): void
}>()

const keyword = ref('')
const statusFilter = ref<'all' | 'active' | 'locked'>('all')
const roleFilter = ref<'all' | 'admin' | 'member'>('all')

const filteredUsers = computed(() => {
  const value = keyword.value.trim().toLowerCase()

  return props.users.filter((item) => {
    const matchesKeyword =
      !value ||
      item.name.toLowerCase().includes(value) ||
      item.email.toLowerCase().includes(value)

    const matchesStatus =
      statusFilter.value === 'all' || item.status === statusFilter.value

    const matchesRole =
      roleFilter.value === 'all' || item.role === roleFilter.value

    return matchesKeyword && matchesStatus && matchesRole
  })
})

const activeCount = computed(
  () => filteredUsers.value.filter((item) => item.status === 'active').length
)

const lockedCount = computed(
  () => filteredUsers.value.filter((item) => item.status === 'locked').length
)

const formatDateTime = (date: string) =>
  new Date(date).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
</script>
