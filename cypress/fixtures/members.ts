import { Member, MemberType } from '@graasp/sdk';

export const MEMBERS: {
  [name: string]: Member & {
    nameValid?: boolean;
    emailValid?: boolean;
    passwordValid?: boolean;
  };
} = {
  GRAASP: {
    id: 'graasp-id',
    name: 'graasp',
    email: 'graasp@graasp.org',
    password: 'test',
    nameValid: true,
    emailValid: true,
    passwordValid: true,
    type: MemberType.Individual,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    extra: {},
  },
  GRAASP_OTHER: {
    id: 'graasp_other-id',
    name: 'graasp_other',
    email: 'graasp_other@graasp.org',
    password: 'test',
    nameValid: true,
    emailValid: true,
    passwordValid: true,
    type: MemberType.Individual,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    extra: {},
  },
  WRONG_NAME: {
    id: 'id1',
    name: 'w',
    email: 'graasp@graasp.org',
    nameValid: false,
    emailValid: true,
    passwordValid: false,
    type: MemberType.Individual,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    extra: {},
  },
  WRONG_EMAIL: {
    id: 'id2',
    name: 'graasp',
    email: 'wrong',
    password: 'test',
    nameValid: true,
    emailValid: false,
    passwordValid: true,
    type: MemberType.Individual,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    extra: {},
  },
  WRONG_PASSWORD: {
    id: 'id3',
    name: 'graasp',
    email: 'graasp@graasp.org',
    password: 'test',
    nameValid: true,
    emailValid: true,
    passwordValid: false,
    type: MemberType.Individual,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    extra: {},
  },
  BOB: {
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130004',
    name: 'bob',
    email: 'bob@email.com',
    createdAt: '2021-04-13 14:56:34.749946',
    extra: { lang: 'en' },
    type: MemberType.Individual,
    updatedAt: new Date().toISOString(),
  },
  CEDRIC: {
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130006',
    name: 'cedric',
    email: 'cedric@email.com',
    createdAt: '2021-04-13 14:56:34.749946',
    type: MemberType.Individual,
    updatedAt: new Date().toISOString(),
    extra: {},
  },
};

export default MEMBERS;

export const MOCK_SESSIONS = [
  {
    id: MEMBERS.BOB.id,
    token: 'bob-token',
    createdAt: Date.now().toLocaleString(),
  },
  {
    id: MEMBERS.CEDRIC.id,
    token: 'cedric-token',
    createdAt: Date.now().toLocaleString(),
  },
];
