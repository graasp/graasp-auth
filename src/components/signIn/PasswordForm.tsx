import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { RecaptchaAction } from '@graasp/sdk';

import { Alert, LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';

import { useAuthTranslation } from '../../config/i18n';
import { REQUEST_PASSWORD_RESET_PATH } from '../../config/paths';
import { mutations } from '../../config/queryClient';
import {
  EMAIL_SIGN_IN_FIELD_ID,
  PASSWORD_SIGN_IN_BUTTON_ID,
  PASSWORD_SIGN_IN_FIELD_ID,
  PASSWORD_SUCCESS_ALERT,
} from '../../config/selectors';
import { useRecaptcha } from '../../context/RecaptchaContext';
import { useMobileAppLogin } from '../../hooks/mobile';
import { useRedirection } from '../../hooks/searchParams';
import { AUTH } from '../../langs/constants';
import { getValidationMessage, isEmailValid } from '../../utils/validation';
import { ErrorDisplay } from '../common/ErrorDisplay';
import { PasswordInput } from '../common/PasswordInput';
import { EmailInput } from './EmailInput';

type Inputs = {
  email: string;
  password: string;
};

export function PasswordForm() {
  const { t } = useAuthTranslation();
  const redirect = useRedirection();
  const { isMobile, challenge } = useMobileAppLogin();
  const { executeCaptcha } = useRecaptcha();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const {
    mutateAsync: signInWithPassword,
    isSuccess: signInWithPasswordSuccess,
    isPending: isLoadingPasswordSignIn,
    error: webPasswordSignInError,
  } = mutations.useSignInWithPassword();
  const {
    mutateAsync: mobileSignInWithPassword,
    isSuccess: mobileSignInWithPasswordSuccess,
    isPending: isLoadingMobilePasswordSignIn,
    error: mobilePasswordSignInError,
  } = mutations.useMobileSignInWithPassword();

  const passwordSignInError =
    webPasswordSignInError || mobilePasswordSignInError;

  const handlePasswordSignIn = async (data: Inputs) => {
    const lowercaseEmail = data.email.toLowerCase();

    const token = await executeCaptcha(
      isMobile
        ? RecaptchaAction.SignInWithPasswordMobile
        : RecaptchaAction.SignInWithPassword,
    );
    try {
      const result = await (isMobile
        ? mobileSignInWithPassword({
            ...data,
            email: lowercaseEmail,
            captcha: token,
            challenge,
          })
        : signInWithPassword({
            ...data,
            email: lowercaseEmail,
            captcha: token,
            url: redirect.url,
          }));
      // successful redirect
      if (result?.resource) {
        window.location.href = result.resource;
      }
    } catch (e) {
      // show error from react-query's error
      console.error(e);
    }
  };

  const emailError = getValidationMessage(errors.email);
  const passwordError = getValidationMessage(errors.password);

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(handlePasswordSignIn)}
      direction="column"
      spacing={1}
      alignItems="center"
    >
      <EmailInput
        id={EMAIL_SIGN_IN_FIELD_ID}
        form={register('email', {
          required: true,
          validate: isEmailValid,
        })}
        placeholder={t(AUTH.EMAIL_INPUT_PLACEHOLDER)}
        error={emailError}
      />
      <Stack direction="column" alignItems="flex-end">
        <PasswordInput
          id={PASSWORD_SIGN_IN_FIELD_ID}
          error={passwordError}
          form={register('password', {
            required: true,
          })}
        />
        <Typography
          component={Link}
          color="textSecondary"
          variant="caption"
          sx={{ textDecoration: 'none' }}
          to={REQUEST_PASSWORD_RESET_PATH}
        >
          {t(AUTH.REQUEST_PASSWORD_RESET_LINK)}
        </Typography>
      </Stack>
      <ErrorDisplay error={passwordSignInError} />
      <LoadingButton
        type="submit"
        disabled={Boolean(passwordError) || Boolean(emailError)}
        id={PASSWORD_SIGN_IN_BUTTON_ID}
        variant="contained"
        color="primary"
        sx={{ textTransform: 'none' }}
        fullWidth
        loading={isLoadingMobilePasswordSignIn || isLoadingPasswordSignIn}
      >
        {t(AUTH.SIGN_IN_PASSWORD_BUTTON)}
      </LoadingButton>

      {(signInWithPasswordSuccess || mobileSignInWithPasswordSuccess) && (
        <Alert severity="success" id={PASSWORD_SUCCESS_ALERT}>
          {t(AUTH.PASSWORD_SUCCESS_ALERT)}
        </Alert>
      )}
    </Stack>
  );
}
