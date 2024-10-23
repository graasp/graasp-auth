import { UseFormRegisterReturn } from 'react-hook-form';

import { useAuthTranslation } from '../../config/i18n';
import { EmailAdornment } from '../common/Adornments';
import { StyledTextField } from '../common/StyledTextField';

type Props = {
  id?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  form: UseFormRegisterReturn<'email'>;
  error?: string;
  placeholder: string;
};

export function EmailInput({
  id,
  disabled = false,
  autoFocus = false,
  form,
  error,
  placeholder,
}: Props): JSX.Element {
  const { t } = useAuthTranslation();

  return (
    <StyledTextField
      id={id}
      InputProps={{
        startAdornment: EmailAdornment,
      }}
      variant="outlined"
      error={Boolean(error)}
      placeholder={placeholder}
      helperText={error && t(error)}
      autoFocus={autoFocus}
      disabled={disabled}
      {...form}
    />
  );
}
