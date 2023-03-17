import { ChangeEventHandler, useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { RecaptchaAction } from '@graasp/sdk';
import { AUTH } from '@graasp/translations';
import { Button, Loader } from '@graasp/ui';

import { FormControlLabel, Stack, Switch, Tooltip } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

import { SIGN_IN_PATH } from '../config/constants';
import { useAuthTranslation } from '../config/i18n';
import { hooks, mutations } from '../config/queryClient';
import {
  EMAIL_SIGN_UP_FIELD_ID,
  NAME_SIGN_UP_FIELD_ID,
  SIGN_UP_BUTTON_ID,
  SIGN_UP_HEADER_ID,
  SIGN_UP_SAVE_ACTIONS_ID,
} from '../config/selectors';
import { useRecaptcha } from '../context/RecaptchaContext';
import { useMobileAppLogin } from '../hooks/mobile';
import { useRedirection } from '../hooks/searchParams';
import { emailValidator, nameValidator } from '../utils/validation';
import EmailInput from './EmailInput';
import FullscreenContainer from './FullscreenContainer';
import StyledTextField from './StyledTextField';
import SuccessContent from './SuccessContent';

const {
  SIGN_IN_LINK_TEXT,
  SIGN_UP_BUTTON,
  SIGN_UP_HEADER,
  NAME_FIELD_LABEL,
  SIGN_UP_SAVE_ACTIONS_LABEL,
  SIGN_UP_SAVE_ACTIONS_TOOLTIP,
} = AUTH;

const SignUp = () => {
  const { t } = useAuthTranslation();
  const { executeCaptcha } = useRecaptcha();

  const { isMobile, challenge } = useMobileAppLogin();
  const redirect = useRedirection();

  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [enableSaveActions, setEnableSaveActions] = useState<boolean>(true);
  const [nameError, setNameError] = useState<string | null>(null);
  const [successView, setSuccessView] = useState(false);
  // enable validation after first click
  const [shouldValidate, setShouldValidate] = useState(false);

  const { mutateAsync: signUp, isSuccess: signUpSuccess } =
    mutations.useSignUp();
  const { mutateAsync: mobileSignUp, isSuccess: mobileSignUpSuccess } =
    mutations.useMobileSignUp();
  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  const {
    data: invitation,
    isSuccess,
    isLoading,
  } = hooks.useInvitation(searchParams.get('invitationId') || undefined);

  useEffect(() => {
    if (isSuccess && invitation) {
      setEmail(invitation.email);
      setName(invitation.name ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitation, isSuccess]);

  // loading invitation
  if (isLoading) {
    return <Loader />;
  }

  const handleNameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newName = e.target.value;
    setName(newName);
    if (shouldValidate) {
      setNameError(nameValidator(newName));
    }
  };

  const handleOnToggle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEnableSaveActions(e.target.checked);
  };

  const handleRegister = async () => {
    const lowercaseEmail = email.toLowerCase();
    const checkingEmail = emailValidator(lowercaseEmail);
    const checkingUsername = nameValidator(name);
    if (checkingEmail || checkingUsername) {
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
          })
        : signUp({
            name: name.trim(),
            email: lowercaseEmail,
            captcha: token,
            url: redirect.url,
          }));
      setSuccessView(true);
    }
  };

  const handleBackButtonClick = () => {
    setSuccessView(false);
  };

  const renderForm = () => (
    <>
      <FormControl>
        <Stack direction="column" spacing={1}>
          <StyledTextField
            required
            label={t(NAME_FIELD_LABEL)}
            variant="outlined"
            value={name}
            error={Boolean(nameError)}
            helperText={nameError}
            onChange={handleNameOnChange}
            id={NAME_SIGN_UP_FIELD_ID}
            disabled={Boolean(invitation?.get('name'))}
          />
          <EmailInput
            value={email}
            setValue={setEmail}
            id={EMAIL_SIGN_UP_FIELD_ID}
            disabled={Boolean(invitation?.get('email'))}
            shouldValidate={shouldValidate}
          />
          <FormControlLabel
            control={
              <Tooltip title={t(SIGN_UP_SAVE_ACTIONS_TOOLTIP)} placement="left">
                <span>
                  <Switch
                    id={SIGN_UP_SAVE_ACTIONS_ID}
                    onChange={handleOnToggle}
                    checked={enableSaveActions}
                    disabled
                  />
                </span>
              </Tooltip>
            }
            label={t(SIGN_UP_SAVE_ACTIONS_LABEL)}
          />
          <Button onClick={handleRegister} id={SIGN_UP_BUTTON_ID} fullWidth>
            {t(SIGN_UP_BUTTON)}
          </Button>
        </Stack>
      </FormControl>
      <Link to={`${SIGN_IN_PATH}${search}`}>{t(SIGN_IN_LINK_TEXT)}</Link>
    </>
  );

  return (
    <FullscreenContainer>
      {(signUpSuccess || mobileSignUpSuccess) && successView ? (
        <SuccessContent
          title={t(AUTH.SIGN_UP_SUCCESS_TITLE)}
          email={email}
          handleBackButtonClick={handleBackButtonClick}
        />
      ) : (
        <Stack direction="column" spacing={2}>
          <Typography variant="h2" component="h2" id={SIGN_UP_HEADER_ID}>
            {t(SIGN_UP_HEADER)}
          </Typography>
          {renderForm()}
        </Stack>
      )}
    </FullscreenContainer>
  );
};

export default SignUp;
