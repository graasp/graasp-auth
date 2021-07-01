import validator from 'validator';
import {
  EMAIL_ERROR,
  USERNAME_ERROR_MAXIMUM,
  USERNAME_ERROR_MINIMUM,
} from '../config/messages';
import { NAME_MAXIMUM_LENGTH, NAME_MINIMUM_LENGTH } from '../config/constants';

export const nameValidator = (name) => {
  if (name.length > NAME_MAXIMUM_LENGTH) {
    return USERNAME_ERROR_MAXIMUM;
  }
  if (name.length < NAME_MINIMUM_LENGTH) {
    return USERNAME_ERROR_MINIMUM;
  }
  return null;
};

export const emailValidator = (email) =>
  validator.isEmail(email) ? null : EMAIL_ERROR;
