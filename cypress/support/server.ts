import { StatusCodes } from 'http-status-codes';

import { API_ROUTES } from '@graasp/query-client';
import { CompleteMember, HttpMethod } from '@graasp/sdk';

const { buildGetCurrentMemberRoute } = API_ROUTES;

const API_HOST = Cypress.env('VITE_GRAASP_API_HOST');
const DEFAULT_REDIRECTION_URL = Cypress.env('VITE_DEFAULT_REDIRECTION_URL');

export const redirectionReply = {
  headers: { 'content-type': 'application/json' },
  statusCode: StatusCodes.OK,
  body: null,
};

export const mockGetCurrentMember = (
  currentMember: CompleteMember | null = null,
  shouldThrowError = false,
) => {
  cy.intercept(
    {
      method: HttpMethod.Get,
      url: `${API_HOST}/${buildGetCurrentMemberRoute()}`,
    },
    ({ reply }) => {
      if (shouldThrowError) {
        return reply({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          body: null,
        });
      }

      // might reply empty user when signed out
      return reply({ statusCode: StatusCodes.OK, body: currentMember });
    },
  ).as('getCurrentMember');
};

export const mockGetStatus = (shouldThrowServerError = false) => {
  cy.intercept(
    {
      method: HttpMethod.Get,
      url: `${API_HOST}/status`,
    },
    ({ reply }) => {
      if (shouldThrowServerError) {
        return reply({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR });
      }
      return reply({ statusCode: StatusCodes.OK });
    },
  ).as('getStatus');
};

export const mockRequestPasswordReset = (shouldThrowServerError = false) => {
  cy.intercept(
    {
      method: HttpMethod.Post,
      url: `${API_HOST}/password/reset`,
    },
    ({ reply }) => {
      if (shouldThrowServerError) {
        // member email was not found
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }
      return reply({ statusCode: StatusCodes.NO_CONTENT });
    },
  ).as('requestPasswordReset');
};

export const mockResetPassword = (shouldThrowServerError = false) => {
  cy.intercept(
    {
      method: HttpMethod.Patch,
      url: `${API_HOST}/password/reset`,
    },
    ({ reply }) => {
      if (shouldThrowServerError) {
        // token is not present or password is too weak
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }
      return reply({ statusCode: StatusCodes.NO_CONTENT });
    },
  ).as('resetPassword');
};

export const mockRedirection = () => {
  cy.intercept(
    {
      method: HttpMethod.Get,
      url: DEFAULT_REDIRECTION_URL,
    },
    ({ reply }) =>
      reply({
        body: '<h1>Content</h1>',
        headers: { 'content-type': 'text/html' },
      }),
  ).as('redirectionContent');
};

export const mockLogin = (shouldThrowServerError = false) => {
  cy.intercept(
    {
      method: HttpMethod.Post,
      url: `${API_HOST}/login`,
    },
    ({ reply }) => {
      if (shouldThrowServerError) {
        // token is not present or password is too weak
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }
      return reply({ statusCode: StatusCodes.NO_CONTENT });
    },
  ).as('login');
};
