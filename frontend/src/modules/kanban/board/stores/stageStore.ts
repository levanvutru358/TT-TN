import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  stageAPI,
  type ApiPayload,
  type StageId,
  type StageRecord,
} from "@/modules/kanban/board/api/stageApi";

function unwrapApiData<T>(payload: ApiPayload<T>): T {
  if (payload && typeof payload === "object" && !Array.isArray(payload) && "data" in payload) {
    return payload.data as T;
  }

  return payload as T;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error";
}

export const useStageStore = defineStore("stage", () => {
  // State
  const stages = ref<StageRecord[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const selectedStage = ref<StageRecord | null>(null);
  const totalStages = ref(0);
  const currentPage = ref(1);
  const pageSize = ref(10);

  // Computed
  const stageCount = computed(() => stages.value.length);
  const hasStages = computed(() => stages.value.length > 0);

  // Actions
  const fetchAllStages = async (): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await stageAPI.getAllStages();
      const stageList = unwrapApiData(response.data);
      stages.value = Array.isArray(stageList) ? stageList : [];
      totalStages.value = stages.value.length;
    } catch (err) {
      error.value = getErrorMessage(err);
      console.error("Error fetching stages:", err);
    } finally {
      loading.value = false;
    }
  };

  const fetchStagesPaginated = async (page = 1, limit = 10): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await stageAPI.getStagesPaginated(page, limit);
      const stageList = unwrapApiData(response.data);
      stages.value = Array.isArray(stageList) ? stageList : [];
      currentPage.value = page;
      pageSize.value = limit;
      totalStages.value = stages.value.length;
    } catch (err) {
      error.value = getErrorMessage(err);
      console.error("Error fetching stages:", err);
    } finally {
      loading.value = false;
    }
  };

  const fetchStageById = async (id: StageId): Promise<StageRecord | null> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await stageAPI.getStageById(id);
      selectedStage.value = unwrapApiData(response.data);
      return selectedStage.value;
    } catch (err) {
      error.value = getErrorMessage(err);
      console.error("Error fetching stage:", err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const createStage = async (stageData: Partial<StageRecord>): Promise<StageRecord> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await stageAPI.createStage(stageData);
      const newStage = unwrapApiData(response.data);
      stages.value.push(newStage);
      totalStages.value = stages.value.length;
      return newStage;
    } catch (err) {
      error.value = getErrorMessage(err);
      console.error("Error creating stage:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateStage = async (
    id: StageId,
    stageData: Partial<StageRecord>
  ): Promise<StageRecord> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await stageAPI.updateStage(id, stageData);
      const updatedStage = unwrapApiData(response.data);
      const index = stages.value.findIndex((stage) => stage.id === id);
      if (index !== -1) {
        stages.value[index] = updatedStage;
      }
      if (selectedStage.value?.id === id) {
        selectedStage.value = updatedStage;
      }
      return updatedStage;
    } catch (err) {
      error.value = getErrorMessage(err);
      console.error("Error updating stage:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteStage = async (id: StageId): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      await stageAPI.deleteStage(id);
      stages.value = stages.value.filter((stage) => stage.id !== id);
      totalStages.value = stages.value.length;
      if (selectedStage.value?.id === id) {
        selectedStage.value = null;
      }
    } catch (err) {
      error.value = getErrorMessage(err);
      console.error("Error deleting stage:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const clearError = (): void => {
    error.value = null;
  };

  const clearSelectedStage = (): void => {
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
