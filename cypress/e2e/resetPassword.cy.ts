import { RESET_PASSWORD_PATH } from '../../src/config/paths';
import {
  RESET_PASSWORD_ERROR_MESSAGE_ID,
  RESET_PASSWORD_ERROR_MISSING_TOKEN_ID,
  RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ERROR_TEXT_ID,
  RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ID,
  RESET_PASSWORD_NEW_PASSWORD_FIELD_ERROR_TEXT_ID,
  RESET_PASSWORD_NEW_PASSWORD_FIELD_ID,
  RESET_PASSWORD_SUBMIT_BUTTON_ID,
  RESET_PASSWORD_SUCCESS_MESSAGE_ID,
} from '../../src/config/selectors';
import { MEMBERS } from '../fixtures/members';

describe('Reset password', () => {
  describe('With valid token', () => {
    it('With strong password', () => {
      cy.setUpApi();
      const token = '1234';
      cy.visit(`${RESET_PASSWORD_PATH}?t=${token}`);

      cy.get(`#${RESET_PASSWORD_NEW_PASSWORD_FIELD_ID}`).type(
        MEMBERS.GRAASP.password,
      );
      cy.get(`#${RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ID}`).type(
        MEMBERS.GRAASP.password,
      );
      cy.get(`#${RESET_PASSWORD_SUBMIT_BUTTON_ID}`).click();
      cy.get(`#${RESET_PASSWORD_SUCCESS_MESSAGE_ID}`).should('be.visible');
    });

    it('With weak password', () => {
      cy.setUpApi();
      const token = '1234';
      cy.visit(`${RESET_PASSWORD_PATH}?t=${token}`);

      cy.get(`#${RESET_PASSWORD_NEW_PASSWORD_FIELD_ID}`).type('weak');
      cy.get(`#${RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ID}`).type(
        'weak',
      );
      cy.get(`#${RESET_PASSWORD_SUBMIT_BUTTON_ID}`).click();
      cy.get(`#${RESET_PASSWORD_SUBMIT_BUTTON_ID}`).should('be.disabled');

      cy.get(`#${RESET_PASSWORD_NEW_PASSWORD_FIELD_ERROR_TEXT_ID}`).should(
        'contain.text',
        'This password is too weak',
      );

      cy.get(
        `#${RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ERROR_TEXT_ID}`,
      ).should('contain.text', 'This password is too weak');
    });

    it('Without matching passwords', () => {
      cy.setUpApi();
      const token = '1234';
      cy.visit(`${RESET_PASSWORD_PATH}?t=${token}`);

      cy.get(`#${RESET_PASSWORD_NEW_PASSWORD_FIELD_ID}`).type('aPassword1');
      cy.get(`#${RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ID}`).type(
        'aPassword2',
      );
      cy.get(`#${RESET_PASSWORD_SUBMIT_BUTTON_ID}`).click();
      cy.get(`#${RESET_PASSWORD_SUBMIT_BUTTON_ID}`).should('be.disabled');

      cy.get(
        `#${RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ERROR_TEXT_ID}`,
      ).should('contain.text', 'The passwords do not match.');
    });

    it('With server error', () => {
      cy.setUpApi({ shouldFailResetPassword: true });
      const token = '1234';
      cy.visit(`${RESET_PASSWORD_PATH}?t=${token}`);

      cy.get(`#${RESET_PASSWORD_NEW_PASSWORD_FIELD_ID}`).type('aPassword1');
      cy.get(`#${RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ID}`).type(
        'aPassword1',
      );

      cy.get(`#${RESET_PASSWORD_SUBMIT_BUTTON_ID}`).click();

      // the backend fails the request (token is not valid for example)
      cy.get(`#${RESET_PASSWORD_ERROR_MESSAGE_ID}`).should(
        'contain.text',
        'An error prevented the password reset operation.',
      );
    });
  });

  it('Without token', () => {
    cy.setUpApi();
    cy.visit(RESET_PASSWORD_PATH);

    // a rough error message is displayed when the url does not
    // contain the required query string argument `t` containing the token
    cy.get(`#${RESET_PASSWORD_ERROR_MISSING_TOKEN_ID}`).should(
      'contain.text',
      'Error: The current page is missing some required information.',
    );
  });
});
