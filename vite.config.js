import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    publicDir: 'public',
    exclude: ['playground/**'],
  };
});
