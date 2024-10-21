// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import { CompleteMember, Member } from '@graasp/sdk';

import {
  EMAIL_SIGN_IN_FIELD_ID,
  EMAIL_SIGN_UP_FIELD_ID,
  MAGIC_LINK_EMAIL_FIELD_ID,
  NAME_SIGN_UP_FIELD_ID,
  PASSWORD_SIGN_IN_FIELD_ID,
  SIGN_UP_AGREEMENTS_CHECKBOX_ID,
} from '../../src/config/selectors';
import {
  fillPasswordSignInLayout,
  fillSignInByMailLayout,
  fillSignUpLayout,
  submitPasswordSignIn,
  submitSignIn,
  submitSignUp,
} from '../e2e/util';
import {
  mockGetCurrentMember,
  mockGetStatus,
  mockLogin,
  mockRedirection,
  mockRequestPasswordReset,
  mockResetPassword,
} from './server';

// cypress/support/index.ts
declare global {
  namespace Cypress {
    interface Chainable {
      setUpApi(args?: {
        currentMember?: CompleteMember | null;
        shouldFailRequestPasswordReset?: boolean;
        shouldFailResetPassword?: boolean;
        shouldFailLogin?: boolean;
      }): Chainable<JQuery<HTMLElement>>;

      checkErrorTextField(
        id: string,
        flag: unknown,
      ): Chainable<JQuery<HTMLElement>>;

      signUpAndCheck(
        member: Member & {
          nameValid?: boolean;
          emailValid?: boolean;
          passwordValid?: boolean;
        },
        acceptAllTerms?: boolean,
      ): Chainable<JQuery<HTMLElement>>;

      signInByMailAndCheck(
        value: Partial<Member> & {
          nameValid?: boolean;
          emailValid?: boolean;
          passwordValid?: boolean;
        },
      ): Chainable<JQuery<HTMLElement>>;

      signInPasswordAndCheck(
        member: Member & {
          nameValid?: boolean;
          emailValid?: boolean;
          passwordValid?: boolean;
          password?: string;
        },
      ): Chainable<JQuery<HTMLElement>>;

      agreeWithAllTerms(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add(
  'setUpApi',
  ({
    currentMember = null,
    shouldFailRequestPasswordReset = false,
    shouldFailResetPassword = false,
    shouldFailLogin = false,
  } = {}) => {
    mockGetCurrentMember(currentMember);
    mockGetStatus();
    mockRequestPasswordReset(shouldFailRequestPasswordReset);
    mockResetPassword(shouldFailResetPassword);
    mockRedirection();
    mockLogin(shouldFailLogin);
  },
);

Cypress.Commands.add('checkErrorTextField', (id, flag) => {
  const existence = flag ? 'not.exist' : 'exist';
  cy.get(`#${id}-helper-text`).should(existence);
});

Cypress.Commands.add('agreeWithAllTerms', () => {
  cy.get(`[data-cy="${SIGN_UP_AGREEMENTS_CHECKBOX_ID}"] input`)
    .check()
    .should('be.checked');
});

Cypress.Commands.add('signUpAndCheck', (user, acceptAllTerms) => {
  fillSignUpLayout(user);
  if (acceptAllTerms) {
    cy.agreeWithAllTerms();
  }
  submitSignUp();

  cy.checkErrorTextField(NAME_SIGN_UP_FIELD_ID, user.nameValid);
  cy.checkErrorTextField(EMAIL_SIGN_UP_FIELD_ID, user.emailValid);
});

Cypress.Commands.add('signInByMailAndCheck', (user) => {
  fillSignInByMailLayout(user);
  submitSignIn();
  cy.checkErrorTextField(MAGIC_LINK_EMAIL_FIELD_ID, user.emailValid);
});

Cypress.Commands.add('signInPasswordAndCheck', (user) => {
  fillPasswordSignInLayout(user);
  if (user.password) {
    submitPasswordSignIn();
  }
  if (!user.passwordValid) {
    cy.get(`#${PASSWORD_SIGN_IN_FIELD_ID}`).clear();
  }
  cy.checkErrorTextField(EMAIL_SIGN_IN_FIELD_ID, user.emailValid);
  cy.checkErrorTextField(PASSWORD_SIGN_IN_FIELD_ID, user.passwordValid);
});
