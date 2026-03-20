<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-5 py-4">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 class="text-xl font-bold text-slate-950">Danh sách User</h3>
          <p class="mt-1 text-sm text-slate-600">
            Quản lý trạng thái hoạt động của người dùng
          </p>
        </div>

        <input
          v-model="keyword"
          type="text"
          placeholder="Tìm theo tên hoặc email..."
          class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 lg:w-96"
        />
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead class="bg-slate-50">
          <tr class="text-left text-sm font-semibold text-slate-700">
            <th class="px-5 py-4">Tên</th>
            <th class="px-5 py-4">Email</th>
            <th class="px-5 py-4">Vai trò</th>
            <th class="px-5 py-4">Trạng thái</th>
            <th class="px-5 py-4">Lần hoạt động cuối</th>
            <th class="px-5 py-4 text-right">Hành động</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.id"
            class="border-t border-slate-100 transition hover:bg-slate-50"
          >
            <td class="px-5 py-4 font-semibold text-slate-950">{{ user.name }}</td>
            <td class="px-5 py-4 text-slate-700">{{ user.email }}</td>
            <td class="px-5 py-4 capitalize text-slate-700">{{ user.role }}</td>
            <td class="px-5 py-4">
              <span
                class="inline-flex rounded-full px-3 py-1 text-xs font-bold"
                :class="
                  user.status === 'active'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                "
              >
                {{ user.status === 'active' ? 'Đang hoạt động' : 'Đã khóa' }}
              </span>
            </td>
            <td class="px-5 py-4 text-slate-700">
              {{ formatDate(user.lastActiveAt) }}
            </td>
            <td class="px-5 py-4 text-right">
              <button
                class="rounded-2xl px-4 py-2 text-sm font-semibold text-white transition"
                :class="
                  user.status === 'active'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-slate-900 hover:bg-slate-800'
                "
                @click="$emit('toggle-lock', user.id)"
              >
                {{ user.status === 'active' ? 'Khóa user' : 'Mở khóa' }}
              </button>
            </td>
          </tr>

          <tr v-if="filteredUsers.length === 0">
            <td colspan="6" class="px-5 py-8 text-center text-slate-500">
              Không có user phù hợp
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
}>()

defineEmits<{
  (e: 'toggle-lock', userId: string): void
}>()

const keyword = ref('')

const filteredUsers = computed(() => {
  const value = keyword.value.trim().toLowerCase()
  if (!value) return props.users

  return props.users.filter((item) => {
    return (
      item.name.toLowerCase().includes(value) ||
      item.email.toLowerCase().includes(value)
    )
  })
})

const formatDate = (date: string) => new Date(date).toLocaleDateString('vi-VN')
</script>