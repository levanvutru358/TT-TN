<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Stages</h2>
      <router-link
        to="/stages/create"
        class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        + Add New Stage
      </router-link>
    </div>

    <!-- Loading State -->
    <div v-if="stageStore.loading" class="flex justify-center py-8">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
      ></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="stageStore.error"
      class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4"
    >
      {{ stageStore.error }}
    </div>

    <!-- Empty State -->
    <div v-else-if="!stageStore.hasStages" class="text-center py-8">
      <p class="text-gray-500 mb-4">
        No stages found. Create your first stage to get started.
      </p>
      <router-link
        to="/stages/create"
        class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Create Stage
      </router-link>
    </div>

    <!-- Stages Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-3 text-left text-gray-700 font-semibold">ID</th>
            <th class="px-4 py-3 text-left text-gray-700 font-semibold">
              Name
            </th>
            <th class="px-4 py-3 text-left text-gray-700 font-semibold">
              Description
            </th>
            <th class="px-4 py-3 text-left text-gray-700 font-semibold">
              Status
            </th>
            <th class="px-4 py-3 text-left text-gray-700 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="stage in stageStore.stages"
            :key="stage.id"
            class="border-b hover:bg-gray-50 transition-colors"
          >
            <td class="px-4 py-3 text-gray-900">{{ stage.id }}</td>
            <td class="px-4 py-3 text-gray-900 font-medium">
              {{ stage.name }}
            </td>
            <td class="px-4 py-3 text-gray-600">
              {{ stage.description || "-" }}
            </td>
            <td class="px-4 py-3">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-semibold',
                  stage.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800',
                ]"
              >
                {{ stage.status || "Inactive" }}
              </span>
            </td>
            <td class="px-4 py-3 space-x-2">
              <router-link
                :to="`/stages/${stage.id}`"
                class="inline-block bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition-colors text-sm"
              >
                View
              </router-link>
              <router-link
                :to="`/stages/${stage.id}/edit`"
                class="inline-block bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded transition-colors text-sm"
              >
                Edit
              </router-link>
              <button
                @click="deleteStageHandler(stage.id)"
                class="inline-block bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition-colors text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useStageStore } from "@/stores/stageStore";
import { useUIStore } from "@/stores/uiStore";

const stageStore = useStageStore();
const uiStore = useUIStore();

onMounted(async () => {
  await stageStore.fetchAllStages();
});

const deleteStageHandler = async (id) => {
  if (!confirm("Are you sure you want to delete this stage?")) {
    return;
  }

  try {
    await stageStore.deleteStage(id);
    uiStore.setNotification("success", "Stage deleted successfully");
  } catch (error) {
    uiStore.setNotification("error", "Failed to delete stage");
  }
};
</script>

<style scoped></style>
