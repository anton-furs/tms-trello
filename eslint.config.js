import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...js.configs.recommended,
    languageOptions: {
      globals: globals.browser,
      sourceType: 'module',
    },
    rules: {
      'prefer-const': 'error',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-var': 'error',
      'eqeqeq': 'error',
      'max-depth': ['error', 2],
    },
  },
  {
    name: 'prettier',
    rules: prettier.rules,
  },
]);
