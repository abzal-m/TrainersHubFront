import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/LandingPage.vue";
import Index from "../pages/Index.vue";

const routes = [
  { path: "/", name: "Index", component: Index },
  { path: "/LandingPage", name: "LandingPage", component: LandingPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
