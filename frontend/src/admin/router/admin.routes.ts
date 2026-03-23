import type { RouteRecordRaw } from 'vue-router'
import AdminLayout from '@/admin/layouts/AdminLayout.vue'
import AdminDashboardPage from '@/admin/pages/AdminDashbord/AdminDashboardPage.vue'
import AdminUsersPage from '@/admin/pages/AdminDashbord/AdminUsersPage.vue'
import AdminUserDetailPage from '@/admin/pages/AdminDashbord/AdminUserDetailPage.vue'
import AdminWorkspacesPage from '@/admin/pages/AdminDashbord/AdminWorkspacesPage.vue'
import AdminWorkspaceDetailPage from '@/admin/pages/AdminDashbord/AdminWorkspaceDetailPage.vue'
import AdminBoardsPage from '@/admin/pages/AdminDashbord/AdminBoardsPage.vue'
import AdminBoardDetailPage from '@/admin/pages/AdminDashbord/AdminBoardDetailPage.vue'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', name: 'admin-dashboard', component: AdminDashboardPage },
      { path: 'users', name: 'admin-users', component: AdminUsersPage },
      {
        path: 'users/:id',
        name: 'admin-user-detail',
        component: AdminUserDetailPage,
      },
      { path: 'workspaces', name: 'admin-workspaces', component: AdminWorkspacesPage },
      {
        path: 'workspaces/:id',
        name: 'admin-workspace-detail',
        component: AdminWorkspaceDetailPage,
      },
      { path: 'boards', name: 'admin-boards', component: AdminBoardsPage },
      {
        path: 'boards/:id',
        name: 'admin-board-detail',
        component: AdminBoardDetailPage,
      },
    ],
  },
]
