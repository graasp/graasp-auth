import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, GraaspLogo } from '@graasp/ui';

import { Stack, useTheme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

import { useAuthTranslation } from '../config/i18n';
import { SIGN_IN_PATH } from '../config/paths';
import { AUTH } from '../langs/constants';
import { passwordValidator } from '../utils/validation';
import FullscreenContainer from './FullscreenContainer';
import StyledTextField from './StyledTextField';

const ResetPassword = () => {
  const { t } = useAuthTranslation();
  const theme = useTheme();

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
    if (checkingPassword || checkingConfirmPassword) {
      if (checkingPassword) {
        setPasswordError(checkingPassword);
      }
      if (checkingConfirmPassword) {
        setConfirmPasswordError(checkingConfirmPassword);
      }
    } else {
      setPasswordError(null);
      setConfirmPasswordError(null);
      //   const token = await executeCaptcha(
      //     isMobile
      //       ? RecaptchaAction.SignInWithPasswordMobile
      //       : RecaptchaAction.SignInWithPassword,
      //   );
      //   const result = await (isMobile
      //     ? mobileSignInWithPassword({
      //         email: lowercaseEmail,
      //         password,
      //         captcha: token,
      //         challenge,
      //       })
      //     : signInWithPassword({
      //         email: lowercaseEmail,
      //         password,
      //         captcha: token,
      //         url: redirect.url,
      //       }));
      //   // successful redirect
      //   if (result && result.resource) {
      //     window.location.href = result.resource;
      //   }
    }
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      resetPassword();
    }
  };

  return (
    <FullscreenContainer>
      {
        <Stack direction="column" alignItems="center" spacing={2}>
          <Stack spacing={1}>
            <GraaspLogo height={90} sx={{ fill: theme.palette.primary.main }} />
            <Typography variant="h4" component="h2">
              {t(AUTH.RESET_PASSWORD_TITLE)}
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
                helperText={t(passwordError)}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                onKeyDown={handleKeypress}
              />
              <StyledTextField
                required
                label={t(AUTH.CONFIRM_PASSWORD_FIELD_LABEL)}
                variant="outlined"
                value={confirmPassword}
                error={Boolean(confirmPasswordError)}
                helperText={t(confirmPasswordError)}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                type="password"
                onKeyDown={handleKeypress}
              />
            </Stack>
          </FormControl>
          <Button fullWidth onClick={resetPassword}>
            {t(AUTH.FORGOT_PASSWORD_BUTTON)}
          </Button>
          <Link to={SIGN_IN_PATH}>{t(AUTH.FORGOT_PASSWORD_BACK_BUTTON)}</Link>
        </Stack>
      }
    </FullscreenContainer>
  );
};

export default ResetPassword;
