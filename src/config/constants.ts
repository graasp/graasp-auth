import { buildSignInPath } from '@graasp/sdk';

export const { REACT_APP_GA_MEASUREMENT_ID: GA_MEASUREMENT_ID, NODE_ENV } =
  process.env;

export const DOMAIN = process.env.REACT_APP_DOMAIN;

export const APP_NAME = 'Graasp Authentication';

export const API_HOST =
  process.env.REACT_APP_API_HOST || 'http://localhost:3000';

export const SHOW_NOTIFICATIONS =
  process.env.REACT_APP_SHOW_NOTIFICATIONS === 'true' || false;

export const GRAASP_COMPOSE_HOST =
  process.env.REACT_APP_GRAASP_COMPOSE_HOST ?? 'http://localhost:3111';

export const AUTHENTICATION_HOST =
  process.env.REACT_APP_AUTHENTICATION_HOST || 'http://localhost:3001';

export const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

export const NAME_MAXIMUM_LENGTH = 300;
export const NAME_MINIMUM_LENGTH = 2;

export const FORM_INPUT_MIN_WIDTH = 300;

export const THUMBNAIL_SIZES = {
  SMALL: 'small',
};

export const ITEM_HEADER_ICON_HEIGHT = 30;
export const AVATAR_ICON_HEIGHT = 30;

export const MEMBER_PROFILE_PATH = `${GRAASP_COMPOSE_HOST}/profile`;
export const SIGN_IN_PATH = buildSignInPath({ host: AUTHENTICATION_HOST });
