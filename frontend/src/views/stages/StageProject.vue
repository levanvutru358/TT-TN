<template>
  <div class="h-screen flex flex-col bg-[#020617] text-white overflow-hidden">
    <AppTopBar />

    <div class="flex flex-1 overflow-hidden">
      <AppSidebarInbox v-if="bottomNavTab === 'inbox'" />
      <AppSidebarPlanner v-else-if="bottomNavTab === 'planner'" />
      <AppSidebarBoards v-else-if="bottomNavTab === 'board'" />

      <main
        ref="boardWrapper"
        class="relative flex-1 p-3 md:p-4 overflow-hidden rounded-[26px] bg-[#0b0f19] border border-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.65)]"
      >
        <div
          class="h-full w-full overflow-auto rounded-[22px] bg-gradient-to-r from-[#4b3f72] via-[#7b3ea8] to-[#c1558b] hide-scrollbar"
        >
          <div class="max-w-6xl mx-auto pb-28">
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
        </div>
      </main>
    </div>

    <BottomQuickNav v-model="bottomNavTab" />

    <AppSidebarSwitcher
      :open="bottomNavTab === 'switch'"
      @close="bottomNavTab = 'board'"
    />

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
import AppSidebarPlanner from "@/components/common/AppSidebarPlanner.vue";
import AppSidebarBoards from "@/components/common/AppSidebarBoards.vue";
import AppSidebarSwitcher from "@/components/common/AppSidebarSwitcher.vue";
import BottomQuickNav from "@/components/common/BottomQuickNav.vue";
import StageBoardContent from "@/components/stages/StageBoardContent.vue";
import StageBoardHeader from "@/components/stages/StageBoardHeader.vue";
import FilterPanel from "@/components/filters/FilterPanel.vue";
import BoardMenu from "@/components/kanban/menus/BoardMenu.vue";
import { useStageProject } from "@/composables/stages/useStageProject.js";

const {
  project,
  loading,
  boardWrapper,
  showBoardMenu,
  currentView,
  bottomNavTab,
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

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>