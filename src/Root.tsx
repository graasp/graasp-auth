import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { theme } from '@graasp/ui';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import App from './components/App';
import { RECAPTCHA_SITE_KEY, SHOW_NOTIFICATIONS } from './config/env';
import i18nConfig from './config/i18n';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  queryClient,
} from './config/queryClient';
import { RecaptchaProvider } from './context/RecaptchaContext';

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18nConfig}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {SHOW_NOTIFICATIONS && <ToastContainer />}
        <RecaptchaProvider siteKey={RECAPTCHA_SITE_KEY}>
          <App />
        </RecaptchaProvider>
      </ThemeProvider>
    </I18nextProvider>
    {import.meta.env.DEV && <ReactQueryDevtools />}
  </QueryClientProvider>
);

export default Root;
