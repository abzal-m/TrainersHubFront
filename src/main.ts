import { createApp } from "vue";
import {defineRoutes} from '@/model/router'
import {createRouter, createWebHistory} from 'vue-router'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import "@/assets/styles/main.css";
import 'primeflex/primeflex.css';
import App from "@/App.vue";

export const router = createRouter({
    routes: defineRoutes,
    history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
})

const app = createApp(App);


app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: ".p-dark",
        }
    }
});
app.mount("#app");
