<template>

<div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div class="bg-white w-[950px] rounded-lg shadow-lg flex overflow-hidden">

<!-- LEFT SIDE -->
<div class="flex-1 p-6 space-y-5">

<!-- TITLE -->
<input
v-model="name"
placeholder="User name"
class="text-2xl font-bold w-full border-b pb-1 outline-none"
/>

<!-- BASIC INFO -->
<div class="grid grid-cols-2 gap-4">

<div>
<label class="text-sm text-gray-500">Email</label>
<input
v-model="email"
class="border rounded w-full p-2"
/>
</div>

<div>
<label class="text-sm text-gray-500">Role</label>

<select
v-model="role"
class="border rounded w-full p-2"
>
<option value="admin">Admin</option>
<option value="user">User</option>
</select>

</div>

<div>
<label class="text-sm text-gray-500">Phone</label>
<input
v-model="phone"
class="border rounded w-full p-2"
/>
</div>

<div>
<label class="text-sm text-gray-500">Department</label>
<input
v-model="department"
class="border rounded w-full p-2"
/>
</div>

</div>

<!-- DESCRIPTION -->

<div>

<h3 class="font-semibold mb-1">
Description
</h3>

<textarea
v-model="description"
rows="4"
class="border rounded w-full p-2"
/>

</div>

<!-- CHECKLIST -->

<div>

<h3 class="font-semibold mb-2">
User Tasks
</h3>

<div class="space-y-1">

<label class="flex items-center gap-2">
<input type="checkbox"/>
Create account
</label>

<label class="flex items-center gap-2">
<input type="checkbox"/>
Assign permissions
</label>

<label class="flex items-center gap-2">
<input type="checkbox"/>
Send welcome email
</label>

</div>

</div>

</div>

<!-- RIGHT SIDE -->
<div class="w-80 border-l p-5 bg-gray-50">

<h3 class="font-semibold mb-4">
User Info
</h3>

<div class="space-y-2 text-sm">

<div>
<span class="text-gray-500">Created:</span>
{{ created }}
</div>

<div>
<span class="text-gray-500">Last update:</span>
{{ updated }}
</div>

</div>

<!-- COMMENT -->

<div class="mt-6">

<h3 class="font-semibold mb-2">
Comments & Activity
</h3>

<input
v-model="comment"
placeholder="Write a comment..."
class="border rounded w-full p-2"
/>

<div class="mt-3 space-y-2 text-sm text-gray-600">

<div>
Admin created this user
</div>

<div>
Profile updated
</div>

</div>

</div>

<!-- BUTTONS -->

<div class="mt-6 flex gap-2">

<button
class="bg-blue-500 text-white px-4 py-2 rounded"
@click="save"
>
Save
</button>

<button
class="text-gray-500"
@click="$emit('close')"
>
Cancel
</button>

</div>

</div>

</div>

</div>

</template>

<script setup>

import { ref } from "vue"
import { useUserStore } from "../../stores/userStore"

const emit = defineEmits(["close"])

const props = defineProps({
user:Object,
role:String
})

const store = useUserStore()

const name = ref(props.user?.name || "")
const email = ref(props.user?.email || "")
const role = ref(props.user?.role || props.role || "user")
const phone = ref("")
const department = ref("")
const description = ref("")
const comment = ref("")

const created = new Date().toLocaleDateString()
const updated = new Date().toLocaleDateString()

function save(){

if(props.user){

store.updateUser({
id:props.user.id,
name:name.value,
email:email.value,
role:role.value
})

}else{

store.addUser({
id:Date.now(),
name:name.value,
email:email.value,
role:role.value
})

}

emit("close") // đóng modal sau khi save
}

</script>