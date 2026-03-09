<template>

<div class="h-screen flex flex-col">

  <Topbar />

  <div class="flex flex-1 overflow-hidden">

    <Sidebar />

    <!-- Page -->
    <div class="flex-1 bg-[#fafbfc] overflow-x-auto p-4">

      <RouterView />

    </div>

  </div>

</div>

</template>

<script setup>
import Topbar from "./Topbar.vue"
import Sidebar from "./Sidebar.vue"
</script>