import * as Sentry from '@sentry/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { HOME_PATH, SIGN_UP_PATH, buildSignInPath } from '../config/paths';
import ErrorFallback from './ErrorFallback';
import Redirection from './Redirection';
import SignIn from './SignIn';
import SignUp from './SignUp';

const App = () => (
  <Sentry.ErrorBoundary fallback={<ErrorFallback />} showDialog>
    <Router>
      <Redirection>
        <Routes>
          <Route path={buildSignInPath()} element={<SignIn />} />
          <Route path={SIGN_UP_PATH} element={<SignUp />} />
          <Route path={HOME_PATH} element={<SignIn />} />
        </Routes>
      </Redirection>
    </Router>
  </Sentry.ErrorBoundary>
);

export default App;
