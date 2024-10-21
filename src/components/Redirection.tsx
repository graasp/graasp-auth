import { ArrowRightIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { GraaspLogo } from '@graasp/ui';

import { Button, Container, Stack, Typography, useTheme } from '@mui/material';

import { DEFAULT_REDIRECTION_URL } from '../config/env';
import { useAuthTranslation } from '../config/i18n';
import { hooks } from '../config/queryClient';
import { REDIRECTION_CONTENT_CONTAINER_ID } from '../config/selectors';
import { useRedirection } from '../hooks/searchParams';
import { AUTH } from '../langs/constants';

type Props = {
  children: ReactNode;
};

export function Redirection({ children }: Props) {
  const theme = useTheme();
  const { data: member } = hooks.useCurrentMember();
  const { t } = useAuthTranslation();
  const redirect = useRedirection();
  // redirect.url is used when user comes from another part of the app
  const targetLink = redirect.url || DEFAULT_REDIRECTION_URL;

  if (member) {
    return (
      <Container
        id={REDIRECTION_CONTENT_CONTAINER_ID}
        sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}
      >
        <Stack
          direction="row"
          height="100%"
          alignItems="center"
          justifyContent="center"
          gap={3}
        >
          <GraaspLogo height={100} sx={{ fill: theme.palette.primary.main }} />
          <Stack direction="column" alignItems="center" gap={2}>
            <Typography variant="h2">
              {t(AUTH.REDIRECTION_TITLE, { name: member.name })}
            </Typography>
            <Typography
              maxWidth="50ch"
              variant="caption"
              fontStyle="italic"
              align="center"
            >
              {t(AUTH.REDIRECTION_DESCRIPTION)}
            </Typography>
            <Button
              role="button"
              variant="contained"
              component={Link}
              to={targetLink}
              endIcon={<ArrowRightIcon />}
            >
              {t(AUTH.REDIRECTION_BUTTON)}
            </Button>
          </Stack>
        </Stack>
      </Container>
    );
  }

  return children;
}
