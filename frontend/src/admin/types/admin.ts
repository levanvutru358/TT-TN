// export interface AdminStats {
//   totalUsers: number
//   totalWorkspaces: number
//   totalBoards: number
//   totalCards: number
//   activeUsers: number
//   lockedUsers: number
//   archivedWorkspaces: number
// }

// export type UserRole = 'admin' | 'member'
// export type UserStatus = 'active' | 'locked'
// export type WorkspaceStatus = 'active' | 'archived'
// export type BoardVisibility = 'public' | 'private'

// export interface AdminUser {
//   id: string
//   name: string
//   email: string
//   role: UserRole
//   status: UserStatus
//   jobTitle: string
//   department: string
//   location: string
//   phone: string
//   createdAt: string
//   lastActiveAt: string
// }

// export interface WorkspaceItem {
//   id: string
//   name: string
//   ownerId: string
//   ownerName: string
//   memberIds: string[]
//   totalMembers: number
//   totalAdmins: number
//   totalMemberUsers: number
//   totalBoards: number
//   status: WorkspaceStatus
//   createdAt: string
// }

// export interface WorkspaceMemberItem {
//   id: string
//   name: string
//   email: string
//   role: UserRole
//   status: UserStatus
// }

// export interface WorkspaceBoardItem {
//   id: string
//   name: string
//   workspaceId: string
//   workspaceName: string
//   visibility: BoardVisibility
//   memberIds: string[]
//   totalMembers: number
//   totalCards: number
//   createdAt: string
// }

// export interface WorkspaceDetail {
//   id: string
//   name: string
//   ownerName: string
//   status: WorkspaceStatus
//   totalMembers: number
//   totalAdmins: number
//   totalMemberUsers: number
//   totalBoards: number
//   createdAt: string
//   members: WorkspaceMemberItem[]
//   boards: WorkspaceBoardItem[]
// }

// export interface BoardItem {
//   id: string
//   name: string
//   workspaceId: string
//   workspaceName: string
//   ownerName: string
//   visibility: BoardVisibility
//   memberIds: string[]
//   totalMembers: number
//   totalLists: number
//   totalCards: number
//   createdAt: string
// }

// export interface BoardMemberItem {
//   id: string
//   name: string
//   email: string
//   status: UserStatus
// }

// export interface BoardDetail {
//   id: string
//   name: string
//   workspaceId: string
//   workspaceName: string
//   ownerName: string
//   visibility: BoardVisibility
//   totalMembers: number
//   totalLists: number
//   totalCards: number
//   createdAt: string
//   members: BoardMemberItem[]
// }

export interface AdminStats {
  totalUsers: number
  totalWorkspaces: number
  totalBoards: number
  totalCards: number
  activeUsers: number
  lockedUsers: number
  archivedWorkspaces: number
}

export type UserRole = 'admin' | 'user'  // Đã đổi từ 'member' thành 'user'
export type UserStatus = 'active' | 'locked'
export type WorkspaceStatus = 'active' | 'archived'
export type BoardVisibility = 'public' | 'private'

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
  totalAdmins: number
  totalUsers: number  // Đã đổi từ totalMemberUsers thành totalUsers
  totalBoards: number
  status: WorkspaceStatus
  createdAt: string
}

export interface WorkspaceMemberItem {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
}

export interface WorkspaceBoardItem {
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

export interface WorkspaceDetail {
  id: string
  name: string
  ownerName: string
  status: WorkspaceStatus
  totalMembers: number
  totalAdmins: number
  totalUsers: number  // Đã đổi từ totalMemberUsers thành totalUsers
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
  memberIds: string[]
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