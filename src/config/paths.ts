import qs from 'qs';

export const buildSignInPath = (to?: string) =>
  `/signin${qs.stringify({ to }, { addQueryPrefix: true })}`;
export const SIGN_UP_PATH = '/signup';
export const HOME_PATH = '/';
export const SIGN_IN_PATH = '/signin';
