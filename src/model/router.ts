import type  { RouteRecordRaw } from 'vue-router'
import LandingPage from "@/pages/LandingPage.vue";
import Index from "@/pages/Index.vue";
import TestStrava from "@/pages/TestStrava.vue";
import AuthForm from "@/pages/AuthForm.vue";
import AthleteDashboard from "@/pages/AthleteDashboard.vue";

export const defineRoutes: RouteRecordRaw[] =  [
  { path: "/", name: "Index", component: Index },
  { path: "/LandingPage", name: "LandingPage", component: LandingPage },
  { path: "/AuthForm", name: "AuthForm", component: AuthForm },
  { path: "/AthleteDashboard", name: "AthleteDashboard", component: AthleteDashboard },
  { path: "/TestStrava", name: "TestStrava", component: TestStrava },
];

export enum Routes {
    Index = 'Index',
    LandingPage = 'LandingPage',
    AuthForm = 'AuthForm',
    AthleteDashboard = 'AthleteDashboard',
    TestStrava = 'TestStrava',
}
