import { StatusCodes } from 'http-status-codes';

import { API_ROUTES } from '@graasp/query-client';

import { SIGN_IN_PATH, SIGN_UP_PATH } from '../../src/config/paths';
import { BACK_BUTTON_ID, SUCCESS_CONTENT_ID } from '../../src/config/selectors';
import { MEMBERS } from '../fixtures/members';

describe('Success Content Validation', () => {
  it('Sign In - Back Button', () => {
    const { GRAASP } = MEMBERS;
    cy.visit(SIGN_IN_PATH);

    cy.get(`#${SUCCESS_CONTENT_ID}`).should('not.exist');

    // Siging in with a valid email
    cy.signInAndCheck(GRAASP);

    cy.get(`#${SUCCESS_CONTENT_ID}`).should('be.visible');

    cy.get(`#${BACK_BUTTON_ID}`).click();

    cy.get(`#${SUCCESS_CONTENT_ID}`).should('not.exist');

    cy.url().should('include', SIGN_IN_PATH);

    // check if it's possile to sign in and use back button again
    cy.signInAndCheck(GRAASP);

    cy.get(`#${SUCCESS_CONTENT_ID}`).should('be.visible');

    cy.get(`#${BACK_BUTTON_ID}`).click();

    cy.get(`#${SUCCESS_CONTENT_ID}`).should('not.exist');

    cy.url().should('include', SIGN_IN_PATH);
  });

  it('Sign Up - Back Button', () => {
    const { GRAASP } = MEMBERS;
    cy.visit(SIGN_UP_PATH);

    cy.intercept(API_ROUTES.SIGN_UP_ROUTE, ({ reply }) => {
      return reply({
        statusCode: StatusCodes.NO_CONTENT,
      });
    });

    cy.get(`#${SUCCESS_CONTENT_ID}`).should('not.exist');

    // Siging in with a valid email
    cy.signUpAndCheck(GRAASP);

    cy.get(`#${SUCCESS_CONTENT_ID}`).should('be.visible');

    cy.get(`#${BACK_BUTTON_ID}`).click();

    cy.get(`#${SUCCESS_CONTENT_ID}`).should('not.exist');

    cy.url().should('include', SIGN_UP_PATH);

    // check if it's possile to sign up and use back button again
    cy.signUpAndCheck(GRAASP);

    cy.get(`#${SUCCESS_CONTENT_ID}`).should('be.visible');

    cy.get(`#${BACK_BUTTON_ID}`).click();

    cy.get(`#${SUCCESS_CONTENT_ID}`).should('not.exist');

    cy.url().should('include', SIGN_UP_PATH);
  });
});
