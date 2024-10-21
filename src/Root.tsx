import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { langs } from '@graasp/translations';
import { ThemeProvider } from '@graasp/ui';

import { CssBaseline } from '@mui/material';

import { App } from './App';
import { RECAPTCHA_SITE_KEY, SHOW_NOTIFICATIONS } from './config/env';
import i18nConfig, { useCommonTranslation } from './config/i18n';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  queryClient,
} from './config/queryClient';
import { RecaptchaProvider } from './context/RecaptchaContext';

function Content() {
  const { i18n } = useCommonTranslation();

  return (
    <ThemeProvider
      i18n={i18n}
      langs={langs}
      languageSelectSx={{ mb: 2, mr: 2 }}
    >
      <CssBaseline />
      {SHOW_NOTIFICATIONS && <ToastContainer stacked />}
      <RecaptchaProvider siteKey={RECAPTCHA_SITE_KEY}>
        <App />
      </RecaptchaProvider>
    </ThemeProvider>
  );
}

export function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18nConfig}>
        <Content />
      </I18nextProvider>
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
