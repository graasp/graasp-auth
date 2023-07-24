import { Link } from 'react-router-dom';

import { Android, Apple, DeviceUnknown } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';

import { HOME_PATH } from '../config/paths';
import FullscreenContainer from './FullscreenContainer';

const PLAY_STORE_LINK =
  'https://play.google.com/store/apps/details?id=org.graasp.mobile';

const MobileAuth = (): JSX.Element => {
  return (
    <FullscreenContainer>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="column"
        spacing={2}
      >
        <DeviceUnknown fontSize="large" color="primary" />
        <Typography>
          It looks like you requested a mobile link but you do not have our app
          installed on this device.
        </Typography>
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
            <Typography>Get from the Apple App Store</Typography>
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
            <Typography>Get from the Google Play Store</Typography>
          </Stack>
        </Button>
        <Typography component={Link} to={HOME_PATH} variant="caption">
          Go back Home
        </Typography>
      </Stack>
    </FullscreenContainer>
  );
};
export default MobileAuth;
