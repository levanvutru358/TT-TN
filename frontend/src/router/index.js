import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import StageList from "@/views/stages/StageList.vue";
import StageDetail from "@/views/stages/StageDetail.vue";
import StageForm from "@/views/stages/StageForm.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
