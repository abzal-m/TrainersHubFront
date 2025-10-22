import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import LandingPage from "@/pages/LandingPage.vue";
import Index from "@/pages/Index.vue";
import TestStrava from "@/pages/TestStrava.vue";
import AuthForm from "@/pages/AuthForm.vue";
import AthleteDashboard from "@/pages/AthleteDashboard.vue";
import CouchPage from "@/pages/CouchPage.vue";

export const defineRoutes: RouteRecordRaw[] = [
    { path: "/", name: "Index", component: Index },
    { path: "/LandingPage", name: "LandingPage", component: LandingPage },
    { path: "/AuthForm", name: "AuthForm", component: AuthForm },
    {path: "/CouchPage", name: "CouchPage", component: CouchPage },
    {
        path: "/AthleteDashboard",
        name: "AthleteDashboard",
        component: AthleteDashboard,
        meta: { requiresAuth: true },
    },
    {
        path: "/TestStrava",
        name: "TestStrava",
        component: TestStrava,
        meta: { requiresAuth: true },
    },
];

export enum Routes {
    Index = "Index",
    LandingPage = "LandingPage",
    AuthForm = "AuthForm",
    AthleteDashboard = "AthleteDashboard",
    TestStrava = "TestStrava",
    CouchPage = "CouchPage",
}
