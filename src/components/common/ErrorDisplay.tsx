import { Alert } from '@mui/material';

import { useMessagesTranslation } from '../../config/i18n';
import { getErrorMessage } from '../../config/notifier';

const ErrorDisplay = ({ error }: { error: Error }): JSX.Element | false => {
  const { t: translateMessages } = useMessagesTranslation();

  if (error) {
    return (
      <Alert severity="error">
        {translateMessages(getErrorMessage(error))}
      </Alert>
    );
  }
  return false;
};
export default ErrorDisplay;
