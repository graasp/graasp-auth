import { SIGN_IN_PATH } from '../../src/config/paths';
import { MEMBERS } from '../fixtures/members';

describe('Email and Password Validation', () => {
  it('Sign In', () => {
    const { WRONG_EMAIL, WRONG_PASSWORD, GRAASP } = MEMBERS;
    cy.visit(SIGN_IN_PATH);
    // Select sign in method
    cy.signInPasswordMethodAndCheck();
    // Siging in with wrong email
    cy.signInPasswordAndCheck(WRONG_EMAIL);
    // Siging in with a valid email but empty password
    cy.signInPasswordAndCheck(WRONG_PASSWORD);
    // Siging in with a valid email and password
    cy.signInPasswordAndCheck(GRAASP);
  });
});
