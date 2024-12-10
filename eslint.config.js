import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { ESLint } from "eslint";

export default {
  ignores: ["dist"], // 無視するファイルを指定

  extends: [
    js.configs.recommended, // @eslint/js の推奨設定
    "@typescript-eslint/recommended", // typescript-eslint の推奨設定
    "plugin:react/recommended", // Reactの推奨設定
    "plugin:prettier/recommended", // Prettierの推奨設定を追加
  ],

  files: ["**/*.{ts,tsx}"], // 対象とするファイルタイプ

  languageOptions: {
    ecmaVersion: 2020, // ECMAScriptバージョン
    globals: globals.browser, // 使用するグローバル変数の定義
  },

  plugins: {
    "react-hooks": reactHooks, // react-hooks プラグイン
    "react-refresh": reactRefresh, // react-refresh プラグイン
  },

  rules: {
    ...reactHooks.configs.recommended.rules, // React Hooksのルールを適用
    "react-refresh/only-export-components": [
      "warn", 
      { allowConstantExport: true }, // React Refreshのルールを適用
    ],
    "prettier/prettier": "error", // PrettierのルールをESLintでエラーとして扱う
  },
};
