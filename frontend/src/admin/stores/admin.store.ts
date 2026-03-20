import { defineStore } from 'pinia'
import { adminService } from '@/admin/api/admin.service'
import type {
  AdminStats,
  AdminUser,
  BoardItem,
  WorkspaceItem
} from '@/admin/types/admin'

interface AdminState {
  stats: AdminStats | null
  users: AdminUser[]
  workspaces: WorkspaceItem[]
  boards: BoardItem[]
  isLoadingStats: boolean
  isLoadingUsers: boolean
  isLoadingWorkspaces: boolean
  isLoadingBoards: boolean
  isUpdatingUser: boolean
}

export const useAdminStore = defineStore('admin-store', {
  state: (): AdminState => ({
    stats: null,
    users: [],
    workspaces: [],
    boards: [],
    isLoadingStats: false,
    isLoadingUsers: false,
    isLoadingWorkspaces: false,
    isLoadingBoards: false,
    isUpdatingUser: false
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

    async fetchBoards() {
      this.isLoadingBoards = true
      try {
        this.boards = await adminService.getBoards()
      } finally {
        this.isLoadingBoards = false
      }
    },

    async toggleUserLock(userId: string) {
      this.isUpdatingUser = true
      try {
        const updatedUser = await adminService.toggleUserLock(userId)
        if (!updatedUser) return

        const index = this.users.findIndex((item) => item.id === userId)
        if (index !== -1) {
          this.users[index] = updatedUser
        }

        if (this.stats) {
          this.stats.activeUsers = this.users.filter(
            (item) => item.status === 'active'
          ).length
        }
      } finally {
        this.isUpdatingUser = false
      }
    }
  }
})