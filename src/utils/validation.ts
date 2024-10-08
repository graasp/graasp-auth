import { FieldError } from 'react-hook-form';
import validator from 'validator';

import {
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
  MemberConstants,
  isPasswordStrong,
} from '@graasp/sdk';

import { AUTH } from '../langs/constants';

const {
  USERNAME_TOO_LONG_ERROR,
  USERNAME_TOO_SHORT_ERROR,
  USERNAME_SPECIAL_CHARACTERS_ERROR,
  INVALID_EMAIL_ERROR,
  PASSWORD_EMPTY_ERROR,
  PASSWORD_WEAK_ERROR,
  PASSWORD_DO_NOT_MATCH_ERROR,
  EMPTY_EMAIL_ERROR,
} = AUTH;

const USER_NAME_REGEX = MemberConstants.USERNAME_FORBIDDEN_CHARS_REGEX;

export const nameValidator = (name: string) => {
  const trimmedName = name.trim();
  if (trimmedName.length > MAX_USERNAME_LENGTH) {
    return USERNAME_TOO_LONG_ERROR;
  }
  if (trimmedName.length < MIN_USERNAME_LENGTH) {
    return USERNAME_TOO_SHORT_ERROR;
  }
  if (USER_NAME_REGEX.test(trimmedName)) {
    return USERNAME_SPECIAL_CHARACTERS_ERROR;
  }
  return null;
};

export const emailValidator = (email?: string) => {
  if (!email) {
    return EMPTY_EMAIL_ERROR;
  }
  return validator.isEmail(email) ? null : INVALID_EMAIL_ERROR;
};

export const isEmailValid = (email?: string) => {
  if (!email) {
    return EMPTY_EMAIL_ERROR;
  }
  return validator.isEmail(email) ? true : INVALID_EMAIL_ERROR;
};

export const passwordValidator = (password?: string) => {
  if (!password || validator.isEmpty(password)) {
    return PASSWORD_EMPTY_ERROR;
  }
  return null;
};

export const isPasswordValid = (password: string) => {
  if (isPasswordStrong(password)) {
    return true;
  }
  return PASSWORD_WEAK_ERROR;
};

export const passwordsMatch = (passA: string, passB: string): string | null => {
  if (passA !== passB) {
    return PASSWORD_DO_NOT_MATCH_ERROR;
  }
  return null;
};

export const getValidationMessage = (fieldError?: FieldError) => {
  if (fieldError?.type === 'required') {
    return AUTH.REQUIRED_FIELD_ERROR;
  }
  return fieldError?.message;
};
