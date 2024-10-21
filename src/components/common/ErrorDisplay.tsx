import { Alert } from '@mui/material';

import { useMessagesTranslation } from '../../config/i18n';
import { getErrorMessage } from '../../config/notifier';

export function ErrorDisplay({
  error,
}: {
  error: Error | null;
}): JSX.Element | null {
  const { t: translateMessages } = useMessagesTranslation();

  if (!error) {
    return null;
  }

  return (
    <Alert severity="error">{translateMessages(getErrorMessage(error))}</Alert>
  );
}
