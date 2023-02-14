import { StatusCodes } from 'http-status-codes';

import { API_ROUTES } from '@graasp/query-client';

import { SIGN_IN_PATH } from '../../src/config/paths';
import { SUCCESS_CONTENT_ID } from '../../src/config/selectors';
import { MEMBERS } from '../fixtures/members';

const { GRAASP, WRONG_EMAIL } = MEMBERS;

describe('Name and Email Validation', () => {
  it('Sign In Successfully', () => {
    cy.visit(SIGN_IN_PATH);

    // eslint-disable-next-line arrow-body-style
    cy.intercept(API_ROUTES.SIGN_IN_ROUTE, ({ reply }) => {
      return reply({
        statusCode: StatusCodes.NO_CONTENT,
      });
    });

    // Signing in with a valid email
    cy.signInAndCheck(GRAASP);

    cy.get(`#${SUCCESS_CONTENT_ID}`).should('be.visible');
  });

  it('Sign In with wrong email should fail', () => {
    cy.visit(SIGN_IN_PATH);
    // Signing in with a wrong email format
    cy.signInAndCheck(WRONG_EMAIL);

    cy.get(`#${SUCCESS_CONTENT_ID}`).should('not.exist');
  });
});
