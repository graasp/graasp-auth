import { Trans } from 'react-i18next';

import { Box, Link, Typography } from '@mui/material';

import { useAuthTranslation } from '../config/i18n';
import { AUTH } from '../langs/constants';

const ReCAPTCHANotice = () => {
  const { t } = useAuthTranslation();
  return (
    <Box>
      <Typography color="text.secondary" fontSize="0.5rem">
        {t(AUTH.SITE_PROTECTED_BY_RECAPTCHA)}
      </Typography>
      <Typography color="text.secondary" fontSize="0.5rem">
        <Trans i18nKey={AUTH.GOOGLE_PRIVACY_AND_TERMS} t={t}>
          <Link
            color="text.secondary"
            href="https://policies.google.com/privacy"
          >
            Privacy Policy
          </Link>
          <Link color="text.secondary" href="https://policies.google.com/terms">
            Terms of Service
          </Link>
        </Trans>
      </Typography>
    </Box>
  );
};
export default ReCAPTCHANotice;
