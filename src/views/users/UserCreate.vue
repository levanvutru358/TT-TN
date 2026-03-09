<template>
  <div class="max-w-md bg-white p-6 rounded shadow">
    <h1 class="text-xl font-bold mb-4">Create User</h1>

    <form @submit.prevent="createUser">
      <input
        v-model="user.name"
        placeholder="Name"
        class="w-full border p-2 mb-3"
      />

      <input
        v-model="user.email"
        placeholder="Email"
        class="w-full border p-2 mb-3"
      />

      <button class="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import userApi from "../../api/userApi";
import { useRouter } from "vue-router";

const router = useRouter();

const user = reactive({
  name: "",
  email: "",
});

const createUser = async () => {
  await userApi.createUser(user);
  router.push("/users");
};
</script>
