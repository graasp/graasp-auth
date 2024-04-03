import { Trans } from 'react-i18next';

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';

import { useAuthTranslation } from '../config/i18n';
import { SIGN_UP_TERM_OF_SERVICE_CHECKBOX_ID } from '../config/selectors';
import { useAgreementForm } from '../hooks/useAgreementForm';
import { AUTH } from '../langs/constants';

type Props = {
  onChange: (areAllChecked: boolean) => void;
};

export const AgreementForm = ({ onChange }: Props) => {
  const { t } = useAuthTranslation();
  const {
    areTermsChecked,
    handleChanges,
    privacyPolicyLink,
    termsOfServiceLink,
  } = useAgreementForm({ onChange });

  return (
    <FormGroup>
      <FormControlLabel
        checked={areTermsChecked}
        onChange={(_, checked) => handleChanges(checked)}
        required
        control={
          <Checkbox
            data-cy={SIGN_UP_TERM_OF_SERVICE_CHECKBOX_ID}
            size="small"
          />
        }
        label={
          <Typography display="inline" fontSize="small">
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
};
