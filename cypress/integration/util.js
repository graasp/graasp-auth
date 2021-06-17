import {
  EMAIL_SIGN_IN_FIELD_ID,
  EMAIL_SIGN_UP_FIELD_ID,
  NAME_SIGN_UP_FIELD_ID,
  SIGN_IN_BUTTON_ID,
  SIGN_UP_BUTTON_ID,
} from '../../src/config/selectors';

export const fillSignUpLayout = ({ name, email }) => {
  cy.get(`#${NAME_SIGN_UP_FIELD_ID}`).clear().type(name);
  cy.get(`#${EMAIL_SIGN_UP_FIELD_ID}`).clear().type(email);
};

export const fillSignInLayout = (email) => {
  cy.get(`#${EMAIL_SIGN_IN_FIELD_ID}`).clear().type(email);
};

export const submitSignIn = () => {
  cy.get(`#${SIGN_IN_BUTTON_ID}`).click();
};

export const submitSignUp = () => {
  cy.get(`#${SIGN_UP_BUTTON_ID}`).click();
};
export const checkErrorTextField = (id, flag) => {
  const existence = flag ? 'exist' : 'not.exist';
  cy.get(`#${id}-helper-text`).should(existence);
};
