import validator from 'validator';
import {
  EMAIL_ERROR,
  USERNAME_ERROR_MAXIMUM,
  USERNAME_ERROR_MINIMUM,
} from '../config/messages';
import { NAME_MAXIMUM_LENGTH, NAME_MINIMUM_LENGTH } from '../config/constants';

export const nameValidator = (name) => {
  let checkingName = '';
  if (name.length > NAME_MAXIMUM_LENGTH || name.length < NAME_MINIMUM_LENGTH) {
    checkingName =
      name.length > NAME_MAXIMUM_LENGTH
        ? USERNAME_ERROR_MAXIMUM
        : USERNAME_ERROR_MINIMUM;
  }
  return checkingName;
};

export const emailValidator = (email) =>
  validator.isEmail(email) ? '' : EMAIL_ERROR;
