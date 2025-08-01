import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(() => {
  return {
    publicDir: 'public',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@stores': resolve(__dirname, 'src/stores'),
        '@components': resolve(__dirname, 'src/components'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@assets': resolve(__dirname, 'src/assets'),
      },
    },
    exclude: ['playground/**'],
  };
});
