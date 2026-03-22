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
    jobTitle: 'System Administrator',
    department: 'Operations',
    location: 'Ho Chi Minh City',
    phone: '0901 234 001',
    createdAt: '2026-03-01T08:00:00',
    lastActiveAt: '2026-03-20T09:10:00'
  },
  {
    id: 'u2',
    name: 'Tran Thi B',
    email: 'thib@gmail.com',
    role: 'member',
    status: 'locked',
    jobTitle: 'Product Manager',
    department: 'Product',
    location: 'Da Nang',
    phone: '0901 234 002',
    createdAt: '2026-03-03T10:00:00',
    lastActiveAt: '2026-03-18T14:00:00'
  },
  {
    id: 'u3',
    name: 'Le Van C',
    email: 'vanc@gmail.com',
    role: 'member',
    status: 'active',
    jobTitle: 'Frontend Developer',
    department: 'Engineering',
    location: 'Ha Noi',
    phone: '0901 234 003',
    createdAt: '2026-03-04T11:00:00',
    lastActiveAt: '2026-03-20T08:45:00'
  },
  {
    id: 'u4',
    name: 'Pham Thi D',
    email: 'thid@gmail.com',
    role: 'member',
    status: 'active',
    jobTitle: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Can Tho',
    phone: '0901 234 004',
    createdAt: '2026-03-06T13:00:00',
    lastActiveAt: '2026-03-19T18:20:00'
  }
]

const mockWorkspaces: WorkspaceItem[] = [
  {
    id: 'w1',
    name: 'Marketing Team',
    ownerId: 'u1',
    ownerName: 'Nguyen Van A',
    memberIds: ['u1', 'u2', 'u4'],
    totalMembers: 8,
    totalBoards: 4,
    status: 'active',
    createdAt: '2026-03-01T08:00:00'
  },
  {
    id: 'w2',
    name: 'Product Team',
    ownerId: 'u2',
    ownerName: 'Tran Thi B',
    memberIds: ['u1', 'u2', 'u3'],
    totalMembers: 12,
    totalBoards: 6,
    status: 'active',
    createdAt: '2026-03-03T09:00:00'
  },
  {
    id: 'w3',
    name: 'Development Team',
    ownerId: 'u3',
    ownerName: 'Le Van C',
    memberIds: ['u1', 'u3'],
    totalMembers: 15,
    totalBoards: 7,
    status: 'active',
    createdAt: '2026-03-05T10:30:00'
  },
  {
    id: 'w4',
    name: 'Archive Workspace',
    ownerId: 'u4',
    ownerName: 'Pham Thi D',
    memberIds: ['u4'],
    totalMembers: 5,
    totalBoards: 0,
    status: 'archived',
    createdAt: '2026-03-09T08:00:00'
  }
]

const mockBoards: BoardItem[] = [
  {
    id: 'b1',
    name: 'Sprint Planning',
    workspaceId: 'w2',
    workspaceName: 'Product Team',
    visibility: 'private',
    memberIds: ['u1', 'u2', 'u3'],
    totalMembers: 6,
    totalCards: 32,
    createdAt: '2026-03-03T09:30:00'
  },
  {
    id: 'b2',
    name: 'Content Calendar',
    workspaceId: 'w1',
    workspaceName: 'Marketing Team',
    visibility: 'public',
    memberIds: ['u1', 'u4'],
    totalMembers: 4,
    totalCards: 18,
    createdAt: '2026-03-02T13:00:00'
  },
  {
    id: 'b3',
    name: 'Release Management',
    workspaceId: 'w3',
    workspaceName: 'Development Team',
    visibility: 'private',
    memberIds: ['u1', 'u3'],
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
      activeUsers: mockUsers.filter((item) => item.status === 'active').length,
      lockedUsers: mockUsers.filter((item) => item.status === 'locked').length,
      archivedWorkspaces: mockWorkspaces.filter(
        (item) => item.status === 'archived'
      ).length
    }
  },

  async getUsers(): Promise<AdminUser[]> {
    await wait()
    return [...mockUsers]
  },

  async getWorkspaces(): Promise<WorkspaceItem[]> {
    await wait()
    return mockWorkspaces.map((workspace) => ({
      ...workspace,
      totalBoards: mockBoards.filter(
        (board) => board.workspaceName === workspace.name
      ).length
    }))
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
