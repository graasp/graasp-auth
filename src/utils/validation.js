import validator from 'validator';
import {
  EMAIL_ERROR,
  PASSWORD_ERROR,
  USERNAME_ERROR_MAXIMUM_MESSAGE,
  USERNAME_ERROR_MINIMUM_MESSAGE,
} from '../config/messages';
import { NAME_MAXIMUM_LENGTH, NAME_MINIMUM_LENGTH } from '../config/constants';

export const nameValidator = (name) => {
  if (name.length > NAME_MAXIMUM_LENGTH) {
    return USERNAME_ERROR_MAXIMUM_MESSAGE;
  }
  if (name.length < NAME_MINIMUM_LENGTH) {
    return USERNAME_ERROR_MINIMUM_MESSAGE;
  }
  return null;
};

export const emailValidator = (email) =>
  validator.isEmail(email) ? null : EMAIL_ERROR;
export const passwordValidator = (password) =>
  validator.isAlpha(password) ? null : PASSWORD_ERROR;
