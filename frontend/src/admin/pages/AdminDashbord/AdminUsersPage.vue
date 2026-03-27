<template>
  <section class="space-y-8">
    <PageHeader
      breadcrumb="Admin / Users"
      title="Users Management"
      description="Search users by name or email, filter by status and role, then manage account access."
    />

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <SummaryMiniCard label="Tổng user" :value="adminStore.users.length" />
      <SummaryMiniCard label="Hoạt động" :value="activeCount" />
      <SummaryMiniCard label="Đã khóa" :value="lockedCount" />
      <SummaryMiniCard label="Admin" :value="adminCount" />
    </div>

    <div class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div class="flex flex-1 flex-col gap-3 md:flex-row">
          <input
            v-model="search"
            type="text"
            placeholder="Search user name or email..."
            class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 md:flex-1"
          />

          <select
            v-model="status"
            class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 md:w-48"
          >
            <option value="">All status</option>
            <option value="active">Hoạt động</option>
            <option value="locked">Đã khóa</option>
          </select>

          <select
            v-model="role"
            class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 md:w-48"
          >
            <option value="">All role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>
    </div>

    <LoadingBlock v-if="adminStore.isLoadingUsers" />

    <UserTable
      v-else
      :users="filteredUsers"
      :is-updating-user="adminStore.isUpdatingUser"
      @toggle-lock="requestToggleLock"
    />

    <div v-if="confirmTargetUser" class="fixed inset-0 z-50">
      <button
        type="button"
        class="absolute inset-0 bg-slate-950/55 backdrop-blur-[3px]"
        aria-label="Đóng xác nhận thao tác tài khoản"
        @click="closeToggleConfirmation"
      ></button>

      <div class="relative z-10 flex min-h-full items-center justify-center p-4">
        <div
          class="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.28)]"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <div
                class="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]"
                :class="
                  confirmTargetUser.status === 'active'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-emerald-100 text-emerald-700'
                "
              >
                {{ confirmTargetUser.status === 'active' ? 'Khóa tài khoản' : 'Mở tài khoản' }}
              </div>
              <h3 class="mt-4 text-2xl font-black tracking-tight text-slate-950">
                {{
                  confirmTargetUser.status === 'active'
                    ? 'Xác nhận khóa tài khoản'
                    : 'Xác nhận mở tài khoản'
                }}
              </h3>
            </div>

            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Đóng"
              @click="closeToggleConfirmation"
            >
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M7 7L17 17M17 7L7 17"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>

          <p class="mt-4 text-sm leading-7 text-slate-600">
            {{
              confirmTargetUser.status === 'active'
                ? `Bạn có chắc muốn khóa tài khoản ${confirmTargetUser.name}? User sẽ không thể truy cập hệ thống cho đến khi được mở lại.`
                : `Bạn có chắc muốn mở tài khoản ${confirmTargetUser.name}? User sẽ được phép đăng nhập và sử dụng hệ thống trở lại.`
            }}
          </p>

          <div class="mt-6 flex justify-end gap-3">
            <button
              type="button"
              class="rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              @click="closeToggleConfirmation"
            >
              Hủy
            </button>
            <button
              type="button"
              class="rounded-2xl px-4 py-2.5 text-sm font-semibold text-white transition"
              :class="
                confirmTargetUser.status === 'active'
                  ? 'bg-amber-500 hover:bg-amber-600'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              "
              :disabled="adminStore.isUpdatingUser"
              @click="confirmToggleLock"
            >
              {{ confirmTargetUser.status === 'active' ? 'Xác nhận khóa' : 'Xác nhận mở' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAdminStore } from '@/admin/stores/admin.store'
import type { AdminUser, UserRole, UserStatus } from '@/admin/types/admin'
import PageHeader from '@/admin/components/AdminDashbord/common/PageHeader.vue'
import SummaryMiniCard from '@/admin/components/AdminDashbord/common/SummaryMiniCard.vue'
import LoadingBlock from '@/admin/components/AdminDashbord/common/LoadingBlock.vue'
import UserTable from '@/admin/components/AdminDashbord/UserTable.vue'
import AdminUserDetailPanel from '@/admin/components/AdminDashbord/AdminUserDetailPanel.vue'

const adminStore = useAdminStore()
const search = ref('')
const status = ref<UserStatus | ''>('')
const role = ref<UserRole | ''>('')
const pendingToggleUserId = ref<string | null>(null)

onMounted(() => {
  void adminStore.fetchUsers()
})

const filteredUsers = computed<AdminUser[]>(() => {
  const keyword = search.value.trim().toLowerCase()

  return adminStore.users.filter((user) => {
    const matchesSearch =
      !keyword ||
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword)

    const matchesStatus = !status.value || user.status === status.value
    const matchesRole = !role.value || user.role === role.value

    return matchesSearch && matchesStatus && matchesRole
  })
})

const activeCount = computed(
  () => adminStore.users.filter((item) => item.status === 'active').length
)

const lockedCount = computed(
  () => adminStore.users.filter((item) => item.status === 'locked').length
)

const adminCount = computed(
  () => adminStore.users.filter((item) => item.role === 'admin').length
)

const confirmTargetUser = computed(
  () => adminStore.users.find((item) => item.id === pendingToggleUserId.value) ?? null
)

const closeToggleConfirmation = () => {
  pendingToggleUserId.value = null
}

const requestToggleLock = (userId: string) => {
  pendingToggleUserId.value = userId
}

const confirmToggleLock = async () => {
  if (!pendingToggleUserId.value) {
    return
  }

  const userId = pendingToggleUserId.value
  await adminStore.toggleUserLock(userId)
  closeToggleConfirmation()
}
</script>