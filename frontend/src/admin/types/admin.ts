export interface AdminStats {
  totalUsers: number
  totalWorkspaces: number
  totalBoards: number
  totalCards: number
  activeUsers: number
  lockedUsers: number
  archivedWorkspaces: number
}

export type UserRole = 'admin' | 'member'
export type UserStatus = 'active' | 'locked'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  jobTitle: string
  department: string
  location: string
  phone: string
  createdAt: string
  lastActiveAt: string
}

export interface WorkspaceItem {
  id: string
  name: string
  ownerId: string
  ownerName: string
  memberIds: string[]
  totalMembers: number
  totalBoards: number
  status: 'active' | 'archived'
  createdAt: string
}

export type BoardVisibility = 'public' | 'private'

export interface BoardItem {
  id: string
  name: string
  workspaceId: string
  workspaceName: string
  visibility: BoardVisibility
  memberIds: string[]
  totalMembers: number
  totalCards: number
  createdAt: string
}
