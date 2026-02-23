<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">
        {{ isEditMode ? "Edit Stage" : "Create New Stage" }}
      </h2>
    </div>

    <!-- Loading State -->
    <div v-if="stageStore.loading" class="flex justify-center py-8">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
      ></div>
    </div>

    <!-- Form -->
    <div v-else class="max-w-2xl">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Name Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Stage Name <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Enter stage name"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Description Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            v-model="form.description"
            placeholder="Enter stage description"
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <!-- Status Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            v-model="form.status"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <!-- Priority Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <input
            v-model.number="form.priority"
            type="number"
            min="0"
            placeholder="Enter priority"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 pt-4">
          <button
            type="submit"
            :disabled="stageStore.loading"
            class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            {{ isEditMode ? "Update Stage" : "Create Stage" }}
          </button>
          <router-link
            to="/stages"
            class="inline-block bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStageStore } from "@/stores/stageStore";
import { useUIStore } from "@/stores/uiStore";

const route = useRoute();
const router = useRouter();
const stageStore = useStageStore();
const uiStore = useUIStore();

const isEditMode = computed(() => !!route.params.id);

const form = reactive({
  name: "",
  description: "",
  status: "active",
  priority: 0,
});

onMounted(async () => {
  if (isEditMode.value) {
    try {
      const stage = await stageStore.fetchStageById(route.params.id);
      if (stage) {
        form.name = stage.name;
        form.description = stage.description || "";
        form.status = stage.status || "active";
        form.priority = stage.priority || 0;
      }
    } catch (error) {
      uiStore.setNotification("error", "Failed to load stage");
      router.push("/stages");
    }
  }
});

const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await stageStore.updateStage(route.params.id, form);
      uiStore.setNotification("success", "Stage updated successfully");
    } else {
      await stageStore.createStage(form);
      uiStore.setNotification("success", "Stage created successfully");
    }
    router.push("/stages");
  } catch (error) {
    uiStore.setNotification(
      "error",
      error.response?.data?.message || "Operation failed",
    );
  }
};
</script>

<style scoped></style>
