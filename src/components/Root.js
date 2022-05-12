import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {
  QueryClientProvider,
  queryClient,
  ReactQueryDevtools,
} from '../config/queryClient';
import App from './App';
import i18nConfig from '../config/i18n';
import { SHOW_NOTIFICATIONS } from '../config/constants';

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
