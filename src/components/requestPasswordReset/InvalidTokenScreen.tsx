import { Link } from 'react-router-dom';

import { Alert, Button } from '@mui/material';

import { useAuthTranslation } from '../../config/i18n';
import { REQUEST_PASSWORD_RESET_PATH } from '../../config/paths';
import { RESET_PASSWORD_TOKEN_ERROR_ID } from '../../config/selectors';
import { AUTH } from '../../langs/constants';
import { CenteredContent } from '../layout/CenteredContent';
import { DialogHeader } from '../layout/DialogHeader';

export function InvalidTokenScreen() {
  const { t } = useAuthTranslation();
  return (
    <CenteredContent
      header={<DialogHeader title={t(AUTH.INVALID_TOKEN_PROVIDED_TITLE)} />}
    >
      <Alert id={RESET_PASSWORD_TOKEN_ERROR_ID} severity="error">
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
}
