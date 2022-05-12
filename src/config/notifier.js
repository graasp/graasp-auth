import { toast } from 'react-toastify';
import { routines } from '@graasp/query-client';
import { SHOW_NOTIFICATIONS } from './constants';
import i18n from './i18n';
import {
  SIGN_IN_ERROR_MESSAGE,
  SIGN_IN_INVALID_MESSAGE,
  SIGN_IN_INVALID_PASSWORD_MESSAGE,
  SIGN_IN_SUCCESS_PASSWORD_MESSAGE,
  SIGN_IN_SUCCESS_MESSAGE,
  SIGN_UP_DUPLICATE_MESSAGE,
  SIGN_UP_ERROR_MESSAGE,
  SIGN_UP_SUCCESS_MESSAGE,
  SIGN_IN_NON_EXISTENT_PASSWORD_MESSAGE,
} from './messages';
import {
  SIGN_IN_ERROR,
  SIGN_IN_INVALID,
  SIGN_IN_PASSWORD_INVALID,
  SIGN_IN_PASSWORD_NON_EXISTENT,
  SIGN_IN_PASSWORD_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_UP_DUPLICATE,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
} from '../types/member';

const { getInvitationRoutine } = routines;

const notifier = ({ type, code, payload }) => {
  if (!SHOW_NOTIFICATIONS) {
    return;
  }

  let message = '';
  switch (code) {
    case SIGN_IN_INVALID: {
      message = SIGN_IN_INVALID_MESSAGE;
      break;
    }
    case SIGN_IN_PASSWORD_INVALID: {
      message = SIGN_IN_INVALID_PASSWORD_MESSAGE;
      break;
    }
    case SIGN_IN_PASSWORD_SUCCESS: {
      message = SIGN_IN_SUCCESS_PASSWORD_MESSAGE;
      break;
    }
    case SIGN_IN_PASSWORD_NON_EXISTENT: {
      message = SIGN_IN_NON_EXISTENT_PASSWORD_MESSAGE;
      break;
    }
    case SIGN_IN_ERROR: {
      message = SIGN_IN_ERROR_MESSAGE;
      break;
    }
    case SIGN_UP_DUPLICATE: {
      message = SIGN_UP_DUPLICATE_MESSAGE;
      break;
    }
    case SIGN_UP_ERROR: {
      message = SIGN_UP_ERROR_MESSAGE;
      break;
    }
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

  switch (type) {
    case getInvitationRoutine.FAILURE: {
      message = i18n.t(
        payload?.error?.response?.data?.message ??
          'An unexpected error occured',
      );
      break;
    }
    default:
      break;
  }

  // error notification
  if (payload?.error && message) {
    toast.error(i18n.t(message));
  }
  // success notification
  else if (message) {
    toast.success(i18n.t(message));
  }
};

export default notifier;
