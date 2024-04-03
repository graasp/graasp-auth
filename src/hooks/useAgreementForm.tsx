import { useEffect, useState } from 'react';

import { GRAASP_LANDING_PAGE_HOST } from '../config/env';
import { useAuthTranslation } from '../config/i18n';
import { AUTH } from '../langs/constants';

type Props = {
  onChange: (areAllChecked: boolean) => void;
};

export const useAgreementForm = ({ onChange }: Props) => {
  const { t, i18n } = useAuthTranslation();

  const [areTermsChecked, setAreTermsChecked] = useState(false);
  const [termsOfServiceLink, setTermsOfServiceLink] = useState(
    t(AUTH.TERMS_OF_SERVICE_LINK),
  );
  const [privacyPolicyLink, setPrivacyPolicyLink] = useState(
    t(AUTH.PRIVACY_POLICY_LINK),
  );

  const getURLInLang = (pathUrl: string) => {
    return new URL(pathUrl, GRAASP_LANDING_PAGE_HOST).href;
  };

  useEffect(() => {
    setPrivacyPolicyLink(getURLInLang(t(AUTH.PRIVACY_POLICY_LINK)));
    setTermsOfServiceLink(getURLInLang(t(AUTH.TERMS_OF_SERVICE_LINK)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const handleChanges = (isChecked: boolean) => {
    setAreTermsChecked(isChecked);
    onChange(isChecked);
  };

  return {
    areTermsChecked,
    handleChanges,
    termsOfServiceLink,
    privacyPolicyLink,
  };
};
