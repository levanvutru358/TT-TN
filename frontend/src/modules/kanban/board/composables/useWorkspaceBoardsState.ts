import { ref } from "vue";

export type WorkspaceBoardVisibility = "workspace" | "private" | "public" | string;

export interface WorkspaceBoard extends Record<string, unknown> {
  id: number | string;
  name: string;
  background: string;
  updatedAt: number;
  visibility: WorkspaceBoardVisibility;
}

const workspaceBoards = ref<WorkspaceBoard[]>([]);

export function useWorkspaceBoardsState() {
  return {
    workspaceBoards,
  };
}
