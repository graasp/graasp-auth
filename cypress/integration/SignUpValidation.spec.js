import qs from 'qs';

import { SIGN_UP_PATH } from '../../src/config/paths';
import { SIGN_UP_BUTTON_ID } from '../../src/config/selectors';
import { MOCK_INVITATIONS } from '../fixtures/invitations';
import { MEMBERS } from '../fixtures/members';
import { checkInvitationFields } from './util';

describe('Name and Email Validation', () => {
  beforeEach(() => {
    cy.setUpApi({ invitations: MOCK_INVITATIONS });
  });

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
    const invitation = MOCK_INVITATIONS[0];
    cy.visit(
      `${SIGN_UP_PATH}${qs.stringify(
        { invitationId: invitation.id },
        { addQueryPrefix: true },
      )}`,
    );
    checkInvitationFields(invitation);
  });

  it('Sign Up from invitation without name', () => {
    const invitation = MOCK_INVITATIONS[1];
    cy.visit(
      `${SIGN_UP_PATH}${qs.stringify(
        { invitationId: invitation.id },
        { addQueryPrefix: true },
      )}`,
    );
    checkInvitationFields(invitation);
  });

  it('Sign Up with invalid invitation', () => {
    cy.visit(
      `${SIGN_UP_PATH}${qs.stringify(
        { invitationId: 'invalid-id' },
        { addQueryPrefix: true },
      )}`,
    );
    cy.get(`#${SIGN_UP_BUTTON_ID}`).should('be.visible');
  });
});
