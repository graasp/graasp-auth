import {
  EMAIL_SIGN_IN_FIELD_ID,
  EMAIL_SIGN_IN_MAGIC_LINK_FIELD_ID,
  EMAIL_SIGN_UP_FIELD_ID,
  NAME_SIGN_UP_FIELD_ID,
  PASSWORD_SIGN_IN_BUTTON_ID,
  PASSWORD_SIGN_IN_FIELD_ID,
  SIGN_IN_BUTTON_ID,
  SIGN_UP_BUTTON_ID,
} from '../../src/config/selectors';

export const fillSignUpLayout = ({
  name,
  email,
}: {
  name: string;
  email?: string;
}) => {
  cy.get(`#${NAME_SIGN_UP_FIELD_ID}`).clear().type(name);
  if (email) {
    cy.get(`#${EMAIL_SIGN_UP_FIELD_ID}`).clear().type(email);
  }
};

export const checkInvitationFields = ({
  name,
  email,
}: {
  name?: string;
  email: string;
}) => {
  if (name) {
    cy.get(`#${NAME_SIGN_UP_FIELD_ID}`)
      .should('have.value', name)
      .should('be.disabled');
  }
  cy.get(`#${EMAIL_SIGN_UP_FIELD_ID}`)
    .should('have.value', email)
    .should('be.disabled');
};

export const fillSignInByMailLayout = ({ email }: { email?: string }) => {
  if (email) {
    cy.get(`#${EMAIL_SIGN_IN_MAGIC_LINK_FIELD_ID}`).clear().type(email);
  }
};

export const submitSignIn = () => {
  cy.get(`#${SIGN_IN_BUTTON_ID}`).click();
};

export const submitSignUp = () => {
  cy.get(`#${SIGN_UP_BUTTON_ID}`).click();
};

export const fillPasswordSignInLayout = ({
  email,
  password,
}: {
  email: string;
  password?: string;
}) => {
  cy.get(`#${EMAIL_SIGN_IN_FIELD_ID}`).clear().type(email);
  if (password) {
    cy.get(`#${PASSWORD_SIGN_IN_FIELD_ID}`).clear().type(password);
  }
};

export const submitPasswordSignIn = () => {
  cy.get(`#${PASSWORD_SIGN_IN_BUTTON_ID}`).click();
};
