<template>
  <div class="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center gap-4">
    <img
      src="https://via.placeholder.com/600x400?text=Landing+Image"
      alt="Landing"
      class="w-full md:w-1/2 rounded-lg object-cover"
    />

    <div class="flex-1">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Welcome</h3>
      <p class="text-gray-600 mb-4">Click Start to open the project board.</p>

      <router-link
        to="/project"
        class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Start
      </router-link>
    </div>
  </div>
</template>

<script setup>
// This component expects the project image to be placed at public/images/landing.png
</script>

<style scoped></style>
