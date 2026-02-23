<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <!-- Back Button -->
    <router-link
      to="/stages"
      class="inline-block text-blue-600 hover:text-blue-800 mb-4"
    >
      ← Back to Stages
    </router-link>

    <!-- Loading State -->
    <div v-if="stageStore.loading" class="flex justify-center py-8">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
      ></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="stageStore.error"
      class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
    >
      {{ stageStore.error }}
    </div>

    <!-- Stage Details -->
    <div v-else-if="stageStore.selectedStage" class="space-y-6">
      <!-- Header -->
      <div class="border-b-2 pb-4">
        <h2 class="text-3xl font-bold text-gray-900">
          {{ stageStore.selectedStage.name }}
        </h2>
        <p class="text-gray-500 mt-2">ID: {{ stageStore.selectedStage.id }}</p>
      </div>

      <!-- Details Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Description</h3>
          <p class="text-gray-700">
            {{
              stageStore.selectedStage.description || "No description provided"
            }}
          </p>
        </div>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Status</h3>
          <span
            :class="[
              'inline-block px-3 py-1 rounded-full text-sm font-semibold',
              stageStore.selectedStage.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800',
            ]"
          >
            {{ stageStore.selectedStage.status || "Inactive" }}
          </span>
        </div>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Priority</h3>
          <p class="text-gray-700">
            {{ stageStore.selectedStage.priority || "Not set" }}
          </p>
        </div>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Created At</h3>
          <p class="text-gray-700">
            {{ formatDate(stageStore.selectedStage.createdAt) }}
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-4 pt-4 border-t">
        <router-link
          :to="`/stages/${stageStore.selectedStage.id}/edit`"
          class="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Edit
        </router-link>
        <button
          @click="deleteStage"
          class="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Delete
        </button>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="text-center py-8">
      <p class="text-gray-500">Stage not found</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStageStore } from "@/stores/stageStore";
import { useUIStore } from "@/stores/uiStore";

const route = useRoute();
const router = useRouter();
const stageStore = useStageStore();
const uiStore = useUIStore();

onMounted(async () => {
  await stageStore.fetchStageById(route.params.id);
});

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const deleteStage = async () => {
  if (!confirm("Are you sure you want to delete this stage?")) {
    return;
  }

  try {
    await stageStore.deleteStage(route.params.id);
    uiStore.setNotification("success", "Stage deleted successfully");
    router.push("/stages");
  } catch (error) {
    uiStore.setNotification("error", "Failed to delete stage");
  }
};
</script>

<style scoped></style>
