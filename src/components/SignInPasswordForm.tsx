import React, { useState } from 'react';

import { RecaptchaAction } from '@graasp/sdk';

import { Alert, LoadingButton } from '@mui/lab';

import { useAuthTranslation } from '../config/i18n';
import { mutations } from '../config/queryClient';
import {
  EMAIL_SIGN_IN_FIELD_ID,
  PASSWORD_SIGN_IN_BUTTON_ID,
  PASSWORD_SIGN_IN_FIELD_ID,
  PASSWORD_SUCCESS_ALERT,
} from '../config/selectors';
import { useRecaptcha } from '../context/RecaptchaContext';
import { useMobileAppLogin } from '../hooks/mobile';
import { useRedirection } from '../hooks/searchParams';
import { AUTH } from '../langs/constants';
import { emailValidator, passwordValidator } from '../utils/validation';
import EmailInput from './EmailInput';
import ErrorDisplay from './common/ErrorDisplay';
import PasswordInput from './common/PasswordInput';

const { SIGN_IN_PASSWORD_BUTTON } = AUTH;

const SignInPasswordForm = () => {
  const { t } = useAuthTranslation();
  const redirect = useRedirection();
  const { isMobile, challenge } = useMobileAppLogin();
  const { executeCaptcha } = useRecaptcha();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  // enable validation after first click
  const [shouldValidate, setShouldValidate] = useState(false);

  const {
    mutateAsync: signInWithPassword,
    isSuccess: signInWithPasswordSuccess,
    isLoading: isLoadingPasswordSignIn,
    error: webPasswordSignInError,
  } = mutations.useSignInWithPassword();
  const {
    mutateAsync: mobileSignInWithPassword,
    isSuccess: mobileSignInWithPasswordSuccess,
    isLoading: isLoadingMobilePasswordSignIn,
    error: mobilePasswordSignInError,
  } = mutations.useMobileSignInWithPassword();

  const passwordSignInError =
    webPasswordSignInError || mobilePasswordSignInError;

  const handlePasswordSignIn = async () => {
    const lowercaseEmail = email.toLowerCase();
    const checkingEmail = emailValidator(lowercaseEmail);
    const checkingPassword = passwordValidator(password);
    if (checkingEmail || checkingPassword) {
      setShouldValidate(true);
      if (checkingPassword) {
        setPasswordError(checkingPassword);
      }
    } else {
      const token = await executeCaptcha(
        isMobile
          ? RecaptchaAction.SignInWithPasswordMobile
          : RecaptchaAction.SignInWithPassword,
      );
      const result = await (isMobile
        ? mobileSignInWithPassword({
            email: lowercaseEmail,
            password,
            captcha: token,
            challenge,
          })
        : signInWithPassword({
            email: lowercaseEmail,
            password,
            captcha: token,
            url: redirect.url,
          }));
      // successful redirect
      if (result?.resource) {
        window.location.href = result.resource;
      }
    }
  };

  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(passwordValidator(newPassword));
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // signInMethod email when true
    // sign in by pressing the enter key
    if (e.key === 'Enter') {
      handlePasswordSignIn();
    }
  };

  return (
    <>
      <EmailInput
        value={email}
        setValue={setEmail}
        id={EMAIL_SIGN_IN_FIELD_ID}
        onKeyPress={handleKeypress}
        shouldValidate={shouldValidate}
      />
      <PasswordInput
        value={password}
        error={passwordError}
        onChange={handleOnChangePassword}
        id={PASSWORD_SIGN_IN_FIELD_ID}
        onKeyDown={handleKeypress}
      />
      <ErrorDisplay error={passwordSignInError} />
      <LoadingButton
        disabled={!(password && email)}
        id={PASSWORD_SIGN_IN_BUTTON_ID}
        variant="contained"
        color="primary"
        onClick={handlePasswordSignIn}
        sx={{ textTransform: 'none' }}
        fullWidth
        loading={isLoadingMobilePasswordSignIn || isLoadingPasswordSignIn}
      >
        {t(SIGN_IN_PASSWORD_BUTTON)}
      </LoadingButton>
      {(signInWithPasswordSuccess || mobileSignInWithPasswordSuccess) && (
        <Alert severity="success" id={PASSWORD_SUCCESS_ALERT}>
          {t(AUTH.PASSWORD_SUCCESS_ALERT)}
        </Alert>
      )}
    </>
  );
};

export default SignInPasswordForm;
