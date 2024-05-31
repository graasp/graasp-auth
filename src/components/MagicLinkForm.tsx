import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { RecaptchaAction } from '@graasp/sdk';

import { LoadingButton } from '@mui/lab';

import { useAuthTranslation } from '../config/i18n';
import { SIGN_IN_MAGIC_LINK_SUCCESS_PATH } from '../config/paths';
import { mutations } from '../config/queryClient';
import { EMAIL_SIGN_IN_FIELD_ID, SIGN_IN_BUTTON_ID } from '../config/selectors';
import { useRecaptcha } from '../context/RecaptchaContext';
import { useMobileAppLogin } from '../hooks/mobile';
import { useRedirection } from '../hooks/searchParams';
import { AUTH } from '../langs/constants';
import { emailValidator } from '../utils/validation';
import EmailInput from './EmailInput';
import ErrorDisplay from './common/ErrorDisplay';

const { SIGN_IN_BUTTON } = AUTH;

const MagicLinkForm = () => {
  const navigate = useNavigate();
  const { t } = useAuthTranslation();
  const { executeCaptcha } = useRecaptcha();

  const { isMobile, challenge } = useMobileAppLogin();
  const redirect = useRedirection();

  const [email, setEmail] = useState('');

  // enable validation after first click
  const [shouldValidate, setShouldValidate] = useState(false);

  const {
    mutateAsync: signIn,
    isLoading: isLoadingSignIn,
    error: webSignInError,
  } = mutations.useSignIn();
  const {
    mutateAsync: mobileSignIn,
    isLoading: isLoadingMobileSignIn,
    error: mobileSignInError,
  } = mutations.useMobileSignIn();

  const signInError = webSignInError || mobileSignInError;

  const handleSignIn = async () => {
    const lowercaseEmail = email.toLowerCase();
    const checkingEmail = emailValidator(lowercaseEmail);
    if (checkingEmail) {
      setShouldValidate(true);
    } else {
      try {
        const token = await executeCaptcha(
          isMobile ? RecaptchaAction.SignInMobile : RecaptchaAction.SignIn,
        );
        await (isMobile
          ? mobileSignIn({ email: lowercaseEmail, captcha: token, challenge })
          : signIn({
              email: lowercaseEmail,
              captcha: token,
              url: redirect.url,
            }));

        // navigate to success path
        navigate({
          pathname: SIGN_IN_MAGIC_LINK_SUCCESS_PATH,
          search: `email=${email}`,
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // signInMethod email when true
    // sign in by pressing the enter key
    if (e.key === 'Enter') {
      handleSignIn();
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
      <ErrorDisplay error={signInError} />
      <LoadingButton
        id={SIGN_IN_BUTTON_ID}
        variant="contained"
        onClick={handleSignIn}
        sx={{ textTransform: 'none' }}
        fullWidth
        loading={isLoadingMobileSignIn || isLoadingSignIn}
      >
        {t(SIGN_IN_BUTTON)}
      </LoadingButton>
    </>
  );
};

export default MagicLinkForm;
