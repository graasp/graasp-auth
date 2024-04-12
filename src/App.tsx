import * as Sentry from '@sentry/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ErrorFallback from './components/ErrorFallback';
import MobileAuth from './components/MobileAuth';
import Redirection from './components/Redirection';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {
  HOME_PATH,
  MOBILE_AUTH_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
} from './config/paths';

const App = () => (
  <Sentry.ErrorBoundary fallback={<ErrorFallback />} showDialog>
    <Router>
      <Redirection>
        <Routes>
          <Route path={SIGN_IN_PATH} element={<SignIn />} />
          <Route path={SIGN_UP_PATH} element={<SignUp />} />
          <Route path={HOME_PATH} element={<SignIn />} />
          <Route path={MOBILE_AUTH_PATH} element={<MobileAuth />} />
        </Routes>
      </Redirection>
    </Router>
  </Sentry.ErrorBoundary>
);

export default App;
