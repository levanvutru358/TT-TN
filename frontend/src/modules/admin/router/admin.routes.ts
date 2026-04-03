import type { RouteRecordRaw } from 'vue-router'
import AdminLayout from '@/modules/admin/layouts/AdminLayout.vue'
import AdminDashboardPage from '@/modules/admin/pages/AdminDashbord/AdminDashboardPage.vue'
import AdminUsersPage from '@/modules/admin/pages/AdminDashbord/AdminUsersPage.vue'
import AdminUserDetailPage from '@/modules/admin/pages/AdminDashbord/AdminUserDetailPage.vue'
import AdminWorkspacesPage from '@/modules/admin/pages/AdminDashbord/AdminWorkspacesPage.vue'
import AdminWorkspaceDetailPage from '@/modules/admin/pages/AdminDashbord/AdminWorkspaceDetailPage.vue'
import AdminBoardsPage from '@/modules/admin/pages/AdminDashbord/AdminBoardsPage.vue'
import AdminBoardDetailPage from '@/modules/admin/pages/AdminDashbord/AdminBoardDetailPage.vue'

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
