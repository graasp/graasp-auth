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
  SIGN_IN_PASSWORD_NON_EXISTENT,
} from '../types/member';
import notifier from '../config/notifier';

export const getCurrentMember = async () => {
  try {
    const user = await Api.getCurrentMember();
    return user;
  } catch (error) {
    return notifier({ code: GET_CURRENT_MEMBER_ERROR, payload: { error } });
  }
};

// payload = {email}
export const signIn = async (payload) => {
  try {
    await Api.signIn(payload);
    notifier({ code: SIGN_IN_SUCCESS });
  } catch (error) {
    if (error.response?.status === StatusCodes.NOT_FOUND) {
      notifier({ code: SIGN_IN_INVALID, payload: { error } });
    } else {
      notifier({ code: SIGN_IN_ERROR, payload: { error } });
    }
  }
};

// payload = {email, password}
export const signInPassword = async (payload) => {
  try {
    const data = await Api.signInPassword(payload);
    notifier({ code: SIGN_IN_PASSWORD_SUCCESS });
    return data;
  } catch (error) {
    switch (error.response?.status) {
      case StatusCodes.UNAUTHORIZED: {
        notifier({ code: SIGN_IN_PASSWORD_INVALID, payload: { error } });
        break;
      }
      case StatusCodes.NOT_ACCEPTABLE: {
        notifier({ code: SIGN_IN_PASSWORD_NON_EXISTENT, payload: { error } });
        break;
      }
      default:
        notifier({ code: SIGN_IN_INVALID, payload: { error } });
        break;
    }
    return false;
  }
};

// payload = {name, mail}
export const signUp = async (payload) => {
  try {
    await Api.signUp(payload);
    notifier({ code: SIGN_UP_SUCCESS });
  } catch (error) {
    if (error.response?.status === StatusCodes.CONFLICT) {
      notifier({ code: SIGN_UP_DUPLICATE, payload: { error } });
    } else {
      notifier({ code: SIGN_UP_ERROR, payload: { error } });
    }
  }
};
