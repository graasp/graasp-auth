import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { RecaptchaAction } from '@graasp/sdk';
import { AUTH } from '@graasp/translations';
import { Button } from '@graasp/ui';

import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

import { useAuthTranslation } from '../config/i18n';
import { SIGN_UP_PATH } from '../config/paths';
import { mutations } from '../config/queryClient';
import {
  EMAIL_SIGN_IN_FIELD_ID,
  EMAIL_SIGN_IN_METHOD_BUTTON_ID,
  PASSWORD_SIGN_IN_BUTTON_ID,
  PASSWORD_SIGN_IN_FIELD_ID,
  PASSWORD_SIGN_IN_METHOD_BUTTON_ID,
  SIGN_IN_BUTTON_ID,
  SIGN_IN_HEADER_ID,
} from '../config/selectors';
import { useRecaptcha } from '../context/RecaptchaContext';
import { SIGN_IN_METHODS } from '../types/signInMethod';
import { emailValidator, passwordValidator } from '../utils/validation';
import EmailInput from './EmailInput';
import FullscreenContainer from './FullscreenContainer';
import StyledTextField from './StyledTextField';
import SuccessContent from './SuccessContent';

const {
  SIGN_IN_BUTTON,
  PASSWORD_FIELD_LABEL,
  SIGN_UP_LINK_TEXT,
  PASSWORD_SIGN_IN_METHOD,
  EMAIL_SIGN_IN_METHOD,
  SIGN_IN_HEADER,
} = AUTH;

const SignIn: FC = () => {
  const { t } = useAuthTranslation();
  const { executeCaptcha } = useRecaptcha();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [signInMethod, setSignInMethod] = useState(SIGN_IN_METHODS.EMAIL);
  const [successView, setSuccessView] = useState(false);
  // enable validation after first click
  const [shouldValidate, setShouldValidate] = useState(false);

  const { mutateAsync: signIn, isSuccess: signInSuccess } =
    mutations.useSignIn();
  const {
    mutateAsync: signInWithPassword,
    isSuccess: signInWithPasswordSuccess,
  } = mutations.useSignInWithPassword();

  const handleSignIn = async () => {
    const lowercaseEmail = email.toLowerCase();
    const checkingEmail = emailValidator(lowercaseEmail);
    if (checkingEmail) {
      setShouldValidate(true);
    } else {
      try {
        const token = await executeCaptcha(RecaptchaAction.SignIn);
        await signIn({ email: lowercaseEmail, captcha: token });
        setSuccessView(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

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
      const token = await executeCaptcha(RecaptchaAction.SignInWithPassword);
      const { resource } = await signInWithPassword({
        email: lowercaseEmail,
        password,
        captcha: token,
      });
      if (resource) {
        window.location.href = resource;
      }
      setSuccessView(true);
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
      switch (signInMethod) {
        case SIGN_IN_METHODS.EMAIL: {
          handleSignIn();
          break;
        }
        case SIGN_IN_METHODS.PASSWORD: {
          handlePasswordSignIn();
          break;
        }
        default:
          break;
      }
    }
  };

  const handleSignInMethod = () => {
    // signInMethod email when true
    switch (signInMethod) {
      case SIGN_IN_METHODS.EMAIL: {
        setSignInMethod(SIGN_IN_METHODS.PASSWORD);
        break;
      }
      case SIGN_IN_METHODS.PASSWORD: {
        setSignInMethod(SIGN_IN_METHODS.EMAIL);
        break;
      }
      default:
        break;
    }
  };

  const handleBackButtonClick = () => {
    setSuccessView(false);
    setEmail('');
    setShouldValidate(false);
  };

  const renderSignInForm = () => (
    <>
      <FormControl>
        <Stack direction="column" spacing={1}>
          <EmailInput
            value={email}
            setValue={setEmail}
            id={EMAIL_SIGN_IN_FIELD_ID}
            onKeyPress={handleKeypress}
            shouldValidate={shouldValidate}
          />
          {signInMethod === SIGN_IN_METHODS.PASSWORD && (
            <>
              <StyledTextField
                required
                label={t(PASSWORD_FIELD_LABEL)}
                variant="outlined"
                value={password}
                error={Boolean(passwordError)}
                helperText={passwordError}
                onChange={handleOnChangePassword}
                id={PASSWORD_SIGN_IN_FIELD_ID}
                type="password"
                onKeyPress={handleKeypress}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handlePasswordSignIn}
                id={PASSWORD_SIGN_IN_BUTTON_ID}
              >
                {t(SIGN_IN_BUTTON)}
              </Button>
            </>
          )}
          {signInMethod === SIGN_IN_METHODS.EMAIL && (
            <Button onClick={handleSignIn} id={SIGN_IN_BUTTON_ID}>
              {t(SIGN_IN_BUTTON)}
            </Button>
          )}
        </Stack>
      </FormControl>
      <Link to={SIGN_UP_PATH}>{t(SIGN_UP_LINK_TEXT)}</Link>
    </>
  );

  return (
    <FullscreenContainer>
      {(signInSuccess || signInWithPasswordSuccess) && successView ? (
        <SuccessContent
          title={t(AUTH.SIGN_IN_SUCCESS_TITLE)}
          email={email}
          handleBackButtonClick={handleBackButtonClick}
        />
      ) : (
        <Stack direction="column" spacing={2}>
          <Typography variant="h2" component="h2" id={SIGN_IN_HEADER_ID}>
            {t(SIGN_IN_HEADER)}
          </Typography>
          {renderSignInForm()}
          <Box justifyContent="center">
            <Button
              variant="text"
              disabled={signInMethod === SIGN_IN_METHODS.EMAIL}
              onClick={handleSignInMethod}
              id={EMAIL_SIGN_IN_METHOD_BUTTON_ID}
            >
              {t(EMAIL_SIGN_IN_METHOD)}
            </Button>
            <Button
              variant="text"
              disabled={signInMethod === SIGN_IN_METHODS.PASSWORD}
              onClick={handleSignInMethod}
              id={PASSWORD_SIGN_IN_METHOD_BUTTON_ID}
            >
              {t(PASSWORD_SIGN_IN_METHOD)}
            </Button>
          </Box>
        </Stack>
      )}
    </FullscreenContainer>
  );
};

export default SignIn;
