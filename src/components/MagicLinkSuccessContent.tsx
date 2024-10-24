import { useState } from 'react';
import { Trans } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { RecaptchaAction } from '@graasp/sdk';
import { namespaces } from '@graasp/translations';
import { Button } from '@graasp/ui';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Box, Stack, Typography } from '@mui/material';

import { useAuthTranslation } from '../config/i18n';
import { mutations } from '../config/queryClient';
import {
  BACK_BUTTON_ID,
  RESEND_EMAIL_BUTTON_ID,
  SUCCESS_CONTENT_ID,
} from '../config/selectors';
import { useRecaptcha } from '../context/RecaptchaContext';
import { useRedirection } from '../hooks/searchParams';
import { AUTH } from '../langs/constants';
import { LeftContentContainer } from './LeftContentContainer';

const NAVIGATE_BACK = -1;

export function MagicLinkSuccessContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useAuthTranslation();
  const { executeCaptcha } = useRecaptcha();
  const [isEmailSent, setIsEmailSent] = useState(false);

  // used for resend email
  const redirect = useRedirection();
  const { mutate: signIn } = mutations.useSignIn();

  const email = searchParams.get('email');

  if (!email) {
    console.error('Missing email query param');
    return null;
  }

  // used for resend email
  const handleResendEmail = async () => {
    const lowercaseEmail = email.toLowerCase();
    const token = await executeCaptcha(RecaptchaAction.SignIn);
    signIn({
      email: lowercaseEmail,
      captcha: token,
      url: redirect.url,
    });
  };

  const onClickResendEmail = () => {
    setIsEmailSent(true);
    handleResendEmail();
  };

  const handleBackButtonClick = () => {
    navigate(NAVIGATE_BACK);
  };

  return (
    <LeftContentContainer>
      <Box id={SUCCESS_CONTENT_ID} maxWidth="sm">
        <Stack direction="column" spacing={2}>
          <Typography
            variant="h4"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <MailOutlineIcon fontSize="large" sx={{ marginRight: 1 }} />
            {t(AUTH.SIGN_IN_SUCCESS_TITLE)}
          </Typography>
          <Typography variant="body1" align="justify">
            <Trans
              ns={namespaces.auth}
              i18nKey={AUTH.SIGN_IN_SUCCESS_TEXT}
              values={{ email }}
              components={{ bold: <strong /> }}
            />
          </Typography>
          <Typography variant="body1" align="justify">
            {t(AUTH.SIGN_IN_SUCCESS_EMAIL_PROBLEM)}
          </Typography>
          <Stack direction="row" justifyContent="center" spacing={1}>
            <Button
              variant="text"
              color="primary"
              id={BACK_BUTTON_ID}
              onClick={handleBackButtonClick}
            >
              {t(AUTH.BACK_BUTTON)}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={onClickResendEmail}
              id={RESEND_EMAIL_BUTTON_ID}
              disabled={isEmailSent}
            >
              {t(AUTH.RESEND_EMAIL_BUTTON)}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </LeftContentContainer>
  );
}
