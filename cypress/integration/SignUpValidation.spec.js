import qs from 'qs';
import { API_ROUTES } from '@graasp/query-client';
import { SIGN_UP_PATH } from '../../src/config/paths';
import { MEMBERS } from '../fixtures/members';
import { checkInvitationFields } from './util';
import { SIGN_UP_BUTTON_ID } from '../../src/config/selectors';

describe('Name and Email Validation', () => {
  it('Sign Up', () => {
    const { GRAASP, WRONG_NAME, WRONG_EMAIL } = MEMBERS;
    cy.visit(SIGN_UP_PATH);
    // Signing up with a wrong name and right email
    cy.signUpAndCheck(WRONG_NAME);
    // Signing up with a wrong email and right name
    cy.signUpAndCheck(WRONG_EMAIL);
    // Signing up with right email and name
    cy.signUpAndCheck(GRAASP);
  });

  it('Sign Up from invitation with name', () => {
    const invitation = {
      id: 'invitation-id',
      name: 'name',
      email: 'email',
    };
    cy.intercept(API_ROUTES.buildGetInvitationRoute(invitation.id), invitation);
    cy.visit(
      `${SIGN_UP_PATH}${qs.stringify(
        { invitationId: invitation.id },
        { addQueryPrefix: true },
      )}`,
    );
    checkInvitationFields(invitation);
  });

  it('Sign Up from invitation without name', () => {
    const invitation = {
      id: 'invitation-id',
      email: 'email',
    };
    cy.intercept(API_ROUTES.buildGetInvitationRoute(invitation.id), invitation);
    cy.visit(
      `${SIGN_UP_PATH}${qs.stringify(
        { invitationId: invitation.id },
        { addQueryPrefix: true },
      )}`,
    );
    checkInvitationFields(invitation);
  });

  it('Sign Up with invalid invitation', () => {
    const invitation = {
      id: 'invitation-id',
      email: 'email',
    };
    cy.intercept(API_ROUTES.buildGetInvitationRoute(invitation.id), {
      statusCode: 404,
      body: '404 Not Found!',
    });
    cy.visit(
      `${SIGN_UP_PATH}${qs.stringify(
        { invitationId: invitation.id },
        { addQueryPrefix: true },
      )}`,
    );
    cy.get(`#${SIGN_UP_BUTTON_ID}`).should('be.visible');
  });
});
