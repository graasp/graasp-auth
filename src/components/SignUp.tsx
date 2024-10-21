import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import {
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
  RecaptchaAction,
} from '@graasp/sdk';
import { GraaspLogo } from '@graasp/ui';

import { LoadingButton } from '@mui/lab';
import { LinearProgress, Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useAuthTranslation } from '../config/i18n';
import { SIGN_IN_MAGIC_LINK_SUCCESS_PATH, SIGN_IN_PATH } from '../config/paths';
import { hooks, mutations } from '../config/queryClient';
import {
  EMAIL_SIGN_UP_FIELD_ID,
  NAME_SIGN_UP_FIELD_ID,
  SIGN_UP_BUTTON_ID,
  SIGN_UP_HEADER_ID,
} from '../config/selectors';
import { useRecaptcha } from '../context/RecaptchaContext';
import { useMobileAppLogin } from '../hooks/mobile';
import { useRedirection } from '../hooks/searchParams';
import { useAgreementForm } from '../hooks/useAgreementForm';
import { AUTH } from '../langs/constants';
import { isEmailValid, isNameValid } from '../utils/validation';
import { EmailInput } from './EmailInput';
import LeftContentContainer from './LeftContentContainer';
import { EmailAdornment } from './common/EmailAdornment';
import ErrorDisplay from './common/ErrorDisplay';
import StyledTextField from './common/StyledTextField';
import { AgreementForm } from './register/AgreementForm';
import { EnableAnalyticsForm } from './register/EnableAnalyticsForm';

const {
  SIGN_IN_LINK_TEXT,
  SIGN_UP_HEADER,
  NAME_FIELD_LABEL,
  SIGN_UP_BUTTON,
  INVITATIONS_LOADING_MESSAGE,
} = AUTH;

type Inputs = {
  name: string;
  email: string;
  enableSaveActions: boolean;
};
const SignUp = () => {
  const {
    t,
    i18n: { language },
  } = useAuthTranslation();
  const navigate = useNavigate();
  const { executeCaptcha } = useRecaptcha();
  const theme = useTheme();

  const { isMobile, challenge } = useMobileAppLogin();
  const redirect = useRedirection();
  const { register, handleSubmit } = useForm<Inputs>();

  const agreementFormHook = useAgreementForm();
  const { verifyUserAgreements, userHasAcceptedAllTerms } = agreementFormHook;

  const {
    mutateAsync: signUp,
    isPending: isLoadingSignUp,
    error: webRegisterError,
  } = mutations.useSignUp();
  const {
    mutateAsync: mobileSignUp,
    isPending: isLoadingMobileSignUp,
    error: mobileRegisterError,
  } = mutations.useMobileSignUp();
  const [searchParams] = useSearchParams();

  const {
    data: invitation,
    isSuccess: isInvitationSuccess,
    isLoading: isLoadingInvitations,
  } = hooks.useInvitation(searchParams.get('invitationId') || undefined);

  // todo: set invitations data
  // useEffect(() => {
  //   if (isInvitationSuccess && invitation) {
  //     setEmail(invitation.email);
  //     setName(invitation.name ?? '');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [invitation, isInvitationSuccess]);

  // loading invitation
  if (isLoadingInvitations) {
    return (
      <Stack direction="column" spacing={1}>
        <Typography>{t(INVITATIONS_LOADING_MESSAGE)}</Typography>
        <LinearProgress />
      </Stack>
    );
  }

  const registerError = webRegisterError || mobileRegisterError;

  const handleRegister = async (data: Inputs) => {
    // if (!verifyUserAgreements()) {
    //   // should never happen
    //   return;

    const token = await executeCaptcha(
      isMobile ? RecaptchaAction.SignUpMobile : RecaptchaAction.SignUp,
    );
    await (isMobile
      ? mobileSignUp({
          captcha: token,
          challenge,
          lang: language,
          ...data,
        })
      : signUp({
          captcha: token,
          url: redirect.url,
          lang: language,
          ...data,
        }));

    // navigate to success path
    navigate({
      pathname: SIGN_IN_MAGIC_LINK_SUCCESS_PATH,
      search: `email=${data.email}`,
    });
  };

  return (
    <Stack direction="column" spacing={2}>
      <Stack spacing={1}>
        <GraaspLogo height={90} sx={{ fill: theme.palette.primary.main }} />
        <Typography
          variant="h4"
          component="h2"
          id={SIGN_UP_HEADER_ID}
          textAlign="center"
        >
          {t(SIGN_UP_HEADER)}
        </Typography>
      </Stack>
      <Stack
        direction="column"
        spacing={1}
        component="form"
        onSubmit={handleSubmit(handleRegister)}
      >
        <StyledTextField
          id={NAME_SIGN_UP_FIELD_ID}
          InputProps={{
            startAdornment: EmailAdornment,
          }}
          placeholder={t(NAME_FIELD_LABEL)}
          variant="outlined"
          error={Boolean(nameError)}
          helperText={
            nameError &&
            t(nameError, {
              min: MIN_USERNAME_LENGTH,
              max: MAX_USERNAME_LENGTH,
            })
          }
          disabled={Boolean(invitation?.name)}
          autoFocus
          {...register('name', {
            required: true,
            validate: isNameValid,
            setValueAs: (v) => v.trim(),
          })}
        />
        <EmailInput
          id={EMAIL_SIGN_UP_FIELD_ID}
          disabled={Boolean(invitation?.email)}
          form={register('email', { required: true, validate: isEmailValid })}
        />
        <Stack>
          <EnableAnalyticsForm
            enableSaveActions={enableSaveActions}
            onUpdateSaveActions={(enabled) => setEnableSaveActions(enabled)}
          />

          <AgreementForm useAgreementForm={agreementFormHook} />
        </Stack>
        <ErrorDisplay error={registerError} />
        <LoadingButton
          id={SIGN_UP_BUTTON_ID}
          type="submit"
          variant="contained"
          loading={isLoadingSignUp || isLoadingMobileSignUp}
          fullWidth
          disabled={!userHasAcceptedAllTerms || !email.length || !name.length}
        >
          {t(SIGN_UP_BUTTON)}
        </LoadingButton>
      </Stack>
      <Link to={`${SIGN_IN_PATH}?${searchParams.toString()}`}>
        {t(SIGN_IN_LINK_TEXT)}
      </Link>
    </Stack>
  );
};

const SignUpScreenWrapper = () => (
  <LeftContentContainer>
    <SignUp />
  </LeftContentContainer>
);

export default SignUpScreenWrapper;
