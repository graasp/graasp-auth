import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { theme } from '@graasp/ui';

import { ThemeProvider } from '@mui/material/styles';

import { RECAPTCHA_SITE_KEY, SHOW_NOTIFICATIONS } from '../config/constants';
import i18nConfig from '../config/i18n';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  queryClient,
} from '../config/queryClient';
import { RecaptchaProvider } from '../context/RecaptchaContext';
import App from './App';

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18nConfig}>
      <ThemeProvider theme={theme}>
        {SHOW_NOTIFICATIONS && <ToastContainer />}
        <RecaptchaProvider siteKey={RECAPTCHA_SITE_KEY}>
          <App />
        </RecaptchaProvider>
      </ThemeProvider>
    </I18nextProvider>
    {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
  </QueryClientProvider>
);

export default Root;
