import { RESET_PASSWORD_PATH } from '../../src/config/paths';
import {
  RESET_PASSWORD_BACK_TO_LOGIN_BUTTON_ID,
  RESET_PASSWORD_ERROR_MESSAGE_ID,
  RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ERROR_TEXT_ID,
  RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ID,
  RESET_PASSWORD_NEW_PASSWORD_FIELD_ERROR_TEXT_ID,
  RESET_PASSWORD_NEW_PASSWORD_FIELD_ID,
  RESET_PASSWORD_SUBMIT_BUTTON_ID,
  RESET_PASSWORD_SUCCESS_MESSAGE_ID,
  RESET_PASSWORD_TOKEN_ERROR_ID,
} from '../../src/config/selectors';
import { MEMBERS } from '../fixtures/members';
import { generateJWT } from './util';

describe('Reset password', () => {
  describe('With valid token', () => {
    it('With strong password', () => {
      cy.setUpApi();

      // this allows to run async code in cypress
      cy.wrap(null).then(async () => {
        const token = await generateJWT('1234');
        cy.visit(`${RESET_PASSWORD_PATH}?t=${token}`);
      });

      cy.get(`#${RESET_PASSWORD_NEW_PASSWORD_FIELD_ID}`).type(
        MEMBERS.GRAASP.password,
      );
      cy.get(`#${RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ID}`).type(
        MEMBERS.GRAASP.password,
      );
      cy.get(`#${RESET_PASSWORD_SUBMIT_BUTTON_ID}`).click();
      cy.get(`#${RESET_PASSWORD_SUCCESS_MESSAGE_ID}`).should('be.visible');
      cy.get(`#${RESET_PASSWORD_BACK_TO_LOGIN_BUTTON_ID}`).should(
        'contain.text',
        'Back to login',
      );
    });

    it('With weak password', () => {
      cy.setUpApi();

      // this allows to run async code in cypress
      cy.wrap(null).then(async () => {
        const token = await generateJWT('1234');
        cy.visit(`${RESET_PASSWORD_PATH}?t=${token}`);
      });
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

      // this allows to run async code in cypress
      cy.wrap(null).then(async () => {
        const token = await generateJWT('1234');
        cy.visit(`${RESET_PASSWORD_PATH}?t=${token}`);
      });

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

      // this allows to run async code in cypress
      cy.wrap(null).then(async () => {
        const token = await generateJWT('1234');
        cy.visit(`${RESET_PASSWORD_PATH}?t=${token}`);
      });

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

  describe('Invalid token', () => {
    it('Without token', () => {
      cy.setUpApi();
      cy.visit(RESET_PASSWORD_PATH);

      // a rough error message is displayed when the url does not
      // contain the required query string argument `t` containing the token
      cy.get(`#${RESET_PASSWORD_TOKEN_ERROR_ID}`).should(
        'contain.text',
        'No token was provided or the provided token is expired.',
      );
    });

    it('Not a JWT token', () => {
      cy.setUpApi();
      cy.visit(`${RESET_PASSWORD_PATH}?t=${'1234'}`);

      // a rough error message is displayed when the url does not
      // contain the required query string argument `t` containing the token
      cy.get(`#${RESET_PASSWORD_TOKEN_ERROR_ID}`).should(
        'contain.text',
        'No token was provided or the provided token is expired.',
      );
    });

    it('Expired token', () => {
      cy.setUpApi();

      // this allows to run async code in cypress
      cy.wrap(null).then(async () => {
        const token = await generateJWT('1234', '25h ago');
        cy.visit(`${RESET_PASSWORD_PATH}?t=${token}`);
      });

      // a rough error message is displayed when the url does not
      // contain the required query string argument `t` containing the token
      cy.get(`#${RESET_PASSWORD_TOKEN_ERROR_ID}`).should(
        'contain.text',
        'No token was provided or the provided token is expired.',
      );
    });
  });
});
