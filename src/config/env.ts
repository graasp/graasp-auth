export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const DOMAIN = import.meta.env.VITE_APP_DOMAIN;

export const API_HOST =
  import.meta.env.VITE_API_HOST || 'http://localhost:3000';

export const SHOW_NOTIFICATIONS =
  import.meta.env.VITE_SHOW_NOTIFICATIONS === 'true' || false;

export const GRAASP_BUILDER_HOST =
  import.meta.env.VITE_GRAASP_BUILDER_HOST ?? 'http://localhost:3111';

export const AUTHENTICATION_HOST =
  import.meta.env.VITE_GRAASP_AUTH_HOST || 'http://localhost:3001';

export const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
export const APP_VERSION = import.meta.env.VITE_VERSION;

export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
