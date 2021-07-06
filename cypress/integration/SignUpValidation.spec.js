import { SIGN_UP_PATH } from '../../src/config/paths';
import { MEMBERS } from '../fixtures/members';

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
});
