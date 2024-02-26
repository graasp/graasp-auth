import { StatusCodes } from 'http-status-codes';

import { API_ROUTES } from '@graasp/query-client';

const { buildGetMember, GET_CURRENT_MEMBER_ROUTE } = API_ROUTES;

// use simple id format for tests
export const ID_FORMAT = '(?=.*[0-9])(?=.*[a-zA-Z])([a-z0-9-]+)';

const API_HOST = Cypress.env('API_HOST');

export const redirectionReply = {
  headers: { 'content-type': 'application/json' },
  statusCode: StatusCodes.OK,
  body: null,
};

export const mockGetCurrentMember = (
  currentMember = null,
  shouldThrowError = false,
) => {
  cy.intercept(
    {
      method: 'get',
      url: `${API_HOST}/${GET_CURRENT_MEMBER_ROUTE}`,
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

export const mockGetMember = (members) => {
  cy.intercept(
    {
      method: 'get',
      url: new RegExp(`${API_HOST}/${buildGetMember(ID_FORMAT)}$`),
    },
    ({ url, reply }) => {
      const memberId = url.slice(API_HOST.length).split('/')[2];
      const member = members.find(({ id: mId }) => mId === memberId);

      // member does not exist in db
      if (!member) {
        return reply({
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      return reply({
        body: member,
        statusCode: StatusCodes.OK,
      });
    },
  ).as('getMember');
};
export const mockGetMembers = (members) => {
  cy.intercept(
    {
      method: 'get',
      url: `${API_HOST}/members?id=`,
    },
    ({ url, reply }) => {
      const memberIds = new URLSearchParams(url).getAll('id');
      const allMembers = (memberIds as string[])?.map((id) =>
        members.find(({ id: mId }) => mId === id),
      );
      // member does not exist in db
      if (!allMembers) {
        return reply({
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      return reply({
        body: allMembers,
        statusCode: StatusCodes.OK,
      });
    },
  ).as('getMembers');
};
