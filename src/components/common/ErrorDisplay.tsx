import { Alert } from '@mui/material';

import { useMessagesTranslation } from '../../config/i18n';
import { getErrorMessage } from '../../config/notifier';
import { ERROR_DISPLAY_ID } from '../../config/selectors';

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
    <Alert id={ERROR_DISPLAY_ID} severity="error">
      {translateMessages(getErrorMessage(error))}
    </Alert>
  );
}
