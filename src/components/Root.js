import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import App from './App';
import i18nConfig from '../config/i18n';
import { SHOW_NOTIFICATIONS } from '../config/constants';

const theme = createMuiTheme({
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
  <I18nextProvider i18n={i18nConfig}>
    <MuiThemeProvider theme={theme}>
      {SHOW_NOTIFICATIONS && <ToastContainer />}
      <App />
    </MuiThemeProvider>
  </I18nextProvider>
);

export default Root;
