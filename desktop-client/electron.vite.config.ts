import { resolve } from 'node:path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  main: {
    build: {
      lib: {
        entry: resolve('src/main/index.ts'),
        formats: ['es'],
        fileName: () => 'index.js'
      },
      outDir: 'out/main'
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    build: {
      lib: {
        entry: resolve('src/preload/index.ts'),
        formats: ['es'],
        fileName: () => 'index.js'
      },
      outDir: 'out/preload'
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    root: resolve('src/renderer'),
    build: {
      outDir: resolve('out/renderer')
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
});
