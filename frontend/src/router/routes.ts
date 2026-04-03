import type { RouteRecordRaw } from "vue-router";
import NotFound from "@/shared/components/feedback/NotFoundPage.vue";
import Home from "@/modules/workspace/pages/HomePage.vue";
import StageList from "@/modules/kanban/board/pages/StageList.vue";
import StageDetail from "@/modules/kanban/board/pages/StageDetail.vue";
import StageForm from "@/modules/kanban/board/pages/StageForm.vue";
import StageProject from "@/modules/kanban/board/pages/StageProject.vue";
import WorkspaceMembers from "@/modules/workspace/pages/WorkspaceMembersPage.vue";
import WorkspaceSettings from "@/modules/workspace/pages/WorkspaceSettingsPage.vue";
import WorkspaceBoards from "@/modules/workspace/pages/WorkspaceBoardsPage.vue";
import WorkspaceCards from "@/modules/workspace/pages/WorkspaceCardsPage.vue";
import PersonalSettings from "@/modules/user/pages/PersonalSettingsPage.vue";
import PersonalActivity from "@/modules/user/pages/PersonalActivityPage.vue";
import PersonalProfile from "@/modules/user/pages/PersonalProfilePage.vue";
import TrelloAccountProfile from "@/modules/user/pages/TrelloAccountProfilePage.vue";
import AccountSwitcherPage from "@/modules/user/pages/AccountSwitcherPage.vue";
import LoginPage from "@/modules/auth/pages/LoginPage.vue";
import RegisterPage from "@/modules/auth/pages/RegisterPage.vue";
import { ROUTE_NAMES } from "@/core/config/route-names";
import { adminRoutes } from "@/modules/admin/router/admin.routes";

export const userRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: ROUTE_NAMES.home,
    component: Home,
  },
  {
    path: "/auth/login",
    name: ROUTE_NAMES.login,
    component: LoginPage,
  },
  {
    path: "/auth/register",
    name: ROUTE_NAMES.register,
    component: RegisterPage,
  },
  {
    path: "/stages",
    name: ROUTE_NAMES.stageList,
    component: StageList,
  },
  {
    path: "/stages/create",
    name: ROUTE_NAMES.stageCreate,
    component: StageForm,
  },
  {
    path: "/stages/:id",
    name: ROUTE_NAMES.stageDetail,
    component: StageDetail,
  },
  {
    path: "/stages/:id/edit",
    name: ROUTE_NAMES.stageEdit,
    component: StageForm,
  },
  {
    path: "/projects/:id",
    name: ROUTE_NAMES.projectDetail,
    component: StageProject,
  },
  {
    path: "/workspace/members",
    name: ROUTE_NAMES.workspaceMembers,
    component: WorkspaceMembers,
  },
  {
    path: "/workspace/settings",
    name: ROUTE_NAMES.workspaceSettings,
    component: WorkspaceSettings,
  },
  {
    path: "/workspace/boards",
    name: ROUTE_NAMES.workspaceBoards,
    component: WorkspaceBoards,
  },
  {
    path: "/workspace/cards",
    name: ROUTE_NAMES.workspaceCards,
    component: WorkspaceCards,
  },
  {
    path: "/personal/settings",
    name: ROUTE_NAMES.personalSettings,
    component: PersonalSettings,
  },
  {
    path: "/personal/activity",
    name: ROUTE_NAMES.personalActivity,
    component: PersonalActivity,
  },
  {
    path: "/personal/profile",
    name: ROUTE_NAMES.personalProfile,
    component: PersonalProfile,
  },
  {
    path: "/account/profile-display",
    name: ROUTE_NAMES.trelloAccountProfile,
    component: TrelloAccountProfile,
  },
  {
    path: "/account/switch",
    name: ROUTE_NAMES.accountSwitcher,
    component: AccountSwitcherPage,
  },
];

export const routes: RouteRecordRaw[] = [
  ...userRoutes,
  ...adminRoutes,
  {
    path: "/:pathMatch(.*)*",
    name: ROUTE_NAMES.notFound,
    component: NotFound,
  },
];
