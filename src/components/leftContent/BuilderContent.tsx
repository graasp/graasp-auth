import { BuildIcon } from '@graasp/ui';

import { Stack, Typography } from '@mui/material';

import { useAuthTranslation } from '../../config/i18n';
import { AUTH } from '../../langs/constants';

export const BuilderContent = () => {
  const { t } = useAuthTranslation();

  return (
    <Stack
      flexGrow={1}
      width="100%"
      direction="row"
      justifyContent="center"
      alignItems="center"
      p={5}
    >
      <BuildIcon primaryColor="#1ECAA5" size={180} />
      <p>
        <Typography variant="h4" textAlign="left">
          {t(AUTH.BUILDER_BACKGROUND_TEXT)}
        </Typography>
        <Typography variant="h1" component="h2" textAlign="left">
          {t(AUTH.BUILDER_BACKGROUND_TEXT_PLATFORM)}
        </Typography>
      </p>
    </Stack>
  );
};
