import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import LandingPage from "@/pages/LandingPage.vue";
import Index from "@/pages/Index.vue";
import TestStrava from "@/pages/TestStrava.vue";
import AuthForm from "@/pages/AuthForm.vue";
import AthleteDashboard from "@/pages/AthleteDashboard.vue";

export const defineRoutes: RouteRecordRaw[] = [
    { path: "/", name: "Index", component: Index },
    { path: "/LandingPage", name: "LandingPage", component: LandingPage },
    { path: "/AuthForm", name: "AuthForm", component: AuthForm },
    {
        path: "/AthleteDashboard",
        name: "AthleteDashboard",
        component: AthleteDashboard,
        meta: { requiresAuth: true }
    },
    {
        path: "/TestStrava",
        name: "TestStrava",
        component: TestStrava,
        meta: { requiresAuth: true }
    },
];

export enum Routes {
    Index = "Index",
    LandingPage = "LandingPage",
    AuthForm = "AuthForm",
    AthleteDashboard = "AthleteDashboard",
    TestStrava = "TestStrava",
}

const router = createRouter({
    history: createWebHistory(),
    routes: defineRoutes,
});

// ====== Проверка токена перед каждым переходом ======
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("access_token");

    if (to.meta.requiresAuth && !token) {
        // Нет токена → отправляем на страницу логина
        next({ name: Routes.AuthForm });
    } else if (to.name === Routes.AuthForm && token) {
        // Уже есть токен → не пускаем на логин, редиректим в кабинет
        next({ name: Routes.AthleteDashboard });
    } else {
        next();
    }
});

export default router;
