import { Link, useLocation } from 'react-router-dom';

import { GraaspLogo } from '@graasp/ui';

import { Divider, Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useAuthTranslation } from '../config/i18n';
import { SIGN_UP_PATH } from '../config/paths';
import { SIGN_IN_HEADER_ID } from '../config/selectors';
import { AUTH } from '../langs/constants';
import LeftContentContainer from './LeftContentContainer';
import MagicLinkForm from './MagicLinkForm';
import SignInPasswordForm from './SignInPasswordForm';

const { SIGN_UP_LINK_TEXT, SIGN_IN_HEADER } = AUTH;

const SignIn = () => {
  const { t } = useAuthTranslation();
  const theme = useTheme();

  const { search } = useLocation();

  return (
    <LeftContentContainer>
      {
        <Stack direction="column" alignItems="center" spacing={2}>
          <Stack spacing={1}>
            <GraaspLogo height={90} sx={{ fill: theme.palette.primary.main }} />
            <Typography
              textAlign="center"
              variant="h4"
              component="h2"
              id={SIGN_IN_HEADER_ID}
            >
              {t(SIGN_IN_HEADER)}
            </Typography>
          </Stack>

          <MagicLinkForm />
          <Divider sx={{ width: '100%' }}>or</Divider>
          <SignInPasswordForm />

          <Divider flexItem>or</Divider>
          <Link to={`${SIGN_UP_PATH}${search}`}>{t(SIGN_UP_LINK_TEXT)}</Link>
        </Stack>
      }
    </LeftContentContainer>
  );
};

export default SignIn;
