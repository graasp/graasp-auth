import { API_ROUTES } from '@graasp/query-client';

import { SIGN_IN_PATH } from '../../src/config/paths';
import { PASSWORD_SUCCESS_ALERT } from '../../src/config/selectors';
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

    const { WRONG_EMAIL, GRAASP } = MEMBERS;
    cy.visit(SIGN_IN_PATH);
    // Signing in with wrong email
    cy.signInPasswordAndCheck(WRONG_EMAIL);

    // Signing in with a valid email and password
    cy.signInPasswordAndCheck(GRAASP);

    cy.url().should('contain', redirectionLink);
  });

  it('Sign In With Wrong Password', () => {
    cy.intercept(
      {
        pathname: API_ROUTES.SIGN_IN_WITH_PASSWORD_ROUTE,
      },
      (req) => {
        req.reply({ statusCode: 500 });
      },
    ).as('signInWithPassword');

    const { WRONG_PASSWORD } = MEMBERS;
    cy.visit(SIGN_IN_PATH);

    // Signing in with a valid email but empty password
    cy.signInPasswordAndCheck(WRONG_PASSWORD);
  });

  it('Sign In With Password shows success message if no redirect', () => {
    cy.intercept(
      {
        pathname: API_ROUTES.SIGN_IN_WITH_PASSWORD_ROUTE,
      },
      (req) => {
        req.reply({ statusCode: 303 });
      },
    ).as('signInWithPassword');

    const { WRONG_EMAIL, WRONG_PASSWORD, GRAASP } = MEMBERS;
    cy.visit(SIGN_IN_PATH);
    // Signing in with wrong email
    cy.signInPasswordAndCheck(WRONG_EMAIL);
    // Signing in with a valid email but empty password
    cy.signInPasswordAndCheck(WRONG_PASSWORD);
    // Signing in with a valid email and password
    cy.signInPasswordAndCheck(GRAASP);

    cy.get(`#${PASSWORD_SUCCESS_ALERT}`).should('be.visible');
  });

  it('Sign In With Password shows success message if no redirect', () => {
    cy.intercept(
      {
        pathname: API_ROUTES.SIGN_IN_WITH_PASSWORD_ROUTE,
      },
      (req) => {
        req.reply({ statusCode: 303 });
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

    cy.get(`#${PASSWORD_SUCCESS_ALERT}`).should('be.visible');
  });
});
