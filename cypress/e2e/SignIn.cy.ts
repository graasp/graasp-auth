import { SIGN_IN_PATH } from '../../src/config/paths';
import {
  MAGIC_LINK_EMAIL_FIELD_ID,
  SUCCESS_CONTENT_ID,
} from '../../src/config/selectors';
import { MEMBERS } from '../fixtures/members';

describe('Name and Email Validation', () => {
  beforeEach(() => {
    cy.setUpApi();
  });
  it('Sign In', () => {
    const { GRAASP, WRONG_EMAIL } = MEMBERS;
    cy.visit(SIGN_IN_PATH);
    // Signing in with a wrong email format
    cy.signInByMailAndCheck(WRONG_EMAIL);
    // Signing in with a valid email
    cy.signInByMailAndCheck(GRAASP);
  });
});

describe('Sign In', () => {
  beforeEach(() => {
    cy.setUpApi();
    cy.visit(SIGN_IN_PATH);
  });
  it('Can use Enter to validate email', () => {
    cy.get(`#${MAGIC_LINK_EMAIL_FIELD_ID}`).type(`${MEMBERS.BOB.email}{Enter}`);
    cy.get(`#${SUCCESS_CONTENT_ID}`).should('be.visible');
  });
});
