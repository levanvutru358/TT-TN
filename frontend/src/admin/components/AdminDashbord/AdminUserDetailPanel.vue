<template>
  <div
    class="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.28)]"
    @click.stop
  >
    <template v-if="user">
      <div class="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-6 py-6">
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-start gap-4">
            <div
              class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-black text-white"
              :class="user.status === 'active' ? 'bg-sky-600' : 'bg-slate-500'"
            >
              {{ initials }}
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <h3 class="truncate text-2xl font-black tracking-tight text-slate-950">
                  {{ user.name }}
                </h3>
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
              </div>

              <p class="mt-2 text-sm text-slate-500">{{ user.email }}</p>

              <div class="mt-4 flex flex-wrap gap-2">
                <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {{ user.role }}
                </span>
                <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {{ user.department }}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Dong"
            @click="$emit('close')"
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

        <div class="mt-5 flex gap-3">
          <button
            type="button"
            class="rounded-2xl px-4 py-2.5 text-sm font-semibold text-white transition"
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

          <RouterLink
            to="/admin/users"
            class="rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Danh sach user
          </RouterLink>
        </div>
      </div>

      <div class="max-h-[calc(100vh-12rem)] space-y-6 overflow-y-auto p-6">
        <section>
          <div class="mb-4 flex items-center justify-between gap-3">
            <h4 class="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
              Thong tin ca nhan
            </h4>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <article
              v-for="item in personalFields"
              :key="item.label"
              class="rounded-2xl bg-slate-50 px-4 py-4"
            >
              <div class="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                {{ item.label }}
              </div>
              <div class="mt-2 text-sm font-semibold text-slate-800">
                {{ item.value }}
              </div>
            </article>
          </div>
        </section>

        <section>
          <div class="mb-4 flex items-center justify-between gap-3">
            <div>
              <h4 class="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
                Workspace lien quan
              </h4>
              <p class="mt-1 text-sm text-slate-500">
                {{ workspaces.length }} workspace co user nay tham gia
              </p>
            </div>

            <RouterLink
              to="/admin/workspaces"
              class="text-sm font-semibold text-sky-600 hover:underline"
            >
              Mo workspace
            </RouterLink>
          </div>

          <div v-if="workspaces.length" class="space-y-3">
            <article
              v-for="workspace in workspaces"
              :key="workspace.id"
              class="rounded-2xl border border-slate-200 px-4 py-4"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="truncate text-base font-bold text-slate-950">
                    {{ workspace.name }}
                  </div>
                  <div class="mt-1 text-sm text-slate-500">
                    Owner: {{ workspace.ownerName }}
                  </div>
                </div>

                <span
                  class="inline-flex rounded-full px-3 py-1 text-xs font-bold"
                  :class="
                    workspace.status === 'active'
                      ? 'bg-sky-100 text-sky-700'
                      : 'bg-slate-200 text-slate-700'
                  "
                >
                  {{ workspace.status === 'active' ? 'Active' : 'Archived' }}
                </span>
              </div>

              <div class="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                <div>Thanh vien: {{ workspace.totalMembers }}</div>
                <div>Board: {{ workspace.totalBoards }}</div>
              </div>
            </article>
          </div>

          <div
            v-else
            class="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500"
          >
            User nay chua co workspace lien quan.
          </div>
        </section>

        <section>
          <div class="mb-4 flex items-center justify-between gap-3">
            <div>
              <h4 class="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
                Board lien quan
              </h4>
              <p class="mt-1 text-sm text-slate-500">
                {{ boards.length }} board ma user nay dang tham gia
              </p>
            </div>

            <RouterLink
              to="/admin/boards"
              class="text-sm font-semibold text-violet-600 hover:underline"
            >
              Mo board
            </RouterLink>
          </div>

          <div v-if="boards.length" class="space-y-3">
            <article
              v-for="board in boards"
              :key="board.id"
              class="rounded-2xl border border-slate-200 px-4 py-4"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="truncate text-base font-bold text-slate-950">
                    {{ board.name }}
                  </div>
                  <div class="mt-1 text-sm text-slate-500">
                    Workspace: {{ board.workspaceName }}
                  </div>
                </div>

                <span
                  class="inline-flex rounded-full px-3 py-1 text-xs font-bold"
                  :class="
                    board.visibility === 'public'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-slate-200 text-slate-700'
                  "
                >
                  {{ board.visibility }}
                </span>
              </div>

              <div class="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                <div>Members: {{ board.totalMembers }}</div>
                <div>Cards: {{ board.totalCards }}</div>
              </div>
            </article>
          </div>

          <div
            v-else
            class="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500"
          >
            User nay chua co board lien quan.
          </div>
        </section>
      </div>
    </template>

    <div v-else class="px-6 py-12 text-center text-slate-500">
      Chon mot user de xem thong tin chi tiet.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AdminUser, BoardItem, WorkspaceItem } from '@/admin/types/admin'

const props = defineProps<{
  user: AdminUser | null
  workspaces: WorkspaceItem[]
  boards: BoardItem[]
  isUpdatingUser?: boolean
}>()

defineEmits<{
  (e: 'toggle-lock', userId: string): void
  (e: 'close'): void
}>()

const initials = computed(() => {
  if (!props.user) {
    return '--'
  }

  return props.user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
})

const personalFields = computed(() => {
  if (!props.user) {
    return []
  }

  return [
    { label: 'Chuc danh', value: props.user.jobTitle },
    { label: 'Phong ban', value: props.user.department },
    { label: 'Vi tri', value: props.user.location },
    { label: 'So dien thoai', value: props.user.phone },
    { label: 'Ngay tao', value: formatDate(props.user.createdAt) },
    { label: 'Lan hoat dong cuoi', value: formatDateTime(props.user.lastActiveAt) }
  ]
})

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

const formatDateTime = (date: string) =>
  new Date(date).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
</script>
