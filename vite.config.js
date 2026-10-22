import { defineConfig } from 'vite';

export default defineConfig({
  root: 'dist',
  publicDir: '../public',
  server: {
    port: 5173,
    host: true,
    watch: {
      ignored: ['**/node_modules/**', '**/dist_build/**', '**/.git/**'],
    },
  },
  build: {
    outDir: '../dist_build',
    emptyOutDir: true,
  },
});
