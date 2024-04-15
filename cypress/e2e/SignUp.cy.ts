import { StatusCodes } from 'http-status-codes';

import { API_ROUTES } from '@graasp/query-client';

import { SIGN_UP_PATH } from '../../src/config/paths';
import {
  SIGN_UP_BUTTON_ID,
  SUCCESS_CONTENT_ID,
} from '../../src/config/selectors';
import { MEMBERS } from '../fixtures/members';
import { checkInvitationFields } from './util';

describe('SignUp', () => {
  describe('Must Accept All Terms To Sign Up', () => {
    beforeEach(() => {
      cy.visit(SIGN_UP_PATH);
      // eslint-disable-next-line arrow-body-style
      cy.intercept({ method: 'post', pathname: '/register' }, ({ reply }) => {
        return reply({
          statusCode: StatusCodes.NO_CONTENT,
        });
      });
    });

    it('Cannot Sign Up Without Accepting Terms', () => {
      cy.get(`#${SIGN_UP_BUTTON_ID}`).should('be.disabled');
    });
    it('Sign Up Is Available When Accepting All Terms', () => {
      cy.agreeWithAllTerms();
      cy.get(`#${SIGN_UP_BUTTON_ID}`).should('not.be.disabled');
    });
  });

  describe('Name and Email Validation', () => {
    it('Sign Up', () => {
      const { GRAASP, WRONG_NAME, WRONG_EMAIL } = MEMBERS;
      cy.visit(SIGN_UP_PATH);

      // eslint-disable-next-line arrow-body-style
      cy.intercept({ method: 'post', pathname: '/register' }, ({ reply }) => {
        return reply({
          statusCode: StatusCodes.NO_CONTENT,
        });
      });

      // Signing up with a wrong name and right email
      cy.signUpAndCheck(WRONG_NAME, true);
      // Signing up with a wrong email and right name
      cy.signUpAndCheck(WRONG_EMAIL, true);
      // Signing up with right email and name
      cy.signUpAndCheck(GRAASP, true);

      cy.get(`#${SUCCESS_CONTENT_ID}`).should('be.visible');
    });

    it('Sign Up from invitation with name', () => {
      const invitation = {
        id: 'invitation-id',
        name: 'name',
        email: 'email',
      };
      cy.intercept(
        API_ROUTES.buildGetInvitationRoute(invitation.id),
        ({ reply }) => {
          reply(invitation);
        },
      );
      const search = new URLSearchParams();
      search.set('invitationId', invitation.id);
      cy.visit(`${SIGN_UP_PATH}?${search.toString()}`);
      checkInvitationFields(invitation);
    });

    it('Sign Up from invitation without name', () => {
      const invitation = {
        id: 'invitation-id',
        email: 'email',
      };
      cy.intercept(
        API_ROUTES.buildGetInvitationRoute(invitation.id),
        invitation,
      );
      const search = new URLSearchParams();
      search.set('invitationId', invitation.id);
      cy.visit(`${SIGN_UP_PATH}?${search.toString()}`);
      checkInvitationFields(invitation);
    });

    it('Sign Up with invalid invitation', () => {
      const invitation = {
        id: 'invitation-id',
        email: 'email',
      };
      cy.intercept(API_ROUTES.buildGetInvitationRoute(invitation.id), {
        statusCode: 404,
        body: { message: '404 Not Found!' },
      });
      const search = new URLSearchParams();
      search.set('invitationId', invitation.id);
      cy.visit(`${SIGN_UP_PATH}?${search.toString()}`);
      cy.get(`#${SIGN_UP_BUTTON_ID}`).should('be.visible');
    });
  });
});
