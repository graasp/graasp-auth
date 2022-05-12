import { Box, makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { MUTATION_KEYS } from '@graasp/query-client';
import { Button } from '@graasp/ui';

import { FORM_INPUT_MIN_WIDTH } from '../config/constants';
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

const useStyles = makeStyles((theme) => ({
  fullScreen: {
    margin: 'auto',
    textAlign: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: theme.spacing(1, 0),
    minWidth: FORM_INPUT_MIN_WIDTH,
  },
  divider: {
    margin: theme.spacing(2),
  },
  button: {
    margin: 0,
  },
}));

const SignIn = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [signInMethod, setSignInMethod] = useState(SIGN_IN_METHODS.EMAIL);
  // enable validation after first click
  const [shouldValidate, setShouldValidate] = useState(false);

  const { mutate: signIn } = useMutation(MUTATION_KEYS.SIGN_IN);
  const { mutateAsync: signInWithPassword } = useMutation(
    MUTATION_KEYS.SIGN_IN_WITH_PASSWORD,
  );

  const handleSignIn = async () => {
    const lowercaseEmail = email.toLowerCase();
    const checkingEmail = emailValidator(lowercaseEmail);
    if (checkingEmail) {
      setShouldValidate(true);
    } else {
      signIn({ email: lowercaseEmail });
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
      const link = await signInWithPassword({
        email: lowercaseEmail,
        password,
      });
      if (link) {
        window.location.href = link;
      }
    }
  };

  const handleOnChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(passwordValidator(newPassword));
  };

  const handleKeypress = (e) => {
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

  const renderSignInForm = () => (
    <>
      <FormControl>
        <EmailInput
          className={classes.input}
          value={email}
          setValue={setEmail}
          id={EMAIL_SIGN_IN_FIELD_ID}
          onKeyPress={handleKeypress}
          shouldValidate={shouldValidate}
        />
        {signInMethod === SIGN_IN_METHODS.PASSWORD && (
          <>
            <TextField
              className={classes.input}
              required
              label={t('Password')}
              variant="outlined"
              value={password}
              error={passwordError}
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
              {t('Sign In')}
            </Button>
          </>
        )}
        {signInMethod === SIGN_IN_METHODS.EMAIL && (
          <Button
            onClick={handleSignIn}
            id={SIGN_IN_BUTTON_ID}
            className={classes.button}
          >
            {t('Sign In')}
          </Button>
        )}
      </FormControl>
      <Divider variant="middle" className={classes.divider} />
      <Link to={SIGN_UP_PATH}>
        {t('Not registered? Click here to register')}
      </Link>
    </>
  );

  return (
    <div className={classes.fullScreen}>
      <Typography variant="h2" component="h2">
        {t('Sign In')}
      </Typography>
      {renderSignInForm()}
      <Divider variant="middle" className={classes.divider} />
      <Box sx={{ justifyContent: 'center' }}>
        <Button
          variant="text"
          disabled={signInMethod === SIGN_IN_METHODS.EMAIL}
          onClick={handleSignInMethod}
          id={EMAIL_SIGN_IN_METHOD_BUTTON_ID}
        >
          {t('Email Sign In')}
        </Button>
        <Button
          variant="text"
          disabled={signInMethod === SIGN_IN_METHODS.PASSWORD}
          onClick={handleSignInMethod}
          id={PASSWORD_SIGN_IN_METHOD_BUTTON_ID}
        >
          {t('Password Sign In')}
        </Button>
      </Box>
    </div>
  );
};

export default SignIn;
