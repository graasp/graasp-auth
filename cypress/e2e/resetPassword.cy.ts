import { RESET_PASSWORD_PATH } from '../../src/config/paths';
import {
  REQUEST_PASSWORD_RESET_EMAIL_FIELD_HELPER_ID,
  REQUEST_PASSWORD_RESET_EMAIL_FIELD_ID,
  REQUEST_PASSWORD_RESET_ERROR_MESSAGE_ID,
  REQUEST_PASSWORD_RESET_SUBMIT_BUTTON_ID,
  REQUEST_PASSWORD_RESET_SUCCESS_MESSAGE_ID,
} from '../../src/config/selectors';
import { MEMBERS } from '../fixtures/members';

describe('Reset password', () => {
  describe('With valid token', () => {
    it('With strong password', () => {
      cy.setUpApi();
      const token = '1234';
      cy.visit(`${RESET_PASSWORD_PATH}?t=${token}`);

      // request password reset for an existing member
      cy.get(`#${REQUEST_PASSWORD_RESET_EMAIL_FIELD_ID}`).type(
        MEMBERS.GRAASP.email,
      );
      cy.get(`#${REQUEST_PASSWORD_RESET_SUBMIT_BUTTON_ID}`).click();
      cy.get(`#${REQUEST_PASSWORD_RESET_SUCCESS_MESSAGE_ID}`).should(
        'be.visible',
      );
    });
    it('With weak password', () => {
      cy.setUpApi();
      const token = '1234';
      cy.visit(`${RESET_PASSWORD_PATH}?t=${token}`);

      // request password reset for an existing member
      cy.get(`#${REQUEST_PASSWORD_RESET_EMAIL_FIELD_ID}`).type(
        MEMBERS.GRAASP.email,
      );
      cy.get(`#${REQUEST_PASSWORD_RESET_SUBMIT_BUTTON_ID}`).click();
      cy.get(`#${REQUEST_PASSWORD_RESET_SUCCESS_MESSAGE_ID}`).should(
        'be.visible',
      );
    });
  });
  it('Without token', () => {
    cy.setUpApi();
    cy.visit(RESET_PASSWORD_PATH);

    cy.get(`#${REQUEST_PASSWORD_RESET_EMAIL_FIELD_ID}`).type(
      MEMBERS.WRONG_EMAIL.email,
    );

    // click the button to trigger the validation
    cy.get(`#${REQUEST_PASSWORD_RESET_SUBMIT_BUTTON_ID}`).click();
    cy.get(`#${REQUEST_PASSWORD_RESET_SUBMIT_BUTTON_ID}`).should('be.disabled');

    cy.get(`#${REQUEST_PASSWORD_RESET_EMAIL_FIELD_HELPER_ID}`).should(
      'contain.text',
      'This does not look like a valid email address',
    );
  });
  it('With server error', () => {
    cy.setUpApi({ shouldFailRequestPasswordReset: true });
    cy.visit(RESET_PASSWORD_PATH);

    cy.get(`#${REQUEST_PASSWORD_RESET_EMAIL_FIELD_ID}`).type(
      MEMBERS.GRAASP.email,
    );

    cy.get(`#${REQUEST_PASSWORD_RESET_SUBMIT_BUTTON_ID}`).click();

    // expect the backend to fail the request because the captcha was not sent
    cy.get(`#${REQUEST_PASSWORD_RESET_ERROR_MESSAGE_ID}`).should(
      'contain.text',
      'There was an error making your request',
    );
  });
});
