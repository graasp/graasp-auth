import { SIGN_UP_PATH } from '../../src/config/paths';
import { MEMBERS } from '../fixtures/members';

describe('Name and Email Validation', () => {
  it('Sign In', () => {
    const { GRAASP, WRONG_NAME, WRONG_EMAIL } = MEMBERS;
    cy.visit(SIGN_UP_PATH);
    cy.signup(WRONG_NAME);
    cy.signup(WRONG_EMAIL);
    cy.signup(GRAASP);
  });
});
