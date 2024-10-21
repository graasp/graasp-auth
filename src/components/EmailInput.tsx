import { UseFormRegisterReturn } from 'react-hook-form';

import { useAuthTranslation } from '../config/i18n';
import { EmailAdornment } from './common/EmailAdornment';
import StyledTextField from './common/StyledTextField';

type Props = {
  id?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  form: UseFormRegisterReturn<'email'>;
  error?: string;
};

export const EmailInput = ({
  id,
  disabled = false,
  autoFocus = false,
  form,
  error,
}: Props): JSX.Element => {
  const { t } = useAuthTranslation();

  return (
    <StyledTextField
      id={id}
      InputProps={{
        startAdornment: EmailAdornment,
      }}
      variant="outlined"
      error={Boolean(error)}
      helperText={error && t(error)}
      autoFocus={autoFocus}
      disabled={disabled}
      {...form}
    />
  );
};
