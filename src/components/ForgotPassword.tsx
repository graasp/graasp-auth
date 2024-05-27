import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, GraaspLogo } from '@graasp/ui';

import { Stack, useTheme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

import { useAuthTranslation } from '../config/i18n';
import { SIGN_IN_PATH } from '../config/paths';
import { AUTH } from '../langs/constants';
import EmailInput from './EmailInput';
import FullscreenContainer from './FullscreenContainer';

const ForgotPassword = () => {
  const { t } = useAuthTranslation();
  const theme = useTheme();

  // enable validation after first click
  const [shouldValidate, setShouldValidate] = useState(false);
  const [email, setEmail] = useState('');

  const resetPassword = () => {
    setShouldValidate(true);
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
              {t(AUTH.FORGOT_PASSWORD_TITLE)}
            </Typography>
          </Stack>
          <FormControl>
            <Stack spacing={1}>
              <EmailInput
                value={email}
                setValue={setEmail}
                onKeyPress={handleKeypress}
                shouldValidate={shouldValidate}
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

export default ForgotPassword;
