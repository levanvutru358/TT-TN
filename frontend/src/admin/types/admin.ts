export interface AdminStats {
  totalUsers: number
  totalWorkspaces: number
  totalBoards: number
  totalCards: number
  activeUsers: number
}

export type UserRole = 'admin' | 'member'
export type UserStatus = 'active' | 'locked'
export type WorkspaceStatus = 'active' | 'archived'
export type BoardVisibility = 'public' | 'private'

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
  totalAdmins: number
  totalMemberUsers: number
  totalBoards: number
  status: WorkspaceStatus
  createdAt: string
}

export interface WorkspaceMemberItem {
  id: string
  name: string
  email: string
  role: 'admin' | 'member'
  status: UserStatus
}

export interface WorkspaceBoardItem {
  id: string
  name: string
  visibility: BoardVisibility
  totalMembers: number
  totalCards: number
  createdAt: string
}

export interface WorkspaceDetail {
  id: string
  name: string
  ownerName: string
  status: WorkspaceStatus
  totalMembers: number
  totalAdmins: number
  totalMemberUsers: number
  totalBoards: number
  createdAt: string
  members: WorkspaceMemberItem[]
  boards: WorkspaceBoardItem[]
}

export interface BoardItem {
  id: string
  name: string
  workspaceId: string
  workspaceName: string
  ownerName: string
  visibility: BoardVisibility
  totalMembers: number
  totalLists: number
  totalCards: number
  createdAt: string
}

export interface BoardMemberItem {
  id: string
  name: string
  email: string
  status: UserStatus
}

export interface BoardDetail {
  id: string
  name: string
  workspaceId: string
  workspaceName: string
  ownerName: string
  visibility: BoardVisibility
  totalMembers: number
  totalLists: number
  totalCards: number
  createdAt: string
  members: BoardMemberItem[]
}