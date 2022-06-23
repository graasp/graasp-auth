import { COOKIE_KEYS, getCurrentSession } from '@graasp/utils';

import { HOME_PATH } from '../../src/config/paths';
import {
  USER_SWITCH_ID,
  buildMemberMenuItemId,
} from '../../src/config/selectors';
import { MOCK_SESSIONS } from '../fixtures/members';

describe('Sign In With Stored Session', () => {
  it('Hide user switch if no stored sessions', () => {
    cy.setUpApi();

    cy.visit(HOME_PATH);
    cy.get(`#${USER_SWITCH_ID}`).should('not.exist');
  });

  it('Sign in with a stored user and redirect to saved url', () => {
    // setup cookies
    cy.setUpApi({ storedSessions: MOCK_SESSIONS });

    cy.visit(HOME_PATH);
    cy.get(`#${USER_SWITCH_ID}`).click();

    MOCK_SESSIONS.forEach(({ id }) => {
      cy.get(`#${buildMemberMenuItemId(id)}`).should('be.visible');
    });

    // switch to first user
    cy.get(`#${buildMemberMenuItemId(MOCK_SESSIONS[0].id)}`)
      .click()
      .then(() => {
        // session cookie should be different
        const currentCookie = getCurrentSession();
        expect(currentCookie).to.equal(MOCK_SESSIONS[0].token);
      });
    cy.getCookie(COOKIE_KEYS.SESSION_KEY).should(
      'have.property',
      'value',
      MOCK_SESSIONS[0].token,
    );
  });
});
