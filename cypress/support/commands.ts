// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import { Member } from '@graasp/sdk';

import {
  EMAIL_SIGN_IN_FIELD_ID,
  EMAIL_SIGN_UP_FIELD_ID,
  NAME_SIGN_UP_FIELD_ID,
  PASSWORD_SIGN_IN_FIELD_ID,
  PASSWORD_SIGN_IN_METHOD_BUTTON_ID,
  SIGN_UP_AGREEMENTS_CHECKBOX_ID,
} from '../../src/config/selectors';
import {
  fillPasswordSignInLayout,
  fillSignInLayout,
  fillSignUpLayout,
  passwordSignInMethod,
  submitPasswordSignIn,
  submitSignIn,
  submitSignUp,
} from '../e2e/util';
import MEMBERS from '../fixtures/members';
import { mockGetCurrentMember, mockGetMember, mockGetMembers } from './server';

// cypress/support/index.ts
declare global {
  namespace Cypress {
    interface Chainable {
      setUpApi(args?: { members?: Member[] }): Chainable<JQuery<HTMLElement>>;

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

      signInAndCheck(
        value: Partial<Member> & {
          nameValid?: boolean;
          emailValid?: boolean;
          passwordValid?: boolean;
        },
      ): Chainable<JQuery<HTMLElement>>;

      signInPasswordMethodAndCheck(): Chainable<JQuery<HTMLElement>>;

      signInPasswordAndCheck(
        member: Member & {
          nameValid?: boolean;
          emailValid?: boolean;
          passwordValid?: boolean;
        },
      ): Chainable<JQuery<HTMLElement>>;

      agreeWithAllTerms(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add(
  'setUpApi',
  ({ members = Object.values(MEMBERS) } = {}) => {
    const cachedMembers = JSON.parse(JSON.stringify(members));

    mockGetMember(cachedMembers);
    mockGetMembers(cachedMembers);

    mockGetCurrentMember();
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
