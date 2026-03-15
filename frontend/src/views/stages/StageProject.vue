<template>
  <div class="min-h-screen flex flex-col bg-[#f1f2f4] text-[#172b4d]">
    <WorkspaceHeader
      v-model="searchKeyword"
      @create-click="showBoardMenu = true"
    />

    <div class="flex flex-1 overflow-hidden">
      <AppSidebarInbox v-if="bottomNavTab === 'inbox'" />
      <AppSidebarPlanner v-else-if="bottomNavTab === 'planner'" />
      <AppSidebarBoards v-else-if="bottomNavTab === 'board'" />

      <main
        ref="boardWrapper"
        class="relative flex-1 p-3 md:p-4 overflow-hidden rounded-none bg-[#0b0f19] border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.65)]"
      >
        <div
          class="h-full w-full overflow-auto rounded-[22px] hide-scrollbar"
          :style="boardBackgroundStyle"
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

            <div
              v-if="searchKeyword.trim()"
              class="mx-4 md:mx-6 mt-4 mb-2 text-sm text-white/80"
            >
              Kết quả tìm kiếm cho:
              <span class="font-semibold text-white">"{{ searchKeyword }}"</span>
            </div>

            <StageBoardContent
              :project="filteredProject"
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

    <BoardMenu
      :open="showBoardMenu"
      :background="boardBackground"
      @close="showBoardMenu = false"
      @save-background="handleSaveBoardBackground"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import WorkspaceHeader from "@/components/common/WorkspaceHeader.vue";
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

const DEFAULT_BACKGROUND = {
  type: "color",
  value: "linear-gradient(90deg, #4b3f72 0%, #7b3ea8 50%, #c1558b 100%)",
};

const STORAGE_KEY = "stage-board-background";

const searchKeyword = ref("");
const boardBackground = ref(loadBoardBackground());

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

function loadBoardBackground() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return DEFAULT_BACKGROUND;

  try {
    const parsed = JSON.parse(raw);

    if (!parsed || !parsed.type || !parsed.value) {
      return DEFAULT_BACKGROUND;
    }

    return parsed;
  } catch {
    return DEFAULT_BACKGROUND;
  }
}

function handleSaveBoardBackground(newBackground) {
  boardBackground.value = newBackground;
}

watch(
  boardBackground,
  (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  },
  { deep: true }
);

const boardBackgroundStyle = computed(() => {
  if (boardBackground.value?.type === "image") {
    return {
      backgroundImage: `linear-gradient(rgba(0,0,0,.20), rgba(0,0,0,.35)), url("${boardBackground.value.value}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "scroll",
    };
  }

  return {
    background: boardBackground.value?.value || DEFAULT_BACKGROUND.value,
  };
});

const filteredProject = computed(() => {
  const keyword = searchKeyword.value.trim().toLowerCase();

  if (!project.value) return project.value;
  if (!keyword) return project.value;

  const clonedProject = {
    ...project.value,
    lists: (project.value.lists || [])
      .map((list) => {
        const filteredCards = (list.cards || []).filter((card) => {
          const title = (card.title || "").toLowerCase();
          const description = (card.description || "").toLowerCase();
          return title.includes(keyword) || description.includes(keyword);
        });

        return {
          ...list,
          cards: filteredCards,
        };
      })
      .filter((list) => list.cards.length > 0),
  };

  return clonedProject;
});
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