<template>

<input
v-model="keyword"
placeholder="Search user..."
class="border p-1 text-sm"
/>

</template>

<script setup>

import { ref,watch } from "vue"
import { useUserStore } from "../../stores/userStore"

const store=useUserStore()

const keyword=ref("")

watch(keyword,(value)=>{

store.keyword=value

})

</script>