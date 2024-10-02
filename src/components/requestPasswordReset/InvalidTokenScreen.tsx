import { Link } from 'react-router-dom';

import { Alert, Button } from '@mui/material';

import { useAuthTranslation } from '../../config/i18n';
import { REQUEST_PASSWORD_RESET_PATH } from '../../config/paths';
import { AUTH } from '../../langs/constants';
import { CenteredContent } from '../layout/CenteredContent';
import { DialogHeader } from '../layout/DialogHeader';

export const InvalidTokenScreen = () => {
  const { t } = useAuthTranslation();
  return (
    <CenteredContent
      header={<DialogHeader title={t(AUTH.INVALID_TOKEN_PROVIDED_TITLE)} />}
    >
      <Alert severity="error">
        {t(AUTH.INVALID_TOKEN_PROVIDED_DESCRIPTION)}
      </Alert>
      <Button
        variant="contained"
        fullWidth
        component={Link}
        to={REQUEST_PASSWORD_RESET_PATH}
        sx={{ textDecoration: 'none' }}
      >
        {t(AUTH.REQUEST_PASSWORD_RESET_TITLE)}
      </Button>
    </CenteredContent>
  );
};
