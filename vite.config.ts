/// <reference types="./src/env.d.ts"/>
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { UserConfigExport, defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
const config = ({ mode }: { mode: string }): UserConfigExport => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // this defines if we should automatically open the browser
  const shouldOpen = process.env.BROWSER && process.env.BROWSER !== 'none';

  return defineConfig({
    base: '',
    server: {
      port: parseInt(process.env.VITE_PORT || '3001', 10),
      open: shouldOpen,
      watch: {
        ignored: ['**/coverage/**', '**/cypress/downloads/**'],
      },
    },
    preview: {
      port: parseInt(process.env.VITE_PORT || '3001', 10),
      open: shouldOpen,
    },
    build: {
      outDir: 'build',
    },
    plugins: [
      mode === 'test'
        ? // in test mode we instrument the code
          istanbul({
            include: 'src/*',
            exclude: ['node_modules', 'test/'],
            extension: ['.js', '.ts', '.tsx'],
            requireEnv: false,
          })
        : // in dev mode we run the checker
          checker({
            typescript: true,
            eslint: { lintCommand: 'eslint "./**/*.{ts,tsx}"' },
          }),
      react(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  });
};
export default config;
