<template>

<div class="flex gap-4 text-sm">

<div>Total: {{store.totalUsers}}</div>

<div>Admins: {{store.totalAdmins}}</div>

<div>Members: {{store.totalMembers}}</div>

</div>

</template>

<script setup>

import { useUserStore } from "../../stores/userStore"
import UserDetailModal from "./UserDetailModal.vue"
import { ref } from "vue"
const totalUsers = ref(24)
const totalAdmins = ref(5)
const activeUsers = ref(18)

const showDetail = ref(false)

const store=useUserStore()

</script>
