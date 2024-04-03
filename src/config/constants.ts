import { buildSignInPath } from '@graasp/sdk';

import { AUTHENTICATION_HOST, GRAASP_BUILDER_HOST } from './env';

export const APP_NAME = 'Graasp Authentication';

export const NAME_MAXIMUM_LENGTH = 300;
export const NAME_MINIMUM_LENGTH = 2;

export const FORM_INPUT_MIN_WIDTH = 300;

export const ITEM_HEADER_ICON_HEIGHT = 30;
export const AVATAR_ICON_HEIGHT = 30;

export const MEMBER_PROFILE_PATH = `${GRAASP_BUILDER_HOST}/profile`;
export const SIGN_IN_PATH = buildSignInPath({ host: AUTHENTICATION_HOST });
