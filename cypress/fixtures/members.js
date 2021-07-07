export const MEMBERS = {
  GRAASP: {
    id: 'graasp-id',
    name: 'graasp',
    email: 'graasp@graasp.org',
    nameValid: true,
    emailValid: true,
  },
  WRONG_NAME: {
    id: 'id1',
    name: 'w',
    email: 'graasp@graasp.org',
    nameValid: false,
    emailValid: true,
  },
  WRONG_EMAIL: {
    id: 'id2',
    name: 'graasp',
    email: 'wrong',
    nameValid: true,
    emailValid: false,
  },
};

export default MEMBERS;
