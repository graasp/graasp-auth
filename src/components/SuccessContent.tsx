import { useState } from 'react';
import { Trans } from 'react-i18next';

import { MUTATION_KEYS } from '@graasp/query-client';
import { RecaptchaAction } from '@graasp/sdk';
import { AUTH, namespaces } from '@graasp/translations';
import { Button } from '@graasp/ui';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Container, Stack, Typography } from '@mui/material';

import { useAuthTranslation } from '../config/i18n';
import { useMutation } from '../config/queryClient';
import { SUCCESS_CONTENT_ID } from '../config/selectors';
import { BACK_BUTTON_ID, RESEND_EMAIL_BUTTON_ID } from '../config/selectors';
import { useRecaptcha } from '../context/RecaptchaContext';

type Props = {
  title: string;
  email: string;
  handleBackButtonClick?: () => void;
};

const SuccessContent = ({
  title,
  email,
  handleBackButtonClick = null,
}: Props) => {
  const { t } = useAuthTranslation();
  const { executeCaptcha } = useRecaptcha();
  const [isEmailSent, setIsEmailSent] = useState(false);

  // used for resend email
  const { mutate: signIn } = useMutation<
    unknown,
    unknown,
    { email: string; captcha: string }
  >(MUTATION_KEYS.SIGN_IN);

  // used for resend email
  const handleResendEmail = async () => {
    const lowercaseEmail = email.toLowerCase();
    const token = await executeCaptcha(RecaptchaAction.SignInWithPassword);
    signIn({ email: lowercaseEmail, captcha: token });
  };

  const onClickResendEmail = () => {
    setIsEmailSent(true);
    handleResendEmail();
  };

  return (
    <Container id={SUCCESS_CONTENT_ID}>
      <Typography
        variant="h4"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <MailOutlineIcon fontSize="large" sx={{ marginRight: 1 }} />
        {title}
      </Typography>
      <Typography variant="body1">
        <Trans
          ns={namespaces.auth}
          i18nKey={AUTH.SIGN_IN_SUCCESS_TEXT}
          values={{ email }}
          components={{ bold: <strong /> }}
        />
      </Typography>
      <br />
      <Typography variant="body1">
        {t(AUTH.SIGN_IN_SUCCESS_EMAIL_PROBLEM)}
      </Typography>
      <br />
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
    </Container>
  );
};

export default SuccessContent;
