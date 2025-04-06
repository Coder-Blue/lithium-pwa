import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import tanstackEslintPluginRouter from "@tanstack/eslint-plugin-router";
import tailwindcss from "eslint-plugin-tailwindcss";
import prettier from "eslint-plugin-prettier";

export default tseslint.config(
  { ignores: ["dist", "dev-dist", "**/node_modules/"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@tanstack/react-query": tanstackQuery,
      "@tanstack/react-router": tanstackEslintPluginRouter,
      tailwindcss: tailwindcss,
      prettier: prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
);
