import * as Sentry from '@sentry/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ErrorFallback from './components/ErrorFallback';
import ForgotPassword from './components/ForgotPassword';
import MagicLinkSuccessContent from './components/MagicLinkSuccessContent';
import MobileAuth from './components/MobileAuth';
import Redirection from './components/Redirection';
import ResetPassword from './components/ResetPassword';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {
  FORGOT_PASSWORD_PATH,
  HOME_PATH,
  MOBILE_AUTH_PATH,
  RESET_PASSWORD_PATH,
  SIGN_IN_MAGIC_LINK_SUCCESS_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
} from './config/paths';

const App = () => (
  <Sentry.ErrorBoundary fallback={<ErrorFallback />} showDialog>
    <Router>
      <Redirection>
        <Routes>
          <Route path={SIGN_IN_PATH} element={<SignIn />} />
          <Route
            path={SIGN_IN_MAGIC_LINK_SUCCESS_PATH}
            element={<MagicLinkSuccessContent />}
          />
          <Route path={SIGN_UP_PATH} element={<SignUp />} />
          <Route path={FORGOT_PASSWORD_PATH} element={<ForgotPassword />} />
          <Route path={RESET_PASSWORD_PATH} element={<ResetPassword />} />
          <Route path={HOME_PATH} element={<SignIn />} />
          <Route path={MOBILE_AUTH_PATH} element={<MobileAuth />} />
        </Routes>
      </Redirection>
    </Router>
  </Sentry.ErrorBoundary>
);

export default App;
