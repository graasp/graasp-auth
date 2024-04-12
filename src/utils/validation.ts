import validator from 'validator';

import { MAX_USERNAME_LENGTH, MIN_USERNAME_LENGTH } from '@graasp/sdk';

import { AUTH } from '../langs/constants';

const {
  USERNAME_TOO_LONG_ERROR,
  USERNAME_TOO_SHORT_ERROR,
  INVALID_EMAIL_ERROR,
  PASSWORD_EMPTY_ERROR,
  EMPTY_EMAIL_ERROR,
} = AUTH;

export const nameValidator = (name: string) => {
  const trimmedName = name.trim();
  if (trimmedName.length > MAX_USERNAME_LENGTH) {
    return USERNAME_TOO_LONG_ERROR;
  }
  if (trimmedName.length < MIN_USERNAME_LENGTH) {
    return USERNAME_TOO_SHORT_ERROR;
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
