import type { App } from "vue";
import router from "@/router";

export const installRouter = (app: App) => {
  app.use(router);
  return router;
};

export { router };
