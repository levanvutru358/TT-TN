import type { RouteRecordRaw } from 'vue-router'
import AdminLayout from '@/admin/layouts/AdminLayout.vue'
import AdminDashboardPage from '@/admin/pages/AdminDashbord/AdminDashboardPage.vue'
import AdminUsersPage from '@/admin/pages/AdminDashbord/AdminUsersPage.vue'
import AdminWorkspacesPage from '@/admin/pages/AdminDashbord/AdminWorkspacesPage.vue'
import AdminBoardsPage from '@/admin/pages/AdminDashbord/AdminBoardsPage.vue'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: AdminDashboardPage
      },
      {
        path: 'users',
        name: 'admin-users',
        component: AdminUsersPage
      },
      {
        path: 'workspaces',
        name: 'admin-workspaces',
        component: AdminWorkspacesPage
      },
      {
        path: 'boards',
        name: 'admin-boards',
        component: AdminBoardsPage
      }
    ]
  }
]