<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-5 py-4">
      <h3 class="text-xl font-bold text-slate-950">Thành viên workspace</h3>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-slate-50">
          <tr class="text-left font-semibold text-slate-700">
            <th class="px-5 py-4">Tên</th>
            <th class="px-5 py-4">Email</th>
            <th class="px-5 py-4">Vai trò</th>
            <th class="px-5 py-4">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="member in members"
            :key="member.id"
            class="border-t border-slate-100 transition hover:bg-slate-50"
            :class="{ 'cursor-pointer': !disableNavigation }"
            @click="handleRowClick(member)"
          >
            <td class="px-5 py-4 font-semibold text-slate-950">{{ member.name }}</td>
            <td class="px-5 py-4 text-slate-700">{{ member.email }}</td>
            <td class="px-5 py-4 capitalize text-slate-700">{{ member.role }}</td>
            <td class="px-5 py-4">
              <AppBadge
                :label="member.status === 'active' ? 'Hoạt động' : 'Đã khóa'"
                :variant="member.status === 'active' ? 'success' : 'danger'"
              />
            </td>
          </tr>

          <tr v-if="members.length === 0">
            <td colspan="4" class="px-5 py-8">
              <EmptyState
                title="Không có thành viên"
                description="Workspace này hiện chưa có thành viên."
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
import type { WorkspaceMemberItem } from '@/modules/admin/types/admin'
import AppBadge from '@/modules/admin/components/AdminDashbord/common/AppBadge.vue'
import EmptyState from '@/modules/admin/components/AdminDashbord/common/EmptyState.vue'

const props = defineProps({
  members: {
    type: Array as PropType<WorkspaceMemberItem[]>,
    default: () => [],
  },
  disableNavigation: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'select-member', member: WorkspaceMemberItem): void
}>()

const handleRowClick = (member: WorkspaceMemberItem) => {
  if (!props.disableNavigation) {
    emit('select-member', member)
  }
}
</script>