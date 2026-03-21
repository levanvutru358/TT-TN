import type {
  AdminStats,
  AdminUser,
  BoardDetail,
  BoardItem,
  WorkspaceDetail,
  WorkspaceItem,
} from '@/admin/types/admin'

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

let mockUsers: AdminUser[] = [
  {
    id: 'u1',
    name: 'Nguyen Van A',
    email: 'vana@gmail.com',
    role: 'admin',
    status: 'active',
    createdAt: '2026-03-01T08:00:00',
    lastActiveAt: '2026-03-20T09:10:00',
  },
  {
    id: 'u2',
    name: 'Tran Thi B',
    email: 'thib@gmail.com',
    role: 'member',
    status: 'locked',
    createdAt: '2026-03-03T10:00:00',
    lastActiveAt: '2026-03-18T14:00:00',
  },
  {
    id: 'u3',
    name: 'Le Van C',
    email: 'vanc@gmail.com',
    role: 'member',
    status: 'active',
    createdAt: '2026-03-04T11:00:00',
    lastActiveAt: '2026-03-20T08:45:00',
  },
  {
    id: 'u4',
    name: 'Pham Thi D',
    email: 'thid@gmail.com',
    role: 'member',
    status: 'active',
    createdAt: '2026-03-06T13:00:00',
    lastActiveAt: '2026-03-19T18:20:00',
  },
]

const mockWorkspaces: WorkspaceItem[] = [
  {
    id: 'w1',
    name: 'Marketing Team',
    ownerName: 'Nguyen Van A',
    totalMembers: 8,
    totalAdmins: 2,
    totalMemberUsers: 6,
    totalBoards: 4,
    status: 'active',
    createdAt: '2026-03-01T08:00:00',
  },
  {
    id: 'w2',
    name: 'Product Team',
    ownerName: 'Tran Thi B',
    totalMembers: 12,
    totalAdmins: 3,
    totalMemberUsers: 9,
    totalBoards: 6,
    status: 'archived',
    createdAt: '2026-03-03T09:00:00',
  },
  {
    id: 'w3',
    name: 'Development Team',
    ownerName: 'Le Van C',
    totalMembers: 15,
    totalAdmins: 4,
    totalMemberUsers: 11,
    totalBoards: 7,
    status: 'active',
    createdAt: '2026-03-05T10:30:00',
  },
]

const mockWorkspaceDetails: WorkspaceDetail[] = [
  {
    id: 'w1',
    name: 'Marketing Team',
    ownerName: 'Nguyen Van A',
    status: 'active',
    totalMembers: 8,
    totalAdmins: 2,
    totalMemberUsers: 6,
    totalBoards: 4,
    createdAt: '2026-03-01T08:00:00',
    members: [
      { id: 'u1', name: 'Nguyen Van A', email: 'vana@gmail.com', role: 'admin', status: 'active' },
      { id: 'u5', name: 'Do Thi E', email: 'thie@gmail.com', role: 'admin', status: 'active' },
      { id: 'u6', name: 'Hoang F', email: 'hoangf@gmail.com', role: 'member', status: 'active' },
    ],
    boards: [
      { id: 'b2', name: 'Content Calendar', visibility: 'public', totalMembers: 4, totalCards: 18, createdAt: '2026-03-02T13:00:00' },
      { id: 'b4', name: 'Social Campaign', visibility: 'private', totalMembers: 5, totalCards: 21, createdAt: '2026-03-04T10:00:00' },
    ],
  },
  {
    id: 'w2',
    name: 'Product Team',
    ownerName: 'Tran Thi B',
    status: 'archived',
    totalMembers: 12,
    totalAdmins: 3,
    totalMemberUsers: 9,
    totalBoards: 6,
    createdAt: '2026-03-03T09:00:00',
    members: [
      { id: 'u2', name: 'Tran Thi B', email: 'thib@gmail.com', role: 'admin', status: 'locked' },
      { id: 'u7', name: 'Pham G', email: 'phamg@gmail.com', role: 'member', status: 'active' },
    ],
    boards: [
      { id: 'b1', name: 'Sprint Planning', visibility: 'private', totalMembers: 6, totalCards: 32, createdAt: '2026-03-03T09:30:00' },
    ],
  },
  {
    id: 'w3',
    name: 'Development Team',
    ownerName: 'Le Van C',
    status: 'active',
    totalMembers: 15,
    totalAdmins: 4,
    totalMemberUsers: 11,
    totalBoards: 7,
    createdAt: '2026-03-05T10:30:00',
    members: [
      { id: 'u3', name: 'Le Van C', email: 'vanc@gmail.com', role: 'admin', status: 'active' },
      { id: 'u4', name: 'Pham Thi D', email: 'thid@gmail.com', role: 'member', status: 'active' },
    ],
    boards: [
      { id: 'b3', name: 'Release Management', visibility: 'private', totalMembers: 9, totalCards: 41, createdAt: '2026-03-06T15:00:00' },
    ],
  },
]

const mockBoards: BoardItem[] = [
  {
    id: 'b1',
    name: 'Sprint Planning',
    workspaceId: 'w2',
    workspaceName: 'Product Team',
    ownerName: 'Tran Thi B',
    visibility: 'private',
    totalMembers: 6,
    totalLists: 5,
    totalCards: 32,
    createdAt: '2026-03-03T09:30:00',
  },
  {
    id: 'b2',
    name: 'Content Calendar',
    workspaceId: 'w1',
    workspaceName: 'Marketing Team',
    ownerName: 'Nguyen Van A',
    visibility: 'public',
    totalMembers: 4,
    totalLists: 4,
    totalCards: 18,
    createdAt: '2026-03-02T13:00:00',
  },
  {
    id: 'b3',
    name: 'Release Management',
    workspaceId: 'w3',
    workspaceName: 'Development Team',
    ownerName: 'Le Van C',
    visibility: 'private',
    totalMembers: 9,
    totalLists: 7,
    totalCards: 41,
    createdAt: '2026-03-06T15:00:00',
  },
]

let mockBoardDetails: BoardDetail[] = [
  {
    id: 'b1',
    name: 'Sprint Planning',
    workspaceId: 'w2',
    workspaceName: 'Product Team',
    ownerName: 'Tran Thi B',
    visibility: 'private',
    totalMembers: 6,
    totalLists: 5,
    totalCards: 32,
    createdAt: '2026-03-03T09:30:00',
    members: [
      { id: 'u2', name: 'Tran Thi B', email: 'thib@gmail.com', status: 'locked' },
      { id: 'u7', name: 'Pham G', email: 'phamg@gmail.com', status: 'active' },
    ],
  },
  {
    id: 'b2',
    name: 'Content Calendar',
    workspaceId: 'w1',
    workspaceName: 'Marketing Team',
    ownerName: 'Nguyen Van A',
    visibility: 'public',
    totalMembers: 4,
    totalLists: 4,
    totalCards: 18,
    createdAt: '2026-03-02T13:00:00',
    members: [
      { id: 'u1', name: 'Nguyen Van A', email: 'vana@gmail.com', status: 'active' },
      { id: 'u6', name: 'Hoang F', email: 'hoangf@gmail.com', status: 'active' },
    ],
  },
  {
    id: 'b3',
    name: 'Release Management',
    workspaceId: 'w3',
    workspaceName: 'Development Team',
    ownerName: 'Le Van C',
    visibility: 'private',
    totalMembers: 9,
    totalLists: 7,
    totalCards: 41,
    createdAt: '2026-03-06T15:00:00',
    members: [
      { id: 'u3', name: 'Le Van C', email: 'vanc@gmail.com', status: 'active' },
      { id: 'u4', name: 'Pham Thi D', email: 'thid@gmail.com', status: 'active' },
    ],
  },
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

  async getWorkspaceDetail(workspaceId: string): Promise<WorkspaceDetail | null> {
    await wait()
    const found = mockWorkspaceDetails.find((item) => item.id === workspaceId)
    return found ? { ...found, members: [...found.members], boards: [...found.boards] } : null
  },

  async getBoards(): Promise<BoardItem[]> {
    await wait()
    return [...mockBoards]
  },

  async getBoardDetail(boardId: string): Promise<BoardDetail | null> {
    await wait()
    const found = mockBoardDetails.find((item) => item.id === boardId)
    return found ? { ...found, members: [...found.members] } : null
  },

  async removeBoardMember(boardId: string, memberId: string): Promise<BoardDetail | null> {
    await wait()
    const board = mockBoardDetails.find((item) => item.id === boardId)
    if (!board) return null

    board.members = board.members.filter((item) => item.id !== memberId)
    board.totalMembers = board.members.length

    const boardListItem = mockBoards.find((item) => item.id === boardId)
    if (boardListItem) boardListItem.totalMembers = board.members.length

    return { ...board, members: [...board.members] }
  },

  async toggleUserLock(userId: string): Promise<AdminUser | null> {
    await wait()
    const user = mockUsers.find((item) => item.id === userId)
    if (!user) return null
    user.status = user.status === 'active' ? 'locked' : 'active'
    return { ...user }
  },
}