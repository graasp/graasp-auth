import { AccountType, CompleteMember, Password } from '@graasp/sdk';

export const MEMBERS = {
  GRAASP: {
    id: 'graasp-id',
    name: 'graasp',
    email: 'graasp@graasp.org',
    password: 'aPassword1',
    nameValid: true,
    emailValid: true,
    passwordValid: true,
    type: AccountType.Individual,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    extra: {},
    enableSaveActions: true,
    isValidated: true,
  },
  GRAASP_OTHER: {
    id: 'graasp_other-id',
    name: 'graasp_other',
    email: 'graasp_other@graasp.org',
    password: 'aPassword2',
    nameValid: true,
    emailValid: true,
    passwordValid: true,
    type: AccountType.Individual,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    extra: {},
    enableSaveActions: true,
    isValidated: true,
  },
  WRONG_NAME: {
    id: 'id1',
    name: 'w',
    email: 'graasp@graasp.org',
    nameValid: false,
    emailValid: true,
    passwordValid: false,
    type: AccountType.Individual,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    extra: {},
    enableSaveActions: true,
    isValidated: true,
  },
  WRONG_EMAIL: {
    id: 'id2',
    name: 'graasp',
    email: 'wrong',
    password: 'test',
    nameValid: true,
    emailValid: false,
    passwordValid: true,
    type: AccountType.Individual,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    extra: {},
    enableSaveActions: true,
    isValidated: true,
  },
  WRONG_PASSWORD: {
    id: 'id3',
    name: 'graasp',
    email: 'graasp@graasp.org',
    password: 'test',
    nameValid: true,
    emailValid: true,
    passwordValid: false,
    type: AccountType.Individual,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    extra: {},
    enableSaveActions: true,
    isValidated: true,
  },
  BOB: {
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130004',
    name: 'bob',
    email: 'bob@email.com',
    createdAt: '2021-04-13 14:56:34.749946',
    extra: { lang: 'en' },
    type: AccountType.Individual,
    updatedAt: new Date().toISOString(),
    enableSaveActions: true,
    isValidated: true,
  },
  CEDRIC: {
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130006',
    name: 'cedric',
    email: 'cedric@email.com',
    createdAt: '2021-04-13 14:56:34.749946',
    type: AccountType.Individual,
    updatedAt: new Date().toISOString(),
    extra: {},
    enableSaveActions: true,
    isValidated: true,
  },
} satisfies {
  [name: string]: CompleteMember & {
    nameValid?: boolean;
    emailValid?: boolean;
    passwordValid?: boolean;
    password?: Password;
  };
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
