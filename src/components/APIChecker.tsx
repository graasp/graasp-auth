import { useQuery } from '@tanstack/react-query';

import { Replay } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';

import { API_HOST } from '../config/env';
import { useAuthTranslation } from '../config/i18n';
import { axios } from '../config/queryClient';
import { AUTH } from '../langs/constants';

const APIChecker = (): JSX.Element | null => {
  const { t } = useAuthTranslation();

  const { isError, isSuccess } = useQuery({
    queryKey: ['apiStatus'],
    queryFn: () => axios.get(`${API_HOST}/status`).then(({ data }) => data),
  });

  if (isSuccess) {
    return null;
  }

  if (isError) {
    return (
      <Box maxWidth="48ch">
        <Alert severity="error">
          <AlertTitle>{t(AUTH.API_UNAVAILABLE_TITLE)}</AlertTitle>
          <Stack direction="column" alignItems="center" spacing={1}>
            <Typography>{t(AUTH.API_UNAVAILABLE_EXPLANATION)}</Typography>
            <Typography>{t(AUTH.API_UNAVAILABLE_INSTRUCTIONS)}</Typography>
            <Button sx={{ maxWidth: 'min-content' }} endIcon={<Replay />}>
              {t(AUTH.API_UNAVAILABLE_BUTTON)}
            </Button>
          </Stack>
        </Alert>
      </Box>
    );
  }
  return null;
};
export default APIChecker;
