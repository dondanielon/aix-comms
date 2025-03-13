import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': '/src',
      '@ui-components': '/src/ui-components',
      '@pages': '/src/pages',
      '@engine': '/src/engine',
      '@stores': '/src/stores',
      '@hooks': '/src/hooks',
    },
  },
});
