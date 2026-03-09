<template>

<div
class="bg-white p-2 rounded shadow text-sm cursor-pointer"
draggable="true"
@dragstart="dragStart"
@click="openDetail"
>

<div class="font-semibold">
{{ user.name }}
</div>

<div class="text-gray-500 text-xs">
{{ user.email }}
</div>

<div class="flex gap-2 mt-2">

<button
class="text-blue-600 text-xs"
@click.stop="openDetail"
>
Edit
</button>

<button
class="text-red-500 text-xs"
@click.stop="remove"
>
Delete
</button>

</div>

</div>

<UserDetailModal
v-if="showDetail"
:user="user"
@close="showDetail=false"
/>

</template>

<script setup>

import { ref } from "vue"
import { useUserStore } from "../../stores/userStore"
import UserDetailModal from "./UserDetailModal.vue"

const props = defineProps({
user:Object
})

const store = useUserStore()

const showDetail = ref(false)

function openDetail(){
showDetail.value = true
}

function remove(){
store.deleteUser(props.user.id)
}

function dragStart(e){
e.dataTransfer.setData("userId",props.user.id)
}

</script>