/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: number;
  readonly VITE_VERSION: string;
  readonly VITE_GRAASP_DOMAIN: string;
  readonly VITE_GRAASP_AUTH_HOST: string;
  readonly VITE_GRAASP_BUILDER_HOST: string;
  readonly VITE_RECAPTCHA_SITE_KEY: string;
  readonly VITE_SENTRY_ENV: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_SHOW_NOTIFICATIONS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
