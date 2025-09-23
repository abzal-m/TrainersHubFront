import { createApp } from "vue";
import {defineRoutes, Routes} from '@/model/router'
import {createRouter, createWebHistory} from 'vue-router'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';


import "@/assets/styles/main.css";
import 'primeflex/primeflex.css';
import "tailwindcss";

import App from "@/App.vue";
import { definePreset } from '@primeuix/themes';
import {getAccessToken, isTokenValid} from "@/utils/auth";

export const router = createRouter({
    routes: defineRoutes,
    history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
})
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const token = getAccessToken();

        if (!isTokenValid(token)) {
            return next({ name: Routes.LandingPage });
        }
    }
    next();
});
const MyPreset = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '{zinc.50}',
                    100: '{zinc.100}',
                    200: '{zinc.200}',
                    300: '{zinc.300}',
                    400: '{zinc.400}',
                    500: '{zinc.500}',
                    600: '{zinc.600}',
                    700: '{zinc.700}',
                    800: '{zinc.800}',
                    900: '{zinc.900}',
                    950: '{zinc.950}'
                }
            },
            dark: {
                surface: {
                    0: '#ffffff',
                    50: '{gray.50}',
                    100: '{gray.100}',
                    200: '{gray.200}',
                    300: '{gray.300}',
                    400: '{gray.400}',
                    500: '{gray.500}',
                    600: '{gray.600}',
                    700: '{gray.700}',
                    800: '{gray.800}',
                    900: '{gray.900}',
                    950: '{gray.950}'
                }
            }
        },
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        }
    }
});

const app = createApp(App);


app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: ".p-dark",
        }
    }
});
app.use(ToastService);
app.mount("#app");
