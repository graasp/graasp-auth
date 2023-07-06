import { useSearchParams } from 'react-router-dom';

const enum MobileSearchParams {
  CHALLENGE = 'm',
}

/**
 * Checks whether the auth front-end was loaded from the mobile app
 * This is determined given the presence of the "m" query parameter, which is set to the nonce challenge value only if the page was loaded from mobile
 * @returns { isMobile, challenge } a boolean that indicates if the login is for the mobile app, and the challenge nonce
 */
export const useMobileLogin = () => {
  const [searchParams] = useSearchParams();
  const challenge = searchParams.get(MobileSearchParams.CHALLENGE);
  return {
    isMobile: challenge !== undefined,
    challenge,
  };
};
