import { API_ROUTES } from '@graasp/query-client';

import { SIGN_IN_PATH } from '../../src/config/paths';
import { MEMBERS } from '../fixtures/members';

describe('Email and Password Validation', () => {
  it('Sign In With Password', () => {
    const redirectionLink = 'mylink';
    cy.intercept(
      {
        pathname: API_ROUTES.SIGN_IN_WITH_PASSWORD_ROUTE,
      },
      (req) => {
        req.reply({ statusCode: 303, body: { resource: redirectionLink } });
      },
    ).as('signInWithPassword');

    const { WRONG_EMAIL, WRONG_PASSWORD, GRAASP } = MEMBERS;
    cy.visit(SIGN_IN_PATH);
    // Select sign in method
    cy.signInPasswordMethodAndCheck();
    // Signing in with wrong email
    cy.signInPasswordAndCheck(WRONG_EMAIL);
    // Signing in with a valid email but empty password
    cy.signInPasswordAndCheck(WRONG_PASSWORD);
    // Signing in with a valid email and password
    cy.signInPasswordAndCheck(GRAASP);

    cy.url().should('contain', redirectionLink);
  });
});
