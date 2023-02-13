import Qs from 'qs';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { MUTATION_KEYS } from '@graasp/query-client';
import { AUTH } from '@graasp/translations';
import { Button, Loader } from '@graasp/ui';

import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

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
import FullscreenContainer from './FullscreenContainer';
import StyledDivider from './StyledDivider';
import StyledTextField from './StyledTextField';
import SuccessContent from './SuccessContent';

const { SIGN_IN_LINK_TEXT, SIGN_UP_BUTTON, SIGN_UP_HEADER, NAME_FIELD_LABEL } =
  AUTH;

const SignUp = () => {
  const { t } = useAuthTranslation();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  // enable validation after first click
  const [shouldValidate, setShouldValidate] = useState(false);

  const { mutate: signUp, isSuccess: signUpSuccess } = useMutation(
    MUTATION_KEYS.SIGN_UP,
  );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitation, isSuccess]);

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
        <Button onClick={handleRegister} id={SIGN_UP_BUTTON_ID} fullWidth>
          {t(SIGN_UP_BUTTON)}
        </Button>
      </FormControl>

      <StyledDivider />
      <Link to={buildSignInPath()}>{t(SIGN_IN_LINK_TEXT)}</Link>
    </>
  );

  const renderContent = () => {
    if (signUpSuccess) {
      return (
        <SuccessContent title={t(AUTH.SIGN_UP_SUCCESS_TITLE)} email={email} />
      );
    }

    return (
      <>
        <Typography variant="h2" component="h2">
          {t(SIGN_UP_HEADER)}
        </Typography>
        {renderForm()}
      </>
    );
  };

  return <FullscreenContainer>{renderContent()}</FullscreenContainer>;
};

export default SignUp;
