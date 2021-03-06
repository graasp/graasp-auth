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
import { COOKIE_KEYS } from '@graasp/utils';

import {
  EMAIL_SIGN_IN_FIELD_ID,
  EMAIL_SIGN_UP_FIELD_ID,
  NAME_SIGN_UP_FIELD_ID,
  PASSWORD_SIGN_IN_FIELD_ID,
  PASSWORD_SIGN_IN_METHOD_BUTTON_ID,
} from '../../src/config/selectors';
import MEMBERS from '../fixtures/members';
import { mockGetCurrentMember, mockGetMember, mockGetMembers } from './server';

const {
  submitSignIn,
  fillSignUpLayout,
  fillSignInLayout,
  submitSignUp,
  fillPasswordSignInLayout,
  submitPasswordSignIn,
  passwordSignInMethod,
} = require('../integration/util');

Cypress.Commands.add(
  'setUpApi',
  ({ members = Object.values(MEMBERS), storedSessions = [] } = {}) => {
    const cachedMembers = JSON.parse(JSON.stringify(members));

    cy.setCookie(
      COOKIE_KEYS.STORED_SESSIONS_KEY,
      JSON.stringify(storedSessions),
    );

    mockGetMember(cachedMembers);
    mockGetMembers(cachedMembers);

    mockGetCurrentMember();
  },
);

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
  cy.checkErrorTextField(EMAIL_SIGN_IN_FIELD_ID, user.emailValid);
});

Cypress.Commands.add('signInPasswordMethodAndCheck', () => {
  passwordSignInMethod();
  cy.get(`#${PASSWORD_SIGN_IN_METHOD_BUTTON_ID}`).should('be.disabled');
});

Cypress.Commands.add('signInPasswordAndCheck', (user) => {
  fillPasswordSignInLayout(user);
  if (!user.passwordValid) {
    cy.get(`#${PASSWORD_SIGN_IN_FIELD_ID}`).clear();
  }
  submitPasswordSignIn();
  cy.checkErrorTextField(EMAIL_SIGN_IN_FIELD_ID, user.emailValid);
  cy.checkErrorTextField(PASSWORD_SIGN_IN_FIELD_ID, user.passwordValid);
});
