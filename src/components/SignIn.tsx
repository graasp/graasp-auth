import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { MUTATION_KEYS } from '@graasp/query-client';
import { AUTH } from '@graasp/translations';
import { Button } from '@graasp/ui';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

import { useAuthTranslation } from '../config/i18n';
import { SIGN_UP_PATH } from '../config/paths';
import { useMutation } from '../config/queryClient';
import {
  EMAIL_SIGN_IN_FIELD_ID,
  EMAIL_SIGN_IN_METHOD_BUTTON_ID,
  PASSWORD_SIGN_IN_BUTTON_ID,
  PASSWORD_SIGN_IN_FIELD_ID,
  PASSWORD_SIGN_IN_METHOD_BUTTON_ID,
  SIGN_IN_BUTTON_ID,
} from '../config/selectors';
import { SIGN_IN_METHODS } from '../types/signInMethod';
import { emailValidator, passwordValidator } from '../utils/validation';
import EmailInput from './EmailInput';
import FullscreenContainer from './FullscreenContainer';
import StyledDivider from './StyledDivider';
import StyledTextField from './StyledTextField';
import SuccessContent from './SuccessContent';
import UserSwitch from './UserSwitch';

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [signInMethod, setSignInMethod] = useState(SIGN_IN_METHODS.EMAIL);
  const [successView, setSuccessView] = useState(true);
  const [resendEmail, setResendEmail] = useState(false);
  // enable validation after first click
  const [shouldValidate, setShouldValidate] = useState(false);

  const { mutate: signIn, isSuccess: signInSuccess } = useMutation<
    unknown,
    unknown,
    { email: string }
  >(MUTATION_KEYS.SIGN_IN);
  const {
    mutateAsync: signInWithPassword,
    isSuccess: signInWithPasswordSuccess,
  } = useMutation<
    { data: { resource: string } },
    unknown,
    { email: string; password: string }
  >(MUTATION_KEYS.SIGN_IN_WITH_PASSWORD);

  const handleSignIn = async () => {
    const lowercaseEmail = email.toLowerCase();
    const checkingEmail = emailValidator(lowercaseEmail);
    if (checkingEmail) {
      setShouldValidate(true);
    } else {
      signIn({ email: lowercaseEmail });
      if (signInSuccess) {
        setSuccessView(true);
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
      const { data } = await signInWithPassword({
        email: lowercaseEmail,
        password,
      });
      if (data.resource) {
        window.location.href = data.resource;
      }
      if (signInWithPasswordSuccess) {
        setSuccessView(true);
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

  const handleResendEmail = () => {
    setResendEmail(true);
    handleSignIn();
  };

  const renderSignInForm = () => (
    <>
      <FormControl>
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
      </FormControl>
      <StyledDivider />
      <Link to={SIGN_UP_PATH}>{t(SIGN_UP_LINK_TEXT)}</Link>
    </>
  );

  return (
    <FullscreenContainer>
      {
        // eslint-disable-next-line no-constant-condition
        (signInSuccess || signInWithPasswordSuccess || resendEmail) &&
        successView ? (
          <SuccessContent
            title={t(AUTH.SIGN_IN_SUCCESS_TITLE)}
            email={email}
            handleBackButtonClick={handleBackButtonClick}
            handleResendEmail={handleResendEmail}
          />
        ) : (
          <>
            <Typography variant="h2" component="h2">
              {t(SIGN_IN_HEADER)}
            </Typography>
            {renderSignInForm()}
            <StyledDivider />
            <Box sx={{ justifyContent: 'center' }}>
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
            <StyledDivider />
            <UserSwitch />
          </>
        )
      }
    </FullscreenContainer>
  );
};

export default SignIn;
