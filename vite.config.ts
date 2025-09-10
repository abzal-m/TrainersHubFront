import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "@primevue/auto-import-resolver";

export default ({mode}) => {
    // Загружаем переменные окружения
    const env = loadEnv(mode, process.cwd(), "");

    return defineConfig({
        base: env.VITE_APP_PUBLIC_PATH || "/",
        server: {
            port: 8080,
        },
        plugins: [vue(),
            Components({
                resolvers: [PrimeVueResolver()],
            })],
        resolve: {
            find: '@',
            replacement: '/src',
        },
        build: {
            target: "es2015",
            minify: true,
            sourcemap: true,
        },
    });
};
