<template>
  <div class="min-h-screen w-full bg-slate-100">
    <div class="flex min-h-screen w-full">
      <AdminSidebar />

      <div class="flex min-w-0 flex-1 flex-col">
        <AdminHeader />

        <main class="flex-1 px-6 py-6 lg:px-8">
          <div class="mx-auto w-full max-w-[1600px]">
            <router-view />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from "@/admin/components/AdminDashbord/layout/AdminHeader.vue";
import AdminSidebar from "@/admin/components/AdminDashbord/layout/AdminSidebar.vue";

export default {
  components: {
    AdminHeader,
    AdminSidebar,
  },
};
</script>
