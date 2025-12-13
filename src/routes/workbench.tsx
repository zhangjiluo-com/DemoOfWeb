import { createRoute, lazyRouteComponent } from "@tanstack/react-router";
import { rootRoute } from "./root";

export const workbench = createRoute({
  getParentRoute: () => rootRoute,
  path: "workbench",
  component: lazyRouteComponent(() => import("../pages/Workbench")),
});

const workbenchHome = createRoute({
  getParentRoute: () => workbench,
  path: "/",
  component: lazyRouteComponent(() => import("../pages/Home")),
});

const workbenchList = createRoute({
  getParentRoute: () => workbench,
  path: "list",
  component: lazyRouteComponent(() => import("../pages/List")),
});

workbench.addChildren([workbenchHome, workbenchList]);
