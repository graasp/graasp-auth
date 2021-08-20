import * as Api from '../api';
import {
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN_ERROR,
  GET_CURRENT_MEMBER_ERROR,
  SIGN_IN_INVALID,
  SIGN_UP_DUPLICATE,
} from '../types/member';
import notifier from '../utils/notifier';

export const getCurrentMember = async () => {
  try {
    const user = await Api.getCurrentMember();
    return user;
  } catch (error) {
    return notifier.error({ code: GET_CURRENT_MEMBER_ERROR, error });
  }
};

// payload = {email}
export const signIn = async (payload) => {
  try {
    await Api.signIn(payload);
    notifier.success({ code: SIGN_IN_SUCCESS });
  } catch (error) {
    if(error.message === 'Not Found')
      notifier.error({ code: SIGN_IN_INVALID, error });
    else
      notifier.error({ code: SIGN_IN_ERROR, error });
  }
};

// payload = {name, mail}
export const signUp = async (payload) => {
  try {
    await Api.signUp(payload);
    notifier.success({ code: SIGN_UP_SUCCESS });
  } catch (error) {
    if(error.message === 'Conflict')
      notifier.error({ code: SIGN_UP_DUPLICATE, error });
    else
      notifier.error({ code: SIGN_UP_ERROR, error });
  }
};
