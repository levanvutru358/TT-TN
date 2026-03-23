<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-5 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-xl font-bold text-slate-950">Workspaces Table</h3>
          <p class="mt-1 text-sm text-slate-600">
            Monitor team workspaces and collaboration scale.
          </p>
        </div>

        <button
          type="button"
          class="rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Add workspace
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-slate-50">
          <tr class="text-left font-semibold text-slate-700">
            <th class="px-5 py-4">Workspace</th>
            <th class="px-5 py-4">Owner</th>
            <th class="px-5 py-4">Members</th>
            <th class="px-5 py-4">Boards</th>
            <th class="px-5 py-4">Created date</th>
            <th class="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="workspace in workspaces"
            :key="workspace.id"
            class="border-t border-slate-100 transition hover:bg-slate-50"
          >
            <td class="px-5 py-4 font-semibold text-slate-950">
              {{ workspace.name }}
            </td>
            <td class="px-5 py-4 text-slate-700">{{ workspace.ownerName }}</td>
            <td class="px-5 py-4 text-slate-700">{{ workspace.totalMembers }}</td>
            <td class="px-5 py-4 text-slate-700">{{ workspace.totalBoards }}</td>
            <td class="px-5 py-4 text-slate-700">
              {{ formatDate(workspace.createdAt) }}
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
                  class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Edit
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="workspaces.length === 0">
            <td colspan="6" class="px-5 py-8">
              <EmptyState
                title="No workspaces found"
                description="There are currently no workspaces to display."
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import EmptyState from "@/admin/components/AdminDashbord/common/EmptyState.vue";

defineProps({
  workspaces: {
    type: Array,
    default: () => [],
  },
});

const formatDate = (date) => dayjs(date).format("DD/MM/YYYY");
</script>
