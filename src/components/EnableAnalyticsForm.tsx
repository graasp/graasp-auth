import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Tooltip,
  Typography,
} from '@mui/material';

import { useAuthTranslation } from '../config/i18n';
import { SIGN_UP_SAVE_ACTIONS_ID } from '../config/selectors';
import { UseEnableAnalyticsForm } from '../hooks/useEnableAnalyticsForm';
import { AUTH } from '../langs/constants';

type Props = {
  useEnableAnalyticsForm: UseEnableAnalyticsForm;
};

export const EnableAnalyticsForm = ({ useEnableAnalyticsForm }: Props) => {
  const { SIGN_UP_SAVE_ACTIONS_TOOLTIP, SIGN_UP_SAVE_ACTIONS_LABEL } = AUTH;
  const { t } = useAuthTranslation();
  const { enableSaveActions, updateSaveActions } = useEnableAnalyticsForm;

  return (
    <Tooltip title={t(SIGN_UP_SAVE_ACTIONS_TOOLTIP)} placement="right">
      <FormGroup sx={{ maxWidth: 'max-content' }}>
        <FormControlLabel
          control={
            <Checkbox
              id={SIGN_UP_SAVE_ACTIONS_ID}
              size="small"
              checked={enableSaveActions}
              onChange={(_, checked) => updateSaveActions(checked)}
            />
          }
          label={
            <Typography fontSize="small">
              {t(SIGN_UP_SAVE_ACTIONS_LABEL)}
            </Typography>
          }
        />
      </FormGroup>
    </Tooltip>
  );
};
