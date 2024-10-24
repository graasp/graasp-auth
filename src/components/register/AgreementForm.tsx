import { Trans } from 'react-i18next';

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';

import { useAuthTranslation } from '../../config/i18n';
import { SIGN_UP_AGREEMENTS_CHECKBOX_ID } from '../../config/selectors';
import { UseAgreementForm } from '../../hooks/useAgreementForm';
import { AUTH } from '../../langs/constants';

type Props = {
  useAgreementForm: UseAgreementForm;
};

export function AgreementForm({ useAgreementForm }: Props) {
  const { t } = useAuthTranslation();
  const {
    userHasAcceptedAllTerms,
    updateUserAgreements,
    hasError,
    privacyPolicyLink,
    termsOfServiceLink,
  } = useAgreementForm;

  const errorColor = 'error';

  return (
    <FormGroup>
      <FormControlLabel
        checked={userHasAcceptedAllTerms}
        onChange={(_, checked) => updateUserAgreements(checked)}
        required
        control={
          <Checkbox
            color={hasError ? errorColor : 'primary'}
            data-cy={SIGN_UP_AGREEMENTS_CHECKBOX_ID}
            size="small"
          />
        }
        label={
          <Typography
            display="inline"
            fontSize="small"
            color={hasError ? errorColor : 'default'}
          >
            <Trans
              i18nKey={AUTH.USER_AGREEMENTS_CHECKBOX_LABEL}
              values={{
                sign_up_btn: t(AUTH.SIGN_UP_BUTTON),
                terms_of_service: t(AUTH.USER_AGREEMENTS_TERMS_OF_SERVICE),
                privacy_policy: t(AUTH.USER_AGREEMENTS_PRIVACY_POLICY),
              }}
              components={[
                <strong key="sign_up_btn"></strong>,
                <a
                  key="terms_of_service_link"
                  href={termsOfServiceLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  _
                </a>,
                <a
                  key="privacy_policy_link"
                  href={privacyPolicyLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  _
                </a>,
              ]}
              t={t}
            />
          </Typography>
        }
      />
    </FormGroup>
  );
}
