import { SIGN_IN_PATH } from '../../src/config/paths';
import { MEMBERS } from '../fixtures/members';

describe('Name and Email Validation', () => {
  it('Sign In', () => {
    const { GRAASP, WRONG_EMAIL } = MEMBERS;
    cy.visit(SIGN_IN_PATH);
    cy.login(WRONG_EMAIL);
    cy.login(GRAASP);
  });
});
