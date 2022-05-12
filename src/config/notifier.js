import { toast } from 'react-toastify';

import { routines } from '@graasp/query-client';

import {
  SIGN_IN_ERROR,
  SIGN_IN_INVALID,
  SIGN_IN_PASSWORD_INVALID,
  SIGN_IN_PASSWORD_NON_EXISTENT,
  SIGN_UP_DUPLICATE,
  SIGN_UP_ERROR,
} from '../types/member';
import { SHOW_NOTIFICATIONS } from './constants';
import i18n from './i18n';
import {
  SIGN_IN_ERROR_MESSAGE,
  SIGN_IN_INVALID_MESSAGE,
  SIGN_IN_INVALID_PASSWORD_MESSAGE,
  SIGN_IN_NON_EXISTENT_PASSWORD_MESSAGE,
  SIGN_UP_DUPLICATE_MESSAGE,
  SIGN_UP_ERROR_MESSAGE,
} from './messages';

const {
  getInvitationRoutine,
  signInRoutine,
  signUpRoutine,
  signInWithPasswordRoutine,
} = routines;

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
    default:
      break;
  }

  switch (type) {
    case signInRoutine.FAILURE:
    case signUpRoutine.FAILURE:
    case signInWithPasswordRoutine.FAILURE:
    case getInvitationRoutine.FAILURE: {
      message = i18n.t(
        payload?.error?.response?.data?.message ??
          'An unexpected error occured',
      );
      break;
    }
    case signInRoutine.SUCCESS:
    case signUpRoutine.SUCCESS:
    case signInWithPasswordRoutine.SUCCESS: {
      // todo: factor out string
      message = i18n.t(
        payload?.message ?? 'The operation successfully proceeded',
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
