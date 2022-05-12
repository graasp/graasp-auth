import React, { useEffect, useState } from 'react';
import Qs from 'qs';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import { useLocation } from 'react-router';
import Typography from '@material-ui/core/Typography';
import { Button, Loader } from '@graasp/ui';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { buildSignInPath } from '../config/paths';
import { signUp } from '../actions/authentication';
import { emailValidator, nameValidator } from '../utils/validation';
import { hooks } from '../config/queryClient';
import {
  EMAIL_SIGN_UP_FIELD_ID,
  NAME_SIGN_UP_FIELD_ID,
  SIGN_UP_BUTTON_ID,
} from '../config/selectors';
import { FORM_INPUT_MIN_WIDTH } from '../config/constants';
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

const SignUp = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  // enable validation after first click
  const [shouldValidate, setShouldValidate] = useState(false);

  const location = useLocation();
  const queryStrings = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const {
    data: invitation,
    isSuccess,
    isLoading,
  } = hooks.useInvitation(queryStrings?.invitationId);

  useEffect(async () => {
    if (isSuccess && invitation) {
      setEmail(invitation.get('email'));
      setName(invitation.get('name') ?? '');
    }
  }, [invitation]);

  // loading invitation
  if (isLoading) {
    return <Loader />;
  }

  const handleNameOnChange = (e) => {
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
    if (checkingEmail || checkingUsername) {
      setNameError(checkingUsername);
      setShouldValidate(true);
    } else {
      await signUp({ name, email: lowercaseEmail });
    }
  };

  const renderForm = () => (
    <>
      <FormControl>
        <TextField
          className={classes.input}
          required
          label={t('Name')}
          variant="outlined"
          value={name}
          error={Boolean(nameError)}
          helperText={nameError}
          onChange={handleNameOnChange}
          id={NAME_SIGN_UP_FIELD_ID}
          disabled={Boolean(invitation?.get('name'))}
        />
        <EmailInput
          className={classes.input}
          value={email}
          setValue={setEmail}
          id={EMAIL_SIGN_UP_FIELD_ID}
          disabled={Boolean(invitation?.get('email'))}
          shouldValidate={shouldValidate}
        />
        <Button
          onClick={handleRegister}
          id={SIGN_UP_BUTTON_ID}
          fullWidth
          className={classes.button}
        >
          {t('Sign Up')}
        </Button>
      </FormControl>

      <Divider variant="middle" className={classes.divider} />
      <Link to={buildSignInPath()}>
        {t('Already have an account? Click here to sign in')}
      </Link>
    </>
  );

  return (
    <div className={classes.fullScreen}>
      <Typography variant="h2" component="h2">
        {t('Sign Up')}
      </Typography>
      {renderForm()}
    </div>
  );
};

export default SignUp;
