export const buildSignInPath = (to) => {
  const qs = to ? `?to=${to}` : '';
  return `/signin${qs}`;
};
export const SIGN_UP_PATH = '/signup';
export const HOME_PATH = '/';
