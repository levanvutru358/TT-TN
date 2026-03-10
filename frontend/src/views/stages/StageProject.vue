<!-- src/views/stages/StageProject.vue -->
<template>
  <div class="h-screen flex flex-col bg-[#020617] text-white">
    <AppTopBar />

    <div class="flex flex-1 overflow-hidden">
      <AppSidebarInbox />

      <main
        ref="boardWrapper"
        class="relative flex-1 bg-gradient-to-r from-[#4b3f72] via-[#7b3ea8] to-[#c1558b] p-4 md:p-6 overflow-auto"
      >
        <div class="max-w-6xl mx-auto pb-16">
          <StageBoardHeader
            :board-title="boardTitle"
            :is-editing-title="isEditingTitle"
            :title-draft="titleDraft"
            :current-view="currentView"
            :show-members="showMembers"
            :filter-button-class="filterButtonClass"
            @start-edit-title="startEditTitle"
            @commit-title="commitTitle"
            @cancel-edit-title="cancelEditTitle"
            @update:titleDraft="titleDraft = $event"
            @update:currentView="currentView = $event"
            @toggle-members="showMembers = !showMembers"
            @toggle-filter="showFilter = !showFilter"
            @open-board-menu="showBoardMenu = true"
          />

          <StageBoardContent
            :project="project"
            :loading="loading"
            :show-members="showMembers"
            :active-filters="activeFilters"
            @update-project="project = $event"
            @update-members="updateMembers"
          />
        </div>

        <BottomQuickNav />
      </main>
    </div>

    <FilterPanel
      :is-open="showFilter"
      :members="project?.members || []"
      :labels="project?.labels || []"
      @close="closeFilter"
      @update-filters="updateFilters"
    />

    <BoardMenu :open="showBoardMenu" @close="showBoardMenu = false" />
  </div>
</template>

<script setup>
import AppTopBar from "@/components/common/AppTopBar.vue";
import AppSidebarInbox from "@/components/common/AppSidebarInbox.vue";
import BottomQuickNav from "@/components/common/BottomQuickNav.vue";
import StageBoardHeader from "@/components/stages/StageBoardHeader.vue";
import StageBoardContent from "@/components/stages/StageBoardContent.vue";
import FilterPanel from "@/components/filters/FilterPanel.vue";
import BoardMenu from "@/components/kanban/BoardMenu.vue";
import { useStageProject } from "@/composables/stages/useStageProject";

const {
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
  boardTitle,
  filterButtonClass,
  startEditTitle,
  cancelEditTitle,
  commitTitle,
  updateMembers,
  updateFilters,
  closeFilter,
} = useStageProject();
</script>