import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RoomPage from "../views/RoomPage.vue";
import IssuePage from "../views/IssuePage.vue";
import NotFoundPage from "../views/NotFoundPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/notFound",
    name: "notFound",
    component: NotFoundPage,
  },
  {
    path: "/:roomId",
    name: "room",
    component: RoomPage,
  },
  {
    path: "/:roomId/:issueId",
    name: "issue",
    component: IssuePage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
