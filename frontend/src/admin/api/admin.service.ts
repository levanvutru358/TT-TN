import type {
  AdminStats,
  AdminUser,
  BoardDetail,
  BoardItem,
  BoardMemberItem,
  WorkspaceBoardItem,
  WorkspaceDetail,
  WorkspaceItem,
  WorkspaceMemberItem,
} from '@/admin/types/admin'

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

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
    lastActiveAt: '2026-03-20T09:10:00',
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
    lastActiveAt: '2026-03-18T14:00:00',
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
    lastActiveAt: '2026-03-20T08:45:00',
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
    lastActiveAt: '2026-03-19T18:20:00',
  },
]

let mockWorkspaces: WorkspaceItem[] = [
  {
    id: 'w1',
    name: 'Marketing Team',
    ownerId: 'u1',
    ownerName: 'Nguyen Van A',
    memberIds: ['u1', 'u2', 'u4'],
    totalMembers: 3,
    totalAdmins: 1,
    totalMemberUsers: 2,
    totalBoards: 2,
    status: 'active',
    createdAt: '2026-03-01T08:00:00',
  },
  {
    id: 'w2',
    name: 'Product Team',
    ownerId: 'u2',
    ownerName: 'Tran Thi B',
    memberIds: ['u1', 'u2', 'u3'],
    totalMembers: 3,
    totalAdmins: 1,
    totalMemberUsers: 2,
    totalBoards: 1,
    status: 'archived',
    createdAt: '2026-03-03T09:00:00',
  },
  {
    id: 'w3',
    name: 'Development Team',
    ownerId: 'u3',
    ownerName: 'Le Van C',
    memberIds: ['u1', 'u3', 'u4'],
    totalMembers: 3,
    totalAdmins: 1,
    totalMemberUsers: 2,
    totalBoards: 1,
    status: 'active',
    createdAt: '2026-03-05T10:30:00',
  },
]

let mockBoards: BoardItem[] = [
  {
    id: 'b1',
    name: 'Sprint Planning',
    workspaceId: 'w2',
    workspaceName: 'Product Team',
    ownerName: 'Tran Thi B',
    visibility: 'private',
    memberIds: ['u1', 'u2', 'u3'],
    totalMembers: 3,
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
    memberIds: ['u1', 'u4'],
    totalMembers: 2,
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
    memberIds: ['u1', 'u3', 'u4'],
    totalMembers: 3,
    totalLists: 7,
    totalCards: 41,
    createdAt: '2026-03-06T15:00:00',
  },
  {
    id: 'b4',
    name: 'Social Campaign',
    workspaceId: 'w1',
    workspaceName: 'Marketing Team',
    ownerName: 'Nguyen Van A',
    visibility: 'private',
    memberIds: ['u2', 'u4'],
    totalMembers: 2,
    totalLists: 3,
    totalCards: 21,
    createdAt: '2026-03-04T10:00:00',
  },
]

const cloneUser = (user: AdminUser): AdminUser => ({ ...user })

const countMembersByRole = (memberIds: string[], role: AdminUser['role']) =>
  memberIds.filter((memberId) => {
    const user = mockUsers.find((item) => item.id === memberId)
    return user?.role === role
  }).length

const cloneWorkspace = (workspace: WorkspaceItem): WorkspaceItem => ({
  ...workspace,
  memberIds: [...workspace.memberIds],
  totalMembers: workspace.memberIds.length,
  totalAdmins: countMembersByRole(workspace.memberIds, 'admin'),
  totalMemberUsers: countMembersByRole(workspace.memberIds, 'member'),
  totalBoards: mockBoards.filter((board) => board.workspaceId === workspace.id).length,
})

const cloneBoard = (board: BoardItem): BoardItem => ({
  ...board,
  memberIds: [...board.memberIds],
  totalMembers: board.memberIds.length,
})

const toWorkspaceMembers = (memberIds: string[]): WorkspaceMemberItem[] =>
  memberIds
    .map((memberId) => {
      const user = mockUsers.find((item) => item.id === memberId)
      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      }
    })
    .filter((item): item is WorkspaceMemberItem => item !== null)

const toBoardMembers = (memberIds: string[]): BoardMemberItem[] =>
  memberIds
    .map((memberId) => {
      const user = mockUsers.find((item) => item.id === memberId)
      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
      }
    })
    .filter((item): item is BoardMemberItem => item !== null)

const toWorkspaceBoardItem = (board: BoardItem): WorkspaceBoardItem => {
  const clonedBoard = cloneBoard(board)

  return {
    id: clonedBoard.id,
    name: clonedBoard.name,
    workspaceId: clonedBoard.workspaceId,
    workspaceName: clonedBoard.workspaceName,
    visibility: clonedBoard.visibility,
    memberIds: [...clonedBoard.memberIds],
    totalMembers: clonedBoard.totalMembers,
    totalCards: clonedBoard.totalCards,
    createdAt: clonedBoard.createdAt,
  }
}

const buildWorkspaceDetail = (workspaceId: string): WorkspaceDetail | null => {
  const workspace = mockWorkspaces.find((item) => item.id === workspaceId)
  if (!workspace) {
    return null
  }

  const workspaceItem = cloneWorkspace(workspace)
  const workspaceBoards = mockBoards
    .filter((board) => board.workspaceId === workspaceItem.id)
    .map(toWorkspaceBoardItem)

  return {
    id: workspaceItem.id,
    name: workspaceItem.name,
    ownerName: workspaceItem.ownerName,
    status: workspaceItem.status,
    totalMembers: workspaceItem.totalMembers,
    totalAdmins: workspaceItem.totalAdmins,
    totalMemberUsers: workspaceItem.totalMemberUsers,
    totalBoards: workspaceBoards.length,
    createdAt: workspaceItem.createdAt,
    members: toWorkspaceMembers(workspaceItem.memberIds),
    boards: workspaceBoards,
  }
}

const buildBoardDetail = (boardId: string): BoardDetail | null => {
  const board = mockBoards.find((item) => item.id === boardId)
  if (!board) {
    return null
  }

  const boardItem = cloneBoard(board)

  return {
    id: boardItem.id,
    name: boardItem.name,
    workspaceId: boardItem.workspaceId,
    workspaceName: boardItem.workspaceName,
    ownerName: boardItem.ownerName,
    visibility: boardItem.visibility,
    totalMembers: boardItem.totalMembers,
    totalLists: boardItem.totalLists,
    totalCards: boardItem.totalCards,
    createdAt: boardItem.createdAt,
    members: toBoardMembers(boardItem.memberIds),
  }
}

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
      ).length,
    }
  },

  async getUsers(): Promise<AdminUser[]> {
    await wait()
    return mockUsers.map(cloneUser)
  },

  async getWorkspaces(): Promise<WorkspaceItem[]> {
    await wait()
    return mockWorkspaces.map(cloneWorkspace)
  },

  async getWorkspaceDetail(workspaceId: string): Promise<WorkspaceDetail | null> {
    await wait()
    return buildWorkspaceDetail(workspaceId)
  },

  async getBoards(): Promise<BoardItem[]> {
    await wait()
    return mockBoards.map(cloneBoard)
  },

  async getBoardDetail(boardId: string): Promise<BoardDetail | null> {
    await wait()
    return buildBoardDetail(boardId)
  },

  async removeBoardMember(boardId: string, memberId: string): Promise<BoardDetail | null> {
    await wait()
    const board = mockBoards.find((item) => item.id === boardId)
    if (!board) {
      return null
    }

    board.memberIds = board.memberIds.filter((item) => item !== memberId)
    board.totalMembers = board.memberIds.length

    return buildBoardDetail(boardId)
  },

  async toggleUserLock(userId: string): Promise<AdminUser | null> {
    await wait()
    const user = mockUsers.find((item) => item.id === userId)
    if (!user) {
      return null
    }

    user.status = user.status === 'active' ? 'locked' : 'active'
    return cloneUser(user)
  },
}
