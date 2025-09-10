import sharedConfig from "@ps/eslint-config-vue3"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import parserVue from "vue-eslint-parser"

export default tseslint.config(
    ...sharedConfig,
    {
        files: ["**/*.vue"],
        languageOptions: {
            parser: parserVue,
            parserOptions: {
                parser: tseslint.parser,
                sourceType: "module",
                ecmaVersion: "latest",
                extraFileExtensions: [".vue"],
                ecmaFeatures: {
                    jsx: true,
                },

                project: ["./tsconfig.json", "./tsconfig.node.json"],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            vue: pluginVue,
        },
        rules: {
            "vue/multi-word-component-names": "off",
            "vue/no-reserved-component-names": "warn",
        },
    },
    {
        files: ["**/*.{ts,tsx,mts,cts}"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: ["./tsconfig.json", "./tsconfig.node.json"],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "warn",
        },
    },
    {
        rules: {
            "vue/multi-word-component-names": "warn",
            "no-console": process.env.NODE_ENV === 'production' ? 'warn' : 'off',
            "no-debugger": process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        }
    },
);
