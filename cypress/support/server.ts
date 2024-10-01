import { StatusCodes } from 'http-status-codes';

import { API_ROUTES } from '@graasp/query-client';
import { CompleteMember, HttpMethod } from '@graasp/sdk';

const { buildGetCurrentMemberRoute } = API_ROUTES;

const API_HOST = Cypress.env('VITE_GRAASP_API_HOST');

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
