<template>
  <div>
    <h1 class="text-3xl font-bold text-white mb-6">User Management</h1>

    <button
      class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      @click="showForm = true"
    >
      Add User
    </button>

    <!-- FORM -->
    <div v-if="showForm" class="bg-white p-4 rounded w-96 mb-6">
      <input v-model="name" placeholder="Name" class="border p-2 w-full mb-3" />

      <input
        v-model="email"
        placeholder="Email"
        class="border p-2 w-full mb-3"
      />

      <button
        class="bg-green-500 text-white px-4 py-2 rounded"
        @click="addUser"
      >
        Create
      </button>
    </div>

    <!-- TABLE -->
    <table class="bg-white w-full rounded overflow-hidden">
      <thead class="bg-gray-200">
        <tr>
          <th class="p-3 text-left">Name</th>
          <th class="p-3 text-left">Email</th>
          <th class="p-3 text-left">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-t">
          <td class="p-3">{{ user.name }}</td>
          <td class="p-3">{{ user.email }}</td>
          <td class="p-3">
            <button class="text-red-500" @click="deleteUser(user.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const users = ref([
  { id: 1, name: "Eric", email: "eric@gmail.com" },
  { id: 2, name: "Anna", email: "anna@gmail.com" },
]);

const showForm = ref(false);
const name = ref("");
const email = ref("");

const addUser = () => {
  users.value.push({
    id: Date.now(),
    name: name.value,
    email: email.value,
  });

  name.value = "";
  email.value = "";
  showForm.value = false;
};

const deleteUser = (id) => {
  users.value = users.value.filter((u) => u.id !== id);
};
</script>
