import { EMAIL_SIGN_IN_FIELD_ID } from '../../src/config/selectors';
import { SIGN_IN_PATH } from '../../src/config/paths';
import { checkErrorTextField, fillSignInLayout, submitSignIn } from './util';

describe('Name and Email Validation', () => {
  it('Sign In', () => {
    cy.visit(SIGN_IN_PATH);
    fillSignInLayout('ekfekfekf');
    submitSignIn();
    checkErrorTextField(EMAIL_SIGN_IN_FIELD_ID, true);
    fillSignInLayout('graasp@epfl.edu');
    checkErrorTextField(EMAIL_SIGN_IN_FIELD_ID, false);
    submitSignIn();
  });
});
