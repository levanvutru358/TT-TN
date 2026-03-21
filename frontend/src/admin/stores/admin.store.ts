import { defineStore } from 'pinia'
import { adminService } from '@/admin/api/admin.service'
import type {
  AdminStats,
  AdminUser,
  BoardDetail,
  BoardItem,
  WorkspaceDetail,
  WorkspaceItem,
} from '@/admin/types/admin'

interface AdminState {
  stats: AdminStats | null
  users: AdminUser[]
  workspaces: WorkspaceItem[]
  boards: BoardItem[]
  currentWorkspaceDetail: WorkspaceDetail | null
  currentBoardDetail: BoardDetail | null
  isLoadingStats: boolean
  isLoadingUsers: boolean
  isLoadingWorkspaces: boolean
  isLoadingBoards: boolean
  isLoadingWorkspaceDetail: boolean
  isLoadingBoardDetail: boolean
  isUpdatingUser: boolean
  isRemovingBoardMember: boolean
}

export const useAdminStore = defineStore('admin-store', {
  state: (): AdminState => ({
    stats: null,
    users: [],
    workspaces: [],
    boards: [],
    currentWorkspaceDetail: null,
    currentBoardDetail: null,
    isLoadingStats: false,
    isLoadingUsers: false,
    isLoadingWorkspaces: false,
    isLoadingBoards: false,
    isLoadingWorkspaceDetail: false,
    isLoadingBoardDetail: false,
    isUpdatingUser: false,
    isRemovingBoardMember: false,
  }),

  actions: {
    async fetchStats() {
      this.isLoadingStats = true
      try {
        this.stats = await adminService.getStats()
      } finally {
        this.isLoadingStats = false
      }
    },

    async fetchUsers() {
      this.isLoadingUsers = true
      try {
        this.users = await adminService.getUsers()
      } finally {
        this.isLoadingUsers = false
      }
    },

    async fetchWorkspaces() {
      this.isLoadingWorkspaces = true
      try {
        this.workspaces = await adminService.getWorkspaces()
      } finally {
        this.isLoadingWorkspaces = false
      }
    },

    async fetchWorkspaceDetail(workspaceId: string) {
      this.isLoadingWorkspaceDetail = true
      try {
        this.currentWorkspaceDetail = await adminService.getWorkspaceDetail(workspaceId)
      } finally {
        this.isLoadingWorkspaceDetail = false
      }
    },

    async fetchBoards() {
      this.isLoadingBoards = true
      try {
        this.boards = await adminService.getBoards()
      } finally {
        this.isLoadingBoards = false
      }
    },

    async fetchBoardDetail(boardId: string) {
      this.isLoadingBoardDetail = true
      try {
        this.currentBoardDetail = await adminService.getBoardDetail(boardId)
      } finally {
        this.isLoadingBoardDetail = false
      }
    },

    async removeBoardMember(boardId: string, memberId: string) {
      this.isRemovingBoardMember = true
      try {
        this.currentBoardDetail = await adminService.removeBoardMember(boardId, memberId)
      } finally {
        this.isRemovingBoardMember = false
      }
    },

    async toggleUserLock(userId: string) {
      this.isUpdatingUser = true
      try {
        const updatedUser = await adminService.toggleUserLock(userId)
        if (!updatedUser) return

        const index = this.users.findIndex((item) => item.id === userId)
        if (index !== -1) this.users[index] = updatedUser

        if (this.stats) {
          this.stats.activeUsers = this.users.filter(
            (item) => item.status === 'active'
          ).length
        }
      } finally {
        this.isUpdatingUser = false
      }
    },
  },
})