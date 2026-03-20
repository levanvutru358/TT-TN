import type {
  AdminStats,
  AdminUser,
  BoardItem,
  WorkspaceItem
} from '@/admin/types/admin'

const wait = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

let mockUsers: AdminUser[] = [
  {
    id: 'u1',
    name: 'Nguyen Van A',
    email: 'vana@gmail.com',
    role: 'admin',
    status: 'active',
    createdAt: '2026-03-01T08:00:00',
    lastActiveAt: '2026-03-20T09:10:00'
  },
  {
    id: 'u2',
    name: 'Tran Thi B',
    email: 'thib@gmail.com',
    role: 'member',
    status: 'locked',
    createdAt: '2026-03-03T10:00:00',
    lastActiveAt: '2026-03-18T14:00:00'
  },
  {
    id: 'u3',
    name: 'Le Van C',
    email: 'vanc@gmail.com',
    role: 'member',
    status: 'active',
    createdAt: '2026-03-04T11:00:00',
    lastActiveAt: '2026-03-20T08:45:00'
  },
  {
    id: 'u4',
    name: 'Pham Thi D',
    email: 'thid@gmail.com',
    role: 'member',
    status: 'active',
    createdAt: '2026-03-06T13:00:00',
    lastActiveAt: '2026-03-19T18:20:00'
  }
]

const mockWorkspaces: WorkspaceItem[] = [
  {
    id: 'w1',
    name: 'Marketing Team',
    ownerName: 'Nguyen Van A',
    totalMembers: 8,
    totalBoards: 4,
    createdAt: '2026-03-01T08:00:00'
  },
  {
    id: 'w2',
    name: 'Product Team',
    ownerName: 'Tran Thi B',
    totalMembers: 12,
    totalBoards: 6,
    createdAt: '2026-03-03T09:00:00'
  },
  {
    id: 'w3',
    name: 'Development Team',
    ownerName: 'Le Van C',
    totalMembers: 15,
    totalBoards: 7,
    createdAt: '2026-03-05T10:30:00'
  }
]

const mockBoards: BoardItem[] = [
  {
    id: 'b1',
    name: 'Sprint Planning',
    workspaceName: 'Product Team',
    visibility: 'private',
    totalMembers: 6,
    totalCards: 32,
    createdAt: '2026-03-03T09:30:00'
  },
  {
    id: 'b2',
    name: 'Content Calendar',
    workspaceName: 'Marketing Team',
    visibility: 'public',
    totalMembers: 4,
    totalCards: 18,
    createdAt: '2026-03-02T13:00:00'
  },
  {
    id: 'b3',
    name: 'Release Management',
    workspaceName: 'Development Team',
    visibility: 'private',
    totalMembers: 9,
    totalCards: 41,
    createdAt: '2026-03-06T15:00:00'
  }
]

export const adminService = {
  async getStats(): Promise<AdminStats> {
    await wait()

    return {
      totalUsers: mockUsers.length,
      totalWorkspaces: mockWorkspaces.length,
      totalBoards: mockBoards.length,
      totalCards: mockBoards.reduce((sum, item) => sum + item.totalCards, 0),
      activeUsers: mockUsers.filter((item) => item.status === 'active').length
    }
  },

  async getUsers(): Promise<AdminUser[]> {
    await wait()
    return [...mockUsers]
  },

  async getWorkspaces(): Promise<WorkspaceItem[]> {
    await wait()
    return [...mockWorkspaces]
  },

  async getBoards(): Promise<BoardItem[]> {
    await wait()
    return [...mockBoards]
  },

  async toggleUserLock(userId: string): Promise<AdminUser | null> {
    await wait()

    const user = mockUsers.find((item) => item.id === userId)
    if (!user) return null

    user.status = user.status === 'active' ? 'locked' : 'active'
    return { ...user }
  }
}