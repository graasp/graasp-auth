import Qs from 'qs';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { MUTATION_KEYS } from '@graasp/query-client';
import { AUTH } from '@graasp/translations';
import { Button, Loader } from '@graasp/ui';

import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { FORM_INPUT_MIN_WIDTH } from '../config/constants';
import { useAuthTranslation } from '../config/i18n';
import { buildSignInPath } from '../config/paths';
import { hooks, useMutation } from '../config/queryClient';
import {
  EMAIL_SIGN_UP_FIELD_ID,
  NAME_SIGN_UP_FIELD_ID,
  SIGN_UP_BUTTON_ID,
} from '../config/selectors';
import { emailValidator, nameValidator } from '../utils/validation';
import EmailInput from './EmailInput';

const { SIGN_IN_LINK_TEXT, SIGN_UP_BUTTON, SIGN_UP_HEADER, NAME_FIELD_LABEL } =
  AUTH;

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
  const { t } = useAuthTranslation();
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  // enable validation after first click
  const [shouldValidate, setShouldValidate] = useState(false);

  const { mutate: signUp } = useMutation(MUTATION_KEYS.SIGN_UP);

  const location = useLocation();
  const queryStrings = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const {
    data: invitation,
    isSuccess,
    isLoading,
  } = hooks.useInvitation(queryStrings?.invitationId);

  useEffect(() => {
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
      signUp({ name, email: lowercaseEmail });
    }
  };

  const renderForm = () => (
    <>
      <FormControl>
        <TextField
          className={classes.input}
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
          {t(SIGN_UP_BUTTON)}
        </Button>
      </FormControl>

      <Divider variant="middle" className={classes.divider} />
      <Link to={buildSignInPath()}>{t(SIGN_IN_LINK_TEXT)}</Link>
    </>
  );

  return (
    <div className={classes.fullScreen}>
      <Typography variant="h2" component="h2">
        {t(SIGN_UP_HEADER)}
      </Typography>
      {renderForm()}
    </div>
  );
};

export default SignUp;
