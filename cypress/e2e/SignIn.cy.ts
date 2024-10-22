import { SIGN_IN_PATH } from '../../src/config/paths';
import { REDIRECTION_CONTENT_CONTAINER_ID } from '../../src/config/selectors';
import { MEMBERS } from '../fixtures/members';

const DEFAULT_REDIRECTION_URL = Cypress.env('VITE_DEFAULT_REDIRECTION_URL');

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

describe('Already signed in', () => {
  beforeEach(() => {
    cy.setUpApi({ currentMember: MEMBERS.BOB });
  });

  it('Should show logged in', () => {
    cy.visit('/');
    cy.get(`#${REDIRECTION_CONTENT_CONTAINER_ID}`);
    cy.get(`[role="button"]`).click();
    cy.url().should('contain', DEFAULT_REDIRECTION_URL);
    cy.get('h1').should('contain', 'Content');
  });
});
