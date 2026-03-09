<template>

<div class="flex gap-4 items-start">

  <!-- ADMIN COLUMN -->
  <UserColumn
    title="Admin"
    role="admin"
  />

  <!-- USER COLUMN -->
  <UserColumn
    title="User"
    role="user"
  />

</div>

</template>

<script setup>
import UserColumn from "../components/users/UserColumn.vue"
</script>