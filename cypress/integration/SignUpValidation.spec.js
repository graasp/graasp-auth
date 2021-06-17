import {
  EMAIL_SIGN_IN_FIELD_ID,
  EMAIL_SIGN_UP_FIELD_ID,
  NAME_SIGN_UP_FIELD_ID,
} from '../../src/config/selectors';
import { SIGN_UP_PATH } from '../../src/config/paths';
import {
  checkErrorTextField,
  fillSignInLayout,
  fillSignUpLayout,
  submitSignIn,
  submitSignUp,
} from './util';

describe('Name and Email Validation', () => {
  it('Sign In', () => {
    cy.visit(SIGN_UP_PATH);
    fillSignUpLayout({ name: 'e', email: 'jasjasjd' });
    submitSignUp();
    checkErrorTextField(EMAIL_SIGN_UP_FIELD_ID, true);
    checkErrorTextField(NAME_SIGN_UP_FIELD_ID, true);
    fillSignUpLayout({ name: 'graasp', email: 'graasp@epfl.edu' });
    checkErrorTextField(EMAIL_SIGN_UP_FIELD_ID, false);
    checkErrorTextField(NAME_SIGN_UP_FIELD_ID, false);
  });
});
