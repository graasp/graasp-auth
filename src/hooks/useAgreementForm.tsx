import { useState } from 'react';

import { GRAASP_LANDING_PAGE_HOST } from '../config/env';
import { useAuthTranslation } from '../config/i18n';
import { AUTH } from '../langs/constants';

export type UseAgreementForm = {
  userHasAcceptedAllTerms: boolean;
  updateUserAgreements: (hasAgreed: boolean) => void;
  verifyUserAgreements: () => boolean;
  hasError: boolean;
  termsOfServiceLink: string;
  privacyPolicyLink: string;
};

export const useAgreementForm = (): UseAgreementForm => {
  const { t } = useAuthTranslation();

  const [userHasAcceptedAllTerms, setUserHasAcceptedAllTerms] = useState(false);
  const [hasError, setHasError] = useState(false);

  let termsOfServiceLink = t(AUTH.TERMS_OF_SERVICE_LINK);
  let privacyPolicyLink = t(AUTH.PRIVACY_POLICY_LINK);

  const updateUserAgreements = (hasAgreed: boolean) => {
    setUserHasAcceptedAllTerms(hasAgreed);
    if (hasAgreed && hasError) {
      setHasError(false);
    }
  };
  const verifyUserAgreements = () => {
    const valid = userHasAcceptedAllTerms;
    setHasError(!valid);
    return valid;
  };
  const getURLInLang = (pathUrl: string) => {
    return new URL(pathUrl, GRAASP_LANDING_PAGE_HOST).href;
  };

  privacyPolicyLink = getURLInLang(t(AUTH.PRIVACY_POLICY_LINK));
  termsOfServiceLink = getURLInLang(t(AUTH.TERMS_OF_SERVICE_LINK));

  return {
    userHasAcceptedAllTerms,
    updateUserAgreements,
    verifyUserAgreements,
    hasError,
    termsOfServiceLink,
    privacyPolicyLink,
  };
};
