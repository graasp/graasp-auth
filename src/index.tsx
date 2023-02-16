import { render } from 'react-dom';
import ReactGA from 'react-ga4';

import { hasAcceptedCookies } from '@graasp/sdk';

import Root from './components/Root';
import { GA_MEASUREMENT_ID, NODE_ENV } from './config/constants';
import './index.css';
import './index.css';

if (GA_MEASUREMENT_ID && hasAcceptedCookies() && NODE_ENV !== 'test') {
  ReactGA.initialize(GA_MEASUREMENT_ID);
  ReactGA.send('pageview');
}

const root = document.getElementById('root');
render(<Root />, root);
