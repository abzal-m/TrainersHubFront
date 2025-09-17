import { createApp } from "vue";
import {defineRoutes} from '@/model/router'
import {createRouter, createWebHistory} from 'vue-router'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';


import "@/assets/styles/main.css";
import 'primeflex/primeflex.css';
import "tailwindcss";

import App from "@/App.vue";
import { definePreset } from '@primeuix/themes';

export const router = createRouter({
    routes: defineRoutes,
    history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
})
const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: "#eff6ff",
            100: "#dbeafe",
            200: "#bfdbfe",
            300: "#93c5fd",
            400: "#60a5fa",
            500: "#3b82f6",
            600: "#2563eb",
            700: "#1d4ed8",
            800: "#1e40af",
            900: "#1e3a8a",
            950: "#172554"
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
