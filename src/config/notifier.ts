import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

import { Notifier, routines } from '@graasp/query-client';
import { FAILURE_MESSAGES } from '@graasp/translations';

import { SHOW_NOTIFICATIONS } from './env';
import i18n from './i18n';

const {
  getInvitationRoutine,
  signInRoutine,
  signUpRoutine,
  signInWithPasswordRoutine,
} = routines;

const notifier: Notifier = (args) => {
  const { type, payload } = args;

  if (!SHOW_NOTIFICATIONS) {
    return;
  }

  let message = '';

  switch (type) {
    case signInRoutine.FAILURE:
    case signUpRoutine.FAILURE:
    case signInWithPasswordRoutine.FAILURE: {
      if (
        payload.error instanceof AxiosError &&
        payload.error.response?.data.statusCode === StatusCodes.NOT_ACCEPTABLE
      )
        message = FAILURE_MESSAGES.MEMBER_WITHOUT_PASSWORD;
      break;
    }
    case getInvitationRoutine.FAILURE: {
      message = payload?.error?.message ?? FAILURE_MESSAGES.UNEXPECTED_ERROR;
      break;
    }
    case signInRoutine.SUCCESS:
    case signUpRoutine.SUCCESS:
    case signInWithPasswordRoutine.SUCCESS: {
      // todo: factor out string
      message = payload?.message ?? 'The operation successfully proceeded';
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
