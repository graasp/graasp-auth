import { API_HOST } from '../config/constants';
import {
  DEFAULT_GET,
  DEFAULT_POST,
  checkRequest,
  checkSeeOther,
} from './utils';

// payload = {email}
export const signIn = async (payload) => {
  const req = await fetch(`${API_HOST}/login`, {
    ...DEFAULT_POST,
    body: JSON.stringify(payload),
  }).then(checkRequest);
  return req.ok;
};

// payload = {email, password}
export const signInPassword = async (payload) => {
  const req = await fetch(`${API_HOST}/login-password`, {
    ...DEFAULT_POST,
    body: JSON.stringify(payload),
  }).then(checkSeeOther);
  const data = await req.json();
  return data.resource;
};

export const signOut = async () => {
  const req = await fetch(`${API_HOST}/logout`, DEFAULT_GET).then(checkRequest);
  return req.ok;
};

// payload = {name, mail}
export const signUp = async (payload) => {
  const req = await fetch(`${API_HOST}/register`, {
    ...DEFAULT_POST,
    body: JSON.stringify(payload),
  }).then(checkRequest);
  return req.ok;
};
