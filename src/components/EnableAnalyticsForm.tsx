import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Tooltip,
  Typography,
} from '@mui/material';

import { MAX_CHECKBOX_LABEL_WITH_PX_SIGN_UP } from '../config/constants';
import { useAuthTranslation } from '../config/i18n';
import { SIGN_UP_SAVE_ACTIONS_ID } from '../config/selectors';
import { AUTH } from '../langs/constants';

type Props = {
  enableSaveActions: boolean;
  onUpdateSaveActions: (enabled: boolean) => void;
};

export const EnableAnalyticsForm = ({
  enableSaveActions,
  onUpdateSaveActions,
}: Props) => {
  const { SIGN_UP_SAVE_ACTIONS_TOOLTIP, SIGN_UP_SAVE_ACTIONS_LABEL } = AUTH;
  const { t } = useAuthTranslation();

  return (
    <Tooltip title={t(SIGN_UP_SAVE_ACTIONS_TOOLTIP)} placement="right">
      <FormGroup sx={{ maxWidth: `${MAX_CHECKBOX_LABEL_WITH_PX_SIGN_UP}px` }}>
        <FormControlLabel
          control={
            <Checkbox
              id={SIGN_UP_SAVE_ACTIONS_ID}
              size="small"
              checked={enableSaveActions}
              onChange={(_, checked) => onUpdateSaveActions(checked)}
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
