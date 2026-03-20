<template>
  <section class="space-y-8">
    <PageHeader
      breadcrumb="Admin / Boards"
      title="Boards Management"
      description="View board visibility, member volume and overall board activity."
    >
      <template #actions>
        <button
          type="button"
          class="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Add board
        </button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <SummaryMiniCard label="Total Boards" :value="adminStore.boards.length" />
      <SummaryMiniCard label="Public Boards" :value="publicBoards" />
      <SummaryMiniCard label="Private Boards" :value="privateBoards" />
    </div>

    <LoadingBlock v-if="adminStore.isLoadingBoards" />

    <BoardTable
      v-else
      :boards="adminStore.boards"
    />
  </section>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useAdminStore } from "@/admin/stores/admin.store";
import PageHeader from "@/admin/components/AdminDashbord/common/PageHeader.vue";
import SummaryMiniCard from "@/admin/components/AdminDashbord/common/SummaryMiniCard.vue";
import LoadingBlock from "@/admin/components/AdminDashbord/common/LoadingBlock.vue";
import BoardTable from "@/admin/components/AdminDashbord/tables/BoardTable.vue";

const adminStore = useAdminStore();

onMounted(() => {
  adminStore.fetchBoards();
});

const publicBoards = computed(
  () => adminStore.boards.filter((item) => item.visibility === "public").length
);

const privateBoards = computed(
  () => adminStore.boards.filter((item) => item.visibility === "private").length
);
</script>