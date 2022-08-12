import React from 'react';
import { createRoot } from 'react-dom/client';

import { mockServer } from '@graasp/query-client';

import Root from './components/Root';
import { API_HOST, ENABLE_MOCK_API } from './config/constants';
import './index.css';
import * as serviceWorker from './serviceWorker';

if (ENABLE_MOCK_API) {
  const db = mockServer({
    urlPrefix: API_HOST,
    database: window.Cypress ? window.database : undefined,
    // enable next line to use mock data
    // database: window.Cypress ? window.database : buildDatabase(appContext),
  });
  console.log(db.db);
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Root />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
