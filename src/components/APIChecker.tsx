import { useState } from 'react';

import { Replay } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, Box, Stack, Typography } from '@mui/material';

import { API_HOST } from '../config/env';
import { useAuthTranslation } from '../config/i18n';
import { axios, useQuery } from '../config/queryClient';
import { AUTH } from '../langs/constants';

const APIChecker = (): JSX.Element | null => {
  const { t } = useAuthTranslation();
  const [noConnection, setNoConnection] = useState(false);
  const { isSuccess, isLoading, refetch } = useQuery({
    queryKey: ['apiStatus'],
    queryFn: () =>
      axios
        .get(`${API_HOST}/status`, { withCredentials: false })
        .then(({ data }) => data)
        .catch(() => setNoConnection(true)),
    retry: 1,
  });

  if (isSuccess) {
    return (
      <Stack direction="row" alignItems="center" color="success.light">
        <svg viewBox="0 0 10 10" width="20px" height="20px">
          <circle
            fill="currentColor"
            style={{ filter: 'drop-shadow(0px 0px 2px currentColor)' }}
            r="1.3px"
            cx="5px"
            cy="4.8px"
          />
        </svg>
        <Typography
          sx={{ textShadow: 'currentColor 1px 0px 10px' }}
          variant="caption"
        >
          Connected to Graasp backend
        </Typography>
      </Stack>
    );
  }

  if (noConnection) {
    return (
      <Box maxWidth="48ch">
        <Alert severity="error">
          <AlertTitle>{t(AUTH.API_UNAVAILABLE_TITLE)}</AlertTitle>
          <Stack direction="column" alignItems="center" spacing={1}>
            <Typography>{t(AUTH.API_UNAVAILABLE_EXPLANATION)}</Typography>
            <Typography>{t(AUTH.API_UNAVAILABLE_INSTRUCTIONS)}</Typography>
            <LoadingButton
              loading={isLoading}
              sx={{ maxWidth: 'min-content' }}
              endIcon={<Replay />}
              onClick={() => refetch()}
            >
              {t(AUTH.API_UNAVAILABLE_BUTTON)}
            </LoadingButton>
          </Stack>
        </Alert>
      </Box>
    );
  }

  return null;
};
export default APIChecker;
