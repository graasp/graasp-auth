import { toast } from 'react-toastify';

import { routines } from '@graasp/query-client';

import { SHOW_NOTIFICATIONS } from './constants';
import i18n from './i18n';

const {
  getInvitationRoutine,
  signInRoutine,
  signUpRoutine,
  signInWithPasswordRoutine,
} = routines;

const notifier = (args: {
  type: string;
  payload?: {
    error?: Error;
    message?: string;
  };
}) => {
  const { type, payload } = args;

  if (!SHOW_NOTIFICATIONS) {
    return;
  }

  let message = '';

  switch (type) {
    case signInRoutine.FAILURE:
    case signUpRoutine.FAILURE:
    case signInWithPasswordRoutine.FAILURE:
    case getInvitationRoutine.FAILURE: {
      message = payload?.error?.message ?? 'An unexpected error occured';
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
