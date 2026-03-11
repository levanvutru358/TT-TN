<!-- src/components/stages/StageBoardContent.vue -->
<template>
  <div
    v-if="!showMembers"
    class="flex flex-col h-[calc(100vh-9rem)] md:h-[calc(100vh-8rem)] gap-4"
  >
    <div class="flex-1 overflow-hidden">
      <KanbanBoard
        v-if="project"
        :project="project"
        :filters="activeFilters"
        @update-project="$emit('update-project', $event)"
      />

      <div
        v-else
        class="h-full rounded-2xl bg-black/20 border border-white/10 flex items-center justify-center"
      >
        <div class="text-sm text-white/80">
          {{ loading ? "Đang tải dự án..." : "Không có dữ liệu dự án" }}
        </div>
      </div>
    </div>
  </div>

  <div
    v-else
    class="h-[calc(100vh-9rem)] md:h-[calc(100vh-8rem)] overflow-y-auto"
  >
    <ProjectMembers
      v-if="project"
      :members="project.members || []"
      @update-members="$emit('update-members', $event)"
    />
  </div>
</template>

<script setup>
import ProjectMembers from "@/components/project/ProjectMembers.vue";
import KanbanBoard from "@/components/kanban/boards/KanbanBoard.vue";

defineProps({
  project: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showMembers: {
    type: Boolean,
    default: false,
  },
  activeFilters: {
    type: Object,
    default: () => ({}),
  },
});

defineEmits(["update-project", "update-members"]);
</script>