<template>

<div>

<button
class="text-sm text-gray-600 hover:bg-gray-300 p-1 rounded w-full text-left"
@click="open=true"
>
+ Add user
</button>

<UserDetailModal
v-if="open"
:role="role"
@close="open=false"
/>

</div>

</template>

<script setup>

import { ref } from "vue"
import UserDetailModal from "./UserDetailModal.vue"

const props = defineProps({
role:String
})

const open = ref(false)

</script>