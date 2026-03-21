<template>
  <section class="space-y-8">
    <PageHeader
      breadcrumb="Admin / Users"
      title="Users Management"
      description="Search, filter and manage user accounts."
    >
      <template #actions>
        <button
          type="button"
          class="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Add user
        </button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <SummaryMiniCard label="Total Users" :value="adminStore.users.length" />
      <SummaryMiniCard label="Active" :value="activeCount" />
      <SummaryMiniCard label="Locked" :value="lockedCount" />
      <SummaryMiniCard label="Admins" :value="adminCount" />
    </div>

    <FilterBar
      v-model:search="search"
      v-model:status="status"
      @reset="handleReset"
    />

    <LoadingBlock v-if="adminStore.isLoadingUsers" />

    <UserTable
      v-else
      :users="filteredUsers"
      @toggle-lock="handleToggleLock"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useAdminStore } from "@/admin/stores/admin.store";
import PageHeader from "@/admin/components/AdminDashbord/common/PageHeader.vue";
import SummaryMiniCard from "@/admin/components/AdminDashbord/common/SummaryMiniCard.vue";
import FilterBar from "@/admin/components/AdminDashbord/common/FilterBar.vue";
import LoadingBlock from "@/admin/components/AdminDashbord/common/LoadingBlock.vue";
import UserTable from "@/admin/components/AdminDashbord/tables/UserTable.vue";

const adminStore = useAdminStore();

const search = ref("");
const status = ref("");

onMounted(() => {
  adminStore.fetchUsers();
});

const filteredUsers = computed(() => {
  return adminStore.users.filter((user) => {
    const matchesSearch =
      !search.value ||
      user.name.toLowerCase().includes(search.value.toLowerCase()) ||
      user.email.toLowerCase().includes(search.value.toLowerCase());

    const matchesStatus = !status.value || user.status === status.value;

    return matchesSearch && matchesStatus;
  });
});

const activeCount = computed(
  () => adminStore.users.filter((item) => item.status === "active").length
);

const lockedCount = computed(
  () => adminStore.users.filter((item) => item.status === "locked").length
);

const adminCount = computed(
  () => adminStore.users.filter((item) => item.role === "admin").length
);

const handleReset = () => {
  search.value = "";
  status.value = "";
};

const handleToggleLock = async (userId: string) => {
  await adminStore.toggleUserLock(userId);
};
</script>