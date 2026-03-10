// src/composables/stages/useStageProject.js
import { computed, nextTick, onMounted, ref } from "vue";
import { getProjectDetail } from "@/api/mockApi";

export function useStageProject() {
  const project = ref(null);
  const loading = ref(true);
  const boardWrapper = ref(null);
  const showBoardMenu = ref(false);

  const currentView = ref("board");
  const showMembers = ref(false);
  const showFilter = ref(false);

  const activeFilters = ref({
    members: [],
    labels: [],
    cardStatus: [],
    dueDate: [],
    activity: [],
    searchQuery: "",
  });

  const isEditingTitle = ref(false);
  const titleDraft = ref("");
  const titleInputRef = ref(null);

  const boardTitle = computed(() => {
    const p = project.value;
    const fromProject =
      (p?.name && String(p.name).trim()) ||
      (p?.title && String(p.title).trim()) ||
      (p?.project_name && String(p.project_name).trim()) ||
      "";

    return fromProject || "Bảng Trello của tôi";
  });

  function startEditTitle() {
    if (!project.value) return;

    isEditingTitle.value = true;
    titleDraft.value = boardTitle.value;

    nextTick(() => {
      if (titleInputRef.value) {
        titleInputRef.value.focus();
        titleInputRef.value.select?.();
      }
    });
  }

  function cancelEditTitle() {
    isEditingTitle.value = false;
    titleDraft.value = "";
  }

  function commitTitle() {
    if (!isEditingTitle.value) return;

    const nextTitle = String(titleDraft.value || "").trim();
    if (!nextTitle) {
      cancelEditTitle();
      return;
    }

    const p = project.value || {};
    project.value = {
      ...p,
      name: nextTitle,
    };

    isEditingTitle.value = false;
  }

  function updateMembers(updatedMembers) {
    if (!project.value) return;

    project.value = {
      ...project.value,
      members: updatedMembers,
    };
  }

  function updateFilters(newFilters) {
    activeFilters.value = newFilters;
  }

  function closeFilter() {
    showFilter.value = false;
  }

  const filterButtonClass = computed(() => {
    const hasActiveFilters =
      activeFilters.value.members?.length > 0 ||
      activeFilters.value.labels?.length > 0 ||
      activeFilters.value.cardStatus?.length > 0 ||
      activeFilters.value.dueDate?.length > 0 ||
      activeFilters.value.activity?.length > 0;

    return hasActiveFilters
      ? "bg-[#0c66e4] text-white"
      : "bg-black/30 border border-white/15 hover:bg-black/40";
  });

  async function fetchProject() {
    try {
      loading.value = true;
      const res = await getProjectDetail();
      project.value = res.data;
    } catch (error) {
      console.error("Failed to fetch project:", error);
    } finally {
      loading.value = false;
    }
  }

  onMounted(fetchProject);

  return {
    project,
    loading,
    boardWrapper,
    showBoardMenu,
    currentView,
    showMembers,
    showFilter,
    activeFilters,
    isEditingTitle,
    titleDraft,
    titleInputRef,
    boardTitle,
    filterButtonClass,
    startEditTitle,
    cancelEditTitle,
    commitTitle,
    updateMembers,
    updateFilters,
    closeFilter,
  };
}