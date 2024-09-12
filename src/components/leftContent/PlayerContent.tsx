import { PlayIcon } from '@graasp/ui';

import { Stack, Typography } from '@mui/material';

import { useAuthTranslation } from '../../config/i18n';
import { AUTH } from '../../langs/constants';

export const PlayerContent = () => {
  const { t } = useAuthTranslation();

  return (
    <Stack
      flexGrow={1}
      width="100%"
      direction="row"
      justifyContent="center"
      alignItems="center"
      // p={5}
    >
      <PlayIcon primaryColor="rgb(86, 176, 248)" size={180} />
      <p>
        <Typography variant="h5" textAlign="left">
          {t(AUTH.PLAYER_BACKGROUND_TEXT)}
        </Typography>
        <Typography variant="h2" component="h2" textAlign="left">
          {t(AUTH.PLAYER_BACKGROUND_TEXT_PLATFORM)}
        </Typography>
      </p>
    </Stack>
  );
};
