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
          API_HOST: process.env.REACT_APP_API_HOST,
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('@cypress/code-coverage/task')(on, newConfig);
      return newConfig;
    },
    baseUrl: 'http://localhost:3001',
  },
});
