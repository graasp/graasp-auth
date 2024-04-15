import setupEvents from '@cypress/code-coverage/task';
import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // `on` is used to hook into various events Cypress emits
      // `config` is the resolved Cypress config

      const newConfig = {
        ...config,
        env: {
          VITE_GRAASP_API_HOST: process.env.VITE_GRAASP_API_HOST,
        },
      };
      setupEvents(on, newConfig);
      return newConfig;
    },
    baseUrl: 'http://localhost:3001',
  },
});
