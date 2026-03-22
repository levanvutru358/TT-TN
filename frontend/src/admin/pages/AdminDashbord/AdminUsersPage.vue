<template>
  <section class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight text-slate-950 text-black">
        Quan ly user
      </h1>
      <p class="mt-2 text-base text-slate-600">
        Tim kiem, loc, xem chi tiet va khoa hoac mo tai khoan nguoi dung.
      </p>
    </div>

    <div
      v-if="isPageLoading"
      class="rounded-3xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm"
    >
      Dang tai du lieu user...
    </div>

    <div v-else class="space-y-6">
      <UserTable
        :users="adminStore.users"
        :selected-user-id="selectedUserId"
        :is-updating-user="adminStore.isUpdatingUser"
        @toggle-lock="requestToggleLock"
        @select-user="handleSelectUser"
      />
    </div>

    <div
      v-if="selectedUser"
      class="fixed inset-0 z-40"
    >
      <button
        type="button"
        class="absolute inset-0 bg-slate-950/45 backdrop-blur-[3px]"
        aria-label="Dong chi tiet user"
        @click="handleCloseDetail"
      ></button>

      <div class="relative z-10 flex min-h-full items-center justify-center p-4 sm:p-6">
        <AdminUserDetailPanel
          :user="selectedUser"
          :workspaces="selectedUserWorkspaces"
          :boards="selectedUserBoards"
          :is-updating-user="adminStore.isUpdatingUser"
          @toggle-lock="requestToggleLock"
          @close="handleCloseDetail"
        />
      </div>
    </div>

    <div
      v-if="confirmTargetUser"
      class="fixed inset-0 z-50"
    >
      <button
        type="button"
        class="absolute inset-0 bg-slate-950/55 backdrop-blur-[3px]"
        aria-label="Dong xac nhan thao tac tai khoan"
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
                {{ confirmTargetUser.status === 'active' ? 'Khoa tai khoan' : 'Mo tai khoan' }}
              </div>
              <h3 class="mt-4 text-2xl font-black tracking-tight text-slate-950">
                {{ confirmTargetUser.status === 'active' ? 'Xac nhan khoa tai khoan' : 'Xac nhan mo tai khoan' }}
              </h3>
            </div>

            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Dong"
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
            {{ confirmTargetUser.status === 'active'
              ? `Ban co chac muon khoa tai khoan ${confirmTargetUser.name}? User se khong the truy cap he thong cho den khi duoc mo lai.`
              : `Ban co chac muon mo tai khoan ${confirmTargetUser.name}? User se duoc phep dang nhap va su dung he thong tro lai.` }}
          </p>

          <div class="mt-6 flex justify-end gap-3">
            <button
              type="button"
              class="rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              @click="closeToggleConfirmation"
            >
              Huy
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
              {{ confirmTargetUser.status === 'active' ? 'Xac nhan khoa' : 'Xac nhan mo' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useAdminStore } from '@/admin/stores/admin.store'
import UserTable from '@/admin/components/AdminDashbord/UserTable.vue'
import AdminUserDetailPanel from '@/admin/components/AdminDashbord/AdminUserDetailPanel.vue'

const adminStore = useAdminStore()
const selectedUserId = ref<string | null>(null)
const pendingToggleUserId = ref<string | null>(null)

const isPageLoading = computed(
  () =>
    adminStore.isLoadingUsers ||
    adminStore.isLoadingWorkspaces ||
    adminStore.isLoadingBoards
)

const selectedUser = computed(
  () =>
    adminStore.users.find((item) => item.id === selectedUserId.value) ?? null
)

const confirmTargetUser = computed(
  () =>
    adminStore.users.find((item) => item.id === pendingToggleUserId.value) ?? null
)

const selectedUserWorkspaces = computed(() => {
  if (!selectedUser.value) {
    return []
  }

  const userId = selectedUser.value.id

  return adminStore.workspaces.filter((workspace) =>
    workspace.memberIds.includes(userId)
  )
})

const selectedUserBoards = computed(() => {
  if (!selectedUser.value) {
    return []
  }

  const userId = selectedUser.value.id

  return adminStore.boards.filter((board) =>
    board.memberIds.includes(userId)
  )
})

const syncSelectedUser = () => {
  if (!selectedUserId.value) {
    return
  }

  const stillExists = adminStore.users.some(
    (item) => item.id === selectedUserId.value
  )

  if (!stillExists) {
    selectedUserId.value = null
  }
}

onMounted(async () => {
  await Promise.all([
    adminStore.fetchUsers(),
    adminStore.fetchWorkspaces(),
    adminStore.fetchBoards()
  ])
})

watch(
  () => adminStore.users,
  () => {
    syncSelectedUser()
  },
  { deep: true }
)

const handleSelectUser = (userId: string) => {
  selectedUserId.value = userId
}

const handleCloseDetail = () => {
  selectedUserId.value = null
}

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
  closeToggleConfirmation()
  await adminStore.toggleUserLock(userId)
}
</script>
