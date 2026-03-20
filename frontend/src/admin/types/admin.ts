export interface AdminStats {
  totalUsers: number
  totalWorkspaces: number
  totalBoards: number
  totalCards: number
  activeUsers: number
}

export type UserRole = 'admin' | 'member'
export type UserStatus = 'active' | 'locked'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  createdAt: string
  lastActiveAt: string
}

export interface WorkspaceItem {
  id: string
  name: string
  ownerName: string
  totalMembers: number
  totalBoards: number
  createdAt: string
}

export type BoardVisibility = 'public' | 'private'

export interface BoardItem {
  id: string
  name: string
  workspaceName: string
  visibility: BoardVisibility
  totalMembers: number
  totalCards: number
  createdAt: string
}