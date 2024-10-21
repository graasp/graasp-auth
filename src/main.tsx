import {
  init as SentryInit,
  browserTracingIntegration,
  replayIntegration,
} from '@sentry/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';

import { hasAcceptedCookies } from '@graasp/sdk';

import pkg from '../package.json';
import { Root } from './Root';
import {
  APP_VERSION,
  GA_MEASUREMENT_ID,
  SENTRY_DSN,
  SENTRY_ENV,
} from './config/env';

if (GA_MEASUREMENT_ID && hasAcceptedCookies() && import.meta.env.PROD) {
  ReactGA.initialize(GA_MEASUREMENT_ID);
  ReactGA.send('pageview');
}

SentryInit({
  dsn: SENTRY_DSN,
  integrations: [
    browserTracingIntegration(),
    replayIntegration({
      maskAllText: false,
      maskAllInputs: true,
    }),
  ],
  release: `${pkg.name}@${APP_VERSION}`,
  environment: SENTRY_ENV,
  tracesSampleRate: 0.5,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 0.5,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
