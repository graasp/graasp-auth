import {
  AccentColors,
  AnalyticsIcon,
  BuildIcon,
  LibraryIcon,
  PlayIcon,
} from '@graasp/ui';

import { Box, Stack } from '@mui/material';

import { BACKGROUND_PATTERN } from '../config/constants';
import { useAuthTranslation } from '../config/i18n';
import { AUTH } from '../langs/constants';
import APIChecker from './APIChecker';
import { BrandingLogo } from './BrandingLogo';
import Footer from './Footer';
import { PlatformContent } from './leftContent/PlatformContent';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const LeftContentContainer = ({ children }: Props): JSX.Element => {
  const { t } = useAuthTranslation();

  return (
    <>
      <Box
        display={{
          xs: 'none',
          sm: 'block',
          md: 'block',
        }}
      >
        <BrandingLogo />
      </Box>
      <Stack
        direction="row"
        margin="auto"
        minHeight="100svh"
        sx={{
          backgroundImage: BACKGROUND_PATTERN,
        }}
      >
        <Stack
          display={{
            xs: 'none',
            sm: 'none',
            md: 'flex',
          }}
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <APIChecker />
          <Stack spacing={3}>
            <PlatformContent
              Icon={BuildIcon}
              text={t(AUTH.BUILDER_BACKGROUND_TEXT)}
              name={t(AUTH.BUILDER_BACKGROUND_TEXT_PLATFORM)}
              color={AccentColors.builder}
            />
            <PlatformContent
              Icon={PlayIcon}
              text={t(AUTH.PLAYER_BACKGROUND_TEXT)}
              name={t(AUTH.PLAYER_BACKGROUND_TEXT_PLATFORM)}
              color={AccentColors.player}
            />
            <PlatformContent
              Icon={LibraryIcon}
              text={t(AUTH.LIBRARY_BACKGROUND_TEXT)}
              name={t(AUTH.LIBRARY_BACKGROUND_TEXT_PLATFORM)}
              color={AccentColors.library}
            />
            <PlatformContent
              Icon={AnalyticsIcon}
              text={t(AUTH.ANALYTICS_BACKGROUND_TEXT)}
              name={t(AUTH.ANALYTICS_BACKGROUND_TEXT_PLATFORM)}
              color={AccentColors.analytics}
            />
          </Stack>
        </Stack>
        <Stack
          flexGrow={1}
          justifyContent="space-between"
          alignItems="flex-end"
          width={{ xs: '100%', sm: 'inherit' }}
          bgcolor="white"
          border="1px solid #eaeaf7"
          px={{ xs: 2, sm: 8 }}
          py={{ xs: 2, sm: 2 }}
          boxShadow="0px 0px 20px 5px rgba(44, 47, 240, 0.08)"
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            height="100%"
            width="100%"
          >
            {children}
          </Stack>
          <Footer />
        </Stack>
      </Stack>
    </>
  );
};

export default LeftContentContainer;
