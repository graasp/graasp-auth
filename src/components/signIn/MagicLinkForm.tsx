import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { RecaptchaAction } from '@graasp/sdk';

import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';

import { useAuthTranslation } from '../../config/i18n';
import { SIGN_IN_MAGIC_LINK_SUCCESS_PATH } from '../../config/paths';
import { mutations } from '../../config/queryClient';
import {
  MAGIC_LINK_EMAIL_FIELD_ID,
  SIGN_IN_BUTTON_ID,
} from '../../config/selectors';
import { useRecaptcha } from '../../context/RecaptchaContext';
import { useMobileAppLogin } from '../../hooks/mobile';
import { useRedirection } from '../../hooks/searchParams';
import { AUTH } from '../../langs/constants';
import { getValidationMessage, isEmailValid } from '../../utils/validation';
import { ErrorDisplay } from '../common/ErrorDisplay';
import { EmailInput } from './EmailInput';

const { SIGN_IN_BUTTON } = AUTH;

type Inputs = {
  email: string;
};

export function MagicLinkForm() {
  const navigate = useNavigate();
  const { t } = useAuthTranslation();
  const { executeCaptcha } = useRecaptcha();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { isMobile, challenge } = useMobileAppLogin();
  const redirect = useRedirection();

  const {
    mutateAsync: signIn,
    isPending: isLoadingSignIn,
    error: webSignInError,
  } = mutations.useSignIn();
  const {
    mutateAsync: mobileSignIn,
    isPending: isLoadingMobileSignIn,
    error: mobileSignInError,
  } = mutations.useMobileSignIn();

  const signInError = webSignInError || mobileSignInError;

  const handleSignIn = async ({ email }: Inputs) => {
    const lowercaseEmail = email.toLowerCase();

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
  };
  const emailError = getValidationMessage(errors.email);

  return (
    <Stack
      component="form"
      direction="column"
      spacing={1}
      alignItems="center"
      onSubmit={handleSubmit(handleSignIn)}
    >
      <EmailInput
        id={MAGIC_LINK_EMAIL_FIELD_ID}
        autoFocus
        form={register('email', {
          required: true,
          validate: {
            email: (value) => isEmailValid(value) || 'INVALID_EMAIL_ERROR',
          },
        })}
        placeholder={t(AUTH.EMAIL_INPUT_PLACEHOLDER)}
        error={emailError}
      />
      <ErrorDisplay error={signInError} />
      <LoadingButton
        type="submit"
        id={SIGN_IN_BUTTON_ID}
        variant="contained"
        sx={{ textTransform: 'none' }}
        fullWidth
        loading={isLoadingMobileSignIn || isLoadingSignIn}
      >
        {t(SIGN_IN_BUTTON)}
      </LoadingButton>
    </Stack>
  );
}
