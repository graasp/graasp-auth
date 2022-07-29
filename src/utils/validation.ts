import validator from 'validator';

import { NAME_MAXIMUM_LENGTH, NAME_MINIMUM_LENGTH } from '../config/constants';
import {
  EMPTY_EMAIL_ERROR,
  INVALID_EMAIL_ERROR,
  PASSWORD_EMPTY_ERROR,
  USERNAME_ERROR_MAXIMUM_MESSAGE,
  USERNAME_ERROR_MINIMUM_MESSAGE,
} from '../config/messages';

export const nameValidator = (name: string) => {
  if (name.length > NAME_MAXIMUM_LENGTH) {
    return USERNAME_ERROR_MAXIMUM_MESSAGE;
  }
  if (name.length < NAME_MINIMUM_LENGTH) {
    return USERNAME_ERROR_MINIMUM_MESSAGE;
  }
  return null;
};

export const emailValidator = (email?: string) => {
  if (!email) {
    return EMPTY_EMAIL_ERROR;
  }
  return validator.isEmail(email) ? null : INVALID_EMAIL_ERROR;
};

export const passwordValidator = (password?: string) => {
  if (!password || validator.isEmpty(password)) {
    return PASSWORD_EMPTY_ERROR;
  }
  return null;
};
