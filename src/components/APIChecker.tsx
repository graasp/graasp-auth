import { Replay } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, Box, Stack, Typography } from '@mui/material';

import { API_HOST } from '../config/env';
import { useAuthTranslation } from '../config/i18n';
import { axios, useQuery } from '../config/queryClient';
import { AUTH } from '../langs/constants';

const APIChecker = (): JSX.Element | false => {
  const { t } = useAuthTranslation();
  const { isSuccess, isLoading, refetch, isError } = useQuery({
    queryKey: ['apiStatus'],
    queryFn: () =>
      axios
        .get(`${API_HOST}/status`, { withCredentials: false })
        .then(({ data }) => data),
    retry: 0,
  });

  if (isSuccess) {
    return false;
  }

  if (isError) {
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

  return false;
};
export default APIChecker;
