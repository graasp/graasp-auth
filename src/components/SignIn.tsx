import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button, GraaspLogo } from '@graasp/ui';

import { Stack, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

import { useAuthTranslation } from '../config/i18n';
import { SIGN_UP_PATH } from '../config/paths';
import {
  EMAIL_SIGN_IN_METHOD_BUTTON_ID,
  PASSWORD_SIGN_IN_METHOD_BUTTON_ID,
  SIGN_IN_HEADER_ID,
} from '../config/selectors';
import { AUTH } from '../langs/constants';
import { SIGN_IN_METHODS } from '../types/signInMethod';
import FullscreenContainer from './FullscreenContainer';
import MagicLinkForm from './MagicLinkForm';
import SignInPasswordForm from './SignInPasswordForm';

const {
  SIGN_UP_LINK_TEXT,
  PASSWORD_SIGN_IN_METHOD,
  EMAIL_SIGN_IN_METHOD,
  SIGN_IN_HEADER,
} = AUTH;

const SignIn = () => {
  const { t } = useAuthTranslation();
  const theme = useTheme();

  const { search } = useLocation();

  const [signInMethod, setSignInMethod] = useState(SIGN_IN_METHODS.EMAIL);

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

  return (
    <FullscreenContainer>
      {
        <Stack direction="column" alignItems="center" spacing={2}>
          <Stack spacing={1}>
            <GraaspLogo height={90} sx={{ fill: theme.palette.primary.main }} />
            <Typography variant="h4" component="h2" id={SIGN_IN_HEADER_ID}>
              {t(SIGN_IN_HEADER)}
            </Typography>
          </Stack>
          <FormControl>
            <Stack direction="column" spacing={1}>
              {signInMethod === SIGN_IN_METHODS.PASSWORD && (
                <SignInPasswordForm />
              )}
              {signInMethod === SIGN_IN_METHODS.EMAIL && <MagicLinkForm />}
            </Stack>
          </FormControl>
          <Link to={`${SIGN_UP_PATH}${search}`}>{t(SIGN_UP_LINK_TEXT)}</Link>
          <Box justifyContent="center">
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
        </Stack>
      }
    </FullscreenContainer>
  );
};

export default SignIn;
