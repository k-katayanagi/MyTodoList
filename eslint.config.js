import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { ESLint } from "eslint";

export default {
  ignores: ["dist"], // ��������t�@�C�����w��

  extends: [
    js.configs.recommended, // @eslint/js �̐����ݒ�
    "@typescript-eslint/recommended", // typescript-eslint �̐����ݒ�
    "plugin:react/recommended", // React�̐����ݒ�
    "plugin:prettier/recommended", // Prettier�̐����ݒ��ǉ�
  ],

  files: ["**/*.{ts,tsx}"], // �ΏۂƂ���t�@�C���^�C�v

  languageOptions: {
    ecmaVersion: 2020, // ECMAScript�o�[�W����
    globals: globals.browser, // �g�p����O���[�o���ϐ��̒�`
  },

  plugins: {
    "react-hooks": reactHooks, // react-hooks �v���O�C��
    "react-refresh": reactRefresh, // react-refresh �v���O�C��
  },

  rules: {
    ...reactHooks.configs.recommended.rules, // React Hooks�̃��[����K�p
    "react-refresh/only-export-components": [
      "warn", 
      { allowConstantExport: true }, // React Refresh�̃��[����K�p
    ],
    "prettier/prettier": "error", // Prettier�̃��[����ESLint�ŃG���[�Ƃ��Ĉ���
  },
};
