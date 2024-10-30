import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { IconButton, InputAdornment } from '@mui/material';

import { useAuthTranslation } from '../../config/i18n';
import { AUTH } from '../../langs/constants';
import { PasswordAdornment } from './Adornments';
import { StyledTextField } from './StyledTextField';

const { PASSWORD_INPUT_PLACEHOLDER } = AUTH;

type Props = {
  id: string;
  form: UseFormRegisterReturn<'password'>;
  error: string | undefined;
};

export function PasswordInput({ id, error, form }: Props): JSX.Element {
  const { t } = useAuthTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <StyledTextField
      slotProps={{
        input: {
          startAdornment: PasswordAdornment,
          endAdornment: (
            <InputAdornment position="end" color="inherit">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
                color="inherit"
              >
                {showPassword ? (
                  <EyeOffIcon color="currentColor" />
                ) : (
                  <EyeIcon color="currentColor" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
      error={Boolean(error)}
      helperText={error && t(error)}
      placeholder={t(PASSWORD_INPUT_PLACEHOLDER)}
      id={id}
      type={showPassword ? 'text' : 'password'}
      {...form}
    />
  );
}
