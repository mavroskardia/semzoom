import { Route, Router } from "@vaadin/router";
import "./sem-zoom-new";
import "./sem-zoom";

const routes: Route[] = [
  {
    path: "/",
    component: "sem-zoom-new",
  },
  {
    path: "/:contentid/:topicid?",
    component: "sem-zoom",
  },
];

const outlet = document.getElementById("app");
export const router = new Router(outlet);
router.setRoutes(routes);
