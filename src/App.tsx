import * as Sentry from '@sentry/react';
import { useEffect } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useSearchParams,
} from 'react-router-dom';

import { ErrorFallback } from './components/ErrorFallback';
import { MagicLinkSuccessContent } from './components/MagicLinkSuccessContent';
import { MobileAuth } from './components/MobileAuth';
import { Redirection } from './components/Redirection';
import { Register } from './components/register/Register';
import { RequestPasswordReset } from './components/requestPasswordReset/RequestPasswordReset';
import { ResetPassword } from './components/requestPasswordReset/ResetPassword';
import { SignIn } from './components/signIn/SignIn';
import { useAuthTranslation } from './config/i18n';
import {
  HOME_PATH,
  MOBILE_AUTH_PATH,
  REQUEST_PASSWORD_RESET_PATH,
  RESET_PASSWORD_PATH,
  SIGN_IN_MAGIC_LINK_SUCCESS_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
} from './config/paths';

function RouteContent() {
  const { i18n } = useAuthTranslation();
  const [search] = useSearchParams();
  const lang = search.get('lang');

  useEffect(() => {
    i18n.changeLanguage(lang ?? navigator.language);
  }, [i18n, lang]);

  return (
    <Redirection>
      <Routes>
        <Route path={SIGN_IN_PATH} element={<SignIn />} />
        <Route
          path={SIGN_IN_MAGIC_LINK_SUCCESS_PATH}
          element={<MagicLinkSuccessContent />}
        />
        <Route path={SIGN_UP_PATH} element={<Register />} />
        <Route
          path={REQUEST_PASSWORD_RESET_PATH}
          element={<RequestPasswordReset />}
        />
        <Route path={RESET_PASSWORD_PATH} element={<ResetPassword />} />
        <Route path={HOME_PATH} element={<SignIn />} />
        <Route path={MOBILE_AUTH_PATH} element={<MobileAuth />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to={SIGN_IN_PATH} />} />
      </Routes>
    </Redirection>
  );
}

export function App() {
  return (
    <Sentry.ErrorBoundary fallback={<ErrorFallback />} showDialog>
      <Router>
        <RouteContent />
      </Router>
    </Sentry.ErrorBoundary>
  );
}
