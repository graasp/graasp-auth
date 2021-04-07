import qs from 'qs';

export const buildSignInPath = (to) =>
  `/signin${qs.stringify({ to }, { addQueryPrefix: true })}`;
export const SIGN_UP_PATH = '/signup';
export const HOME_PATH = '/';
