import React, { FC, useEffect, useState } from 'react';

import { useAuthTranslation } from '../config/i18n';
import { AUTH } from '../langs/constants';
import { emailValidator } from '../utils/validation';
import StyledTextField from './common/StyledTextField';
import { EmailAdornment } from './common/styles';

const { EMAIL_INPUT_PLACEHOLDER } = AUTH;

type Props = {
  required?: boolean;
  value: string;
  id?: string;
  disabled?: boolean;
  setValue: (str: string) => void;
  onKeyPress?: React.KeyboardEventHandler<unknown>;
  shouldValidate: boolean;
  autoFocus?: boolean;
};

export const EmailInput: FC<Props> = ({
  required = false,
  value = '',
  id,
  disabled = false,
  setValue,
  onKeyPress,
  shouldValidate = true,
  autoFocus = false,
}) => {
  const { t } = useAuthTranslation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (shouldValidate) {
      setError(emailValidator(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldValidate]);

  const handleEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e?.target?.value;
    setValue?.(newEmail);
    if (shouldValidate) {
      setError(emailValidator(newEmail));
    }
  };

  return (
    <StyledTextField
      InputProps={{
        startAdornment: EmailAdornment,
      }}
      variant="outlined"
      value={value}
      error={Boolean(error)}
      helperText={error && t(error)}
      placeholder={t(
        `${EMAIL_INPUT_PLACEHOLDER}${required ? '_REQUIRED' : ''}`,
      )}
      autoFocus={autoFocus}
      onChange={handleEmailOnChange}
      id={id}
      type="email"
      disabled={disabled}
      onKeyPress={onKeyPress}
    />
  );
};
