import { useEffect, useState } from 'react';

import { GRAASP_LANDING_PAGE_HOST } from '../config/env';
import { useAuthTranslation } from '../config/i18n';
import { AUTH } from '../langs/constants';

export type UseAgreementForm = {
  userHasAcceptAllTerms: boolean;
  updateUserAgreements: (hasAgree: boolean) => void;
  verifyUserAgreements: () => boolean;
  hasError: boolean;
  termsOfServiceLink: string;
  privacyPolicyLink: string;
};

export const useAgreementForm = (): UseAgreementForm => {
  const { t, i18n } = useAuthTranslation();

  const [userHasAcceptAllTerms, setUserHasAcceptAllTerms] = useState(false);
  const [termsOfServiceLink, setTermsOfServiceLink] = useState(
    t(AUTH.TERMS_OF_SERVICE_LINK),
  );
  const [privacyPolicyLink, setPrivacyPolicyLink] = useState(
    t(AUTH.PRIVACY_POLICY_LINK),
  );
  const [hasError, setHasError] = useState(false);

  const updateUserAgreements = (hasAgree: boolean) => {
    setUserHasAcceptAllTerms(hasAgree);
    if (hasAgree && hasError) {
      setHasError(false);
    }
  };
  const verifyUserAgreements = () => {
    const valid = userHasAcceptAllTerms;
    setHasError(!valid);
    return valid;
  };
  const getURLInLang = (pathUrl: string) => {
    return new URL(pathUrl, GRAASP_LANDING_PAGE_HOST).href;
  };

  useEffect(() => {
    setPrivacyPolicyLink(getURLInLang(t(AUTH.PRIVACY_POLICY_LINK)));
    setTermsOfServiceLink(getURLInLang(t(AUTH.TERMS_OF_SERVICE_LINK)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  return {
    userHasAcceptAllTerms,
    updateUserAgreements,
    verifyUserAgreements,
    hasError,
    termsOfServiceLink,
    privacyPolicyLink,
  };
};
