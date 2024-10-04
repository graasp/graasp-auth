import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  // TODO: provide api.graasp.org/docs/json , here we can change the link given .env.development
  input: './tmp/openapi.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/client',
  },
  schemas: {
    type: 'json',
  },
  plugins: ['@tanstack/react-query'],
  types: {
    dates: 'types+transform',
    enums: 'javascript',
  },
});
