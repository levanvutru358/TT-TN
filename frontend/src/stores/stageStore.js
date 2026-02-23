import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { stageAPI } from "@/api/stageApi";

export const useStageStore = defineStore("stage", () => {
  // State
  const stages = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const selectedStage = ref(null);
  const totalStages = ref(0);
  const currentPage = ref(1);
  const pageSize = ref(10);

  // Computed
  const stageCount = computed(() => stages.value.length);
  const hasStages = computed(() => stages.value.length > 0);

  // Actions
  const fetchAllStages = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await stageAPI.getAllStages();
      stages.value = response.data.data || response.data;
      totalStages.value = stages.value.length;
    } catch (err) {
      error.value = err.message;
      console.error("Error fetching stages:", err);
    } finally {
      loading.value = false;
    }
  };

  const fetchStagesPaginated = async (page = 1, limit = 10) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await stageAPI.getStagesPaginated(page, limit);
      stages.value = response.data.data || response.data;
      currentPage.value = page;
      pageSize.value = limit;
    } catch (err) {
      error.value = err.message;
      console.error("Error fetching stages:", err);
    } finally {
      loading.value = false;
    }
  };

  const fetchStageById = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await stageAPI.getStageById(id);
      selectedStage.value = response.data.data || response.data;
      return selectedStage.value;
    } catch (err) {
      error.value = err.message;
      console.error("Error fetching stage:", err);
    } finally {
      loading.value = false;
    }
  };

  const createStage = async (stageData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await stageAPI.createStage(stageData);
      const newStage = response.data.data || response.data;
      stages.value.push(newStage);
      totalStages.value++;
      return newStage;
    } catch (err) {
      error.value = err.message;
      console.error("Error creating stage:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateStage = async (id, stageData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await stageAPI.updateStage(id, stageData);
      const updatedStage = response.data.data || response.data;
      const index = stages.value.findIndex((s) => s.id === id);
      if (index !== -1) {
        stages.value[index] = updatedStage;
      }
      if (selectedStage.value?.id === id) {
        selectedStage.value = updatedStage;
      }
      return updatedStage;
    } catch (err) {
      error.value = err.message;
      console.error("Error updating stage:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteStage = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await stageAPI.deleteStage(id);
      stages.value = stages.value.filter((s) => s.id !== id);
      totalStages.value--;
      if (selectedStage.value?.id === id) {
        selectedStage.value = null;
      }
    } catch (err) {
      error.value = err.message;
      console.error("Error deleting stage:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  const clearSelectedStage = () => {
    selectedStage.value = null;
  };

  return {
    // State
    stages,
    loading,
    error,
    selectedStage,
    totalStages,
    currentPage,
    pageSize,

    // Computed
    stageCount,
    hasStages,

    // Actions
    fetchAllStages,
    fetchStagesPaginated,
    fetchStageById,
    createStage,
    updateStage,
    deleteStage,
    clearError,
    clearSelectedStage,
  };
});
