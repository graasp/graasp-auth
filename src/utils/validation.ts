import validator from 'validator';

import { MAX_USERNAME_LENGTH, MIN_USERNAME_LENGTH } from '@graasp/sdk';

import {
  EMPTY_EMAIL_ERROR,
  INVALID_EMAIL_ERROR,
  PASSWORD_EMPTY_ERROR,
  USERNAME_ERROR_MAXIMUM_MESSAGE,
  USERNAME_ERROR_MINIMUM_MESSAGE,
} from '../config/messages';

export const nameValidator = (name: string) => {
  const trimmedName = name.trim();
  if (trimmedName.length > MAX_USERNAME_LENGTH) {
    return USERNAME_ERROR_MAXIMUM_MESSAGE;
  }
  if (trimmedName.length < MIN_USERNAME_LENGTH) {
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
