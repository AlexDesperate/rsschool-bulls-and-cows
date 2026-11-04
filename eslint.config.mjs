import js from "@eslint/js";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [

  js.configs.recommended,
  

  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {

      "no-var": "error",
      "prefer-const": "error",
      "no-console": "warn",
      

      "prettier/prettier": "error",
    },
  },
  

  prettierConfig,
];