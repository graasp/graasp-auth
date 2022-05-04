import { StatusCodes } from 'http-status-codes';

export const DEFAULT_GET = {
  credentials: 'include',
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

export const DEFAULT_POST = {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
};

export const DEFAULT_DELETE = {
  method: 'DELETE',
  credentials: 'include',
};

export const DEFAULT_PATCH = {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
};

export const DEFAULT_PUT = {
  method: 'PUT',
  credentials: 'include',
};

export class CustomError extends Error {
  response;

  constructor(message, response) {
    super(message);
    this.response = response;
  }
}

export const checkRequest = (res) => {
  if (res.ok) {
    return res;
  }

  throw new CustomError(res.statusText, res);
};
export const checkSeeOther = (res) => {
  if (res?.status === StatusCodes.SEE_OTHER) {
    return res;
  }

  throw new CustomError(res?.statusText, res);
};
