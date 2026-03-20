<template>
  <section class="space-y-8">
    <PageHeader
      breadcrumb="Admin / Workspaces"
      title="Workspaces Management"
      description="Track workspace ownership, growth and collaboration volume."
    >
      <template #actions>
        <button
          type="button"
          class="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Add workspace
        </button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <SummaryMiniCard label="Total Workspaces" :value="adminStore.workspaces.length" />
      <SummaryMiniCard label="Total Members" :value="totalMembers" />
      <SummaryMiniCard label="Total Boards" :value="totalBoards" />
    </div>

    <LoadingBlock v-if="adminStore.isLoadingWorkspaces" />

    <WorkspaceTable
      v-else
      :workspaces="adminStore.workspaces"
    />
  </section>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useAdminStore } from "@/admin/stores/admin.store";
import PageHeader from "@/admin/components/AdminDashbord/common/PageHeader.vue";
import SummaryMiniCard from "@/admin/components/AdminDashbord/common/SummaryMiniCard.vue";
import LoadingBlock from "@/admin/components/AdminDashbord/common/LoadingBlock.vue";
import WorkspaceTable from "@/admin/components/AdminDashbord/tables/WorkspaceTable.vue";

const adminStore = useAdminStore();

onMounted(() => {
  adminStore.fetchWorkspaces();
});

const totalMembers = computed(() =>
  adminStore.workspaces.reduce((sum, item) => sum + item.totalMembers, 0)
);

const totalBoards = computed(() =>
  adminStore.workspaces.reduce((sum, item) => sum + item.totalBoards, 0)
);
</script>