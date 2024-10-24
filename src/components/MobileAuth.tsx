import { Link } from 'react-router-dom';

import { Android, Apple, DeviceUnknown } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';

import { useAuthTranslation } from '../config/i18n';
import { HOME_PATH } from '../config/paths';
import { AUTH } from '../langs/constants';
import { LeftContentContainer } from './LeftContentContainer';

const PLAY_STORE_LINK =
  'https://play.google.com/store/apps/details?id=org.graasp.mobile';

export function MobileAuth(): JSX.Element {
  const { t } = useAuthTranslation();

  return (
    <LeftContentContainer>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="column"
        spacing={2}
      >
        <DeviceUnknown fontSize="large" color="primary" />
        <Typography>{t(AUTH.MOBILE_APP_NOT_INSTALLED_MESSAGE)}</Typography>
        <Button component={Link} to={''} variant="contained">
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            px={1}
            py={{ xs: 1, sm: 2 }}
            textTransform="none"
          >
            <Apple />
            <Typography>{t(AUTH.MOBILE_GET_APP_FROM_APPLE_STORE)}</Typography>
          </Stack>
        </Button>
        <Button component={Link} to={PLAY_STORE_LINK} variant="contained">
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            px={1}
            py={{ xs: 1, sm: 2 }}
            textTransform="none"
          >
            <Android />
            <Typography>
              {t(AUTH.MOBILE_GET_APP_FROM_GOOGLE_PLAY_STORE)}
            </Typography>
          </Stack>
        </Button>
        <Typography component={Link} to={HOME_PATH} variant="caption">
          {t(AUTH.MOBILE_BACK_TO_LOGIN)}
        </Typography>
      </Stack>
    </LeftContentContainer>
  );
}
