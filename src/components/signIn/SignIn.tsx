import { Link, useLocation } from 'react-router-dom';

import { GraaspLogo } from '@graasp/ui';

import { Button, Divider, Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useAuthTranslation } from '../../config/i18n';
import { SIGN_UP_PATH } from '../../config/paths';
import { SIGN_IN_HEADER_ID } from '../../config/selectors';
import { AUTH } from '../../langs/constants';
import { LeftContentContainer } from '../LeftContentContainer';
import { MagicLinkForm } from './MagicLinkForm';
import { PasswordForm } from './PasswordForm';

export function SignIn() {
  const { t } = useAuthTranslation();
  const theme = useTheme();

  const { search } = useLocation();

  return (
    <LeftContentContainer>
      {
        <Stack direction="column" alignItems="center" spacing={3}>
          <Stack spacing={1}>
            <GraaspLogo height={90} sx={{ fill: theme.palette.primary.main }} />
            <Typography
              textAlign="center"
              variant="h4"
              component="h2"
              id={SIGN_IN_HEADER_ID}
            >
              {t(AUTH.SIGN_IN_HEADER)}
            </Typography>
          </Stack>

          <Stack
            direction="column"
            alignItems="center"
            divider={
              <Divider flexItem>{t(AUTH.LOGIN_METHODS_DIVIDER)}</Divider>
            }
            gap={3}
          >
            <MagicLinkForm />
            <PasswordForm />
            <Button
              variant="contained"
              fullWidth
              component={Link}
              to={`${SIGN_UP_PATH}${search}`}
            >
              {t(AUTH.SIGN_UP_LINK_TEXT)}
            </Button>
          </Stack>
        </Stack>
      }
    </LeftContentContainer>
  );
}
