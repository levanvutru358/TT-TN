import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import StageList from "@/views/stages/StageList.vue";
import StageDetail from "@/views/stages/StageDetail.vue";
import StageForm from "@/views/stages/StageForm.vue";
import NotFound from "@/views/NotFound.vue";
import StageProject from "@/views/stages/StageProject.vue";
import WorkspaceMembers from "@/views/WorkspaceMembers.vue";
import WorkspaceSettings from "@/views/WorkspaceSettings.vue";
import WorkspaceBoards from "@/views/WorkspaceBoards.vue";
import WorkspaceCards from "@/views/WorkspaceCards.vue";
import PersonalSettings from "@/views/PersonalSettings.vue";
import PersonalActivity from "@/views/PersonalActivity.vue";
import PersonalProfile from "@/views/PersonalProfile.vue";
import TrelloAccountProfile from "@/views/TrelloAccountProfile.vue";
import AccountSwitcherPage from "@/views/AccountSwitcherPage.vue";
import LoginPage from "@/views/auth/LoginPage.vue";
import RegisterPage from "@/views/auth/RegisterPage.vue";
import { adminRoutes } from "@/admin/router/admin.routes";

const userRoutes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/auth/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/auth/register",
    name: "Register",
    component: RegisterPage,
  },
  {
    path: "/stages",
    name: "StageList",
    component: StageList,
  },
  {
    path: "/stages/create",
    name: "StageCreate",
    component: StageForm,
  },
  {
    path: "/stages/:id",
    name: "StageDetail",
    component: StageDetail,
  },
  {
    path: "/stages/:id/edit",
    name: "StageEdit",
    component: StageForm,
  },
  {
    path: "/projects/:id",
    name: "ProjectDetail",
    component: StageProject,
  },
  {
    path: "/workspace/members",
    name: "WorkspaceMembers",
    component: WorkspaceMembers,
  },
  {
    path: "/workspace/settings",
    name: "WorkspaceSettings",
    component: WorkspaceSettings,
  },
  {
    path: "/workspace/boards",
    name: "WorkspaceBoards",
    component: WorkspaceBoards,
  },
  {
    path: "/workspace/cards",
    name: "WorkspaceCards",
    component: WorkspaceCards,
  },
  {
    path: "/personal/settings",
    name: "PersonalSettings",
    component: PersonalSettings,
  },
  {
    path: "/personal/activity",
    name: "PersonalActivity",
    component: PersonalActivity,
  },
  {
    path: "/personal/profile",
    name: "PersonalProfile",
    component: PersonalProfile,
  },
  {
    path: "/account/profile-display",
    name: "TrelloAccountProfile",
    component: TrelloAccountProfile,
  },
  {
    path: "/account/switch",
    name: "AccountSwitcher",
    component: AccountSwitcherPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...userRoutes,
    ...adminRoutes,
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
