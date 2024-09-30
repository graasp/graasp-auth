import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Button, GraaspLogo } from '@graasp/ui';

import { Stack, useTheme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

import { BACKGROUND_PATTERN } from '../../config/constants';
import { useAuthTranslation } from '../../config/i18n';
import { SIGN_IN_PATH } from '../../config/paths';
import { mutations } from '../../config/queryClient';
import { AUTH } from '../../langs/constants';
import { passwordValidator, passwordsMatch } from '../../utils/validation';
import StyledTextField from '../common/StyledTextField';
import { styledBox } from '../styles';

const { useResolvePasswordResetRequest } = mutations;

const ResetPassword = () => {
  const { t } = useAuthTranslation();
  const theme = useTheme();
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
    <Stack
      direction="row"
      margin="auto"
      height="100svh"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: BACKGROUND_PATTERN,
      }}
    >
      <Stack {...styledBox} borderRadius={2} p={2}>
        {
          <Stack direction="column" alignItems="center" spacing={2}>
            <Stack spacing={1}>
              <GraaspLogo
                height={90}
                sx={{ fill: theme.palette.primary.main }}
              />
              <Typography variant="h4" component="h2">
                {t(AUTH.PASSWORD_RESET_TITLE)}
              </Typography>
            </Stack>
            <FormControl>
              <Stack spacing={1}>
                <StyledTextField
                  required
                  label={t(AUTH.PASSWORD_FIELD_LABEL)}
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
                  label={t(AUTH.PASSWORD_RESET_REQUEST_CONFIRM_PASSWORD_TITLE)}
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
              </Stack>
            </FormControl>
            <Button fullWidth onClick={resetPassword}>
              {t(AUTH.PASSWORD_RESET_REQUEST_BUTTON)}
            </Button>
            <Link to={SIGN_IN_PATH}>
              {t(AUTH.PASSWORD_RESET_REQUEST_BACK_BUTTON)}
            </Link>
          </Stack>
        }
      </Stack>
    </Stack>
  );
};

export default ResetPassword;
