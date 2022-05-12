import { checkRequest, DEFAULT_GET } from './utils';
import { API_HOST } from '../config/constants';
import { GET_CURRENT_MEMBER_ENDPOINT } from './endpoints';

// eslint-disable-next-line import/prefer-default-export
export const getCurrentMember = async () => {
  const res = await fetch(`${API_HOST}/${GET_CURRENT_MEMBER_ENDPOINT}`, {
    ...DEFAULT_GET,
  }).then(checkRequest);

  return res.json();
};
