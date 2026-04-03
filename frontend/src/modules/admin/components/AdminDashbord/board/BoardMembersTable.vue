<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-5 py-4">
      <h3 class="text-xl font-bold text-slate-950">Thành viên trong board</h3>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-slate-50">
          <tr class="text-left font-semibold text-slate-700">
            <th class="px-5 py-4">Tên</th>
            <th class="px-5 py-4">Email</th>
            <th class="px-5 py-4">Trạng thái</th>
            <th class="px-5 py-4 text-right">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="member in members"
            :key="member.id"
            class="border-t border-slate-100 transition hover:bg-slate-50"
          >
            <td
              class="cursor-pointer px-5 py-4 font-semibold text-slate-950"
              @click="$emit('select-member', member)"
            >
              {{ member.name }}
            </td>
            <td
              class="cursor-pointer px-5 py-4 text-slate-700"
              @click="$emit('select-member', member)"
            >
              {{ member.email }}
            </td>
            <td class="px-5 py-4">
              <AppBadge
                :label="member.status === 'active' ? 'Hoạt động' : 'Đã khóa'"
                :variant="member.status === 'active' ? 'success' : 'danger'"
              />
            </td>
            <td class="px-5 py-4">
              <div class="flex justify-end">
                <button
                  type="button"
                  class="rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
                  @click="$emit('request-remove-member', member)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="members.length === 0">
            <td colspan="4" class="px-5 py-8">
              <EmptyState
                title="Không có thành viên"
                description="Board này hiện chưa có thành viên."
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { BoardMemberItem } from '@/modules/admin/types/admin'
import AppBadge from '@/modules/admin/components/AdminDashbord/common/AppBadge.vue'
import EmptyState from '@/modules/admin/components/AdminDashbord/common/EmptyState.vue'

defineProps({
  members: {
    type: Array as PropType<BoardMemberItem[]>,
    default: () => [],
  },
})

defineEmits<{
  (e: 'request-remove-member', member: BoardMemberItem): void
  (e: 'select-member', member: BoardMemberItem): void
}>()
</script>