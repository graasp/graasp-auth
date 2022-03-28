import { StatusCodes } from 'http-status-codes';
import * as Api from '../api';
import {
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN_ERROR,
  GET_CURRENT_MEMBER_ERROR,
  SIGN_IN_INVALID,
  SIGN_UP_DUPLICATE,
  SIGN_IN_PASSWORD_INVALID,
  SIGN_IN_PASSWORD_SUCCESS,
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
    if (error.response.status === StatusCodes.NOT_FOUND) {
      notifier.error({ code: SIGN_IN_INVALID, error });
    } else {
      notifier.error({ code: SIGN_IN_ERROR, error });
    }
  }
};

// payload = {email, password}
export const signInPassword = async (payload) => {
  try {
    const data = await Api.signInPassword(payload);
    notifier.success({ code: SIGN_IN_PASSWORD_SUCCESS });
    return data;
  } catch (error) {
    if (error.response.status === StatusCodes.UNAUTHORIZED) {
      notifier.error({ code: SIGN_IN_PASSWORD_INVALID, error });
    } else {
      notifier.error({ code: SIGN_IN_INVALID, error });
    }
    return false;
  }
};

// payload = {name, mail}
export const signUp = async (payload) => {
  try {
    await Api.signUp(payload);
    notifier.success({ code: SIGN_UP_SUCCESS });
  } catch (error) {
    if (error.response.status === StatusCodes.CONFLICT) {
      notifier.error({ code: SIGN_UP_DUPLICATE, error });
    } else {
      notifier.error({ code: SIGN_UP_ERROR, error });
    }
  }
};
