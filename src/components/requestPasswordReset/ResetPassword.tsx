import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Button } from '@graasp/ui';

import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useAuthTranslation } from '../../config/i18n';
import { SIGN_IN_PATH } from '../../config/paths';
import { mutations } from '../../config/queryClient';
import { AUTH } from '../../langs/constants';
import { passwordValidator, passwordsMatch } from '../../utils/validation';
import StyledTextField from '../common/StyledTextField';
import { CenteredContent } from '../layout/CenteredContent';
import { DialogHeader } from '../layout/DialogHeader';

const { useResolvePasswordResetRequest } = mutations;

const ResetPassword = () => {
  const { t } = useAuthTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('t');

  const { mutate: resolveRequestPasswordReset } =
    useResolvePasswordResetRequest();

  // enable validation after first click
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetPassword = () => {
    const checkingPassword = passwordValidator(password);
    const checkingConfirmPassword = passwordValidator(confirmPassword);
    // passwords need to be the same
    const checkPasswordsAreTheSame = passwordsMatch(password, confirmPassword);
    if (
      checkingPassword ||
      checkingConfirmPassword ||
      checkPasswordsAreTheSame
    ) {
      if (checkingPassword) {
        setPasswordError(checkingPassword);
      }
      if (checkingConfirmPassword) {
        setConfirmPasswordError(checkingConfirmPassword);
      }
    } else {
      if (token) {
        resolveRequestPasswordReset({ password, token });
        setPasswordError(null);
        setConfirmPasswordError(null);
      }
    }
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      resetPassword();
    }
  };

  return (
    <CenteredContent
      header={<DialogHeader title={t(AUTH.RESET_PASSWORD_TITLE)} />}
    >
      <Stack direction="column" alignItems="center" spacing={2}>
        <StyledTextField
          required
          label={t(AUTH.RESET_PASSWORD_NEW_PASSWORD_FIELD_LABEL)}
          variant="outlined"
          value={password}
          error={Boolean(passwordError)}
          helperText={passwordError && t(passwordError)}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
        />
        <StyledTextField
          required
          label={t(AUTH.RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_LABEL)}
          variant="outlined"
          value={confirmPassword}
          error={Boolean(confirmPasswordError)}
          helperText={confirmPasswordError && t(confirmPasswordError)}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          type="password"
          onKeyDown={handleKeypress}
        />

        <Button fullWidth onClick={resetPassword}>
          {t(AUTH.RESET_PASSWORD_BUTTON)}
        </Button>
      </Stack>
      <Typography
        component={Link}
        to={SIGN_IN_PATH}
        color="textSecondary"
        sx={{ textDecoration: 'none' }}
      >
        {t(AUTH.BACK_TO_SIGN_IN_BUTTON)}
      </Typography>
    </CenteredContent>
  );
};

export default ResetPassword;
