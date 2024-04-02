import { useState } from 'react';

import { FormGroup } from '@mui/material';

import {
  PRIVACY_POLICY_LINK,
  TERMS_OF_SERVICE_LINK,
} from '../config/constants';
import { useAuthTranslation } from '../config/i18n';
import {
  SIGN_UP_PRIVACY_POLICY_CHECKBOX_ID,
  SIGN_UP_TERM_OF_SERVICE_CHECKBOX_ID,
} from '../config/selectors';
import { AUTH } from '../langs/constants';
import { AgreementCheckbox } from './AgreementCheckbox';

type Props = {
  onChange: (areAllChecked: boolean) => void;
};

export const AgreementForm = ({ onChange }: Props) => {
  const { t } = useAuthTranslation();

  const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false);
  const [isTermsOfServiceChecked, setIsTermsOfServiceChecked] = useState(false);

  const privacyPolicyChanged = (isChecked: boolean) => {
    setIsPrivacyPolicyChecked(isChecked);
    onChange(isChecked && isTermsOfServiceChecked);
  };

  const termsOfServiceChanged = (isChecked: boolean) => {
    setIsTermsOfServiceChecked(isChecked);
    onChange(isChecked && isPrivacyPolicyChecked);
  };

  return (
    <FormGroup>
      <AgreementCheckbox
        label={t(AUTH.PRIVACY_POLICY_CHECKBOX_LABEL)}
        link={PRIVACY_POLICY_LINK}
        linkLabel={t(AUTH.PRIVACY_POLICY_LINK_LABEL)}
        isChecked={isPrivacyPolicyChecked}
        onChange={(isChecked) => privacyPolicyChanged(isChecked)}
        dataCy={SIGN_UP_PRIVACY_POLICY_CHECKBOX_ID}
      />

      <AgreementCheckbox
        label={t(AUTH.TERMS_OF_SERVICE_CHECKBOX_LABEL)}
        link={TERMS_OF_SERVICE_LINK}
        linkLabel={t(AUTH.TERMS_OF_SERVICE_LINK_LABEL)}
        isChecked={isTermsOfServiceChecked}
        onChange={(isChecked) => termsOfServiceChanged(isChecked)}
        dataCy={SIGN_UP_TERM_OF_SERVICE_CHECKBOX_ID}
      />
    </FormGroup>
  );
};
