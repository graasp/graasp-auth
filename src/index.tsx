import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';

import { hasAcceptedCookies } from '@graasp/sdk';

import Root from './components/Root';
import { GA_MEASUREMENT_ID, NODE_ENV } from './config/constants';
import './index.css';

if (GA_MEASUREMENT_ID && hasAcceptedCookies() && NODE_ENV !== 'test') {
  ReactGA.initialize(GA_MEASUREMENT_ID);
  ReactGA.send('pageview');
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(<Root />);
}
