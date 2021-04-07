import { toast } from 'react-toastify';
import { SHOW_NOTIFICATIONS } from '../config/constants';
import i18n from '../config/i18n';
import {
  SIGN_IN_ERROR_MESSAGE,
  SIGN_IN_SUCCESS_MESSAGE,
  SIGN_UP_ERROR_MESSAGE,
  SIGN_UP_SUCCESS_MESSAGE,
} from '../config/messages';
import {
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
} from '../types/member';

const notifier = {
  error: ({ code }) => {
    if (!SHOW_NOTIFICATIONS) {
      return;
    }

    let message = '';
    switch (code) {
      case SIGN_IN_ERROR: {
        message = SIGN_IN_ERROR_MESSAGE;
        break;
      }
      case SIGN_UP_ERROR: {
        message = SIGN_UP_ERROR_MESSAGE;
        break;
      }
      default:
        break;
    }

    if (message) {
      toast.error(i18n.t(message));
    }
  },
  success: ({ code }) => {
    if (!SHOW_NOTIFICATIONS) {
      return;
    }

    let message = '';
    switch (code) {
      case SIGN_UP_SUCCESS: {
        message = SIGN_UP_SUCCESS_MESSAGE;
        break;
      }
      case SIGN_IN_SUCCESS: {
        message = SIGN_IN_SUCCESS_MESSAGE;
        break;
      }
      default:
        break;
    }

    if (message) {
      toast.success(i18n.t(message));
    }
  },
};

export default notifier;
