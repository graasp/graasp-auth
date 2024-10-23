import { StatusCodes } from 'http-status-codes';

import { API_ROUTES } from '@graasp/query-client';

import { SIGN_IN_PATH } from '../../src/config/paths';
import {
  EMAIL_SIGN_IN_FIELD_ID,
  ERROR_DISPLAY_ID,
  PASSWORD_SIGN_IN_BUTTON_ID,
  PASSWORD_SIGN_IN_FIELD_ID,
  PASSWORD_SUCCESS_ALERT,
} from '../../src/config/selectors';
import { MEMBERS } from '../fixtures/members';
import { fillPasswordSignInLayout } from './util';

describe('Email and Password Validation', () => {
  it('Sign In With Password', () => {
    const redirectionLink = 'http://localhost:3005/mylink';
    cy.intercept(
      {
        pathname: API_ROUTES.SIGN_IN_WITH_PASSWORD_ROUTE,
      },
      ({ reply }) => {
        reply({ statusCode: 303, body: { resource: redirectionLink } });
      },
    ).as('signInWithPassword');
    cy.intercept(
      {
        url: redirectionLink,
      },
      ({ reply }) => {
        reply({
          headers: { 'content-type': 'text/html' },
          statusCode: StatusCodes.OK,
          body: '<h1>Mock Auth Page</h1>',
        });
      },
    ).as('redirectionPage');

    const { WRONG_EMAIL, GRAASP } = MEMBERS;
    cy.visit(SIGN_IN_PATH);
    // Signing in with wrong email
    cy.signInPasswordAndCheck(WRONG_EMAIL);

    // Signing in with a valid email and password
    cy.signInPasswordAndCheck(GRAASP);
    cy.wait('@signInWithPassword');
    cy.url().should('contain', redirectionLink);
  });

  it('Sign In With Wrong Password', () => {
    cy.intercept(
      {
        pathname: API_ROUTES.SIGN_IN_WITH_PASSWORD_ROUTE,
      },
      (req) => {
        req.reply({
          statusCode: StatusCodes.UNAUTHORIZED,
          body: { message: 'Unauthorized member' },
        });
      },
    ).as('signInWithPassword');

    const { WRONG_PASSWORD } = MEMBERS;
    cy.visit(SIGN_IN_PATH);

    // Signing in with a valid email but empty password
    fillPasswordSignInLayout(WRONG_PASSWORD);
    cy.get(`#${PASSWORD_SIGN_IN_BUTTON_ID}`).click();
    cy.get(`#${EMAIL_SIGN_IN_FIELD_ID}-helper-text`).should('not.exist');
    cy.get(`#${PASSWORD_SIGN_IN_FIELD_ID}-helper-text`).should('not.exist');
    cy.get(`#${ERROR_DISPLAY_ID}`).should('be.visible');
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
    // Signing in with wrong email
    cy.signInPasswordAndCheck(WRONG_EMAIL);
    // Signing in with a valid email but empty password
    cy.signInPasswordAndCheck(WRONG_PASSWORD);
    // Signing in with a valid email and password
    cy.signInPasswordAndCheck(GRAASP);

    cy.get(`#${PASSWORD_SUCCESS_ALERT}`).should('be.visible');
  });
});
