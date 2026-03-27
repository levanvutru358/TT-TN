<template>
  <section class="space-y-8">
    <PageHeader
      breadcrumb="Admin / Users / Detail"
      :title="user?.name || 'User Detail'"
      description="Thong tin chi tiet user, workspace lien quan va board lien quan."
    >
      <RouterLink
        to="/admin/users"
        class="rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        Danh sach user
      </RouterLink>

      <button
        v-if="user"
        type="button"
        class="rounded-2xl px-4 py-2.5 text-sm font-semibold text-white transition"
        :class="
          user.status === 'active'
            ? 'bg-amber-500 hover:bg-amber-600'
            : 'bg-slate-900 hover:bg-slate-800'
        "
        :disabled="adminStore.isUpdatingUser"
        @click="isConfirmOpen = true"
      >
        {{ user.status === 'active' ? 'Khoa tai khoan' : 'Mo tai khoan' }}
      </button>
    </PageHeader>

    <LoadingBlock v-if="isPageLoading" />

    <template v-else-if="user">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryMiniCard label="Email" :value="user.email" />
        <SummaryMiniCard label="Vai tro" :value="user.role === 'admin' ? 'Admin' : 'Member'" />
        <SummaryMiniCard label="Workspace lien quan" :value="relatedWorkspaces.length" />
        <SummaryMiniCard label="Board lien quan" :value="relatedBoards.length" />
      </div>

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div class="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-xl font-bold text-slate-950">Thong tin user</h3>
              <p class="mt-1 text-sm text-slate-600">
                Chi tiet tai khoan, phong ban va thong tin lien he.
              </p>
            </div>

            <AppBadge
              :label="user.status === 'active' ? 'Hoat dong' : 'Da khoa'"
              :variant="user.status === 'active' ? 'success' : 'warning'"
            />
          </div>

          <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm font-medium text-slate-500">Ten user</p>
              <p class="mt-2 text-base font-semibold text-slate-950">
                {{ user.name }}
              </p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm font-medium text-slate-500">Chuc danh</p>
              <p class="mt-2 text-base font-semibold text-slate-950">
                {{ user.jobTitle || '--' }}
              </p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm font-medium text-slate-500">Phong ban</p>
              <p class="mt-2 text-base font-semibold text-slate-950">
                {{ user.department || '--' }}
              </p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm font-medium text-slate-500">Vi tri</p>
              <p class="mt-2 text-base font-semibold text-slate-950">
                {{ user.location || '--' }}
              </p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm font-medium text-slate-500">So dien thoai</p>
              <p class="mt-2 text-base font-semibold text-slate-950">
                {{ user.phone || '--' }}
              </p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm font-medium text-slate-500">Ngay tao</p>
              <p class="mt-2 text-base font-semibold text-slate-950">
                {{ formatDate(user.createdAt) }}
              </p>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="text-xl font-bold text-slate-950">Hoat dong</h3>
          <p class="mt-1 text-sm text-slate-600">
            Tong quan nhanh ve trang thai va muc do tham gia cua user.
          </p>

          <div class="mt-6 space-y-4">
            <div class="rounded-2xl border border-slate-200 p-4">
              <p class="text-sm font-medium text-slate-500">Lan hoat dong cuoi</p>
              <p class="mt-2 text-2xl font-bold text-slate-950">
                {{ formatDateTime(user.lastActiveAt) }}
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <!-- Workspace Card -->
              <div class="rounded-2xl border border-slate-200 p-4">
                <div class="flex flex-col gap-2">
                  <div>
                    <p class="text-sm font-medium text-slate-500">Workspace</p>
                    <p class="mt-2 text-2xl font-bold text-slate-950">
                      {{ relatedWorkspaces.length }}
                    </p>
                  </div>
                  <button
                    v-if="relatedWorkspaces.length > 0"
                    type="button"
                    class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
                    @click="toggleWorkspaceSection"
                  >
                    {{ showWorkspaceSection ? 'Đóng' : 'Xem tất cả' }}
                  </button>
                </div>
              </div>

              <!-- Board Card -->
              <div class="rounded-2xl border border-slate-200 p-4">
                <div class="flex flex-col gap-2">
                  <div>
                    <p class="text-sm font-medium text-slate-500">Board</p>
                    <p class="mt-2 text-2xl font-bold text-slate-950">
                      {{ relatedBoards.length }}
                    </p>
                  </div>
                  <button
                    v-if="relatedBoards.length > 0"
                    type="button"
                    class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
                    @click="toggleBoardSection"
                  >
                    {{ showBoardSection ? 'Đóng' : 'Xem tất cả' }}
                  </button>
                </div>
              </div>
            </div>

            <div class="rounded-2xl border border-slate-200 p-4">
              <p class="text-sm font-medium text-slate-500">Trang thai</p>
              <p class="mt-2 text-2xl font-bold text-slate-950">
                {{ user.status === 'active' ? 'Hoat dong' : 'Da khoa' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Workspace Section -->
      <div v-if="showWorkspaceSection" class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div class="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-base font-bold text-slate-950">Danh sach workspace</h4>
              <p class="text-xs text-slate-500">Tong so: {{ relatedWorkspaces.length }} workspace</p>
            </div>
            <button
              type="button"
              class="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              @click="toggleWorkspaceSection"
            >
              Đóng
            </button>
          </div>
        </div>
        <WorkspaceTable 
          :workspaces="relatedWorkspaces" 
          :disable-navigation="true"
        />
      </div>

      <!-- Board Section -->
      <div v-if="showBoardSection" class="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div class="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-base font-bold text-slate-950">Danh sach board</h4>
              <p class="text-xs text-slate-500">Tong so: {{ relatedBoards.length }} board</p>
            </div>
            <button
              type="button"
              class="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              @click="toggleBoardSection"
            >
              Đóng
            </button>
          </div>
        </div>
        <BoardTable 
          :boards="relatedBoards" 
          :disable-navigation="true"
        />
      </div>
    </template>

    <div
      v-else
      class="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center text-slate-600 shadow-sm"
    >
      Khong tim thay user phu hop.
    </div>

    <div v-if="user && isConfirmOpen" class="fixed inset-0 z-50">
      <button
        type="button"
        class="absolute inset-0 bg-slate-950/55 backdrop-blur-[3px]"
        aria-label="Dong xac nhan thao tac tai khoan"
        @click="closeConfirm"
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
                  user.status === 'active'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-emerald-100 text-emerald-700'
                "
              >
                {{ user.status === 'active' ? 'Khoa tai khoan' : 'Mo tai khoan' }}
              </div>
              <h3 class="mt-4 text-2xl font-black tracking-tight text-slate-950">
                {{
                  user.status === 'active'
                    ? 'Xac nhan khoa tai khoan'
                    : 'Xac nhan mo tai khoan'
                }}
              </h3>
            </div>

            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Dong"
              @click="closeConfirm"
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
              user.status === 'active'
                ? `Ban co chac muon khoa tai khoan ${user.name}? User se khong the truy cap he thong cho den khi duoc mo lai.`
                : `Ban co chac muon mo tai khoan ${user.name}? User se duoc phep dang nhap va su dung he thong tro lai.`
            }}
          </p>

          <div class="mt-6 flex justify-end gap-3">
            <button
              type="button"
              class="rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              @click="closeConfirm"
            >
              Huy
            </button>
            <button
              type="button"
              class="rounded-2xl px-4 py-2.5 text-sm font-semibold text-white transition"
              :class="
                user.status === 'active'
                  ? 'bg-amber-500 hover:bg-amber-600'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              "
              :disabled="adminStore.isUpdatingUser"
              @click="confirmToggleLock"
            >
              {{ user.status === 'active' ? 'Xac nhan khoa' : 'Xac nhan mo' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useAdminStore } from '@/admin/stores/admin.store'
import PageHeader from '@/admin/components/AdminDashbord/common/PageHeader.vue'
import LoadingBlock from '@/admin/components/AdminDashbord/common/LoadingBlock.vue'
import SummaryMiniCard from '@/admin/components/AdminDashbord/common/SummaryMiniCard.vue'
import AppBadge from '@/admin/components/AdminDashbord/common/AppBadge.vue'
import WorkspaceTable from '@/admin/components/AdminDashbord/workspace/WorkspaceTable.vue'
import BoardTable from '@/admin/components/AdminDashbord/board/BoardTable.vue'

const route = useRoute()
const adminStore = useAdminStore()
const isBootstrapping = ref(true)
const isConfirmOpen = ref(false)

// Section toggle states
const showWorkspaceSection = ref(false)
const showBoardSection = ref(false)

const userId = computed(() => String(route.params.id || ''))

onMounted(async () => {
  isBootstrapping.value = true
  try {
    await Promise.all([
      adminStore.fetchUsers(),
      adminStore.fetchWorkspaces(),
      adminStore.fetchBoards(),
    ])
  } finally {
    isBootstrapping.value = false
  }
})

const isPageLoading = computed(
  () =>
    isBootstrapping.value ||
    adminStore.isLoadingUsers ||
    adminStore.isLoadingWorkspaces ||
    adminStore.isLoadingBoards
)

const user = computed(() => adminStore.users.find((item) => item.id === userId.value) ?? null)

const relatedWorkspaces = computed(() =>
  adminStore.workspaces.filter(
    (workspace) =>
      workspace.ownerId === userId.value || workspace.memberIds?.includes(userId.value)
  )
)

const relatedBoards = computed(() =>
  adminStore.boards.filter((board) => board.memberIds?.includes(userId.value))
)

const closeConfirm = () => {
  isConfirmOpen.value = false
}

const confirmToggleLock = async () => {
  if (!user.value) {
    return
  }

  await adminStore.toggleUserLock(user.value.id)
  closeConfirm()
}

const toggleWorkspaceSection = () => {
  showWorkspaceSection.value = !showWorkspaceSection.value
}

const toggleBoardSection = () => {
  showBoardSection.value = !showBoardSection.value
}

const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY')
const formatDateTime = (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm')
</script>