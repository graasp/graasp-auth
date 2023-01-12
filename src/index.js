import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';

import { hasAcceptedCookies } from '@graasp/sdk';

import Root from './components/Root';
import { GA_MEASUREMENT_ID, NODE_ENV } from './config/constants';
import './index.css';
import * as serviceWorker from './serviceWorker';

if (GA_MEASUREMENT_ID && hasAcceptedCookies() && NODE_ENV !== 'test') {
  ReactGA.initialize(GA_MEASUREMENT_ID);
  ReactGA.send('pageview');
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Root />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
