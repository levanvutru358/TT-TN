<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">
      Welcome to Stage Management System
    </h2>
    <p class="text-gray-600 mb-4">
      This application allows you to manage project stages efficiently.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <div class="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 class="text-xl font-semibold text-blue-900 mb-2">📊 Stages</h3>
        <p class="text-blue-700">Manage and track project stages</p>
      </div>

      <div class="bg-purple-50 p-6 rounded-lg border border-purple-200">
        <h3 class="text-xl font-semibold text-purple-900 mb-2">
          ⚙️ Real-time Updates
        </h3>
        <p class="text-purple-700">Get instant notifications and updates</p>
      </div>

      <div class="bg-green-50 p-6 rounded-lg border border-green-200">
        <h3 class="text-xl font-semibold text-green-900 mb-2">
          🚀 Easy Integration
        </h3>
        <p class="text-green-700">Built with modern technologies</p>
      </div>
    </div>

    <div class="mt-8">
      <router-link
        to="/stages"
        class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Go to Stages →
      </router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
