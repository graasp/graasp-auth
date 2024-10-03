import { isAfter } from 'date-fns/isAfter';
import { jwtDecode } from 'jwt-decode';

export const useValidateJWTToken = (token: string | null) => {
  if (token) {
    // decode JWT
    try {
      const { exp } = jwtDecode(token);
      // if there is an expiration date
      if (exp) {
        // we need to multiply the expiration date by 1000 to convert it form seconds to milliseconds
        const expiration = exp * 1000;
        if (isAfter(expiration, Date.now())) {
          return { isValid: true as const, token };
        }
      }
    } catch {
      console.error('Token is not a JWT.');
    }
  }
  return { isValid: false as const, token: null };
};
