// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
import {
  EMAIL_SIGN_UP_FIELD_ID,
  NAME_SIGN_UP_FIELD_ID,
} from '../../src/config/selectors';

const {
  submitSignIn,
  fillSignUpLayout,
  fillSignInLayout,
  submitSignUp,
} = require('../integration/util');

Cypress.Commands.add('checkErrorTextField', (id, flag) => {
  const existence = flag ? 'not.exist' : 'exist';
  cy.get(`#${id}-helper-text`).should(existence);
});

Cypress.Commands.add('signUpAndCheck', (user) => {
  fillSignUpLayout(user);
  submitSignUp();

  cy.checkErrorTextField(NAME_SIGN_UP_FIELD_ID, user.nameValid);
  cy.checkErrorTextField(EMAIL_SIGN_UP_FIELD_ID, user.emailValid);
});

Cypress.Commands.add('signInAndCheck', (user) => {
  fillSignInLayout(user);
  submitSignIn();
  cy.checkErrorTextField(EMAIL_SIGN_UP_FIELD_ID, user.email);
});
