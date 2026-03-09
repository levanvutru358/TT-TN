<template>

<select v-model="role">

<option value="">All</option>
<option value="admin">Admin</option>
<option value="member">Member</option>

</select>

</template>

<script setup>

import { ref,watch } from "vue"
import { useUserStore } from "../../stores/userStore"

const store=useUserStore()

const role=ref("")

watch(role,(value)=>{

store.filterRole=value

})

</script>