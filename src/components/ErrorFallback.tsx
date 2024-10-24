import { FAILURE_MESSAGES } from '@graasp/translations';

import { Alert } from '@mui/material';

import { useMessagesTranslation } from '../config/i18n';

export function ErrorFallback() {
  const { t } = useMessagesTranslation();
  return <Alert severity="error">{t(FAILURE_MESSAGES.UNEXPECTED_ERROR)}</Alert>;
}
