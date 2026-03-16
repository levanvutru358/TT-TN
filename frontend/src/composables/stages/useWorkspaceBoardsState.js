import { ref } from "vue";

const workspaceBoards = ref([]);

export function useWorkspaceBoardsState() {
  return {
    workspaceBoards,
  };
}
