import { defineConfig,UserConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()] as UserConfig["plugins"],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.ts',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
