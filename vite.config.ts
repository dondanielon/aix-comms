import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': '/src',
      '@components': '/src/components',
      '@stores': '/src/stores',
      '@hooks': '/src/hooks',
      '@enums': '/src/enums',
      '@utils': '/src/utils',
      '@providers': '/src/providers',
    },
  },
});
