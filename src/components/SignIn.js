import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import { useTranslation } from 'react-i18next';
import { Box, makeStyles } from '@material-ui/core';
import { SIGN_UP_PATH } from '../config/paths';
import { signIn, signInPassword } from '../actions/authentication';
import { emailValidator, passwordValidator } from '../utils/validation';
import {
  EMAIL_SIGN_IN_FIELD_ID,
  EMAIL_SIGN_IN_METHOD_BUTTON_ID,
  PASSWORD_SIGN_IN_BUTTON_ID,
  PASSWORD_SIGN_IN_FIELD_ID,
  PASSWORD_SIGN_IN_METHOD_BUTTON_ID,
  SIGN_IN_BUTTON_ID,
} from '../config/selectors';
import { FORM_INPUT_MIN_WIDTH } from '../config/constants';
import { SIGN_IN_METHODS } from '../types/signInMethod';

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
}));

const SignIn = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);
  const [signInMethod, setSignInMethod] = useState(SIGN_IN_METHODS.EMAIL);

  const handleSignIn = async () => {
    const lowercaseEmail = email.toLowerCase();

    const checkingEmail = emailValidator(lowercaseEmail);
    if (checkingEmail) {
      setEmailError(checkingEmail);
      setError(true);
    } else {
      await signIn({ email: lowercaseEmail });
    }
  };

  const handlePasswordSignIn = async () => {
    const lowercaseEmail = email.toLowerCase();
    const checkingEmail = emailValidator(lowercaseEmail);
    const checkingPassword = passwordValidator(password);
    if (checkingEmail || checkingPassword) {
      if (checkingEmail) {
        setEmailError(checkingEmail);
        setError(true);
      }
      if (checkingPassword) {
        setPasswordError(checkingPassword);
        setError(true);
      }
    } else {
      const link = await signInPassword({ email: lowercaseEmail, password });
      if (link) {
        window.location.href = link;
      }
    }
  };

  const handleOnChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (error) {
      setEmailError(emailValidator(newEmail));
    }
  };

  const handleOnChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (error) {
      setPasswordError(passwordValidator(newPassword));
    }
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
        <TextField
          className={classes.input}
          required
          label={t('Email')}
          variant="outlined"
          value={email}
          error={emailError}
          helperText={emailError}
          onChange={handleOnChange}
          id={EMAIL_SIGN_IN_FIELD_ID}
          type="email"
          onKeyPress={handleKeypress}
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
            variant="contained"
            color="primary"
            onClick={handleSignIn}
            id={SIGN_IN_BUTTON_ID}
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
          color="primary"
          disabled={signInMethod === SIGN_IN_METHODS.EMAIL}
          onClick={handleSignInMethod}
          id={EMAIL_SIGN_IN_METHOD_BUTTON_ID}
        >
          {t('Email Sign In')}
        </Button>
        <Button
          color="primary"
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
