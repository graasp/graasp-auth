import { SIGN_IN_PATH } from '../../src/config/paths';
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
