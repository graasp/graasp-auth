import React, { FC, useEffect, useState } from 'react';

import { AUTH } from '@graasp/translations';

import { useAuthTranslation } from '../config/i18n';
import { emailValidator } from '../utils/validation';
import StyledTextField from './StyledTextField';

type Props = {
  required?: boolean;
  value: string;
  id?: string;
  disabled?: boolean;
  setValue: (str: string) => void;
  onKeyPress?: React.KeyboardEventHandler<unknown>;
  shouldValidate: boolean;
};

const EmailInput: FC<Props> = ({
  required = true,
  value = '',
  id,
  disabled = false,
  setValue,
  onKeyPress,
  shouldValidate = true,
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
      variant="outlined"
      label={t(AUTH.EMAIL_FIELD_TEXT)}
      required={required}
      value={value}
      error={Boolean(error)}
      helperText={error}
      onChange={handleEmailOnChange}
      id={id}
      type="email"
      disabled={disabled}
      onKeyPress={onKeyPress}
    />
  );
};

export default EmailInput;
