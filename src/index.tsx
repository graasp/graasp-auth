import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { render } from 'react-dom';
import ReactGA from 'react-ga4';

import { hasAcceptedCookies } from '@graasp/sdk';

import Root from './components/Root';
import {
  APP_VERSION,
  DOMAIN,
  GA_MEASUREMENT_ID,
  NODE_ENV,
  SENRY_DSN,
} from './config/constants';
import './index.css';
import './index.css';

if (GA_MEASUREMENT_ID && hasAcceptedCookies() && NODE_ENV !== 'test') {
  ReactGA.initialize(GA_MEASUREMENT_ID);
  ReactGA.send('pageview');
}

Sentry.init({
  dsn: SENRY_DSN,
  integrations: [
    new BrowserTracing(),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  release: APP_VERSION,
  environment: DOMAIN,
  tracesSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 1.0,
});

const root = document.getElementById('root');
render(<Root />, root);
