import { Lock } from 'lucide-react';
import { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';

import { useAuthTranslation } from '../../config/i18n';
import { AUTH } from '../../langs/constants';
import StyledTextField from '../StyledTextField';

const { PASSWORD_INPUT_PLACEHOLDER } = AUTH;

type Props = {
  id: string;
  value: string;
  error: string;
  onKeyDown: (e: any) => void;
  onChange: (e: any) => void;
};

const PasswordInput = ({ id, value, error, onKeyDown, onChange }: Props) => {
  const { t } = useAuthTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <StyledTextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Lock />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              //   onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      required
      variant="outlined"
      value={value}
      error={Boolean(error)}
      helperText={t(error)}
      placeholder={t(PASSWORD_INPUT_PLACEHOLDER)}
      onChange={onChange}
      id={id}
      type={showPassword ? 'text' : 'password'}
      onKeyDown={onKeyDown}
    />
  );
};

export default PasswordInput;
