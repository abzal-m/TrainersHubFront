import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from '@tailwindcss/vite'
import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "@primevue/auto-import-resolver";
import path from "path";

export default ({mode}) => {
    // Загружаем переменные окружения
    const env = loadEnv(mode, process.cwd(), "");

    return defineConfig({
        base: env.VITE_APP_PUBLIC_PATH || "/",
        server: {
            port: 8080,
        },
        plugins: [vue(),
            tailwindcss(),
            Components({
                resolvers: [PrimeVueResolver()],
            })],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
        },
        build: {
            target: "es2015",
            minify: true,
            sourcemap: true,
        },
    });
};
