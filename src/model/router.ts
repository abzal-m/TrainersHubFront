import type  { RouteRecordRaw } from 'vue-router'
import LandingPage from "@/pages/LandingPage.vue";
import Index from "@/pages/Index.vue";
import TestStrava from "@/pages/TestStrava.vue";

export const defineRoutes: RouteRecordRaw[] =  [
  { path: "/", name: "Index", component: Index },
  { path: "/LandingPage", name: "LandingPage", component: LandingPage },
  { path: "/TestStrava", name: "TestStrava", component: TestStrava },
];

export enum Routes {
    Index = 'Index',
    LandingPage = 'LandingPage',
    TestStrava = 'TestStrava',
}
