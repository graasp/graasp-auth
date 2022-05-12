import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SHOW_NOTIFICATIONS } from '../config/constants';
import i18nConfig from '../config/i18n';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  queryClient,
} from '../config/queryClient';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5050d2',
      selected: '#cbcbef',
    },
    secondary: { main: '#ffffff' },
  },
  zIndex: {
    drawer: 1000,
  },
});

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18nConfig}>
      <MuiThemeProvider theme={theme}>
        {SHOW_NOTIFICATIONS && <ToastContainer />}
        <App />
      </MuiThemeProvider>
    </I18nextProvider>
    {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
  </QueryClientProvider>
);

export default Root;
