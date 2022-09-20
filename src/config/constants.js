import env from '../env.json';

const {
  GRAASP_COMPOSE_HOST: ENV_GRAASP_COMPOSE_HOST,
  API_HOST: ENV_API_HOST,
  SHOW_NOTIFICATIONS: ENV_SHOW_NOTIFICATIONS,
  REACT_APP_DOMAIN: ENV_DOMAIN,
} = env;

export const DOMAIN = ENV_DOMAIN || process.env.REACT_APP_DOMAIN;

export const APP_NAME = 'Graasp Authentication';

export const API_HOST =
  ENV_API_HOST || process.env.REACT_APP_API_HOST || 'http://localhost:3111';

export const SHOW_NOTIFICATIONS =
  ENV_SHOW_NOTIFICATIONS ||
  process.env.REACT_APP_SHOW_NOTIFICATIONS === 'true' ||
  false;

export const GRAASP_COMPOSE_HOST =
  ENV_GRAASP_COMPOSE_HOST ||
  process.env.REACT_APP_GRAASP_COMPOSE_HOST ||
  'http://localhost:3111';

export const NAME_MAXIMUM_LENGTH = 300;
export const NAME_MINIMUM_LENGTH = 2;

export const FORM_INPUT_MIN_WIDTH = 300;

export const ENABLE_MOCK_API = process.env.REACT_APP_ENABLE_MOCK_API === 'true';
