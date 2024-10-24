import { ChangeEventHandler, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import {
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
  RecaptchaAction,
} from '@graasp/sdk';
import { GraaspLogo } from '@graasp/ui';

import { LoadingButton } from '@mui/lab';
import { FormControl, LinearProgress, Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useAuthTranslation } from '../../config/i18n';
import {
  SIGN_IN_MAGIC_LINK_SUCCESS_PATH,
  SIGN_IN_PATH,
} from '../../config/paths';
import { hooks, mutations } from '../../config/queryClient';
import {
  EMAIL_SIGN_UP_FIELD_ID,
  NAME_SIGN_UP_FIELD_ID,
  SIGN_UP_BUTTON_ID,
  SIGN_UP_HEADER_ID,
} from '../../config/selectors';
import { useRecaptcha } from '../../context/RecaptchaContext';
import { useMobileAppLogin } from '../../hooks/mobile';
import { useRedirection } from '../../hooks/searchParams';
import { useAgreementForm } from '../../hooks/useAgreementForm';
import { AUTH } from '../../langs/constants';
import { emailValidator, nameValidator } from '../../utils/validation';
import { LeftContentContainer } from '../LeftContentContainer';
import { EmailAdornment } from '../common/Adornments';
import { ErrorDisplay } from '../common/ErrorDisplay';
import { StyledTextField } from '../common/StyledTextField';
import { AgreementForm } from '../register/AgreementForm';
import { EmailInput } from './EmailInput';
import { EnableAnalyticsForm } from './EnableAnalyticsForm';

const {
  SIGN_IN_LINK_TEXT,
  SIGN_IN_LINK_TEXT_BUTTON,
  SIGN_UP_HEADER,
  NAME_FIELD_LABEL,
  SIGN_UP_BUTTON,
  INVITATIONS_LOADING_MESSAGE,
} = AUTH;

function RegisterInnerComponent() {
  const { t, i18n } = useAuthTranslation();
  const navigate = useNavigate();
  const { executeCaptcha } = useRecaptcha();
  const theme = useTheme();

  const { isMobile, challenge } = useMobileAppLogin();
  const redirect = useRedirection();

  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string | null>(null);
  // enable validation after first click
  const [shouldValidate, setShouldValidate] = useState(false);
  const [enableSaveActions, setEnableSaveActions] = useState<boolean>(true);

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

  useEffect(() => {
    if (isInvitationSuccess && invitation) {
      setEmail(invitation.email);
      setName(invitation.name ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitation, isInvitationSuccess]);

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

  const handleNameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newName = e.target.value;
    setName(newName);
    if (shouldValidate) {
      setNameError(nameValidator(newName));
    }
  };

  const handleRegister = async () => {
    const lowercaseEmail = email.toLowerCase();
    const checkingEmail = emailValidator(lowercaseEmail);
    const checkingUsername = nameValidator(name);
    if (!verifyUserAgreements()) {
      // should never happen
      return;
    } else if (checkingEmail || checkingUsername) {
      setNameError(checkingUsername);
      setShouldValidate(true);
    } else {
      const token = await executeCaptcha(
        isMobile ? RecaptchaAction.SignUpMobile : RecaptchaAction.SignUp,
      );
      await (isMobile
        ? mobileSignUp({
            name: name.trim(),
            email: lowercaseEmail,
            captcha: token,
            challenge,
            lang: i18n.language,
            enableSaveActions,
          })
        : signUp({
            name: name.trim(),
            email: lowercaseEmail,
            captcha: token,
            url: redirect.url,
            lang: i18n.language,
            enableSaveActions,
          }));

      // navigate to success path
      navigate({
        pathname: SIGN_IN_MAGIC_LINK_SUCCESS_PATH,
        search: `email=${email}`,
      });
    }
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
      <FormControl>
        <Stack direction="column" spacing={1}>
          <StyledTextField
            InputProps={{
              startAdornment: EmailAdornment,
            }}
            required
            placeholder={t(NAME_FIELD_LABEL)}
            variant="outlined"
            value={name}
            error={Boolean(nameError)}
            helperText={
              nameError &&
              t(nameError, {
                min: MIN_USERNAME_LENGTH,
                max: MAX_USERNAME_LENGTH,
              })
            }
            onChange={handleNameOnChange}
            id={NAME_SIGN_UP_FIELD_ID}
            disabled={Boolean(invitation?.name)}
            autoFocus
          />
          <EmailInput
            required
            value={email}
            setValue={setEmail}
            id={EMAIL_SIGN_UP_FIELD_ID}
            disabled={Boolean(invitation?.email)}
            shouldValidate={shouldValidate}
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
            variant="contained"
            id={SIGN_UP_BUTTON_ID}
            loading={isLoadingSignUp || isLoadingMobileSignUp}
            onClick={handleRegister}
            fullWidth
            disabled={!userHasAcceptedAllTerms || !email.length || !name.length}
          >
            {t(SIGN_UP_BUTTON)}
          </LoadingButton>
        </Stack>
      </FormControl>
      <Typography>{t(SIGN_IN_LINK_TEXT)}</Typography>
      <Link to={`${SIGN_IN_PATH}?${searchParams.toString()}`}>
        {t(SIGN_IN_LINK_TEXT_BUTTON)}
      </Link>
    </Stack>
  );
}

export function Register() {
  return (
    <LeftContentContainer>
      <RegisterInnerComponent />
    </LeftContentContainer>
  );
}
